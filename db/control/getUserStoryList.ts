import dbConnect from '../dbConnect'
import { Story, StoryListModel } from '../scheme'

type Response = {
  _id: string;
  storyList: Story[]
  userId: string
}

export async function getUserStoryList(userId: string): Promise<Response[]> {
  try {
    await dbConnect()

    const results = await StoryListModel.find({ userId })

    return results.map((item) => item.feed)
  } catch (error) {
    return []
  }
}
