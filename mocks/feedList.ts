import { Feed } from '../db/scheme/feedScheme'

export const feedEditMock: Feed = {
  _id: '1',
  content: '다음 사진은 방콕에서 먹었던 사진 입니다.다음 사진은 방콕에서 먹었던 사진 입니다.',
  date: [new Date(), new Date()],
  fileList: [
    'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455_960_720.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs7WcCMDSTl4_n7XqKYCxEX88k6i6GJ87xtZKATIzTV4OGTT_C6nWUH-c&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5EOdhtYv-4FoCHXJrbr_Q5WaZxD8CzQE5mw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqZZWRIyHxRCTzh93aDrt7inRRh9tRlKYGWw&usqp=CAU',
  ],
  imageDescriptions: ['이미지1 설명', '이미지2 설명'],
  location: {
    lat: 37.22,
    lng: 126,
  },
  searchText: 'searchText',
  title: 'title',
}
