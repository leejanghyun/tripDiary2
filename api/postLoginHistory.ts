import { API } from '@/constants'
import { Method, request } from '@/utils'

import { AUTH } from '../atoms/globalState'

export const enum SITE_TYPE {
  MANAGER = 'MANAGER',
  OPERATOR = 'OPERATOR',
}

export type PostLoginHistoryRequest = {
  userId: string,
  userName: string,
  ip: string,
  siteType: SITE_TYPE
}

export type PostLoginHistoryResponse = {
  status: string,
  resultMsg: string
  content: {
    userId: string,
    name: string,
    auth: AUTH
    approve: boolean
  }
}

export function postLoginHistory(data: PostLoginHistoryRequest) {
  return request<PostLoginHistoryResponse>({
    url: `${API.PROXY}/login/history`,
    method: Method.Post,
    data,
  })
}
