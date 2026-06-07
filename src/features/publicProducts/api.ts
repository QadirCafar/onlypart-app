import { api } from "../../api/api";
import type {
    GetPublicProductsParams,
    GetPublicProductsResponse,
} from "./types";

const baseUrl = "/PublicProducts";

export async function getPublicProducts(
  params: GetPublicProductsParams
): Promise<GetPublicProductsResponse> {
  const response = await api.get<GetPublicProductsResponse>(baseUrl, {
    params: {
      page: params.page ?? 1,
      pageSize: params.pageSize ?? 10,
      categoryId: params.categoryId || undefined,
      brandId: params.brandId || undefined,
      search: params.search?.trim() || undefined,
    },
  });

  return response.data;
}