import { useQuery } from 'react-query'

import { KEYS } from '@/constants/keys'

import { getMaterialTypeListByInventoryId, GetMaterialTypeListByInventoryIdResponse } from '../api/getMaterialTypeListByInventoryId'

type UseAdvertiserInventoryProps = {
  inventoryId?: number | null
  onSuccess?: (response: GetMaterialTypeListByInventoryIdResponse) => void
}

function useMaterialTypeListByInventoryId({ inventoryId, onSuccess }: UseAdvertiserInventoryProps) {
  return useQuery<GetMaterialTypeListByInventoryIdResponse>(
    [...KEYS.MATERIAL_TYPES_BY_INVENTORY_ID()],
    () => getMaterialTypeListByInventoryId(inventoryId as number),
    {
      enabled: !!inventoryId,
      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false,
      onSuccess,
    },
  )
}

export default useMaterialTypeListByInventoryId
