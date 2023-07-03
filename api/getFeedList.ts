import { PaginateResult } from 'mongoose'

import { API } from '@/constants'
import { FEEDLIST_SORT_TYPE } from '@/feature/feedList/constants/form'
import { Method, request } from '@/utils'

import { Feed } from '../db/scheme/feedScheme'

export type GetFeedListResponse = {
  status: string,
  resultMsg: string
  content: PaginateResult<Feed>
}

export type GetFeedListRequest = {
  page?: number,
  limit?: number,
  sort?: FEEDLIST_SORT_TYPE | null
  filter?: string | null
  searchText?: string | null
}

export function getFeedList(params?: GetFeedListRequest) {
  return request<GetFeedListResponse>({
    url: `${API.TRIP_DIARY}/feed-list`,
    method: Method.GET,
    params,
  })
}
