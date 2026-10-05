export interface ApiResponse<T> {
  success: boolean;
  statuscode: number;
  message: string;
  data: T;
  meta: Meta;
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}