import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";
import {
  getMyOrderById,
  getMyOrderPaymentsByOrderId,
  getMyOrders,
} from "../../../features/customerOrders/api";
import type {
  CustomerOrderDetails,
  CustomerOrderListItem,
  CustomerOrderPaymentHistoryItem,
} from "../../../features/customerOrders/types";
import CustomerLayout from "../../../layouts/CustomerLayout";
import { styles } from "./CustomerOrdersScreen.styles";

function formatMoney(value?: number | null) {
  return `${Number(value || 0).toFixed(2)} AZN`;
}

function formatDate(value?: string | null) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "-";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
}

function getDisplayOrderNumber(
  order: CustomerOrderListItem | CustomerOrderDetails
) {
  return order.orderFormattedNo || order.orderNumber || "-";
}

function getStatusText(status?: string | null) {
  const value = status?.toLowerCase();

  if (value === "pending") return "Gözlənilir";
  if (value === "confirmed") return "Təsdiqləndi";
  if (value === "declined") return "İmtina edildi";
  if (value === "cancelled") return "Ləğv edildi";
  if (value === "deleted") return "Silindi";

  return status || "-";
}

function getPaymentStatusText(order: CustomerOrderListItem | CustomerOrderDetails) {
  if (Number(order.debtAmount || 0) <= 0) return "Ödənilib";
  if (Number(order.paidAmount || 0) > 0) return "Qismən ödənilib";

  return "Ödənilməyib";
}

function getStatusBadgeStyle(status?: string | null) {
  const value = status?.toLowerCase();

  if (value === "confirmed") return styles.statusConfirmed;
  if (value === "declined" || value === "cancelled") return styles.statusDeclined;
  if (value === "pending") return styles.statusPending;

  return styles.statusDefault;
}

function getPaymentBadgeStyle(order: CustomerOrderListItem | CustomerOrderDetails) {
  if (Number(order.debtAmount || 0) <= 0) return styles.paymentPaid;
  if (Number(order.paidAmount || 0) > 0) return styles.paymentPartial;

  return styles.paymentUnpaid;
}

export default function CustomerOrdersScreen() {
  const [orders, setOrders] = useState<CustomerOrderListItem[]>([]);
  const [selectedOrder, setSelectedOrder] =
    useState<CustomerOrderDetails | null>(null);
  const [paymentOrderId, setPaymentOrderId] = useState<string | null>(null);
  const [paymentHistory, setPaymentHistory] = useState<
    CustomerOrderPaymentHistoryItem[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [detailsLoadingOrderId, setDetailsLoadingOrderId] = useState<
    string | null
  >(null);
  const [paymentsLoadingOrderId, setPaymentsLoadingOrderId] = useState<
    string | null
  >(null);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      setLoading(true);

      const data = await getMyOrders();

      const sortedOrders = [...data].sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setOrders(sortedOrders);
    } catch {
      Alert.alert("Xəta", "Sifarişlər yüklənmədi");
    } finally {
      setLoading(false);
    }
  }

  async function refreshOrders() {
    try {
      setRefreshing(true);

      const data = await getMyOrders();

      const sortedOrders = [...data].sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setOrders(sortedOrders);
    } catch {
      Alert.alert("Xəta", "Sifarişlər yenilənmədi");
    } finally {
      setRefreshing(false);
    }
  }

  async function handleViewDetails(orderId: string) {
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(null);
      return;
    }

    try {
      setDetailsLoadingOrderId(orderId);
      setPaymentOrderId(null);
      setPaymentHistory([]);

      const data = await getMyOrderById(orderId);

      setSelectedOrder(data);
    } catch {
      Alert.alert("Xəta", "Sifariş detalları yüklənmədi");
    } finally {
      setDetailsLoadingOrderId(null);
    }
  }

  async function handleViewPayments(orderId: string) {
    if (paymentOrderId === orderId) {
      setPaymentOrderId(null);
      setPaymentHistory([]);
      return;
    }

    try {
      setPaymentsLoadingOrderId(orderId);
      setSelectedOrder(null);

      const data = await getMyOrderPaymentsByOrderId(orderId);

      setPaymentOrderId(orderId);
      setPaymentHistory(data);
    } catch {
      Alert.alert("Xəta", "Ödəniş tarixçəsi yüklənmədi");
    } finally {
      setPaymentsLoadingOrderId(null);
    }
  }

  const totalDebt = useMemo(() => {
    return orders.reduce((sum, order) => sum + Number(order.debtAmount || 0), 0);
  }, [orders]);

  function renderOrder({ item }: { item: CustomerOrderListItem }) {
    const detailsLoading = detailsLoadingOrderId === item.id;
    const paymentsLoading = paymentsLoadingOrderId === item.id;

    const detailsOpened = selectedOrder?.id === item.id;
    const paymentsOpened = paymentOrderId === item.id;

    return (
      <View style={styles.orderCard}>
        <View style={styles.orderTopRow}>
          <View style={styles.orderTitleBox}>
            <Text style={styles.orderLabel}>Sifariş</Text>
            <Text style={styles.orderNumber}>
              {getDisplayOrderNumber(item)}
            </Text>
          </View>

          <View style={[styles.statusBadge, getStatusBadgeStyle(item.status)]}>
            <Text style={styles.statusBadgeText}>
              {getStatusText(item.status)}
            </Text>
          </View>
        </View>

        <View style={styles.orderMetaRow}>
          <Text style={styles.orderMetaText}>
            {formatDate(item.createdAt)}
          </Text>

          <Text style={styles.orderMetaText}>
            {item.itemsCount} məhsul
          </Text>
        </View>

        <View style={styles.summaryGrid}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Cəmi</Text>
            <Text style={styles.summaryValue}>
              {formatMoney(item.totalAmount)}
            </Text>
          </View>

          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Ödənilib</Text>
            <Text style={styles.summaryValue}>
              {formatMoney(item.paidAmount)}
            </Text>
          </View>

          <View
            style={[
              styles.summaryBox,
              Number(item.debtAmount || 0) > 0 && styles.debtBox,
            ]}
          >
            <Text style={styles.summaryLabel}>Borc</Text>
            <Text
              style={[
                styles.summaryValue,
                Number(item.debtAmount || 0) > 0 && styles.debtValue,
              ]}
            >
              {formatMoney(item.debtAmount)}
            </Text>
          </View>
        </View>

        <View style={styles.paymentStatusRow}>
          <Text style={styles.paymentStatusLabel}>Ödəniş statusu</Text>

          <View style={[styles.paymentBadge, getPaymentBadgeStyle(item)]}>
            <Text style={styles.paymentBadgeText}>
              {getPaymentStatusText(item)}
            </Text>
          </View>
        </View>

        {item.note ? (
          <View style={styles.noteBox}>
            <Text style={styles.noteLabel}>Qeyd</Text>
            <Text style={styles.noteText}>{item.note}</Text>
          </View>
        ) : null}

        <View style={styles.actionRow}>
          <Pressable
            style={styles.secondaryButton}
            onPress={() => handleViewDetails(item.id)}
            disabled={detailsLoading}
          >
            {detailsLoading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={styles.secondaryButtonText}>
                {detailsOpened ? "Detalları bağla" : "Detallar"}
              </Text>
            )}
          </Pressable>

          <Pressable
            style={styles.primaryButton}
            onPress={() => handleViewPayments(item.id)}
            disabled={paymentsLoading}
          >
            {paymentsLoading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={styles.primaryButtonText}>
                {paymentsOpened ? "Ödənişləri bağla" : "Ödənişlər"}
              </Text>
            )}
          </Pressable>
        </View>

        {detailsOpened && selectedOrder ? (
          <View style={styles.detailsBox}>
            <Text style={styles.sectionTitle}>Sifariş detalları</Text>

            <View style={styles.detailsSummary}>
              <View style={styles.detailsSummaryItem}>
                <Text style={styles.detailsSummaryLabel}>Order №</Text>
                <Text style={styles.detailsSummaryValue}>
                  {selectedOrder.orderNumber || "-"}
                </Text>
              </View>

              <View style={styles.detailsSummaryItem}>
                <Text style={styles.detailsSummaryLabel}>Cəmi</Text>
                <Text style={styles.detailsSummaryValue}>
                  {formatMoney(selectedOrder.totalAmount)}
                </Text>
              </View>
            </View>

            {selectedOrder.items.length === 0 ? (
              <Text style={styles.emptyInnerText}>
                Bu sifarişdə məhsul yoxdur.
              </Text>
            ) : (
              selectedOrder.items.map((orderItem, index) => (
                <View key={orderItem.id} style={styles.orderItemCard}>
                  <View style={styles.orderItemHeader}>
                    <Text style={styles.orderItemIndex}>#{index + 1}</Text>
                    <Text style={styles.orderItemName} numberOfLines={2}>
                      {orderItem.productName}
                    </Text>
                  </View>

                  <View style={styles.orderItemInfoGrid}>
                    <View style={styles.orderItemInfo}>
                      <Text style={styles.orderItemLabel}>Nömrəsi</Text>
                      <Text style={styles.orderItemValue}>
                        {orderItem.partNumber || "-"}
                      </Text>
                    </View>

                    <View style={styles.orderItemInfo}>
                      <Text style={styles.orderItemLabel}>OEM</Text>
                      <Text style={styles.orderItemValue}>
                        {orderItem.oemCode || "-"}
                      </Text>
                    </View>

                    <View style={styles.orderItemInfo}>
                      <Text style={styles.orderItemLabel}>Qiymət</Text>
                      <Text style={styles.orderItemValue}>
                        {formatMoney(orderItem.unitPrice)}
                      </Text>
                    </View>

                    <View style={styles.orderItemInfo}>
                      <Text style={styles.orderItemLabel}>Say</Text>
                      <Text style={styles.orderItemValue}>
                        {orderItem.quantity}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.orderItemTotalRow}>
                    <Text style={styles.orderItemTotalLabel}>Cəmi</Text>
                    <Text style={styles.orderItemTotalValue}>
                      {formatMoney(orderItem.lineTotal)}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>
        ) : null}

        {paymentsOpened ? (
          <View style={styles.detailsBox}>
            <Text style={styles.sectionTitle}>Ödəniş tarixçəsi</Text>

            {paymentHistory.length === 0 ? (
              <Text style={styles.emptyInnerText}>
                Bu sifariş üzrə ödəniş tapılmadı.
              </Text>
            ) : (
              paymentHistory.map((payment) => (
                <View key={payment.id} style={styles.paymentItemCard}>
                  <View>
                    <Text style={styles.paymentAmount}>
                      {formatMoney(payment.amount)}
                    </Text>
                    <Text style={styles.paymentMeta}>
                      {payment.method || "-"} / {payment.status || "-"}
                    </Text>
                  </View>

                  <Text style={styles.paymentDate}>
                    {formatDate(payment.paidAt || payment.createdAt)}
                  </Text>

                  {payment.paymentNumber ? (
                    <Text style={styles.paymentNumber}>
                      № {payment.paymentNumber}
                    </Text>
                  ) : null}

                  {payment.note ? (
                    <Text style={styles.paymentNote}>{payment.note}</Text>
                  ) : null}
                </View>
              ))
            )}
          </View>
        ) : null}
      </View>
    );
  }

  if (loading) {
    return (
      <CustomerLayout title="Sifarişlər">
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.loadingText}>Sifarişlər yüklənir...</Text>
        </View>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout title="Sifarişlər">
      <View style={styles.page}>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrder}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refreshOrders} />
          }
          ListHeaderComponent={
            <View style={styles.header}>
              <View style={styles.headerSummaryRow}>
                <View style={styles.headerSummaryBox}>
                  <Text style={styles.headerSummaryLabel}>Sifariş sayı</Text>
                  <Text style={styles.headerSummaryValue}>
                    {orders.length}
                  </Text>
                </View>

                <View style={styles.headerSummaryBox}>
                  <Text style={styles.headerSummaryLabel}>Ümumi borc</Text>
                  <Text
                    style={[
                      styles.headerSummaryValue,
                      totalDebt > 0 && styles.headerDebtValue,
                    ]}
                  >
                    {formatMoney(totalDebt)}
                  </Text>
                </View>
              </View>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyTitle}>Sifariş yoxdur</Text>
              <Text style={styles.emptyText}>
                Səbətdən checkout etdikdən sonra sifarişlər burada görünəcək.
              </Text>
            </View>
          }
        />
      </View>
    </CustomerLayout>
  );
}