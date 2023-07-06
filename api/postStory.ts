import { API } from '@/constants'
import { Method, request } from '@/utils'

export function postStory(title: string) {
  return request<boolean>({
    url: `${API.TRIP_DIARY}/story-create`,
    method: Method.POST,
    data: { title },
  })
}
