// 문자열 -> 숫자 추출
export const getNumber = (num = '') => {
  return num.replace(/[^0-9]/g, '')
}

// 문자열 -> 소수점 숫자 추출
export const getFloatNumber = (num = '') => {
  let modifiedNumber = num.replace(/[^0-9.]/g, '')
  const pointIndex = modifiedNumber.indexOf('.')
  if (pointIndex === 0) { return `0.${getNumber(modifiedNumber)}` }
  if (modifiedNumber.includes('.')) {
    modifiedNumber = getNumber(modifiedNumber)
    modifiedNumber = `${modifiedNumber.slice(0, pointIndex)}.${modifiedNumber.slice(pointIndex)}`
  }

  if (modifiedNumber.length > 1
    && modifiedNumber.indexOf('0') === 0
    && modifiedNumber.indexOf('.') === -1
  ) { modifiedNumber = modifiedNumber.slice(1) }

  return modifiedNumber
}

/**
 * 초를 (MM:SS) 형태로 변환
 * @param seconds 초
 * @returns (MM:SS) 포맷 시간 데이터
 */
export const formatMinnuteSecond = (seconds: number = 0) => {
  const res = (seconds - (seconds %= 60)) / 60 + (seconds > 9 ? ':' : ':0') + seconds
  return res
}

/**
 * n자리 랜덤숫자 생성
 * @type {function(n: number = 1): string}
 * @param {number} [n=1] - 자리 수 (default = 1)
 * @return {string} string
 */
export function generateRandomCode(n: number = 1): string {
  let str = ''
  for (let i = 0; i < n; i += 1) {
    str += Math.floor(Math.random() * 10)
  }
  return str
}

/**
 * 숫자로 변환 시도 후, 실패 시 기본값 반환
 * @type {function(value: any, defaultValue: number = 0): number}
 * @param {any} value - 변환할 문자
 * @param {number} defaultValue - 실패 시 반환할 숫자 (default = 0)
 * @return {number} value
 */
export function toSafeNumber(value: any, defaultValue: number = 0): number {
  return Number.isNaN(Number(value)) ? defaultValue : value
}

/**
 * 숫자 자리 수 구분값(,) 표기
 */
export function numberWithCommas(
  number: number | string,
  options?: { prefix?: string, suffix?: string },
) {
  const prefix = options?.prefix ? `${options.prefix} ` : ''
  const suffix = options?.suffix ? ` ${options.suffix}` : ''
  return `${prefix}${toSafeNumber(number)?.toLocaleString()}${suffix}`
}

/**
 * 연락처에 하이픈을 자동으로 추가한다.
 * 01012345678 -> 010-1234-5678
 *
 * @param  {String} phoneNum
 * @return {[String]}
 */
export const getPhoneNumber = (phoneNum = '') => {
  let modifiedNumber = getNumber(phoneNum.toString())

  // 1588, 1566, 1677, ... 대표 번호 케이스
  if (modifiedNumber.indexOf('1') === 0) {
    return modifiedNumber.replace(/(^1\d{3})(\d{4})$/, '$1-$2')
  }

  let threePartNum = modifiedNumber.length <= 10 ? /(\d{3})(\d{3})(\d+)/ : /(\d{3})(\d{4})(\d+)/ // 하이픈 2개
  let towPartNum = /(\d{3})(\d+)/ // 하이픈 1개
  // 서울 지역번호일 경우에만 하이픈으로 구분할 앞자리는 2개
  if (modifiedNumber.indexOf('02') === 0) {
    threePartNum = modifiedNumber.length < 10 ? /(\d{2})(\d{3})(\d+)/ : /(\d{2})(\d{4})(\d+)/
    towPartNum = /(\d{2})(\d+)/
  }

  if (threePartNum.test(modifiedNumber)) {
    modifiedNumber = modifiedNumber.replace(threePartNum, '$1-$2-$3')
  } else if (towPartNum.test(modifiedNumber)) {
    modifiedNumber = modifiedNumber.replace(towPartNum, '$1-$2')
  }

  return modifiedNumber
}

/**
 * 사업자등록번호에 하이픈을 자동으로 추가한다.
 * 3332255555 -> 333-22-55555
 *
 * @param  {String} bizNum
 * @return {[String]}
 */
export function getBizNumber(bizNum = '') {
  let modifiedNumber = getNumber(bizNum?.toString())

  const threePartNum = /(\d{3})(\d{2})(\d+)/ // 하이픈 2개
  const towPartNum = /(\d{3})(\d+)/ // 하이픈 1개
  if (threePartNum.test(modifiedNumber)) {
    modifiedNumber = modifiedNumber.replace(threePartNum, '$1-$2-$3')
  } else if (towPartNum.test(modifiedNumber)) {
    modifiedNumber = modifiedNumber.replace(towPartNum, '$1-$2')
  }

  return modifiedNumber
}

/**
 * 숫자+하이픈만 리턴
 */
const excludeRegExp = /[^0-9-]/g
export const getNumberIncludeHyphen = (num = '') => {
  return num.trim().replaceAll(excludeRegExp, '')
}

export function formatNumber(num: number) {
  if (num < 10) {
    return `0${num.toString()}`
  }
  return num.toString()
}
