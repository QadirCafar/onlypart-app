import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  clearCart,
  deleteCartItem,
  getCartItems,
  updateCartItemQuantity,
} from "../../../features/customerCart/api";
import type { CartItem } from "../../../features/customerCart/types";
import { checkoutCart } from "../../../features/customerOrders/api";
import CustomerLayout from "../../../layouts/CustomerLayout";
import { styles } from "./CustomerCartScreen.styles";

function formatMoney(value?: number | null) {
  return `${Number(value || 0).toFixed(2)} AZN`;
}

function getOemCodes(item: CartItem) {
  if (!item.oemCodes || item.oemCodes.length === 0) return "-";
  return item.oemCodes.join(", ");
}

export default function CustomerCartScreen() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [clearLoading, setClearLoading] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    try {
      setLoading(true);

      const data = await getCartItems();

      setItems(data);
    } catch {
      Alert.alert("Xəta", "Səbət yüklənmədi");
    } finally {
      setLoading(false);
    }
  }

  async function refreshCart() {
    try {
      setRefreshing(true);

      const data = await getCartItems();

      setItems(data);
    } catch {
      Alert.alert("Xəta", "Səbət yenilənmədi");
    } finally {
      setRefreshing(false);
    }
  }

  const totalQuantity = useMemo(() => {
    return items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  }, [items]);

  const totalAmount = useMemo(() => {
    return items.reduce((sum, item) => sum + Number(item.lineTotal || 0), 0);
  }, [items]);

  async function changeQuantity(item: CartItem, nextQuantity: number) {
    if (nextQuantity < 1) return;

    if (nextQuantity > item.stock) {
      Alert.alert("Məlumat", "Seçilən say anbardakı saydan çox ola bilməz");
      return;
    }

    try {
      setUpdatingItemId(item.id);

      await updateCartItemQuantity(item.id, {
        quantity: nextQuantity,
      });

      setItems((prev) =>
        prev.map((cartItem) => {
          if (cartItem.id !== item.id) return cartItem;

          return {
            ...cartItem,
            quantity: nextQuantity,
            lineTotal: Number(cartItem.retailPrice || 0) * nextQuantity,
          };
        })
      );
    } catch {
      Alert.alert("Xəta", "Məhsul sayı yenilənmədi");
    } finally {
      setUpdatingItemId(null);
    }
  }

  function confirmDeleteItem(item: CartItem) {
    Alert.alert(
      "Məhsul silinsin?",
      `"${item.productName}" səbətdən silinəcək.`,
      [
        {
          text: "İmtina",
          style: "cancel",
        },
        {
          text: "Sil",
          style: "destructive",
          onPress: () => handleDeleteItem(item.id),
        },
      ]
    );
  }

  async function handleDeleteItem(id: string) {
    try {
      setDeletingItemId(id);

      await deleteCartItem(id);

      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch {
      Alert.alert("Xəta", "Məhsul səbətdən silinmədi");
    } finally {
      setDeletingItemId(null);
    }
  }

  function confirmClearCart() {
    if (items.length === 0) return;

    Alert.alert("Səbət təmizlənsin?", "Səbətdəki bütün məhsullar silinəcək.", [
      {
        text: "İmtina",
        style: "cancel",
      },
      {
        text: "Təmizlə",
        style: "destructive",
        onPress: handleClearCart,
      },
    ]);
  }

  async function handleClearCart() {
    try {
      setClearLoading(true);

      await clearCart();

      setItems([]);
      setNote("");
    } catch {
      Alert.alert("Xəta", "Səbət təmizlənmədi");
    } finally {
      setClearLoading(false);
    }
  }

  function confirmCheckout() {
    if (items.length === 0) {
      Alert.alert("Məlumat", "Səbət boşdur");
      return;
    }

    Alert.alert(
      "Sifariş yaradılsın?",
      `${items.length} məhsul üzrə sifariş yaradılacaq.`,
      [
        {
          text: "İmtina",
          style: "cancel",
        },
        {
          text: "Təsdiqlə",
          onPress: handleCheckout,
        },
      ]
    );
  }

  async function handleCheckout() {
    try {
      setCheckoutLoading(true);

      const result = await checkoutCart({
        note: note.trim() || null,
        cartItemIds: items.map((item) => item.id),
      });

      setItems([]);
      setNote("");

      Alert.alert(
        "Sifariş yaradıldı",
        `${result.orderFormattedNo || result.orderNumber} uğurla yaradıldı.`
      );
    } catch (error: any) {
      Alert.alert(
        "Xəta",
        error?.response?.data?.message ||
          error?.response?.data?.title ||
          "Sifariş yaradılmadı"
      );
    } finally {
      setCheckoutLoading(false);
    }
  }

  function renderCartItem({ item }: { item: CartItem }) {
    const updating = updatingItemId === item.id;
    const deleting = deletingItemId === item.id;
    const maxReached = item.quantity >= item.stock;
    const outOfStock = item.stock <= 0;

    return (
      <View style={styles.cartItemCard}>
        <View style={styles.itemHeader}>
          <View style={styles.itemTitleBox}>
            <Text style={styles.itemName} numberOfLines={2}>
              {item.productName}
            </Text>

            <Text style={styles.itemSubText} numberOfLines={1}>
              Kod: {item.code || item.partNumber || "-"}
            </Text>
          </View>

          <Pressable
            style={styles.deleteButton}
            onPress={() => confirmDeleteItem(item)}
            disabled={deleting}
          >
            {deleting ? (
              <ActivityIndicator color="#dc2626" size="small" />
            ) : (
              <Text style={styles.deleteButtonText}>Sil</Text>
            )}
          </Pressable>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Nömrəsi</Text>
            <Text style={styles.infoValue}>{item.partNumber || "-"}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>OEM</Text>
            <Text style={styles.infoValue}>{getOemCodes(item)}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Anbar</Text>
            <Text
              style={[
                styles.infoValue,
                outOfStock && styles.stockDangerText,
              ]}
            >
              {item.stock} ədəd
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Qiymət</Text>
            <Text style={styles.infoValue}>
              {formatMoney(item.retailPrice)}
            </Text>
          </View>
        </View>

        {maxReached && !outOfStock ? (
          <Text style={styles.stockWarning}>
            Maksimum anbar sayı seçilib.
          </Text>
        ) : null}

        {outOfStock ? (
          <Text style={styles.stockDanger}>
            Bu məhsul hazırda anbarda yoxdur.
          </Text>
        ) : null}

        <View style={styles.itemBottomRow}>
          <View style={styles.quantityControl}>
            <Pressable
              style={styles.quantityButton}
              onPress={() => changeQuantity(item, item.quantity - 1)}
              disabled={updating || item.quantity <= 1}
            >
              <Text
                style={[
                  styles.quantityButtonText,
                  (updating || item.quantity <= 1) &&
                    styles.quantityButtonTextDisabled,
                ]}
              >
                −
              </Text>
            </Pressable>

            <View style={styles.quantityValueBox}>
              {updating ? (
                <ActivityIndicator color="#2563eb" size="small" />
              ) : (
                <Text style={styles.quantityText}>{item.quantity}</Text>
              )}
            </View>

            <Pressable
              style={styles.quantityButton}
              onPress={() => changeQuantity(item, item.quantity + 1)}
              disabled={updating || maxReached || outOfStock}
            >
              <Text
                style={[
                  styles.quantityButtonText,
                  (updating || maxReached || outOfStock) &&
                    styles.quantityButtonTextDisabled,
                ]}
              >
                +
              </Text>
            </Pressable>
          </View>

          <View style={styles.lineTotalBox}>
            <Text style={styles.lineTotalLabel}>Cəmi</Text>
            <Text style={styles.lineTotalValue}>
              {formatMoney(item.lineTotal)}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <CustomerLayout title="Səbət">
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.loadingText}>Səbət yüklənir...</Text>
        </View>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout title="Səbət">
      <View style={styles.page}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderCartItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refreshCart} />
          }
          ListHeaderComponent={
            <View style={styles.header}>
              <View style={styles.summaryRow}>
                <View style={styles.summaryBox}>
                  <Text style={styles.summaryLabel}>Məhsul sayı</Text>
                  <Text style={styles.summaryValue}>{items.length}</Text>
                </View>

                <View style={styles.summaryBox}>
                  <Text style={styles.summaryLabel}>Ümumi say</Text>
                  <Text style={styles.summaryValue}>{totalQuantity}</Text>
                </View>
              </View>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyTitle}>Səbət boşdur</Text>
              <Text style={styles.emptyText}>
                Məhsul seçdikdən sonra burada görünəcək.
              </Text>
            </View>
          }
          ListFooterComponent={
            items.length > 0 ? (
              <View style={styles.checkoutCard}>
                <Text style={styles.checkoutTitle}>Sifariş məlumatı</Text>

                <TextInput
                  style={styles.noteInput}
                  placeholder="Qeyd əlavə et..."
                  placeholderTextColor="#94a3b8"
                  value={note}
                  onChangeText={setNote}
                  multiline
                />

                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Yekun məbləğ</Text>
                  <Text style={styles.totalValue}>
                    {formatMoney(totalAmount)}
                  </Text>
                </View>

                <View style={styles.checkoutActions}>
                  <Pressable
                    style={[
                      styles.clearButton,
                      clearLoading && styles.disabledButton,
                    ]}
                    onPress={confirmClearCart}
                    disabled={clearLoading || checkoutLoading}
                  >
                    {clearLoading ? (
                      <ActivityIndicator color="#ffffff" size="small" />
                    ) : (
                      <Text style={styles.clearButtonText}>Səbəti təmizlə</Text>
                    )}
                  </Pressable>

                  <Pressable
                    style={[
                      styles.checkoutButton,
                      checkoutLoading && styles.disabledButton,
                    ]}
                    onPress={confirmCheckout}
                    disabled={checkoutLoading || clearLoading}
                  >
                    {checkoutLoading ? (
                      <ActivityIndicator color="#ffffff" size="small" />
                    ) : (
                      <Text style={styles.checkoutButtonText}>
                        Sifariş yarat
                      </Text>
                    )}
                  </Pressable>
                </View>
              </View>
            ) : null
          }
        />
      </View>
    </CustomerLayout>
  );
}