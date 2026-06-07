import { api } from "../../api/api";
import type {
  AddCartItemRequest,
  CartItem,
  UpdateCartItemQuantityRequest,
} from "./types";

const baseUrl = "/Cart";

export async function getCartItems(): Promise<CartItem[]> {
  const response = await api.get<CartItem[]>(baseUrl);
  return response.data ?? [];
}

export async function addCartItem(data: AddCartItemRequest): Promise<boolean> {
  const response = await api.post<boolean>(`${baseUrl}/items`, data);
  return response.data;
}

export async function updateCartItemQuantity(
  id: string,
  data: UpdateCartItemQuantityRequest
): Promise<boolean> {
  const response = await api.put<boolean>(`${baseUrl}/items/${id}`, data);
  return response.data;
}

export async function deleteCartItem(id: string): Promise<boolean> {
  const response = await api.delete<boolean>(`${baseUrl}/items/${id}`);
  return response.data;
}

export async function clearCart(): Promise<boolean> {
  const response = await api.delete<boolean>(`${baseUrl}/clear`);
  return response.data;
}