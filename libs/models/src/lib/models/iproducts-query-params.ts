export interface IProductsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string[];
  sort?: string;
  minPrice?: number; // price[gte]
  maxPrice?: number; // price[lte]
}
