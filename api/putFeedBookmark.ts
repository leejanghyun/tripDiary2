import { API } from '@/constants'
import { Method, request } from '@/utils'

export type AddFeedBookmarkRequest = {
  userId: string
  feedId: string
  isLink?: boolean
}

export function putFeedBookmark(data: AddFeedBookmarkRequest) {
  const { isLink, ...rest } = data

  return request<boolean>({
    url: `${API.TRIP_DIARY}/${isLink ? 'link-feed-bookmark' : 'unlink-feed-bookmark'}`,
    method: Method.PUT,
    data: rest,
  })
}
