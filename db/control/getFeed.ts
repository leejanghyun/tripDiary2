import dbConnect from '../dbConnect'
import { FeedListModel } from '../scheme'
import { FeedSchemeType } from './getPaginateFeedList'

export async function getFeed(id: string, userId?: string): Promise<FeedSchemeType | null> {
  try {
    await dbConnect()

    if (!userId) {
      const userFeeds = await FeedListModel.find()

      if (!userFeeds) {
        return null
      }

      const { length } = userFeeds

      for (let i = 0; i < length; i += 1) {
        if (userFeeds[i].feed?._id.toHexString() === id) {
          return userFeeds[i].feed
        }
      }

      return null
    }

    const userFeeds = await FeedListModel.find({ userId })

    if (!userFeeds) {
      return null
    }

    const { length } = userFeeds

    for (let i = 0; i < length; i += 1) {
      if (userFeeds[i].feed?._id.toHexString() === id) {
        return userFeeds[i].feed
      }
    }

    return null
  } catch (error) {
    return null
  }
}
