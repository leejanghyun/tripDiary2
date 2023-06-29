import dbConnect from '../dbConnect'
import { Feed, FeedListModel } from '../scheme'

type Response = {
  _id: string;
  feedList: Feed[]
  userId: string
}

export async function getFeedList(userId: string): Promise<Response[]> {
  try {
    await dbConnect()

    const results = await FeedListModel.find({ userId })

    return results.map((item) => item.feed)
  } catch (error) {
    return []
  }
}
