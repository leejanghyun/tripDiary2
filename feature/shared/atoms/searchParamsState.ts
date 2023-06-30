import { atom } from 'jotai'

import { GetFeedListRequest } from '@/api/getFeedList'

const DEFAULT_PAGE = 1
const DEFAULT_SIZE = 10

export const feedListParamsState = atom<GetFeedListRequest>({ page: DEFAULT_PAGE, limit: DEFAULT_SIZE })
