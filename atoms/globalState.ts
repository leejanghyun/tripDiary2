import { atom } from 'jotai'

import { MENU_ID } from '../components/Menu'

type GlobalState = {
  menuId: MENU_ID | null
  userId: string
}

const defaultValue = {
  menuId: MENU_ID.MAIN,
  userId: '',
}

export const globalState = atom<GlobalState>(defaultValue)
