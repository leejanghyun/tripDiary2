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
    const user = await FeedListModel.findOne({ userId })

    return user.feedList
  } catch (error) {
    return []
  }
}
