import { API } from '@/constants'
import { Feed } from '@/db/scheme/feedScheme'
import { Method, request } from '@/utils'

export function postFeed(data: Omit<Feed, '_id'>) {
  return request<boolean>({
    url: `${API.TRIP_DIARY}/feed-create`,
    method: Method.POST,
    data,
  })
}
