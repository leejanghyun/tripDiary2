import _ from 'lodash-es'
import { useQuery } from 'react-query'

import { KEYS } from '@/constants/keys'

import { getAdvertiserAdDisplayById, GetAdvertiserAdDisplayByIdResponse } from '../api/getAdvertiserAdDisplayById'

function useAdvertiserCampaignListByName(id: number | null) {
  return useQuery<GetAdvertiserAdDisplayByIdResponse>(
    [...KEYS.ADDISPLAY_BY_ID(), id],
    () => getAdvertiserAdDisplayById(id as number),
    {
      enabled: !!_.isNumber(id),
      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false,
    },
  )
}

export default useAdvertiserCampaignListByName
