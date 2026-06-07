import { api } from "../../api/api";
import type {
    CheckoutCartRequest,
    CheckoutCartResult,
    CustomerOrderDetails,
    CustomerOrderListItem,
    CustomerOrderPaymentHistoryItem,
} from "./types";

const baseUrl = "/CustomerOrders";
const orderPaymentsBaseUrl = "/OrderPayments";

export async function checkoutCart(
  data: CheckoutCartRequest
): Promise<CheckoutCartResult> {
  const response = await api.post<CheckoutCartResult>(
    `${baseUrl}/checkout`,
    data
  );

  return response.data;
}

export async function getMyOrders(): Promise<CustomerOrderListItem[]> {
  const response = await api.get<CustomerOrderListItem[]>(
    `${baseUrl}/my-orders`
  );

  return response.data ?? [];
}

export async function getMyOrderById(
  orderId: string
): Promise<CustomerOrderDetails> {
  const response = await api.get<CustomerOrderDetails>(
    `${baseUrl}/my-orders/${orderId}`
  );

  return response.data;
}

export async function getMyOrderPaymentsByOrderId(
  orderId: string
): Promise<CustomerOrderPaymentHistoryItem[]> {
  const response = await api.get<CustomerOrderPaymentHistoryItem[]>(
    orderPaymentsBaseUrl,
    {
      params: {
        orderId,
      },
    }
  );

  return response.data ?? [];
}