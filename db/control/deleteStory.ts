import dbConnect from '../dbConnect'
import { StoryListModel } from '../scheme'
import { StorySchemeType } from './getUserStoryList'

export async function deleteStory(userId: string, _id: string): Promise<boolean> {
  try {
    await dbConnect()

    const userStories = await StoryListModel.find({ userId })

    if (!userStories || Boolean(!userStories?.length)) {
      return false
    }

    const { length } = userStories
    let targetStory: StorySchemeType | null = null

    for (let i = 0; i < length; i += 1) {
      if (userStories[i].story._id.toHexString() === _id) {
        targetStory = userStories[i] as StorySchemeType
        break
      }
    }

    if (!targetStory) {
      return false
    }

    await StoryListModel.deleteOne({ _id: targetStory._id })

    return true
  } catch (error) {
    return false
  }
}
