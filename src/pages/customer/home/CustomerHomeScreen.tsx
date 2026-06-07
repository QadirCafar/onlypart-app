import { useRouter, type Href } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { getCustomerDashboard } from "../../../features/customerhome/api";
import type {
  CustomerDashboardNewProduct,
  CustomerDashboardResponse,
  CustomerDashboardSummary,
} from "../../../features/customerhome/types";
import CustomerLayout from "../../../layouts/CustomerLayout";
import { styles } from "./CustomerHomeScreen.styles";

const backendBaseUrl = "https://autopart-production.up.railway.app";

const fallbackSummary: CustomerDashboardSummary = {
  debtAzn: 0,

  ordersTotalAzn: 0,
  ordersTotalCount: 0,

  cartTotalAzn: 0,
  cartItemCount: 0,

  pendingTotalAzn: 0,
  pendingTotalCount: 0,
};

function formatMoney(value?: number | null) {
  return `${Number(value || 0).toFixed(2)} ₼`;
}

function getTodayText() {
  const date = new Date();

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

function getImageUrl(imageUrl?: string | null): string {
  if (!imageUrl) return "";

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  if (imageUrl.startsWith("/")) {
    return `${backendBaseUrl}${imageUrl}`;
  }

  return `${backendBaseUrl}/${imageUrl}`;
}

export default function CustomerHomeScreen() {
  const router = useRouter();

  const [summary, setSummary] =
    useState<CustomerDashboardSummary>(fallbackSummary);

  const [newProducts, setNewProducts] = useState<CustomerDashboardNewProduct[]>(
    []
  );

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const displayedNewProducts = useMemo(() => {
    return newProducts.slice(0, 8);
  }, [newProducts]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);
      setErrorMessage("");

      const data: CustomerDashboardResponse = await getCustomerDashboard();

      setSummary(data.summary || fallbackSummary);
      setNewProducts(Array.isArray(data.newProducts) ? data.newProducts : []);
    } catch (error) {
      console.error("CustomerDashboard API error:", error);

      setSummary(fallbackSummary);
      setNewProducts([]);
      setErrorMessage("Dashboard məlumatları yüklənmədi.");
    } finally {
      setLoading(false);
    }
  }

  async function refreshDashboard() {
    try {
      setRefreshing(true);
      setErrorMessage("");

      const data: CustomerDashboardResponse = await getCustomerDashboard();

      setSummary(data.summary || fallbackSummary);
      setNewProducts(Array.isArray(data.newProducts) ? data.newProducts : []);
    } catch (error) {
      console.error("CustomerDashboard refresh error:", error);

      setSummary(fallbackSummary);
      setNewProducts([]);
      setErrorMessage("Dashboard məlumatları yenilənmədi.");
    } finally {
      setRefreshing(false);
    }
  }

  function goTo(path: Href) {
    router.push(path);
  }

  function goToProduct(productId: string) {
    router.push(`/customer/products/${productId}` as Href);
  }

  function renderProduct(product: CustomerDashboardNewProduct) {
    const imageUrl = getImageUrl(product.imageUrl || product.mainImageUrl);

    return (
      <Pressable
        key={product.id}
        style={styles.productCard}
        onPress={() => goToProduct(product.id)}
      >
        <View style={styles.productImageBox}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.productImage} />
          ) : (
            <Text style={styles.noImageText}>Şəkil yoxdur</Text>
          )}
        </View>

        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>

        <Text style={styles.productBrand} numberOfLines={1}>
          {product.brandName || "Onlypart"}
        </Text>

        {typeof product.price === "number" ? (
          <Text style={styles.productPrice}>{formatMoney(product.price)}</Text>
        ) : null}
      </Pressable>
    );
  }

  return (
    <CustomerLayout title="Ana səhifə">
      <ScrollView
        style={styles.page}
        contentContainerStyle={styles.pageContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshDashboard} />
        }
      >
        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="small" color="#2563eb" />
            <Text style={styles.loadingText}>Məlumatlar yüklənir...</Text>
          </View>
        ) : null}

        {!loading && errorMessage ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}

        <View style={styles.summaryGrid}>
          <Pressable style={[styles.summaryCard, styles.debtCard]}>
            <Text style={styles.summaryIcon}>👛</Text>
            <Text style={styles.summaryTitle}>Borc</Text>
            <Text style={styles.summaryValue}>
              {formatMoney(summary.debtAzn)}
            </Text>
            <Text style={styles.summaryHint}>Ümumi borc məbləği</Text>
          </Pressable>

          <Pressable
            style={[styles.summaryCard, styles.ordersCard]}
            onPress={() => goTo("/customer/orders" as Href)}
          >
            <Text style={styles.summaryIcon}>📦</Text>
            <Text style={styles.summaryTitle}>Sifarişlər</Text>
            <Text style={styles.summaryValue}>
              {summary.ordersTotalCount} ədəd /{" "}
              {formatMoney(summary.ordersTotalAzn)}
            </Text>
            <Text style={styles.summaryHint}>Sifariş sayı və cəmi</Text>
          </Pressable>

          <Pressable
            style={[styles.summaryCard, styles.cartCard]}
            onPress={() => goTo("/customer/cart" as Href)}
          >
            <Text style={styles.summaryIcon}>🛒</Text>
            <Text style={styles.summaryTitle}>Səbət</Text>
            <Text style={styles.summaryValue}>
              {summary.cartItemCount} məhsul /{" "}
              {formatMoney(summary.cartTotalAzn)}
            </Text>
            <Text style={styles.summaryHint}>Səbətdəki məhsullar</Text>
          </Pressable>

          <Pressable
            style={[styles.summaryCard, styles.pendingCard]}
            onPress={() => goTo("/customer/orders" as Href)}
          >
            <Text style={styles.summaryIcon}>🕒</Text>
            <Text style={styles.summaryTitle}>Gözləyən sifarişlər</Text>
            <Text style={styles.summaryValue}>
              {summary.pendingTotalCount} ədəd /{" "}
              {formatMoney(summary.pendingTotalAzn)}
            </Text>
            <Text style={styles.summaryHint}>Təsdiq gözləyənlər</Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Yeni gələnlər</Text>
            <Text style={styles.sectionDate}>{getTodayText()}</Text>
          </View>

          <Pressable
            style={styles.showAllButton}
            onPress={() => goTo("/customer/products" as Href)}
          >
            <Text style={styles.showAllButtonText}>Hamısı</Text>
          </Pressable>
        </View>

        {displayedNewProducts.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsRow}
          >
            {displayedNewProducts.map(renderProduct)}
          </ScrollView>
        ) : (
          <View style={styles.emptyProductsBox}>
            <Text style={styles.emptyProductsTitle}>
              Yeni məhsul məlumatı yoxdur
            </Text>

            <Text style={styles.emptyProductsText}>
              Bütün kataloqa baxmaq üçün məhsullar səhifəsinə keçin.
            </Text>

            <Pressable
              style={styles.emptyProductsButton}
              onPress={() => goTo("/customer/products" as Href)}
            >
              <Text style={styles.emptyProductsButtonText}>
                Məhsullara keç
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </CustomerLayout>
  );
}