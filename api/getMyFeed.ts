import { API } from '@/constants'
import { Method, request } from '@/utils'

import { Feed } from '../db/scheme/feedScheme'

export type GetMyFeedResponse = {
  status: string,
  resultMsg: string
  content: Feed
}

export type GetMyFeedRequest = {
  id: string
}

export function getMyFeed(id: string) {
  return request<GetMyFeedResponse>({
    url: `${API.TRIP_DIARY}/my-feed`,
    method: Method.GET,
    params: { id },
  })
}
