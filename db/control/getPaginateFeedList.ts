import mongoose, { PaginateModel, PaginateResult } from 'mongoose'

import dbConnect from '../dbConnect'
import { Feed, FeedListModel } from '../scheme'

type Options = {
  page: number;
  limit: number;
}
export type FeedSchemeType = {
  _id: mongoose.Types.ObjectId
  userId: string,
  feed: Feed
}

export async function getPaginateFeedList(query: object, options: Options): Promise<PaginateResult<Feed> | null> {
  try {
    await dbConnect()

    const paginationResult = await (FeedListModel as PaginateModel<FeedSchemeType>).paginate(query, options)
    const { docs } = paginationResult

    return { ...paginationResult, docs: docs.map((item) => item.feed) }
  } catch (error) {
    return null
  }
}
