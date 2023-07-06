import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { getFeed } from '@/db/control/getFeed'
import { Method, StatusType } from '@/utils'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req
  const { id } = query || {}
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
    const result = await getFeed(id as string, email as string)

    if (!result) {
      res.status(500).json({ status: StatusType.ERROR, resultMsg: '내 피드 리스트 불러오기 실패' })
      return
    }

    res.json({ status: StatusType.SUCCESS, content: result })
  } catch (e) {
    res.status(500).json({ status: StatusType.ERROR, resultMsg: '내 피드 리스트 불러오기 실패' })
  }
}

export default handler
