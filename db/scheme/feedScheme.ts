import mongoose from 'mongoose'

import { Location } from '@/utils/map/map'

export interface Feed {
  _id: string
  title: string,
  location: Location,
  date: Date[],
  content?: string,
  fileList?: string[] | null,
  imageDescriptions?: string[] | null,
  searchText?: string | null,
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
  searchText: {
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
    maxlength: [200, '피드 내용의 최대 입력 길이는 200자입니다.'],
    required: false,
  },
  fileList: {
    type: Array<String>,
    required: [false, '피드 내용을 입력해주세요.'],
    maxlength: [200, '피드 내용의 최대 입력 길이는 200자입니다.'],
  },
  location: {
    type: {
      lat: Number,
      lng: Number,
    },
    required: false,
  },
})
