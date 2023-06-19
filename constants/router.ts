import { MENU_ID } from '@/components/Menu'

export const getMenuPath = (menuId: MENU_ID | null) => {
  if (!menuId) {
    return '/ad'
  }

  let path = '/'

  if (menuId === MENU_ID.AD_STATISTIC) {
    path = '/report/ad/statistic/'
  } else if (menuId === MENU_ID.PERIOD_STATISTIC) {
    path = '/report/period/statistic'
  } else if (menuId === MENU_ID.CAMPAIGN_STATISTIC) {
    path = '/report/campaign/statistic/'
  } else if (menuId === MENU_ID.CAMPAIGN_MANAGEMENT) {
    path = '/ad/campaign/management'
  } else if (menuId === MENU_ID.MATERIAL_MANAGEMENT) {
    path = '/ad/material/management'
  }

  return path
}

export const ROUTER = {
  MAIN: getMenuPath(MENU_ID.CAMPAIGN_MANAGEMENT),
  LOGIN: '/',
  LOOUT: '/logout',
  ADVERTISEMENT_CAMPAIGN_MANAGEMENT: {
    ROOT: getMenuPath(MENU_ID.CAMPAIGN_MANAGEMENT),
    CREATE: '/ad/campaign/create',
    MODIFY: (id: number | string) => `/ad/campaign/modify/${id}`,
    COPY: (id: number | string) => `/ad/campaign/copy/${id}`,
    GET: (id: number) => `/ad/campaign/get/${id}`,
  },
  ADVERTISEMENT_MATERIAL_MANAGEMENT: {
    ROOT: getMenuPath(MENU_ID.MATERIAL_MANAGEMENT),
    CREATE: '/ad/material/create',
    GET: (id: number) => `/ad/material/get/${id}`,
  },
  CAMPAIGN_STATISTIC: {
    ROOT: getMenuPath(MENU_ID.CAMPAIGN_STATISTIC),
  },
  PERIOD_STATISTIC: {
    ROOT: getMenuPath(MENU_ID.PERIOD_STATISTIC),
  },
  AD_STATISTIC: {
    ROOT: getMenuPath(MENU_ID.AD_STATISTIC),
    DETAIL: (id: number) => `/report/ad/detail/${id}`,
  },
  AUTH_ERROR: '/error/auth',
}
