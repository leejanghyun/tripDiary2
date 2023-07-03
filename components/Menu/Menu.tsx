import styled from '@emotion/styled'
import { COLOR } from '@TMOBI-WEB/ads-ui'
import {
  memo, ReactNode, useCallback,
} from 'react'

export const enum MENU_ID {
  MY = 'my',
  FEED_LIST = 'feed-list',
  ADD_FEED = 'add-feed',
  MAIN = 'main',
}

export type MenuItem = {
  IconActive?: ReactNode,
  IconInActive?: ReactNode,
  id: MENU_ID | null,
}

type Props = {
  isSelected: boolean
  item: MenuItem
  onClick: (id: MENU_ID | null) => void
}

/**
 * Menu 컴포넌트
 * @component
 */
function Menu({
  isSelected, item, onClick,
}: Props) {
  const {
    id: menuId, IconActive, IconInActive,
  } = item

  return (
    <MenuWrapper
      type="button"
      onClick={useCallback(() => onClick(menuId), [menuId, onClick])}
    >
      {isSelected && IconActive && (
        <i className="ico-menu">{IconActive}</i>
      )}
      {!isSelected && IconInActive && (
        <i className="ico-menu">{IconInActive}</i>
      )}
    </MenuWrapper>
  )
}

export default memo(Menu)

const MenuWrapper = styled.button`
  display: flex;
  min-height: 50px;
  padding: 10px 10px 10px 12px;
  align-items: center;
  text-align: left;

  &:hover {
    background-color: ${COLOR.gray.color.gray[200]};
  }
  
  .ico-menu {
    display: inline-flex;
    place-content: center;
  }
  
  .label {
    color: ${COLOR.gray.color.gray[700]};
    font-size: ${({ theme }) => theme.font[14].size};
    line-height: ${({ theme }) => theme.font[14].lineHeight};
  }
`
