import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { Method, StatusType } from '@/utils'

import { addToFeedList } from '../../../db/control/addFeedList'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req
  const sessions = await getSession({ req })
  const { user } = sessions || {}
  const { email = 'jangheon.lee012@gmail.com' } = user || { email: 'jangheon.lee012@gmail.com' }

  if (method !== Method.POST) {
    res.status(500).json({ status: StatusType.ERROR, resultMsg: 'Invalid Method' })
    return
  }

  if (!email) {
    res.status(500).json({ status: StatusType.ERROR, resultMsg: 'unknown user' })
    return
  }

  try {
    await addToFeedList(email, body)

    res.json({ status: StatusType.SUCCESS, resultMsg: '성공적으로 등록' })
  } catch (e) {
    res.status(500).json({ status: StatusType.ERROR, resultMsg: '등록 실패' })
  }
}

export default handler
