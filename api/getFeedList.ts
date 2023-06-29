import { PaginateResult } from 'mongoose'

import { API } from '@/constants'
import { Method, request } from '@/utils'

import { Feed } from '../db/scheme/feedScheme'

export type GetFeedListResponse = {
  status: string,
  resultMsg: string
  content: PaginateResult<Feed>
}

export type GetFeedListRequest = {
  page: number,
  limit: number,
}

export function getFeedList(params?: GetFeedListRequest) {
  return request<GetFeedListResponse>({
    url: `${API.TRIP_DIARY}/feed-list`,
    method: Method.GET,
    params,
  })
}
