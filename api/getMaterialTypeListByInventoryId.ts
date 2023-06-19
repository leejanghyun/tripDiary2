import { API } from '../constants'
import { ListResponseType } from '../types/list'
import { Method, request } from '../utils'

export const enum MATERIAL_TYPE {
  Text = 'TEXT',
  Image = 'IMAGE',
  Video = 'VIDEO',
  Thumbnail = 'THUMBNAIL',
  Logo = 'LOGO',
}

export interface MaterialTypeItem {
  id: number | null;
  name: string | null;
  type?: MATERIAL_TYPE | null;
  width?: number | null;
  height?: number | null;
  size?: number | null;
  textValue?: string | null;
}

export type GetMaterialTypeListByInventoryIdResponse = {
  status: string,
  resultMsg: string
  content: ListResponseType<MaterialTypeItem>
}

export function getMaterialTypeListByInventoryId(id: number) {
  return request<GetMaterialTypeListByInventoryIdResponse>({
    url: `${API.PROXY}/advertiser/materialType/getListByInventoryId`,
    method: Method.Get,
    params: {
      inventoryId: id,
    },
  })
}
