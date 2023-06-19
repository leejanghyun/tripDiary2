import { COOKIE_KEYS } from '@/constants'

export const parseCookie = (str?: string) => str?.split(';')
  .map((v) => v.split('='))
  .reduce((acc: any, cur) => {
    acc[decodeURIComponent(cur[0].trim())] = decodeURIComponent(cur[1].trim())
    return acc
  }, {})

export function getCookieAuthKeySettings({
  accessToken,
  refreshToken,
  accessTokenExpiresIn,
  refreshTokenExpiresIn,
}: {
  accessToken: string
  refreshToken: string
  accessTokenExpiresIn?: string
  refreshTokenExpiresIn?: string
}) {
  const accessTokenExpiresInDate = accessTokenExpiresIn ? new Date(accessTokenExpiresIn) : new Date()
  const refreshTokenExpiresInDate = refreshTokenExpiresIn ? new Date(refreshTokenExpiresIn) : accessTokenExpiresInDate
  const setCookies = []

  setCookies.push(`${COOKIE_KEYS.TOKEN_KEY.ACCESS}=${accessToken}; path=/;Expires=${accessTokenExpiresInDate.toUTCString()};HttpOnly;`)
  setCookies.push(`${COOKIE_KEYS.TOKEN_KEY.REFRESH}=${refreshToken}; path=/;Expires=${refreshTokenExpiresInDate.toUTCString()};HttpOnly;`)

  return setCookies
}
