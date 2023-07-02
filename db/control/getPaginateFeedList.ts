import mongoose, { PaginateModel, PaginateResult } from 'mongoose'

import { FEED_KIND } from '@/feature/feed/constants/form'
import { FEEDLIST_FILTER_TYPE, FEEDLIST_SORT_TYPE } from '@/feature/feedList/constants/form'

import dbConnect from '../dbConnect'
import { Feed, FeedListModel } from '../scheme'

type Options = {
  page: number;
  limit: number;
  sort?: FEEDLIST_SORT_TYPE
  searchText?: string
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

const getFilter = (userId: string, filter?: (FEEDLIST_FILTER_TYPE | FEED_KIND)[] | null) => {
  const item = []

  if (filter?.includes(FEEDLIST_FILTER_TYPE.MY)) {
    item.push({ 'feed.createdBy': { $regex: userId } })
  }

  const feedKindItem = []

  if (filter?.includes(FEED_KIND.CAFE)) {
    feedKindItem.push(FEED_KIND.CAFE)
  }

  if (filter?.includes(FEED_KIND.LODGMENT)) {
    feedKindItem.push(FEED_KIND.LODGMENT)
  }

  if (filter?.includes(FEED_KIND.RESTAURANT)) {
    feedKindItem.push(FEED_KIND.RESTAURANT)
  }

  if (filter?.includes(FEED_KIND.SIGHTS)) {
    feedKindItem.push(FEED_KIND.SIGHTS)
  }

  if (feedKindItem?.length) {
    item.push({ 'feed.feedKind': { $in: feedKindItem } })
  }

  if (!item?.length) {
    return undefined
  }

  return {
    $or: item,
  }
}

const getSearchKeyword = (keyword: string) => {
  if (!keyword) {
    return {}
  }

  const res = {
    $or: [
      { 'feed.title': { $regex: keyword, $options: 'i' } }, // title 필드에서 검색
      { 'feed.content': { $regex: keyword, $options: 'i' } }, // content 필드에서 검색
      { 'feed.hashTags': { $in: [keyword] } }, // hashTags 배열에서 검색
    ],
  }

  return res
}

export async function getPaginateFeedList(userId: string, options: Options): Promise<PaginateResult<Feed> | null> {
  try {
    await dbConnect()

    const {
      sort, limit, page, filter, searchText,
    } = options || {}

    const optionTypes = {
      page,
      limit,
      ...(sort && getSortType(sort as FEEDLIST_SORT_TYPE)),
    }

    const paginationResult = await (FeedListModel as PaginateModel<FeedSchemeType>)
      .paginate({
        ...getFilter(userId, filter),
        ...getSearchKeyword(searchText || ''),
      }, { ...optionTypes })

    const { docs } = paginationResult

    return { ...paginationResult, docs: docs.map((item) => item.feed) }
  } catch (error) {
    return null
  }
}
