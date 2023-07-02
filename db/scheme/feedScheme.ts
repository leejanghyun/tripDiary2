import mongoose from 'mongoose'

import { FEED_KIND } from '@/feature/feed/constants/form'
import { Location } from '@/utils/map/map'

export interface Feed {
  _id: string
  title: string,
  location: Location,
  date: Date[],
  content?: string,
  fileList?: string[] | null,
  imageDescriptions?: string[] | null,
  address?: string | null,
  createdBy?: string
  hashTags?: string[] | null
  stars: number
  feedKind: FEED_KIND
  bookmarks: string[]
}

export const feedScheme = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '피드 제목을 입력해주세요.'],
    maxlength: [50, '피드 내용의 최대 입력 길이는 50자입니다.'],
  },
  date: {
    type: [Date],
    required: [true, '날짜를 입력해주세요.'],
  },
  address: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: [false, '피드 내용을 입력해주세요.'],
    maxlength: [200, '피드 내용의 최대 입력 길이는 200자입니다.'],
  },
  imageDescriptions: {
    type: Array<String>,
    maxlength: [100, '피드 내용의 최대 입력 길이는 100자입니다.'],
    required: false,
  },
  fileList: {
    type: Array<String>,
    required: [false, '피드 내용을 입력해주세요.'],
  },
  location: {
    type: {
      lat: Number,
      lng: Number,
    },
    required: false,
  },
  createdBy: {
    type: String,
    required: true,
  },
  hashTags: {
    type: Array<String>,
    required: false,
  },
  stars: {
    type: Number,
    required: true,
  },
  feedKind: {
    type: String,
    required: true,
  },
  bookmarks: {
    type: Array<String>,
    required: true,
  },
})
