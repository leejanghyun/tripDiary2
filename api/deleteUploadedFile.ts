import { API } from '@/constants'
import { Method } from '@/utils'

export async function deleteUploadedFile(string: string) {
  try {
    const response = await fetch(`${API.EXTERNAL.IMAGE_UPLOAD}/delete-image`, {
      method: Method.POST,
      body: string,
    })
    const res = await response.json()
    const { content } = res || {}

    return content
  } catch (e) {
    return null
  }
}
