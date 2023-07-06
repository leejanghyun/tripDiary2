import { API } from '@/constants'
import { Story } from '@/db'
import { Method, request } from '@/utils'

export type GetMyStoriesResponse = {
  status: string,
  resultMsg: string
  content: Story[]
}

export function getMyStories() {
  return request<GetMyStoriesResponse>({
    url: `${API.TRIP_DIARY}/my-stories`,
    method: Method.GET,
  })
}
