import styled from '@emotion/styled'
import { useAtomValue } from 'jotai'
import { memo } from 'react'

import { globalState } from '../../atoms/globalState'
import Menu, { MENU_ID, MenuItem } from '../Menu/Menu'

type Props = {
  items: MenuItem[];
  onChange: (id: MENU_ID | null) => void;
}

export type MenuListItem = MenuItem[]

function MenuList({ items, onChange }: Props) {
  const state = useAtomValue(globalState)
  const { menuId } = state || {}
  return (
    <List>
      {items.map((item: MenuItem, idx: number) => {
        return (
          <li
            key={`menu-${idx}`}
          >
            <Menu
              isSelected={menuId === item.id}
              item={item}
              onClick={(id) => onChange(id)}
            />
          </li>
        )
      })}
    </List>
  )
}

export default memo(MenuList)

const List = styled.ul`
  display: flex;
  justify-content: space-around; 
  overflow: auto;
  min-height: 50px;
  width: 100vw;
`
