import { API } from '@/constants'
import { Story } from '@/db'
import { Method, request } from '@/utils'

export function putStory(data: Story) {
  return request<boolean>({
    url: `${API.TRIP_DIARY}/story-update`,
    method: Method.PUT,
    data,
  })
}
