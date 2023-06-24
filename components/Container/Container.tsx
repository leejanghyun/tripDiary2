import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode } from 'react'

type Props = {
  paddingTop?: number,
  children?: ReactNode
}

function Container({
  paddingTop = 0,
  children,
}: Props) {
  return (
    <Main paddingTop={paddingTop}>
      {children}
    </Main>
  )
}

const Main = styled.main<{ paddingTop: number }>`
  flex-grow: 1;
  
  ${({ paddingTop }) => css`
    padding-top: ${paddingTop}px;
  `}
`

export default Container
