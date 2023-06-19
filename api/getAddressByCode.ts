import { Method, request } from '@/utils'

import { API } from '../constants'

export interface GetAddressByCodeRequest {
  sidoCode?: string,
  gunguCode?: string,
  dongCode?: string,
  count?: number
}

export type AreaCodeItem = {
  areaDepth: string
  districtName: string
  largeCd: string
  middleCd: string
  smallCd: string
}

export type GetAddressByCodeResponse = any

export function getAddressByCode(data: GetAddressByCodeRequest) {
  const {
    sidoCode, gunguCode, dongCode, count = 8000,
  } = data
  const params = {
    largeCd: sidoCode,
    middleCd: gunguCode,
    smallCd: dongCode,
    version: 1,
    appKey: 'TMAP_AD_ADMIN',
    largeCdFlag: 'Y',
    middleCdFlag: 'Y',
    count,
    page: 1,
    smallCdFlag: 'Y',
  }
  return request<GetAddressByCodeResponse>({
    url: `${API.EXTERNAL.TOPTMAP}/tmapv20/poi/areascode`,
    method: Method.Get,
    params,
  })
}
