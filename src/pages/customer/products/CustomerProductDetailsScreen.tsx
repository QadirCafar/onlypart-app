import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { addCartItem } from "../../../features/customerCart/api";
import { getCustomerProductById } from "../../../features/customerProducts/api";
import type { CustomerProduct } from "../../../features/customerProducts/types";
import CustomerLayout from "../../../layouts/CustomerLayout";
import { styles } from "./CustomerProductDetailsScreen.styles";

const API_ORIGIN = "https://autopart-production.up.railway.app";

function normalizeIsNew(value: CustomerProduct["isNew"]) {
  if (typeof value === "boolean") return value;

  if (typeof value === "string") {
    const normalized = value.toLowerCase().trim();
    return normalized === "true" || normalized === "new" || normalized === "yeni";
  }

  return false;
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

function getBrandNames(product: CustomerProduct) {
  if (!product.brands || product.brands.length === 0) return "-";

  return product.brands.map((brand) => brand.name).join(", ");
}

function getOemCodes(product: CustomerProduct) {
  if (!product.oemCodes || product.oemCodes.length === 0) return "-";

  return product.oemCodes.join(", ");
}

export default function CustomerProductDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();

  const productId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [product, setProduct] = useState<CustomerProduct | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(false);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    loadProduct(productId);
  }, [productId]);

  async function loadProduct(id: string) {
    try {
      setLoading(true);

      const data = await getCustomerProductById(id);

      setProduct(data);
      setSelectedImageIndex(0);
      setQuantity(1);
    } catch {
      Alert.alert("Xəta", "Məhsul məlumatları yüklənmədi");
    } finally {
      setLoading(false);
    }
  }

  const images = useMemo(() => {
    if (!product) return [];

    return getProductImages(product);
  }, [product]);

  const selectedImage = images[selectedImageIndex];

  const isNew = product ? normalizeIsNew(product.isNew) : false;
  const inStock = product ? product.stock > 0 : false;

  function increaseQuantity() {
    if (!product) return;
    if (quantity >= product.stock) return;

    setQuantity((prev) => prev + 1);
  }

  function decreaseQuantity() {
    if (quantity <= 1) return;

    setQuantity((prev) => prev - 1);
  }

  async function handleAddToCart() {
    if (!product) return;

    if (product.stock <= 0) {
      Alert.alert("Məlumat", "Bu məhsul anbarda yoxdur");
      return;
    }

    if (quantity > product.stock) {
      Alert.alert("Xəta", "Seçilən say anbardakı saydan çox ola bilməz");
      return;
    }

    try {
      setAddLoading(true);

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
      setAddLoading(false);
    }
  }

  if (loading) {
    return (
      <CustomerLayout title="Məhsul detalları">
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.loadingText}>Məhsul yüklənir...</Text>
        </View>
      </CustomerLayout>
    );
  }

  if (!product) {
    return (
      <CustomerLayout title="Məhsul detalları">
        <View style={styles.center}>
          <Text style={styles.emptyTitle}>Məhsul tapılmadı</Text>
        </View>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout title="Məhsul detalları">
      <ScrollView
        style={styles.page}
        contentContainerStyle={styles.pageContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.gallery}>
            <View style={styles.mainImageBox}>
              {selectedImage ? (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.mainImage}
                />
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
            </View>

            {images.length > 1 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.thumbsRow}
              >
                {images.map((image, index) => (
                  <Pressable
                    key={`${image}-${index}`}
                    style={[
                      styles.thumb,
                      selectedImageIndex === index && styles.thumbActive,
                    ]}
                    onPress={() => setSelectedImageIndex(index)}
                  >
                    <Image source={{ uri: image }} style={styles.thumbImage} />
                  </Pressable>
                ))}
              </ScrollView>
            ) : null}
          </View>

          <View style={styles.content}>
            <View>
              <Text style={styles.productName}>{product.name}</Text>

              <Text style={styles.description}>
                {product.description || "Açıqlama yoxdur."}
              </Text>
            </View>

            <View style={styles.infoGrid}>
              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>Kod</Text>
                <Text style={styles.infoValue}>{product.code || "-"}</Text>
              </View>

              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>Nömrəsi</Text>
                <Text style={styles.infoValue}>
                  {product.partNumber || "-"}
                </Text>
              </View>

              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>Brend</Text>
                <Text style={styles.infoValue}>{getBrandNames(product)}</Text>
              </View>

              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>Anbarda</Text>
                <Text style={styles.infoValue}>{product.stock} ədəd</Text>
              </View>

              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>OEM kodları</Text>
                <Text style={styles.infoValue}>{getOemCodes(product)}</Text>
              </View>

              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>Status</Text>
                <Text style={styles.infoValue}>{product.status}</Text>
              </View>
            </View>

            <View style={styles.buyBox}>
              <View style={styles.priceBox}>
                <Text style={styles.priceLabel}>Qiymət</Text>
                <Text style={styles.price}>
                  {product.retailPrice.toFixed(2)} AZN
                </Text>

                {!inStock ? (
                  <Text style={styles.stockWarning}>Anbarda yoxdur</Text>
                ) : null}
              </View>

              <View style={styles.actions}>
                <View style={styles.quantityControl}>
                  <Pressable
                    style={styles.quantityButton}
                    onPress={decreaseQuantity}
                    disabled={!inStock || quantity <= 1}
                  >
                    <Text
                      style={[
                        styles.quantityButtonText,
                        (!inStock || quantity <= 1) &&
                          styles.quantityButtonTextDisabled,
                      ]}
                    >
                      −
                    </Text>
                  </Pressable>

                  <Text style={styles.quantityText}>{quantity}</Text>

                  <Pressable
                    style={styles.quantityButton}
                    onPress={increaseQuantity}
                    disabled={!inStock || quantity >= product.stock}
                  >
                    <Text
                      style={[
                        styles.quantityButtonText,
                        (!inStock || quantity >= product.stock) &&
                          styles.quantityButtonTextDisabled,
                      ]}
                    >
                      +
                    </Text>
                  </Pressable>
                </View>

                <Pressable
                  style={[
                    styles.addButton,
                    (!inStock || addLoading) && styles.addButtonDisabled,
                  ]}
                  onPress={handleAddToCart}
                  disabled={!inStock || addLoading}
                >
                  {addLoading ? (
                    <ActivityIndicator color="#ffffff" size="small" />
                  ) : (
                    <Text style={styles.addButtonText}>
                      {inStock ? "Səbətə əlavə et" : "Anbarda yoxdur"}
                    </Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </CustomerLayout>
  );
}