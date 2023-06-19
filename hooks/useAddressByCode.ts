import { useQuery } from 'react-query'

import { KEYS } from '@/constants/keys'

import { getAddressByCode, GetAddressByCodeRequest, GetAddressByCodeResponse } from '../api/getAddressByCode'

type UseAddressByCodeProps = {
  params: GetAddressByCodeRequest,
  isEnabled?: boolean
  onSuccess?: (response: GetAddressByCodeResponse) => void
  onError?: () => void
}

function useAddressByCode({ params, onSuccess, onError }: UseAddressByCodeProps) {
  return useQuery<GetAddressByCodeResponse>(
    [...KEYS.INVENTORY()],
    () => getAddressByCode(params),
    {
      enabled: !!params,
      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false,
      onSuccess,
      onError,
    },
  )
}

export default useAddressByCode
