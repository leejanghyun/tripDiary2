import { useQuery } from 'react-query'

import { KEYS } from '@/constants/keys'

import { getAdvertiserInventory, GetAdvertiserInventoryListResponse } from '../api/getAdvertiserInventory'

type UseAdvertiserInventoryProps = {
  isEnabled?: boolean
  onSuccess?: (response: GetAdvertiserInventoryListResponse) => void
}

function useAdvertiserInventory({ isEnabled = true, onSuccess }: UseAdvertiserInventoryProps) {
  return useQuery<GetAdvertiserInventoryListResponse>(
    [...KEYS.INVENTORY()],
    () => getAdvertiserInventory(),
    {
      enabled: isEnabled,
      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false,
      onSuccess,
    },
  )
}

export default useAdvertiserInventory
