import mongoose from 'mongoose'

export interface Story {
  _id: string
  title: string,
  feedList?: string[] | null,
  createdBy?: string
}

export const storyScheme = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '스토리 제목을 입력해주세요.'],
    maxlength: [50, '스토리 최대 입력 길이는 50자입니다.'],
  },
  feedList: {
    type: Array<String>,
    required: false,
  },
  createdBy: {
    type: String,
    required: true,
  },
})
