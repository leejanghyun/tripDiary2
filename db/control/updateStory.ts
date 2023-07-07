import dbConnect from '../dbConnect'
import { Story, StoryListModel } from '../scheme'
import { StorySchemeType } from './getUserStoryList'

export async function updateStory(userId: string, updatedData: Story): Promise<boolean> {
  try {
    await dbConnect()

    const userStories = await StoryListModel.find({ userId })

    if (!userStories || Boolean(!userStories?.length)) {
      return false
    }

    const { length } = userStories
    const { _id } = updatedData || {}
    let targetStory: StorySchemeType | null = null

    for (let i = 0; i < length; i += 1) {
      if (userStories[i].story._id.toHexString() === _id) {
        targetStory = userStories[i]
        break
      }
    }

    if (!targetStory) {
      return false
    }

    targetStory.story.title = updatedData.title
    targetStory.story.feedList = updatedData.feedList

    await new StoryListModel(targetStory).save()

    return true
  } catch (error) {
    return false
  }
}
