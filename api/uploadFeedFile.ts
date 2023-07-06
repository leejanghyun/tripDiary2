import { API } from '@/constants'
import { Method } from '@/utils'

export async function uploadFeedFile(body: FormData) {
  try {
    const response = await fetch(`${API.EXTERNAL.IMAGE_UPLOAD}/image`, {
      method: Method.POST,
      body,
    })
    const res = await response.json()
    const { content } = res || {}

    return content
  } catch (e) {
    return null
  }
}
