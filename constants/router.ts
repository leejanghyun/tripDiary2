import { MENU_ID } from '@/components/Menu'

export const getMenuPath = (menuId: MENU_ID | null) => {
  let path = '/'

  if (!menuId || menuId === MENU_ID.MAIN) {
    return path
  }

  if (menuId === MENU_ID.PERIOD_STATISTIC) {
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
}
