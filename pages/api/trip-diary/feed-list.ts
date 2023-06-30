import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { getPaginateFeedList } from '@/db/control/getPaginateFeedList'
import { FEEDLIST_SORT_TYPE } from '@/feature/feedList/constants/form'
import { Method, StatusType } from '@/utils'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req
  const sessions = await getSession({ req })
  const { user } = sessions || {}
  const { email = 'jangheon.lee012@gmail.com' } = user || { email: 'jangheon.lee012@gmail.com' }

  if (method !== Method.GET) {
    res.status(500).json({ status: StatusType.ERROR, resultMsg: 'Invalid Method' })
    return
  }

  const { sort, page = 1, limit = 10 } = query || {}

  try {
    const options = {
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
      sort: sort as FEEDLIST_SORT_TYPE,
    }
    const query = { userId: email }
    const feedsResult = await getPaginateFeedList(query, options)

    if (!feedsResult) {
      res.status(500).json({ status: StatusType.ERROR, resultMsg: 'Failed to fetch feedList' })
      return
    }

    res.json({ status: StatusType.SUCCESS, content: feedsResult })
  } catch (e) {
    res.status(500).json({ status: StatusType.ERROR, resultMsg: 'Failed to fetch feedList' })
  }
}

export default handler
