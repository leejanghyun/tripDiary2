import styled from '@emotion/styled'
import { COLOR } from '@TMOBI-WEB/ads-ui'
import { memo } from 'react'

import { MENU_ID } from '../Menu'
import MenuList, { MenuListItem } from '../MenuList/MenuList'

type Props = {
  items?: MenuListItem
  onChangeMenu: (id: MENU_ID | null) => void
}

function Footer({
  items = [], onChangeMenu,
}: Props) {
  return (
    <Wrapper>
      <MenuList
        items={items}
        onChange={(id) => { onChangeMenu(id) }}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  min-height: 50px;
  background-color: ${COLOR.gray.color.gray[100]};
`

export default memo(Footer)
