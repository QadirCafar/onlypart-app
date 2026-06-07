import { api } from "../../api/api";
import type { CustomerDashboardResponse } from "./types";

const baseUrl = "/CustomerDashboard";

export async function getCustomerDashboard(): Promise<CustomerDashboardResponse> {
  const response = await api.get<CustomerDashboardResponse>(baseUrl);

  return response.data;
}