import { MENU_ID } from '@/components/Menu'

export const getMenuPath = (menuId: MENU_ID | null) => {
  let path = '/'

  if (!menuId || menuId === MENU_ID.MAIN) {
    return path
  }

  if (menuId === MENU_ID.ADD_FEED) {
    path = '/add-feed'
  } else if (menuId === MENU_ID.FEED_LIST) {
    path = '/feed-list'
  } else if (menuId === MENU_ID.MY) {
    path = '/my'
  } else if (menuId === MENU_ID.MY_STORY) {
    path = '/my-story'
  }

  return path
}

export const ROUTER = {
  MAIN: getMenuPath(MENU_ID.MAIN),
  ADD_FEED: getMenuPath(MENU_ID.ADD_FEED),
  LOGIN: '/',
  LOOUT: '/logout',
}
