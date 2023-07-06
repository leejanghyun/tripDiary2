import { API } from '@/constants'
import { CommonResponse, Method, request } from '@/utils'

export async function uploadFeedFile(body: FormData) {
  try {
    const response = await request<CommonResponse<string>>({
      url: `${API.EXTERNAL.IMAGE_UPLOAD}/image`,
      method: Method.POST,
      data: body,
    })

    const { content } = response || {}

    return content
  } catch (e) {
    return null
  }
}
