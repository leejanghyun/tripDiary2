import {
  Loader, Toast, toastDismiss, toastError,
} from '@TMOBI-WEB/ads-ui'
import { useState } from 'react'

import { useMount } from '@/hooks/useMount'
import { axiosListener, isClient } from '@/utils'

/**
 * GlobalStatus 컴포넌트
 * @description 전역 UI 컴포넌트 (Toast, Spinner)
 * @category Components
 */
function GlobalStatus() {
  const [isShowSpinner, setShowSpinner] = useState<boolean>(false)

  const AxiosPending = (event: Event) => {
    const { detail } = event as CustomEvent
    const { doNotShowSpinner } = detail

    if (!doNotShowSpinner) {
      setShowSpinner(true)
    }
  }

  const AxiosSuccess = (event: Event) => {
    const { detail } = event as CustomEvent
    const { config } = detail
    const { doNotShowSpinner } = config

    if (!doNotShowSpinner) {
      setShowSpinner(false)
    }
  }

  const AxiosRequestFail = () => {
    toastError('요청 실패', 'requestFail')
  }

  const AxiosResponseFail = (event: Event) => {
    const { detail } = event as CustomEvent
    const { config, data } = detail
    const { skipAlert, doNotShowSpinner } = config || {}

    if (!doNotShowSpinner) {
      setShowSpinner(false)
    }

    if (skipAlert) {
      return
    }

    const { resultMsg } = data || {}

    toastError(resultMsg || '알수 없는 오류', 'responseFail')
  }

  const AxiosNetwork = (event: Event) => {
    const { detail } = event as CustomEvent
    const { isOffline } = detail || {}
    const id = 'network'

    if (isOffline) {
      toastError('인터넷 연결 상태를 확인해주세요.', id, { autoClose: false })
      return
    }

    toastDismiss(id) // 기존 토스트 없앰
  }

  useMount(() => {
    if (isClient) {
      axiosListener.listen(AxiosPending, AxiosSuccess, AxiosRequestFail, AxiosResponseFail, AxiosNetwork)
    }
  })

  return (
    <>
      {/** Toast/Spinner 노출 */}
      <Toast />
      <Loader open={isShowSpinner} />
    </>
  )
}

export default GlobalStatus
