import dbConnect from '../dbConnect'
import { Story, StoryListModel } from '../scheme'

export async function addStoryList(userId: string, item: Story): Promise<boolean> {
  try {
    await dbConnect()

    const newItem = new StoryListModel({
      userId,
      story: {
        ...item,
        createdBy: userId,
      },
    })
    await newItem.save()

    return true
  } catch (error) {
    return false
  }
}
