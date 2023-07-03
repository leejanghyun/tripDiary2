import { API } from '@/constants'
import { Method, request } from '@/utils'

import { Feed } from '../db/scheme/feedScheme'

export type GetFeedResponse = {
  status: string,
  resultMsg: string
  content: Feed
}

export type GetFeedRequest = {
  id: string
}

export function getFeed(id: string) {
  return request<GetFeedResponse>({
    url: `${API.TRIP_DIARY}/feed`,
    method: Method.GET,
    params: { id },
  })
}
