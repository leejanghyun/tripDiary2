import { API } from '@/constants'
import { Method, request } from '@/utils'

export function getImage(imageUrl: string) {
  if (!imageUrl) {
    return Promise.resolve(null)
  }

  return request<string>({
    url: `${API.IMAGE}/get-image`,
    method: Method.GET,
    params: { imageUrl },
    skipAlert: true,
  })
}
