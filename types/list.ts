export interface ListResponseType<T = any> {
  list: T[]
  pageNo: number,
  totalPages?: number | null,
  totalCount: number
}
