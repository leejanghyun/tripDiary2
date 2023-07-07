import { API } from '@/constants'
import { Story } from '@/db'
import { Method, request } from '@/utils'

export type GetStoryResponse = {
  status: string,
  resultMsg: string
  content: Story
}

export type GetStoryRequest = {
  id: string
}

export function getStory(id: string) {
  return request<GetStoryResponse>({
    url: `${API.TRIP_DIARY}/story`,
    method: Method.GET,
    params: { id },
  })
}
