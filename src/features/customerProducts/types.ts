export type CustomerProductBrand = {
  id: string;
  name: string;
  slug?: string | null;
};

export type CustomerCategory = {
  id: string;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  sortOrder?: number | null;
  status?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type CustomerProductImage = {
  id: string;
  productId?: string;
  imageUrl: string;
  isMain: boolean;
  sortOrder: number;
};

export type CustomerProduct = {
  id: string;
  categoryId: string;

  brandIds?: string[];
  oemCodes?: string[];
  brands?: CustomerProductBrand[];

  name: string;
  description?: string | null;
  code?: string | null;
  partNumber?: string | null;

  retailPrice: number;

  // Köhnə endpoint-lər üçün optional saxlayırıq.
  // Customer paged endpoint bunları qaytarmamalıdır.
  wholesalePrice?: number;
  purchasePriceCol?: number;
  purcashePriceCol?: number;

  stock: number;
  status?: string | null;

  isNew?: boolean | string | null;

  mainImageUrl?: string | null;

  createdAt: string;
  updatedAt?: string | null;

  images?: CustomerProductImage[];

  category?: CustomerCategory | null;
  categoryName?: string | null;
};

export type GetCustomerProductsPagedResponse = {
  items: CustomerProduct[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type GetCustomerProductsPagedParams = {
  page?: number;
  pageSize?: number;
  categoryId?: string | null;
  brandId?: string | null;
  search?: string | null;
};