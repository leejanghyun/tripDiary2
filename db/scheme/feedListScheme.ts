import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import { feedScheme } from './feedScheme'

export interface FeedDocument {
  content: string;
  date: Date[];
  fileList: string[];
  imageDescriptions: string[];
  location: {
    lat: number
    lng: number
  };
  searchText: string;
  title: string;
}

export const feedListScheme = new mongoose.Schema<{ feed: FeedDocument, userId: string }>({
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
