import { useQuery } from 'react-query'

import { getStory, GetStoryResponse } from '@/api/getStory'
import { KEYS } from '@/constants/'

function useStory(id: string) {
  return useQuery<GetStoryResponse>(
    [KEYS.STORY()],
    () => getStory(id),
    {
      enabled: Boolean(id),
      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false,
    },
  )
}

export default useStory
