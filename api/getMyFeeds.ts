import { API } from '@/constants'
import { Method, request } from '@/utils'

import { Feed } from '../db/scheme/feedScheme'

export type GetMyFeedsResponse = {
  status: string,
  resultMsg: string
  content: Feed[]
}

export function getMyFeeds() {
  return request<GetMyFeedsResponse>({
    url: `${API.TRIP_DIARY}/my-feeds`,
    method: Method.GET,
  })
}
