import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  Text,
  TextInput,
  View,
} from "react-native";
import { getPublicCategories } from "../../../features/publicCategories/api";
import type { PublicCategory } from "../../../features/publicCategories/types";
import { getPublicProductBrands } from "../../../features/publicProductBrands/api";
import type { PublicProductBrand } from "../../../features/publicProductBrands/types";
import { getPublicProducts } from "../../../features/publicProducts/api";
import type { PublicProduct } from "../../../features/publicProducts/types";
import { authStorage } from "../../../storage/authStorage";
import { styles } from "./PublicHomeScreen.styles";

const pageSize = 10;

function normalizeIsNew(value: PublicProduct["isNew"]) {
  if (typeof value === "boolean") return value;

  if (typeof value === "string") {
    return value.toLowerCase() === "true" || value.toLowerCase() === "new";
  }

  return false;
}

function getProductImage(product: PublicProduct) {
  return product.mainImageUrl || null;
}

function getBrandNames(product: PublicProduct) {
  if (!product.brands || product.brands.length === 0) return "-";

  return product.brands.map((brand) => brand.name).join(", ");
}

export default function PublicHomeScreen() {
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [categories, setCategories] = useState<PublicCategory[]>([]);
  const [brands, setBrands] = useState<PublicProductBrand[]>([]);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [authModalVisible, setAuthModalVisible] = useState(false);

  const canLoadMore = useMemo(() => {
    return !loading && !loadingMore && page < totalPages;
  }, [loading, loadingMore, page, totalPages]);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAppliedSearch(search.trim());
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    loadProducts(1, true);
  }, [selectedCategoryId, selectedBrandId, appliedSearch]);

  async function loadInitialData() {
    try {
      setLoading(true);

      const [categoriesData, brandsData] = await Promise.all([
        getPublicCategories(),
        getPublicProductBrands(),
      ]);

      setCategories(categoriesData);
      setBrands(brandsData);

      await loadProducts(1, true);
    } catch (error) {
      Alert.alert("Xəta", "Məlumatlar yüklənmədi");
    } finally {
      setLoading(false);
    }
  }

  async function loadProducts(targetPage: number, replace: boolean) {
    try {
      if (targetPage === 1 && !refreshing) {
        setLoading(true);
      }

      const data = await getPublicProducts({
        page: targetPage,
        pageSize,
        categoryId: selectedCategoryId,
        brandId: selectedBrandId,
        search: appliedSearch,
      });

      setProducts((current) =>
        replace ? data.items : [...current, ...data.items]
      );

      setPage(data.page);
      setTotalPages(data.totalPages);
    } catch (error) {
      Alert.alert("Xəta", "Məhsullar yüklənmədi");
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  }

  async function handleRefresh() {
    setRefreshing(true);
    await loadProducts(1, true);
  }

  async function handleLoadMore() {
    if (!canLoadMore) return;

    setLoadingMore(true);
    await loadProducts(page + 1, false);
  }

  function handleSelectCategory(categoryId: string | null) {
    setSelectedCategoryId((current) =>
      current === categoryId ? null : categoryId
    );
  }

  function handleSelectBrand(brandId: string | null) {
    setSelectedBrandId((current) => (current === brandId ? null : brandId));
  }

  async function handleAddToCart(product: PublicProduct) {
    const token = await authStorage.getToken();

    if (!token) {
      setAuthModalVisible(true);
      return;
    }

    Alert.alert("Məlumat", `${product.name} səbətə əlavə olunacaq`);
  }

  function renderProduct({ item }: { item: PublicProduct }) {
    const isNew = normalizeIsNew(item.isNew);
    const imageUrl = getProductImage(item);
    const inStock = item.stock > 0;

    return (
      <View
        style={[
          styles.productCard,
          isNew ? styles.productCardNew : styles.productCardUsed,
        ]}
      >
        <View style={styles.imageBox}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.productImage} />
          ) : (
            <Text style={styles.noImageText}>Şəkil yoxdur</Text>
          )}
        </View>

        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {item.description || "..."}
        </Text>

        <View style={styles.infoGrid}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Kod</Text>
            <Text style={styles.infoValue}>{item.code || "-"}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Nömrəsi</Text>
            <Text style={styles.infoValue}>{item.partNumber || "-"}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>OEM kodları</Text>
            <Text style={styles.infoValue}>
              {item.oemCodes && item.oemCodes.length > 0
                ? item.oemCodes.join(", ")
                : "-"}
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Brend</Text>
            <Text style={styles.infoValue}>{getBrandNames(item)}</Text>
          </View>
        </View>

        <View style={styles.stockRow}>
          <View style={styles.stockBox}>
            <Text style={styles.infoLabel}>Anbarda</Text>
            <Text style={styles.stockValue}>{item.stock} ədəd</Text>
          </View>

          <View
            style={[
              styles.conditionBox,
              isNew ? styles.conditionNew : styles.conditionUsed,
            ]}
          >
            <Text
              style={[
                styles.conditionText,
                isNew ? styles.conditionTextNew : styles.conditionTextUsed,
              ]}
            >
              {isNew ? "Yeni" : "İşlənmiş"}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={styles.priceLabel}>Qiymət</Text>
            <Text style={styles.price}>{item.retailPrice.toFixed(2)} AZN</Text>

            {!inStock && (
              <Text style={styles.outOfStockText}>Anbarda yoxdur</Text>
            )}
          </View>

          <Pressable
            style={[styles.addButton, !inStock && styles.addButtonDisabled]}
            onPress={() => handleAddToCart(item)}
            disabled={!inStock}
          >
            <Text style={styles.addButtonText}>
              {inStock ? "Əlavə et" : "Yoxdur"}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  function renderListHeader() {
    return (
      <View>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Məhsullar</Text>
            <Text style={styles.subtitle}>OnlyPart məhsul kataloqu</Text>
          </View>

          <View style={styles.headerActions}>
            <Pressable
              style={styles.loginButton}
              onPress={() => router.push("/login")}
            >
              <Text style={styles.loginButtonText}>Daxil ol</Text>
            </Pressable>

            <Pressable
              style={styles.registerButton}
              onPress={() => router.push("/register")}
            >
              <Text style={styles.registerButtonText}>Qeydiyyat</Text>
            </Pressable>
          </View>
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Axtar..."
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
        />

        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Kateqoriyalar</Text>

          <FlatList
            horizontal
            data={[{ id: "", name: "Hamısı", imageUrl: null, sortOrder: 0 }, ...categories]}
            keyExtractor={(item) => item.id || "all-categories"}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterList}
            renderItem={({ item }) => {
              const value = item.id || null;
              const selected = selectedCategoryId === value;

              return (
                <Pressable
                  style={[
                    styles.filterChip,
                    selected && styles.filterChipActive,
                  ]}
                  onPress={() => handleSelectCategory(value)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selected && styles.filterChipTextActive,
                    ]}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Brendlər</Text>

          <FlatList
            horizontal
            data={[{ id: "", name: "Hamısı", slug: null, logoUrl: null }, ...brands]}
            keyExtractor={(item) => item.id || "all-brands"}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterList}
            renderItem={({ item }) => {
              const value = item.id || null;
              const selected = selectedBrandId === value;

              return (
                <Pressable
                  style={[
                    styles.filterChip,
                    selected && styles.filterChipActive,
                  ]}
                  onPress={() => handleSelectBrand(value)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selected && styles.filterChipTextActive,
                    ]}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>
      </View>
    );
  }

  function renderFooter() {
    if (!loadingMore) return null;

    return (
      <View style={styles.listFooter}>
        <ActivityIndicator size="small" color="#2563eb" />
        <Text style={styles.loadingMoreText}>Daha çox yüklənir...</Text>
      </View>
    );
  }

  if (loading && products.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Məhsullar yüklənir...</Text>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>Məhsul tapılmadı</Text>
            <Text style={styles.emptyText}>
              Axtarış sözünü və ya filterləri dəyişib yenidən yoxla.
            </Text>
          </View>
        }
      />

      <Modal
        visible={authModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAuthModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Hesab tələb olunur</Text>
            <Text style={styles.modalText}>
              Məhsulu səbətə əlavə etmək üçün əvvəlcə daxil olmalı və ya
              qeydiyyatdan keçməlisən.
            </Text>

            <View style={styles.modalActions}>
              <Pressable
                style={styles.modalSecondaryButton}
                onPress={() => setAuthModalVisible(false)}
              >
                <Text style={styles.modalSecondaryText}>Bağla</Text>
              </Pressable>

              <Pressable
                style={styles.modalPrimaryButton}
                onPress={() => {
                  setAuthModalVisible(false);
                  router.push("/login");
                }}
              >
                <Text style={styles.modalPrimaryText}>Daxil ol</Text>
              </Pressable>

              <Pressable
                style={styles.modalDarkButton}
                onPress={() => {
                  setAuthModalVisible(false);
                  router.push("/register");
                }}
              >
                <Text style={styles.modalDarkText}>Qeydiyyat</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}