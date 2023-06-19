import styled from '@emotion/styled'
import { COLOR, DropdownMenu } from '@TMOBI-WEB/ads-ui'

import { ReactComponent as Profile } from '@/images/image_profile.svg'

type Props = {
  userName: string
}

function UtilContent({ userName }: Props) {
  return (
    <SideUtils>
      <Username>{userName}</Username>
      <DropdownMenu
        trigger={(
          <ProfileTrigger
            type="button"
          >
            <Profile />
          </ProfileTrigger>
        )}
        data={[
          {
            text: '로그아웃',
            onClick: () => {},
          },
        ]}
        sideOffset={8}
        side="bottom"
        align="end"
      />
    </SideUtils>
  )
}

const SideUtils = styled.aside`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 8px;
`

const Username = styled.em`
  color: ${COLOR.gray.color.gray[700]};
  font-size: ${({ theme }) => theme.font[12].size};
  line-height: ${({ theme }) => theme.font[12].lineHeight};
`

const ProfileTrigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  user-select: none;
`

export default UtilContent
