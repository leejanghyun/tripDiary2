import { API } from '@/constants'
import { Method, request } from '@/utils'

export const enum CATEGORY {
  DEFAULT = 'DEFAULT',
  SPLASH = 'SPLASH',
  OUTRO = 'OUTRO',
}

export interface InventoryItem {
  id: number;
  name?: string | null;
  inventoryCode: string;
  category: CATEGORY;
  isUseKeyword: boolean;
  isUse: boolean;
  createdDate: string;
}

export type GetAdvertiserInventoryListResponse = {
  status: string,
  resultMsg: string
  content: InventoryItem[]
}

export function getAdvertiserInventory() {
  return request<GetAdvertiserInventoryListResponse>({
    url: `${API.PROXY}/advertiser/inventory`,
    method: Method.Get,
  })
}
