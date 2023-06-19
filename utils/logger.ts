/* eslint-disable no-console */
import { format, toDate } from 'date-fns'

import { TARGET } from '@/constants'

const isLoggerTarget = [
  TARGET.LOCAL, TARGET.DEV, TARGET.DTG, TARGET.STG, TARGET.RTG,
].includes(process.env.NEXT_PUBLIC_TARGET as TARGET)

const LOG_TYPE = {
  LOG: 'LOG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
} as const

function createPrefix(type: keyof typeof LOG_TYPE) {
  return `%c[${format(toDate(Date.now()), 'yyyy-MM-dd HH:mm:ss')}][${type}]`
}

function styleFormat(type: keyof typeof LOG_TYPE) {
  const colors = {
    [LOG_TYPE.LOG]: ['color: #292b2c', 'background: #f7f7f7'],
    [LOG_TYPE.INFO]: ['color: #0f82e6'],
    [LOG_TYPE.WARN]: ['color: #ad7c0b'],
    [LOG_TYPE.ERROR]: ['color: #d13b2e'],

  }[type]

  return [
    ...colors,
    'padding: 1px',
    'border-radius:2px',
    'font-weight:500',
    'text-shadow:0 1px 0px rgba(0, 0, 0, 0.2)',
  ].join(';')
}

function nothingFn() {}

export const log = isLoggerTarget
  ? console.log.bind(console, createPrefix(LOG_TYPE.LOG), styleFormat(LOG_TYPE.LOG))
  : nothingFn

export const info = isLoggerTarget
  ? console.info.bind(console, createPrefix(LOG_TYPE.INFO), styleFormat(LOG_TYPE.INFO))
  : nothingFn

export const warn = isLoggerTarget
  ? console.warn.bind(console, createPrefix(LOG_TYPE.WARN), styleFormat(LOG_TYPE.WARN))
  : nothingFn

export const error = isLoggerTarget
  ? console.error.bind(console, createPrefix(LOG_TYPE.ERROR), styleFormat(LOG_TYPE.ERROR))
  : nothingFn // TODO: 에러 시 로깅 처리
