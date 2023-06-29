import { PaginateModel, PaginateResult } from 'mongoose'

import dbConnect from '../dbConnect'
import { Feed, FeedListModel } from '../scheme'

type Options = {
  page: number;
  limit: number;
}

type Item = {
  _id: number, userId: number, feed: Feed
}

export async function getPaginateFeedList(query: object, options: Options):
Promise<
PaginateResult<Item> | null> {
  try {
    await dbConnect()

    const paginationResult = await (FeedListModel as PaginateModel<unknown>).paginate(query, options)
    const { docs } = paginationResult

    return { ...paginationResult, docs: docs.map((item) => (item as any).feed) }
  } catch (error) {
    return null
  }
}
