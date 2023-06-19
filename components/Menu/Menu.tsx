import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { COLOR } from '@TMOBI-WEB/ads-ui'
import {
  memo, ReactNode,
} from 'react'

export const enum MENU_ID {
  CAMPAIGN_MANAGEMENT = 'campaign-management',
  MATERIAL_MANAGEMENT = 'material-management',
  PERIOD_STATISTIC = 'period-statistic',
  CAMPAIGN_STATISTIC = 'campaign-statistic',
  AD_STATISTIC = 'ad-statistic',
  MAIN = 'main',
}

export const enum MenuType {
  TITLE = 'title',
  MENU = 'menu',
}

export type MenuItem = {
  type: MenuType
  IconActive?: ReactNode,
  IconInActive?: ReactNode,
  label: string,
  id: MENU_ID | null,
  children: MenuItem[] | null
}

type Props = {
  id: MENU_ID | null
  type: MenuType
  item: MenuItem
  onClick: (id: MENU_ID | null) => void
}

/**
 * Menu 컴포넌트
 * @component
 */
function Menu({
  id, type, item, onClick,
}: Props) {
  const {
    id: menuId, label, IconActive, IconInActive,
  } = item
  const isTitle = type === MenuType.TITLE
  const isActive = id === item?.id
  if (isTitle) {
    return (
      <TitleLabel>{label}</TitleLabel>
    )
  }

  return (
    <MenuWrapper
      type="button"
      isActive={isActive}
      onClick={() => onClick(menuId)}
    >
      {isActive && IconActive && (
        <i className="ico-menu">{IconActive}</i>
      )}
      {!isActive && IconInActive && (
        <i className="ico-menu">{IconInActive}</i>
      )}
      <span className="label">{label}</span>
      {isActive && <i className="ico-arrow" />}
    </MenuWrapper>
  )
}

export default memo(Menu)

const TitleLabel = styled.strong`
  margin-bottom: 7px;
  display: block;
  color: ${COLOR.gray.color.gray[500]};
  font-size: ${({ theme }) => theme.font[12].size};
  line-height: ${({ theme }) => theme.font[12].lineHeight};
  font-weight: 500;
`

const MenuWrapper = styled.button<{ isActive: boolean }>`
  padding: 10px 10px 10px 12px;
  width: 100%;
  display: flex;
  gap: 7px;
  align-items: center;
  text-align: left;
  ${(props) => (props.isActive ? css`
    color: ${COLOR.gray.color.gray[800]};
    background-color: ${COLOR.gray.color.gray[200]};
    font-weight: 500;
  ` : css``)};
  border-radius: 8px;

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
  
  .ico-arrow {
    margin-left: auto;
    position: relative;
    display: inline-block;
    width: 7px;
    height: 14px;
  
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 7px;
      height: 7px;
      color: ${COLOR.gray.color.gray[600]};
      transform: translate(-50%, -50%) rotate(45deg);
      margin-left: -2px;
      border-top: 1px solid;
      border-right: 1px solid;
    }
  }
  
`
