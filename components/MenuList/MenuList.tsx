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

/**
 * 메뉴 리스트 컴포넌트
 * @category
 */
function MenuList({ items, onChange }: Props) {
  const state = useAtomValue(globalState)
  const { menuId } = state || {}
  return (
    <List>
      {items.map((item: MenuItem, idx: number) => {
        const { children = [], type, id } = item || {}

        return (
          <li
            className="depth1"
            key={`title-${id}-${idx}`}
          >
            {/** Menu 타이틀 */}
            <Menu
              id={menuId}
              type={type}
              item={item}
              onClick={(id) => onChange(id)}
            />
            {children && (
            <ul>
              {children?.map((menu, idx) => {
                const { type, id } = menu || {}

                return (
                  <li
                    className="depth2"
                    key={`sub-${id}-${idx}`}
                  >
                    <Menu
                      type={type}
                      id={menuId}
                      item={menu}
                      onClick={(id) => onChange(id)}
                    />
                  </li>
                )
              })}
            </ul>
            )}
          </li>
        )
      })}
    </List>
  )
}

export default memo(MenuList)

const List = styled.ul`
  .depth1 {
    & ~ .depth1 {
      margin-top: 27px;
    }
  }
  
  .depth2 {
    padding: 4px 0;
  }
`
