import { AES, enc } from 'crypto-js'

import { isServer } from './compare'
import { error } from './logger'

export const chunkSubstr = (str: string, size: number) => {
  const arr = []

  for (let i = 0; i < str.length; i += size) {
    arr.push(str.substring(i, i + size))
  }
  return arr
}

export const encode = (data: string) => (isServer ? Buffer.from(data).toString('base64') : window.btoa(data))

export const decode = (data: string) => (isServer ? Buffer.from(data, 'base64').toString() : window.atob(data))

export const encryptId = (value: string | number) => {
  if (!isServer) {
    error('이 동작은 서버에서만 유효합니다.')
    return ''
  }

  if (!process.env.CHANNEL_ENCRYPT_KEY) {
    error('암호화 키가 존재하지 않습니다.')
    return ''
  }

  const cipherText = AES.encrypt(value.toString(), process.env.CHANNEL_ENCRYPT_KEY)
  return encodeURIComponent(cipherText.toString())
}

export const decryptId = (encodedText: string) => {
  if (!isServer) {
    error('이 동작은 서버에서만 유효합니다.')
    return ''
  }

  if (!process.env.CHANNEL_ENCRYPT_KEY) {
    error('암호화 키가 존재하지 않습니다.')
    return ''
  }

  const decodedText = decodeURIComponent(encodedText)
  return AES.decrypt(decodedText, process.env.CHANNEL_ENCRYPT_KEY).toString(enc.Utf8)
}

export const getValue = (data: any, emptyValue: any = undefined) => data ?? emptyValue

export const parseJwt = <T = any>(token: string): T => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
    return `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`
  }).join(''))

  return JSON.parse(jsonPayload)
}
