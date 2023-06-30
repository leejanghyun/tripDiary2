import dbConnect from '../dbConnect'
import { Feed, FeedListModel } from '../scheme'
import { FeedSchemeType } from './getPaginateFeedList'

export async function updateFeed(userId: string, updatedData: Feed): Promise<boolean> {
  try {
    await dbConnect()

    const userFeeds = await FeedListModel.find({ userId })

    if (!userFeeds || Boolean(!userFeeds?.length)) {
      return false
    }

    const { length } = userFeeds
    const { _id } = updatedData || {}
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

    targetFeed.feed = updatedData
    await new FeedListModel(targetFeed).save()

    return true
  } catch (error) {
    return false
  }
}
