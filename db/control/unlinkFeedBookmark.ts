import dbConnect from '../dbConnect'
import { FeedListModel } from '../scheme'
import { FeedSchemeType } from './getPaginateFeedList'

export async function unlinkFeedBookmark(_id: string, userId: string): Promise<boolean> {
  try {
    await dbConnect()

    const userFeeds = await FeedListModel.find()

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

    const { bookmarks } = targetFeed.feed

    if (bookmarks) {
      const bookmarkIndex = targetFeed.feed.bookmarks.indexOf(userId)

      targetFeed.feed.bookmarks.splice(bookmarkIndex, 1)
    }
    await new FeedListModel(targetFeed).save()

    return true
  } catch (error) {
    return false
  }
}
