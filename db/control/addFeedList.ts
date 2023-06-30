import dbConnect from '../dbConnect'
import { Feed, FeedListModel } from '../scheme'

export async function addToFeedList(userId: string, item: Feed): Promise<boolean> {
  try {
    await dbConnect()

    console.log(userId)
    const newItem = new FeedListModel({
      userId,
      feed: item,
    })
    await newItem.save()

    return true
  } catch (error) {
    return false
  }
}
