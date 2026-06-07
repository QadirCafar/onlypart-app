export interface CartItem {
  id: string;
  productId: string;

  productName: string;
  code?: string | null;
  oemCodes?: string[];
  partNumber?: string | null;

  retailPrice: number;
  quantity: number;
  stock: number;
  lineTotal: number;

  createdAt: string;
  updatedAt?: string | null;
}

export interface AddCartItemRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemQuantityRequest {
  quantity: number;
}