import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { Method, StatusType } from '@/utils'
import { deleteFile } from '@/utils/aws/aws'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req

  if (method !== Method.POST) {
    return res.status(405).send('Method error')
  }

  const sessions = await getSession({ req })
  const { user } = sessions || {}
  const { email = 'jangheon.lee012@gmail.com' } = user || { email: 'jangheon.lee012@gmail.com' }

  if (!email) {
    return res.status(500).json({ status: StatusType.ERROR, resultMsg: 'unknown User' })
  }

  const imageUrl = body // 삭제할 이미지의 URL

  const urlParts = imageUrl.split('/')
  const fileKey = decodeURIComponent(urlParts[urlParts.length - 1])

  try {
    await deleteFile(fileKey)

    return res.json({ status: StatusType.SUCCESS, resultMsg: 'S3 삭제 성공', content: imageUrl })
  } catch (error) {
    return res.status(500).json({ status: StatusType.ERROR, resultMsg: 'S3 삭제 실패' })
  }
}

export default handler
