const addressListMock = [
  {
    address: '전북 익산시 영등동 821',
    detailName: '영등3차제일아파트',
    lat: 35.96122229,
    lon: 126.97489837,
    roadAddress: '전북 익산시 고봉로34길 35',
  },
  {
    address: '전북 익산시 영등동 815',
    detailName: '영등부영3차아파트',
    lat: 35.96427757,
    lon: 126.97900903,
    roadAddress: '전북 익산시 하나로 483-60',
  },
  {
    address: '전북 익산시 영등동 768-1',
    detailName: '영등제일맨션타운아파트',
    lat: 35.95694495,
    lon: 126.9719543,
    roadAddress: '전북 익산시 고봉로30길 13',
  },
  {
    address: '전북 익산시 영등동 714-1',
    detailName: '영등신일아파트',
    lat: 35.9516956,
    lon: 126.97495417,
    roadAddress: '전북 익산시 약촌로 202',
  },
  {
    address: '전북 익산시 영등동 810',
    detailName: '영등제일4차아파트',
    lat: 35.96380531,
    lon: 126.97398172,
    roadAddress: '전북 익산시 무왕로9길',
  },
]

export default jest.fn().mockReturnValue({
  mutate: jest.fn(),
  data: {
    addressList: addressListMock,
  },
  status: 'success',
})
