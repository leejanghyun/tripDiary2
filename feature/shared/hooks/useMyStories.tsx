import { useQuery } from 'react-query'

import { getMyStories, GetMyStoriesResponse } from '@/api/getMyStories'
import { KEYS } from '@/constants/'

function useMyStories() {
  return useQuery<GetMyStoriesResponse>(
    [KEYS.MY_FEEDS()],
    () => getMyStories(),
    {
      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false,
    },
  )
}

export default useMyStories
