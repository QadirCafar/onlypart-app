export interface PublicProductBrandInfo {
  id: string;
  name: string;
  slug?: string | null;
}

export interface PublicProduct {
  id: string;
  categoryId: string;

  brandIds: string[];
  brands: PublicProductBrandInfo[];

  oemCodes: string[];

  code?: string | null;
  name: string;
  description?: string | null;
  partNumber?: string | null;

  retailPrice: number;

  stock: number;
  status?: string | null;
  isNew?: boolean | string | null;

  mainImageUrl?: string | null;

  createdAt: string;
  updatedAt?: string | null;
}

export interface GetPublicProductsResponse {
  items: PublicProduct[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface GetPublicProductsParams {
  page?: number;
  pageSize?: number;
  categoryId?: string | null;
  brandId?: string | null;
  search?: string | null;
}