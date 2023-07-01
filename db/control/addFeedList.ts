import { MAX_HASH_TAG_LEN } from '@/feature/feed/components/HashTag'

import dbConnect from '../dbConnect'
import { Feed, FeedListModel } from '../scheme'

export async function addToFeedList(userId: string, item: Feed): Promise<boolean> {
  try {
    await dbConnect()

    const { hashTags } = item
    let adjusthashTags: string[] = []
    const isInvalidHashTags = Array.isArray(hashTags) && hashTags?.length > MAX_HASH_TAG_LEN

    if (isInvalidHashTags) {
      adjusthashTags = hashTags.slice(0, MAX_HASH_TAG_LEN)
    }

    const newItem = new FeedListModel({
      userId,
      feed: {
        ...item,
        createdBy: userId,
        hashTags: isInvalidHashTags ? adjusthashTags : item?.hashTags || null,
      },
    })
    await newItem.save()

    return true
  } catch (error) {
    return false
  }
}
