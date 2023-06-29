import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import { Feed, feedScheme } from './feedScheme'

export const feedListScheme = new mongoose.Schema<{ feed: Omit<Feed, '_id'>, userId: string }>({
  feed: {
    type: feedScheme,
  },
  userId: {
    type: String,
    required: true,
  },
})

feedListScheme.plugin(mongoosePaginate)

export default mongoose.models.feedlists || mongoose.model('feedlists', feedListScheme)
