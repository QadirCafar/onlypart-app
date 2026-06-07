import { useRouter, type Href } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { addCartItem } from "../../../features/customerCart/api";
import { getCustomerProductsPaged } from "../../../features/customerProducts/api";
import type { CustomerProduct } from "../../../features/customerProducts/types";
import CustomerLayout from "../../../layouts/CustomerLayout";
import { styles } from "./CustomerProductsScreen.styles";

const API_ORIGIN = "https://autopart-production.up.railway.app";
const PAGE_SIZE = 10;

function normalizeIsNew(value: CustomerProduct["isNew"]) {
  if (typeof value === "boolean") return value;

  if (typeof value === "string") {
    const normalized = value.toLowerCase().trim();
    return normalized === "true" || normalized === "new" || normalized === "yeni";
  }

  return false;
}

function getBrandNames(product: CustomerProduct) {
  if (!product.brands || product.brands.length === 0) return "-";

  return product.brands.map((brand) => brand.name).join(", ");
}

function normalizeImageUrl(imageUrl?: string | null) {
  if (!imageUrl) return null;

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  if (imageUrl.startsWith("/")) {
    return `${API_ORIGIN}${imageUrl}`;
  }

  return `${API_ORIGIN}/${imageUrl}`;
}

function getProductImages(product: CustomerProduct) {
  const imageUrls =
    product.images
      ?.map((image) => normalizeImageUrl(image.imageUrl))
      .filter((url): url is string => Boolean(url)) ?? [];

  const mainImageUrl = normalizeImageUrl(product.mainImageUrl);

  if (imageUrls.length > 0) return imageUrls;
  if (mainImageUrl) return [mainImageUrl];

  return [];
}

export default function CustomerProductsScreen() {
  const router = useRouter();

  const [products, setProducts] = useState<CustomerProduct[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const canLoadMore = useMemo(() => {
    return !loading && !loadingMore && page < totalPages;
  }, [loading, loadingMore, page, totalPages]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAppliedSearch(search.trim());
    }, 450);

    return () => clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    loadProducts(1, true);
  }, [appliedSearch]);

  async function loadProducts(targetPage: number, replace: boolean) {
    try {
      if (targetPage === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const data = await getCustomerProductsPaged({
        page: targetPage,
        pageSize: PAGE_SIZE,
        search: appliedSearch,
      });

      const nextProducts = data.items ?? [];

      setProducts((current) =>
        replace ? nextProducts : [...current, ...nextProducts]
      );

      setQuantities((current) => {
        const nextQuantities = replace ? {} : { ...current };

        nextProducts.forEach((product) => {
          if (!nextQuantities[product.id]) {
            nextQuantities[product.id] = 1;
          }
        });

        return nextQuantities;
      });

      setPage(data.page);
      setTotalPages(data.totalPages);
    } catch {
      Alert.alert("Xəta", "Məhsullar yüklənmədi");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  async function loadMoreProducts() {
    if (!canLoadMore) return;

    await loadProducts(page + 1, false);
  }

  function goToDetails(productId: string) {
    router.push(`/customer/products/${productId}` as Href);
  }

  function increaseQuantity(product: CustomerProduct) {
    const currentQuantity = quantities[product.id] ?? 1;

    if (currentQuantity >= product.stock) return;

    setQuantities((prev) => ({
      ...prev,
      [product.id]: currentQuantity + 1,
    }));
  }

  function decreaseQuantity(product: CustomerProduct) {
    const currentQuantity = quantities[product.id] ?? 1;

    if (currentQuantity <= 1) return;

    setQuantities((prev) => ({
      ...prev,
      [product.id]: currentQuantity - 1,
    }));
  }

  async function handleAddToCart(product: CustomerProduct) {
    const quantity = quantities[product.id] ?? 1;

    if (product.stock <= 0) {
      Alert.alert("Məlumat", "Bu məhsul anbarda yoxdur");
      return;
    }

    if (quantity > product.stock) {
      Alert.alert("Xəta", "Seçilən say anbardakı saydan çox ola bilməz");
      return;
    }

    try {
      setActionLoadingId(product.id);

      await addCartItem({
        productId: product.id,
        quantity,
      });

      Alert.alert("Uğurlu", "Məhsul səbətə əlavə edildi");
    } catch (error: any) {
      Alert.alert(
        "Xəta",
        error?.response?.data?.message ||
          error?.response?.data?.title ||
          "Məhsul səbətə əlavə edilmədi"
      );
    } finally {
      setActionLoadingId(null);
    }
  }

  function renderProduct({ item }: { item: CustomerProduct }) {
    const isNew = normalizeIsNew(item.isNew);
    const images = getProductImages(item);
    const currentImage = images[0];
    const quantity = quantities[item.id] ?? 1;
    const inStock = item.stock > 0;
    const adding = actionLoadingId === item.id;

    return (
      <View style={styles.productCard}>
        <Pressable onPress={() => goToDetails(item.id)}>
          <View style={styles.imageBox}>
            {currentImage ? (
              <Image source={{ uri: currentImage }} style={styles.productImage} />
            ) : (
              <Text style={styles.noImageText}>Şəkil yoxdur</Text>
            )}

            <View
              style={[
                styles.conditionBadge,
                isNew ? styles.conditionBadgeNew : styles.conditionBadgeUsed,
              ]}
            >
              <Text
                style={[
                  styles.conditionBadgeText,
                  isNew
                    ? styles.conditionBadgeTextNew
                    : styles.conditionBadgeTextUsed,
                ]}
              >
                {isNew ? "Yeni" : "İşlənmiş"}
              </Text>
            </View>

            {images.length > 1 ? (
              <View style={styles.imageCountBadge}>
                <Text style={styles.imageCountText}>{images.length}</Text>
              </View>
            ) : null}
          </View>

          <Text style={styles.productName} numberOfLines={2}>
            {item.name}
          </Text>

          <Text style={styles.metaText} numberOfLines={1}>
            Brend: {getBrandNames(item)}
          </Text>

          <Text style={styles.metaText} numberOfLines={1}>
            Kod: {item.code || item.partNumber || "-"}
          </Text>

          <View style={styles.stockPriceRow}>
            <Text style={styles.stockText}>
              {inStock ? `${item.stock} ədəd` : "Yoxdur"}
            </Text>

            <Text style={styles.price}>
              {Number(item.retailPrice || 0).toFixed(2)} AZN
            </Text>
          </View>
        </Pressable>

        <View style={styles.cartRow}>
          <View style={styles.quantityControl}>
            <Pressable
              style={styles.quantityButton}
              onPress={() => decreaseQuantity(item)}
              disabled={!inStock || quantity <= 1}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </Pressable>

            <Text style={styles.quantityText}>{quantity}</Text>

            <Pressable
              style={styles.quantityButton}
              onPress={() => increaseQuantity(item)}
              disabled={!inStock || quantity >= item.stock}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </Pressable>
          </View>

          <Pressable
            style={[
              styles.addButton,
              (!inStock || adding) && styles.addButtonDisabled,
            ]}
            onPress={() => handleAddToCart(item)}
            disabled={!inStock || adding}
          >
            {adding ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={styles.addButtonText}>
                {inStock ? "Səbətə" : "Yoxdur"}
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <CustomerLayout title="Məhsullar">
      <View style={styles.page}>
        <TextInput
          style={styles.searchInput}
          placeholder="Məhsul axtar..."
          placeholderTextColor="#94a3b8"
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
        />

        {loading && products.length === 0 ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#2563eb" />
            <Text style={styles.loadingText}>Məhsullar yüklənir...</Text>
          </View>
        ) : (
          <FlatList
            key="customer-products-grid"
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={renderProduct}
            numColumns={2}
            columnWrapperStyle={styles.productRow}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreProducts}
            onEndReachedThreshold={0.35}
            ListFooterComponent={
              loadingMore ? (
                <View style={styles.loadMoreBox}>
                  <ActivityIndicator color="#2563eb" size="small" />
                  <Text style={styles.loadMoreText}>Daha çox yüklənir...</Text>
                </View>
              ) : null
            }
            ListEmptyComponent={
              <View style={styles.emptyBox}>
                <Text style={styles.emptyTitle}>Məhsul tapılmadı</Text>
                <Text style={styles.emptyText}>
                  Axtarış sözünü dəyişib yenidən yoxla.
                </Text>
              </View>
            }
          />
        )}
      </View>
    </CustomerLayout>
  );
}