import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { deleteFeed } from '@/db/control/deleteFeed'
import { Method, StatusType } from '@/utils'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req
  const sessions = await getSession({ req })
  const { user } = sessions || {}
  const { email = 'jangheon.lee012@gmail.com' } = user || { email: 'jangheon.lee012@gmail.com' }

  if (method !== Method.DELETE) {
    res.status(500).json({ status: StatusType.ERROR, resultMsg: 'Invalid Method' })
    return
  }

  if (!email) {
    res.status(500).json({ status: StatusType.ERROR, resultMsg: 'unknown user' })
    return
  }

  const { id } = query || {}

  if (!id) {
    res.json({ status: StatusType.SUCCESS, resultMsg: 'ID가 존재하지 않습니다.' })
    return
  }

  try {
    await deleteFeed(email, id as string)

    res.json({ status: StatusType.SUCCESS, resultMsg: '성공적으로 삭제' })
  } catch (e) {
    res.status(500).json({ status: StatusType.ERROR, resultMsg: '삭제 실패' })
  }
}

export default handler
