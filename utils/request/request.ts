import axios, {
  AxiosError, AxiosResponse, InternalAxiosRequestConfig,
} from 'axios'

import { isClient } from '../compare'
import {
  AxiosStatus, CommonRequestConfig, CommonResponse, EventName, StatusCode,
} from './type'

export const MAX_TIMEOUT = 15000 // Timeout 정책 (Max:15초)

/**
 * Default Config 설정 객체 반환
 * @returns Default Config 설정 객체 반환
 */
const getDefaultConfig = (): CommonRequestConfig => {
  return {
    withCredentials: true,
    isAuthRequred: true,
    timeout: MAX_TIMEOUT,
    doNotShowSpinner: false,
    skipAlert: false,
    authRequired: true,
    validateStatus(status) {
      return StatusCode.Success <= status && status < StatusCode.MultipleChoices
    },
  }
}

// const addAccessToken = async (config: CommonRequestConfig): Promise<string> => {
//   const { headers } = config

//   if (!headers) {
//     return ''
//   }

//   const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN || ''

//   headers.Authorization = `Bearer ${accessToken}`

//   return accessToken
// }

const onRequestConfig = async (config: InternalAxiosRequestConfig<CommonRequestConfig>) => {
  const { isAuthRequred = true } = config as CommonRequestConfig || {}

  if (isAuthRequred) {
    // await addAccessToken(config as CommonRequestConfig)
  }

  const requestEvent = new CustomEvent(AxiosStatus.AxiosRequestPending, { detail: config })

  dispatchEvent(requestEvent)

  return config
}

const onSuccess = (response: AxiosResponse): Promise<AxiosResponse<CommonRequestConfig>> => {
  const requestEvent = new CustomEvent(AxiosStatus.AxiosRequestSuccess, { detail: response })

  dispatchEvent(requestEvent)

  return Promise.resolve(response?.data || response as AxiosResponse)
}

const onRequestError = (error: AxiosError) => {
  const { response } = error || {}
  const requestEvent = new CustomEvent(AxiosStatus.AxiosRequestFail, { detail: { ...response } })

  dispatchEvent(requestEvent)

  return Promise.reject(error)
}

const onResponseErrorClient = async (error: AxiosError<CommonResponse>) => {
  const { config, response } = error
  const { status } = response || {}
  const requestEvent = new CustomEvent(AxiosStatus.AxiosResponseFail, { detail: { ...response } })

  if (status === StatusCode.AuthRqeuired) {
    try {
      if ((config as CommonRequestConfig & { _refreshed?: boolean })._refreshed) {
        dispatchEvent(requestEvent)
        throw error
      }

      const originalRequest = { ...config, _refreshed: true }

      // await client.get(`${API.PREFIX_URL.DFM_MANAGERS}/${service}/auth/refresh-token`)

      return await client(originalRequest)
    } catch (err) {
      // [TODO]Router.push(service?.length ? `/${service}/login` : '/home')
      return Promise.reject(err)
    }
  }

  dispatchEvent(requestEvent)

  return Promise.reject(error)
}

function AxiosApi() {
  const client = axios.create(getDefaultConfig())

  client.interceptors.request.use(onRequestConfig, onRequestError)
  client.interceptors.response.use(onSuccess, onResponseErrorClient)

  if (isClient) {
    window.addEventListener(EventName.OffLine, () => {
      const requestEvent = new CustomEvent(AxiosStatus.AxiosNetwork, { detail: { isOffline: true } })

      dispatchEvent(requestEvent)
    })

    window.addEventListener(EventName.Online, () => {
      const requestEvent = new CustomEvent(AxiosStatus.AxiosNetwork, { detail: { isOffline: false } })

      dispatchEvent(requestEvent)
    })
  }

  return client
}

const client = AxiosApi()

export const request = <T>(options: CommonRequestConfig): Promise<T> => client.request(options)
