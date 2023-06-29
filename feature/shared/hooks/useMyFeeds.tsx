import { useQuery } from 'react-query'

import { getMyFeeds, GetMyFeedsResponse } from '@/api/getMyFeeds'
import { KEYS } from '@/constants/'

function useMyFeeds(isEnabled: boolean) {
  return useQuery<GetMyFeedsResponse>(
    [KEYS.MY_FEEDS()],
    () => getMyFeeds(),
    {
      enabled: isEnabled,
      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false,
    },
  )
}

export default useMyFeeds
