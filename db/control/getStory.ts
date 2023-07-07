import dbConnect from '../dbConnect'
import { StoryListModel } from '../scheme'
import { StorySchemeType } from './getUserStoryList'

export async function getStory(id: string, userId?: string): Promise<StorySchemeType | null> {
  try {
    await dbConnect()

    if (!userId) {
      const userStories = await StoryListModel.find()

      if (!userStories) {
        return null
      }

      const { length } = userStories

      for (let i = 0; i < length; i += 1) {
        if (userStories[i].story?._id.toHexString() === id) {
          return userStories[i].story
        }
      }

      return null
    }

    const userStories = await StoryListModel.find({ userId })

    if (!userStories) {
      return null
    }

    const { length } = userStories

    for (let i = 0; i < length; i += 1) {
      if (userStories[i].story?._id.toHexString() === id) {
        return userStories[i].story
      }
    }

    return null
  } catch (error) {
    return null
  }
}
