import dbConnect from '../dbConnect'
import { FeedListModel } from '../scheme'
import { FeedSchemeType } from './getPaginateFeedList'

export async function deleteFeed(userId: string, _id: string): Promise<boolean> {
  try {
    await dbConnect()

    const userFeeds = await FeedListModel.find({ userId })

    if (!userFeeds || Boolean(!userFeeds?.length)) {
      return false
    }

    const { length } = userFeeds
    let targetFeed: FeedSchemeType | null = null

    for (let i = 0; i < length; i += 1) {
      if (userFeeds[i].feed._id.toHexString() === _id) {
        targetFeed = userFeeds[i]
        break
      }
    }

    if (!targetFeed) {
      return false
    }

    await FeedListModel.deleteOne({ _id: targetFeed._id })

    return true
  } catch (error) {
    return false
  }
}
