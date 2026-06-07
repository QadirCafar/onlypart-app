import { api } from "../../api/api";
import type {
  CustomerProduct,
  CustomerProductImage,
  GetCustomerProductsPagedParams,
  GetCustomerProductsPagedResponse,
} from "./types";

const productsUrl = "/Products";
const customerProductsUrl = "/CustomerProducts";
const productImagesUrl = "/products";

function sortImages(images: CustomerProductImage[]) {
  return [...images].sort((a, b) => {
    if (a.isMain && !b.isMain) return -1;
    if (!a.isMain && b.isMain) return 1;

    return a.sortOrder - b.sortOrder;
  });
}

async function loadProductImages(
  productId: string
): Promise<CustomerProductImage[]> {
  try {
    const response = await api.get<CustomerProductImage[]>(
      `${productImagesUrl}/${productId}/images`
    );

    return sortImages(response.data ?? []);
  } catch {
    return [];
  }
}

// Köhnə funksiyanı saxlayırıq ki, başqa ekranlar sınmasın.
// Amma CustomerProductsScreen artıq bunu istifadə etməyəcək.
export async function getCustomerProducts(): Promise<CustomerProduct[]> {
  const response = await api.get<CustomerProduct[]>(productsUrl);

  const products = response.data ?? [];

  const productsWithImages = await Promise.all(
    products.map(async (product) => {
      const images = await loadProductImages(product.id);

      return {
        ...product,
        images,
      };
    })
  );

  return productsWithImages;
}

export async function getCustomerProductsPaged(
  params: GetCustomerProductsPagedParams
): Promise<GetCustomerProductsPagedResponse> {
  const response = await api.get<GetCustomerProductsPagedResponse>(
    `${customerProductsUrl}/paged`,
    {
      params: {
        page: params.page ?? 1,
        pageSize: params.pageSize ?? 10,
        categoryId: params.categoryId || undefined,
        brandId: params.brandId || undefined,
        search: params.search?.trim() || undefined,
      },
    }
  );

  return response.data;
}

export async function getCustomerProductById(
  id: string
): Promise<CustomerProduct> {
  const response = await api.get<CustomerProduct>(`${productsUrl}/${id}`);

  const product = response.data;
  const images = await loadProductImages(id);

  return {
    ...product,
    images,
  };
}