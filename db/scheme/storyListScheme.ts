import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import { Story, storyScheme } from './storyScheme'

export const storyListScheme = new mongoose.Schema<{ story: Omit<Story, '_id'>, userId: string }>(
  {
    story: {
      type: storyScheme,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

storyListScheme.plugin(mongoosePaginate)

export default mongoose.models.storylists || mongoose.model('storylists', storyListScheme)
