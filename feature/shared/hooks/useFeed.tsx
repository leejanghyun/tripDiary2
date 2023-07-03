import { useQuery } from 'react-query'

import { getFeed, GetFeedResponse } from '@/api/getFeed'
import { KEYS } from '@/constants/'

function useFeed(id: string) {
  return useQuery<GetFeedResponse>(
    [KEYS.MY_FEED()],
    () => getFeed(id),
    {
      enabled: Boolean(id),
      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false,
    },
  )
}

export default useFeed
