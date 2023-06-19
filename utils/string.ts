// 문자 배열 중 존재하는 값들을 나열한다. (띄어쓰기 구분)
export function getDisplayStringArray(strArray: Array<string | undefined | null>) {
  return strArray.reduce((acc, cur) => (cur ? `${acc} ${cur}` : acc))
}

/**
 * 문자열 공백, '-' 제거
 */
export const getStringExcludeHyphen = (value: string = '') => {
  return value.replaceAll(/[-\s]/g, '')
}

/**
 * 문자열 공백 제거
 */
export const getStringExcludeEmpty = (value: string = '') => {
  return value.replaceAll(' ', '')
}
