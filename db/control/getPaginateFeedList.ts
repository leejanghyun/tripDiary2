import mongoose, { PaginateModel, PaginateResult } from 'mongoose'

import { FEEDLIST_FILTER_TYPE, FEEDLIST_SORT_TYPE } from '@/feature/feedList/constants/form'

import dbConnect from '../dbConnect'
import { Feed, FeedListModel } from '../scheme'

type Options = {
  page: number;
  limit: number;
  sort?: FEEDLIST_SORT_TYPE
  filter?: FEEDLIST_FILTER_TYPE[]
}
export type FeedSchemeType = {
  _id: mongoose.Types.ObjectId
  userId: string,
  feed: Feed
}

const getSortType = (sortType?: FEEDLIST_SORT_TYPE | null) => {
  if (sortType === FEEDLIST_SORT_TYPE.CREATED_AT_DESC) {
    return { sort: { createdAt: -1 } }
  }

  if (sortType === FEEDLIST_SORT_TYPE.CREATED_AT_ASC) {
    return { sort: { createdAt: 1 } }
  }

  return { sort: { createdAt: 1 } }
}

const getFilter = (userId: string, filter?: FEEDLIST_FILTER_TYPE[] | null) => {
  const res = {
    userId,
  }

  if (filter?.includes(FEEDLIST_FILTER_TYPE.MY)) {
    return res
  }

  return undefined
}

export async function getPaginateFeedList(userId: string, options: Options): Promise<PaginateResult<Feed> | null> {
  try {
    await dbConnect()

    const {
      sort, limit, page, filter,
    } = options || {}

    const optionTypes = {
      page,
      limit,
      ...(sort && getSortType(sort as FEEDLIST_SORT_TYPE)),
    }

    const paginationResult = await (FeedListModel as PaginateModel<FeedSchemeType>)
      .paginate(getFilter(userId, filter), { ...optionTypes })

    const { docs } = paginationResult

    return { ...paginationResult, docs: docs.map((item) => item.feed) }
  } catch (error) {
    return null
  }
}
