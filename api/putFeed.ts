import { API } from '@/constants'
import { Feed } from '@/db/scheme/feedScheme'
import { Method, request } from '@/utils'

export function putFeed(data: Feed) {
  return request<boolean>({
    url: `${API.TRIP_DIARY}/feed-update`,
    method: Method.PUT,
    data,
  })
}
