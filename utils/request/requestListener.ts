import { AxiosStatus } from './type'

type PendingCallback = (event: Event) => void
type SuccessCallback = (event: Event) => void
type RequestFailCallback = (event: Event) => void
type ResponseFailCallback = (event: Event) => void
type NetworkCallback = (event: Event) => void

/**
 * AxiosListener 클래스 객체 정의
 */
function AxiosListener() {
  const listen = (
    pendingCallback: PendingCallback,
    SuccessCallback: SuccessCallback,
    requestFailCallback: RequestFailCallback,
    responseFailCallback: ResponseFailCallback,
    netWorkCallback: NetworkCallback,
  ) => {
    window.addEventListener(AxiosStatus.AxiosRequestPending, pendingCallback)
    window.addEventListener(AxiosStatus.AxiosRequestSuccess, SuccessCallback)
    window.addEventListener(AxiosStatus.AxiosRequestFail, requestFailCallback)
    window.addEventListener(AxiosStatus.AxiosResponseFail, responseFailCallback)
    window.addEventListener(AxiosStatus.AxiosNetwork, netWorkCallback)
  }

  return {
    listen,
  }
}

export const axiosListener = AxiosListener()
