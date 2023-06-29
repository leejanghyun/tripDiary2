import { atom } from 'jotai'

import { GetFeedListRequest } from '@/api/getFeedList'

export const feedListParamsState = atom<GetFeedListRequest>({ page: 1, limit: 1000 })
