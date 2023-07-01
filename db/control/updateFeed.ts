import { MAX_HASH_TAG_LEN } from '@/feature/feed/components/HashTag'

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

    let adjusthashTags: string[] = []
    const { hashTags } = updatedData
    const isInvalidHashTags = Array.isArray(hashTags) && hashTags?.length > MAX_HASH_TAG_LEN

    if (isInvalidHashTags) {
      adjusthashTags = hashTags.slice(0, MAX_HASH_TAG_LEN)
    }

    targetFeed.feed = {
      ...updatedData,
      createdBy: userId,
      hashTags: isInvalidHashTags ? adjusthashTags : updatedData.hashTags || null,
    }

    await new FeedListModel(targetFeed).save()

    return true
  } catch (error) {
    return false
  }
}
