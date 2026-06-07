import { api } from "../../api/api";
import type {
    ChangeCustomerPasswordRequest,
    CustomerProfile,
    UpdateCustomerProfileRequest,
} from "./types";

const baseUrl = "/CustomerProfile";

export async function getCustomerProfile(): Promise<CustomerProfile> {
  const response = await api.get<CustomerProfile>(`${baseUrl}/me`);
  return response.data;
}

export async function updateCustomerProfile(
  data: UpdateCustomerProfileRequest
): Promise<void> {
  await api.put(`${baseUrl}/me`, data);
}

export async function changeCustomerPassword(
  data: ChangeCustomerPasswordRequest
): Promise<void> {
  await api.put(`${baseUrl}/change-password`, data);
}

export async function deleteCustomerAccount(): Promise<void> {
  await api.delete(`${baseUrl}/me`);
}