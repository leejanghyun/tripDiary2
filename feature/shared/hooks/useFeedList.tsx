import { useQuery } from 'react-query'

import { getFeedList, GetFeedListRequest, GetFeedListResponse } from '@/api/getFeedList'
import { KEYS } from '@/constants/'

function useFeedList(params: GetFeedListRequest | null | undefined) {
  return useQuery<GetFeedListResponse>(
    [KEYS.FEED_LIST()],
    () => getFeedList(params as GetFeedListRequest),
    {
      enabled: !!(params),
      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false,
    },
  )
}

export default useFeedList
