export interface CheckoutCartRequest {
  note?: string | null;
  cartItemIds?: string[];
}

export interface CheckoutCartResult {
  orderId: string;

  orderNumber: string;
  orderFormattedNo: string;
  orderNo: number;

  totalAmount: number;
  paidAmount: number;
  debtAmount: number;
  itemsCount: number;
}

export interface CustomerOrderListItem {
  id: string;

  orderNumber: string;
  orderFormattedNo: string;
  orderNo: number;

  status: string;

  totalAmount: number;
  paidAmount: number;
  debtAmount: number;

  note?: string | null;
  createdAt: string;
  updatedAt?: string | null;

  itemsCount: number;
}

export interface CustomerOrderItem {
  id: string;
  productId: string;

  productName: string;
  oemCode?: string | null;
  partNumber?: string | null;

  unitPrice: number;
  quantity: number;
  lineTotal: number;

  createdAt: string;
}

export interface CustomerOrderDetails {
  id: string;

  orderNumber: string;
  orderFormattedNo: string;
  orderNo: number;

  status: string;

  totalAmount: number;
  paidAmount: number;
  debtAmount: number;

  note?: string | null;

  createdAt: string;
  updatedAt?: string | null;

  items: CustomerOrderItem[];
}

export interface CustomerOrderPaymentHistoryItem {
  id: string;
  orderId: string;

  amount: number;
  method: string;
  status: string;

  paymentNumber?: string | null;

  paidAt?: string | null;
  note?: string | null;

  createdAt: string;
}