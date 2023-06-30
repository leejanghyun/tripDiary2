import { API } from '@/constants'
import { Method, request } from '@/utils'

export function deleteFeed(id: string) {
  return request<boolean>({
    url: `${API.TRIP_DIARY}/feed-delete/${id}`,
    method: Method.DELETE,
  })
}
