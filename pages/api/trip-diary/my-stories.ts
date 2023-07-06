import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { getUserStoryList } from '@/db/control/getUserStoryList'
import { Method, StatusType } from '@/utils'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const sessions = await getSession({ req })
  const { user } = sessions || {}
  const { email = 'jangheon.lee012@gmail.com' } = user || { email: 'jangheon.lee012@gmail.com' }

  if (method !== Method.GET) {
    res.status(500).json({ status: StatusType.ERROR, resultMsg: 'Invalid Method' })
    return
  }

  if (!email) {
    res.status(500).json({ status: StatusType.ERROR, resultMsg: 'unknown user' })
    return
  }

  try {
    const storiesResult = await getUserStoryList(email)

    if (!storiesResult) {
      res.status(500).json({ status: StatusType.ERROR, resultMsg: '스토리 리스트 불러오기 실패' })
      return
    }

    res.json({ status: StatusType.SUCCESS, content: storiesResult })
  } catch (e) {
    res.status(500).json({ status: StatusType.ERROR, resultMsg: '스토리 리스트 불러오기 실패' })
  }
}

export default handler
