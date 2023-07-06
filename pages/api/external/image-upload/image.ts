import multer from 'multer'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { uuid } from 'uuidv4'

import { runMiddleware } from '@/middleware/runMiddleware'
import { Method, StatusType } from '@/utils'
import { awsS3Bucket, uploadFile } from '@/utils/aws/aws'

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  if (method !== Method.POST) {
    return res.status(405).send('Method error')
  }

  const sessions = await getSession({ req })
  const { user } = sessions || {}
  const { email = 'jangheon.lee012@gmail.com' } = user || { email: 'jangheon.lee012@gmail.com' }

  if (!email) {
    return res.status(500).json({ status: StatusType.ERROR, resultMsg: 'unknown User' })
  }

  const storage = multer.memoryStorage()
  const upload = multer({ storage })
  try {
    await runMiddleware(req, res, upload.single('image'))

    const fileBuffer = (req as any).file.buffer
    const fileName = req.body.name + uuid() + email
    const fileType = (req as any).mimetype

    await uploadFile(fileBuffer, fileName, fileType)

    const imageUrl = `https://${awsS3Bucket}.s3.amazonaws.com/${fileName}`

    return res.json({ status: StatusType.SUCCESS, resultMsg: 'S3 url업로드', content: imageUrl })
  } catch (error) {
    return res.status(500).json({ status: StatusType.ERROR, resultMsg: 'S3 url업로드 실패' })
  }
}

export default handler
