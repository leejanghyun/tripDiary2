import styled from '@emotion/styled'
import { COLOR } from '@TMOBI-WEB/ads-ui'

import { ReactComponent as IconPlus } from '../../images/ico_item_add.svg'
import { MENU_ID } from '../Menu'
import MenuList, { MenuListItem } from '../MenuList/MenuList'

type Props = {
  className?: string
  items?: MenuListItem
  onChangeMenu: (id: MENU_ID | null) => void
  onClickAdvertisementCreate: () => void
}

function Sidebar({
  className, items = [], onChangeMenu, onClickAdvertisementCreate,
}: Props) {
  return (
    <Wrapper className={className}>
      <GroupWrapper>
        <AdButtonWrapper
          onClick={onClickAdvertisementCreate}
        >
          추가
          <IconPlus />
        </AdButtonWrapper>
      </GroupWrapper>
      <GroupWrapper>
        <MenuList
          items={items}
          onChange={(id) => { onChangeMenu(id) }}
        />
      </GroupWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: ${COLOR.gray.color.gray[100]};
  border-right: 1px solid ${COLOR.gray.color.gray[200]};
`

const GroupWrapper = styled.div`
  padding: 20px 16px;
  
  & ~ & {
    border-top: 1px solid ${COLOR.gray.color.gray[200]};
  }
`

const AdButtonWrapper = styled.button`
  display: flex;
  place-content: center;
  gap: 6px;
  padding: 12px;
  width: 100%;
  color: #fff;
  font-size: ${({ theme }) => theme.font[14].size};
  line-height: ${({ theme }) => theme.font[14].lineHeight};
  font-weight: 500;
  background: linear-gradient(93.3deg, #783CFF 0%, #0064FF 100%);
  border-radius: 10em;
`

export default Sidebar
