import { API } from '@/constants'
import { Method, request } from '@/utils'

export function deleteStory(id: string) {
  return request<boolean>({
    url: `${API.TRIP_DIARY}/story-delete/${id}`,
    method: Method.DELETE,
  })
}
