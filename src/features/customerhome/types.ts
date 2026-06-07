export interface CustomerDashboardSummary {
  debtAzn: number;

  ordersTotalAzn: number;
  ordersTotalCount: number;

  cartTotalAzn: number;
  cartItemCount: number;

  pendingTotalAzn: number;
  pendingTotalCount: number;
}

export interface CustomerDashboardNewProduct {
  id: string;
  name: string;
  brandName?: string | null;
  imageUrl?: string | null;
  mainImageUrl?: string | null;
  price?: number | null;
}

export interface CustomerDashboardResponse {
  summary: CustomerDashboardSummary;
  newProducts: CustomerDashboardNewProduct[];
}