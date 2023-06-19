import {
  format,
  getDate,
  getHours,
  getMilliseconds,
  getMinutes,
  getMonth,
  getSeconds,
  getYear,
  isValid,
} from 'date-fns'

import { chunkSubstr } from './convert'

export function formatDate(date: Date | string, formatText = 'yyyy-MM-dd') {
  if (typeof date === 'string') {
    return format(date ? new Date(date) : new Date(), formatText)
  }
  return format(date, formatText)
}
export function formatDisplayDate(date?: Date | string) {
  return date ? formatDate(date, 'yyyy.MM.dd') : date
}

export function formatTime(time?: Date | string, formatText = 'HH:mm') {
  if (typeof time === 'string') {
    const parseDate = timeToDate(new Date(), time)
    return parseDate ? format(parseDate, formatText) : undefined
  }
  return time ? format(time, formatText) : time
}

// 서버에서 내려온 createdAt: string을 Date Type으로 변환
export function getCreateAtDateTime(createAt: string) {
  const [y, M, d, h, m] = createAt.split(/[-\s:]/)
  return new Date(Number(y), Number(Number(M)) - 1, Number(d), Number(h), Number(m))
}

// 화면에서 보여줄 date+time 형태의 포멧을 만든다. (서버에서 내려온 createdAt string 변환에 사용) ex) 2022-08-09 20:43(createAt) => 2022.08.09 20:43
export function formatDisplayDateTime(dateAt: string | Date, formatText = 'yyyy.MM.dd HH:mm') {
  let date
  if (typeof dateAt === 'string') {
    const [y, M, d, h, m] = dateAt.split(/[-\s:]/)
    date = new Date(Number(y), Number(Number(M)) - 1, Number(d), Number(h), Number(m))
  } else {
    date = dateAt
  }
  return isValid(date) ? format(date, formatText) : null
}

// TimePicker Text(99 : 99) to Date Object
export function timeToDate(date: Date, time: string) {
  const regExp = /^[0-2][0-9]:[0-5][0-9]$/
  const [hours, minutes] = chunkSubstr(time.replace(/[^0-9]/g, ''), 2)
  if (regExp.test(`${hours}:${minutes}`)) {
    return new Date(getYear(date), getMonth(date), getDate(date), Number(hours), Number(minutes))
  }
  return null
}

// 설정 값(nearestTo, Default: 30) 기준 시간 올림
export function ceilToNearestMinutes(date: Date, nearestTo: number = 30) {
  let hours = date.getHours()
  let minutes = date.getMinutes()
  if (minutes > 0 && minutes < nearestTo) {
    minutes = nearestTo
  } else if (minutes > nearestTo) {
    hours += 1
    minutes = 0
  }
  return new Date(
    getYear(date),
    getMonth(date),
    getDate(date),
    hours,
    minutes,
  )
}

// Date 객체에서 시간 값 Reset
export function resetTime(date: Date) {
  return new Date(getYear(date), getMonth(date), getDate(date), 0, 0, 0, 0)
}

// 날짜기준 시간 Set (Default: 현재 날짜)
export function setTime({ date = new Date(), time }: {
  date: Date,
  time: Date | string,
}) {
  if (typeof time === 'string') {
    const [hours, minutes, seconds] = time.split(':')
    return new Date(
      getYear(date),
      getMonth(date),
      getDate(date),
      Number(hours),
      Number(minutes),
      Number(seconds),
      0,
    )
  }

  return new Date(
    getYear(date),
    getMonth(date),
    getDate(date),
    getHours(time),
    getMinutes(time),
    getSeconds(time),
    getMilliseconds(time),
  )
}

// 서버에서 내려온 date, time 정보 조합
export function getDateTime(date: string, time?: string) {
  return `${formatDisplayDate(date)}${time ? ` ${formatTime(time)}` : ''}`
}
