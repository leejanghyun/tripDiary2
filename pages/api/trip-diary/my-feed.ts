import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { Method, StatusType } from '@/utils'

import { getFeed } from '../../../db/control/getFeed'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req
  const { id } = query || {}
  const sessions = await getSession({ req })
  const { user } = sessions || {}
  const { email = 'jangheon.lee012@gmail.com' } = user || {}

  if (method !== Method.GET) {
    res.status(500).json({ status: StatusType.ERROR, resultMsg: 'Invalid Method' })
    return
  }

  if (!email) {
    res.status(500).json({ status: StatusType.ERROR, resultMsg: 'unknown user' })
    return
  }

  try {
    const result = await getFeed(email as string, id as string)

    if (!result) {
      res.status(500).json({ status: StatusType.ERROR, resultMsg: 'Failed to fetch feedList' })
      return
    }

    res.json({ status: StatusType.SUCCESS, content: result })
  } catch (e) {
    res.status(500).json({ status: StatusType.ERROR, resultMsg: 'Failed to fetch feedList' })
  }
}

export default handler
