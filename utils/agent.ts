import Cookies from 'js-cookie'

import { COOKIE_KEYS } from '@/constants'

import { decode } from './convert'

export function isMobile() {
  const _ua = Cookies.get(COOKIE_KEYS.USER_AGENT)
  if (_ua) {
    const ua = decode(_ua)

    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
  }

  return false
}
