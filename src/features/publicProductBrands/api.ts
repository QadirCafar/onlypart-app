import { api } from "../../api/api";
import type { PublicProductBrand } from "./types";

const baseUrl = "/PublicProductBrands";

export async function getPublicProductBrands(): Promise<PublicProductBrand[]> {
  const response = await api.get<PublicProductBrand[]>(baseUrl);

  return response.data;
}