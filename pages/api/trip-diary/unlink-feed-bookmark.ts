import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { AddFeedBookmarkRequest } from '@/api/putFeedBookmark'
import { unlinkFeedBookmark } from '@/db/control/unlinkFeedBookmark'
import { Method, StatusType } from '@/utils'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req
  const sessions = await getSession({ req })
  const { user } = sessions || {}
  const { email = 'jangheon.lee012@gmail.com' } = user || { email: 'jangheon.lee012@gmail.com' }

  if (method !== Method.PUT) {
    res.status(500).json({ status: StatusType.ERROR, resultMsg: 'Invalid Method' })
    return
  }

  if (!email) {
    res.status(500).json({ status: StatusType.ERROR, resultMsg: 'unknown user' })
    return
  }

  try {
    const { userId, feedId } = body as Omit<AddFeedBookmarkRequest, 'isLink'>

    const isSuccess = await unlinkFeedBookmark(feedId, userId)

    if (!isSuccess) {
      res.status(500).json({ status: StatusType.ERROR, resultMsg: '북마크 해제 실패' })
      return
    }

    res.json({ status: StatusType.SUCCESS, resultMsg: '성공적으로 북마크' })
  } catch (e) {
    res.status(500).json({ status: StatusType.ERROR, resultMsg: '북마크 해제 실패' })
  }
}

export default handler
