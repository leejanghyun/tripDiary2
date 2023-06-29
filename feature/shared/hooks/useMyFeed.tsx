import { useQuery } from 'react-query'

import { getMyFeed, GetMyFeedResponse } from '@/api/getMyFeed'
import { KEYS } from '@/constants/'

function useMyFeed(id: string) {
  return useQuery<GetMyFeedResponse>(
    [KEYS.MY_FEED()],
    () => getMyFeed(id),
    {
      enabled: Boolean(id),
      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false,
    },
  )
}

export default useMyFeed
