import { API } from '@/constants'
import { Method, request } from '@/utils'

import { Feed } from '../db/scheme/feedScheme'

export type GetFeedsResponse = {
  status: string,
  resultMsg: string
  content: Feed[]
}

export type GetFeedsRequest = {
  ids: string[]
}

export function getFeeds(ids: string[]) {
  return request<GetFeedsResponse>({
    url: `${API.TRIP_DIARY}/feeds`,
    method: Method.GET,
    params: { ids: JSON.stringify(ids) },
  })
}
