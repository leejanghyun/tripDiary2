import styled from '@emotion/styled'
import { COLOR } from '@TMOBI-WEB/ads-ui'
import {
  memo,
} from 'react'

import UtilContent from './UtilContent'

type Props = {
  className?: string
  userName: string
}

/**
 * Header 컴포넌트
 * @category Header 컴포넌트
 */
function Header({ userName, className }: Props) {
  return (
    <Wrapper className={className}>
      <div>
        Sample Test
        <UtilContent userName={userName} />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  background-color: ${COLOR.gray.color.wb[0]};
  border-bottom: 1px solid ${COLOR.gray.color.gray[200]};

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 50px;
    padding: 0 20px;
  }
`

export default memo(Header)
