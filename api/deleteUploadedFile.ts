import { API } from '@/constants'
import { CommonResponse, Method, request } from '@/utils'

export async function deleteUploadedFile(fileName: string) {
  try {
    const response = await request<CommonResponse<string>>({
      url: `${API.EXTERNAL.IMAGE_UPLOAD}/delete-image`,
      method: Method.POST,
      data: {
        fileName,
      },
    })
    const { content } = response || {}

    return content
  } catch (e) {
    return null
  }
}
