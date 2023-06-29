import { API } from '@/constants'
import { Method, request } from '@/utils'

import { Feed } from '../db/scheme/feedScheme'

export function postFeed(data: Omit<Feed, '_id'>) {
  return request<boolean>({
    url: `${API.TRIP_DIARY}/feed-create`,
    method: Method.POST,
    data,
  })
}
