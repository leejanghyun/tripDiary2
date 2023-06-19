import { API } from '@/constants'
import { Method, request } from '@/utils'

import { STATUS_TYPE } from '../feature/advertisement/campaign/management/api/getAdvertiserCampaignList'

/** 단말기 OS */
export const enum DEVICE_OS_TYPE {
  ANDROID = 'Android',
  IOS = 'iOS',
}

export const enum CONJUNCTION_TYPE {
  AND = 'AND',
  OR = 'OR',
}

export const enum RANGE {
  GTE = 'GTE',
  LTE = 'LTE',
  IN = 'IN',
}

export const enum TOS_BATCH_TIME_TYPE {
  ONCE = 'ONCE',
  DAILY = 'DAILY',
  HOUR = 'HOUR',
}

export const enum KEYWORD_TYPE {
  ALL = 'ALL',
  EXACT = 'EXACT',
  INCLUDE = 'INCLUDE',
}

export const enum OS_TYPE {
  ALL = 'ALL',
  AOS = 'AOS',
  IOS = 'IOS',
}

export interface AdTargetArea {
  sidoCode?: string;
  gunguCode?: string;
  dongCode?: string;
}

export interface TargetArea {
  sidoCode?: string | null;
  gunguCode?: string | null;
  dongCode?: string | null;
}

export interface MaterialItem {
  materialId?: number | null;
  materialName?: string | null;
  materialTypeId?: number | null;
  materialType?: string | null;
  url?: string | null;
  createDate?: string | null;
}

export type AppVersionItem = {
  osType: DEVICE_OS_TYPE;
  appVersion: string;
  conjunctionType: CONJUNCTION_TYPE
  range: RANGE;
}

export interface AdDisplayDetailItem {
  id: number;
  campaignId: number;
  campaignName: string;
  agencyCompanyId: number;
  agencyCompanyName: string;
  advertiserCompanyId: number;
  advertiserCompanyName: string;
  statusLabel: string;
  inventoryId: number;
  inventoryName: string;
  name: string;
  status: STATUS_TYPE;
  isOn: boolean;
  startDate: string;
  endDate: string;
  exposureStartTime?: number | null;
  exposureEndTime?: number | null;
  isUseExposureCount?: boolean | null;
  exposureCount?: number | null;
  exposureDayCount?: number | null;
  exposureHourCount?: number | null;
  tosTargetId?: string | null;
  tosBatchHour?: string | null;
  tosBatchMinute?: string | null;
  tosStatusCode?: string | null;
  exposureRank: number;
  landingUrl: string;
  posTimeLimit?: number | null;
  keywords?: Array<string> | null;
  userKeys?: string[] | null;
  userKeyCount?: number | null;
  tosCount?: number | null;
  appVersions?: AppVersionItem[] | null
  isTosExclude?: boolean;
  createBy?: string | null;
  createDate?: string | null;
  modifyBy?: string | null;
  modifyDate?: string | null;
  tosBatchTimeType?: TOS_BATCH_TIME_TYPE | null;
  keywordType?: KEYWORD_TYPE | null;
  osType?: OS_TYPE | null;
  materials?: Array<MaterialItem> | null;
  areas?: Array<AdTargetArea> | null;
}

export type GetAdvertiserAdDisplayByIdResponse = {
  status: string,
  resultMsg: string
  content: AdDisplayDetailItem
}

export function getAdvertiserAdDisplayById(id: number) {
  return request<GetAdvertiserAdDisplayByIdResponse>({
    url: `${API.PROXY}/advertiser/adDisplay/${id}`,
    method: Method.Get,
  })
}
