import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { getFeeds } from '@/db/control/getFeeds'
import { Method, StatusType } from '@/utils'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req
  const { ids = [] } = query || {}
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

  if (!ids || !ids.length) {
    res.status(500).json({ status: StatusType.ERROR, resultMsg: '피드가 존재 하지 않습니다.' })
    return
  }

  try {
    const result = await getFeeds(ids as string[], email)

    if (!result) {
      res.status(500).json({ status: StatusType.ERROR, resultMsg: '피드 불러오기 실패' })
      return
    }

    res.json({ status: StatusType.SUCCESS, content: result })
  } catch (e) {
    res.status(500).json({ status: StatusType.ERROR, resultMsg: '피드 불러오기 실패' })
  }
}

export default handler
