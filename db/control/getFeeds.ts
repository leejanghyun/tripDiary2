import dbConnect from '../dbConnect'
import { Feed, FeedListModel } from '../scheme'

export async function getFeeds(ids: string[], userId: string): Promise<Feed[] | null> {
  try {
    await dbConnect()

    const userFeeds = await FeedListModel.find({ userId })

    if (!userFeeds) {
      return null
    }

    const { length } = userFeeds
    const results: Feed[] = []

    for (let i = 0; i < length; i += 1) {
      console.log(ids)
      const targetFeed = ids.find((item) => item === userFeeds[i].feed?._id.toHexString())

      if (targetFeed) {
        results.push(userFeeds[i].feed)
      }
    }

    console.log('!!', results)

    return results
  } catch (error) {
    return null
  }
}
