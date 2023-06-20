import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import {
  PropsWithChildren,
} from 'react'

import { globalState } from '@/atoms/globalState'
import { menus } from '@/constants/menus'
import { getMenuPath } from '@/constants/router'

import { Footer } from '../Footer'
import Header from '../Header'
import { MENU_ID } from '../Menu/Menu'
import { GridSpaceBetween } from './styled'

interface Props {
  variant?: 'menu' | 'empty'
}

function FrameLayout({
  children, variant = 'menu',
}: PropsWithChildren<Props>) {
  const router = useRouter()
  const [state, setGlobalState] = useAtom(globalState)
  const { username: user } = state

  const handleChangeMenu = (id: MENU_ID | null) => {
    if (id) {
      setGlobalState({ ...state, menuId: id || null })

      router.push(getMenuPath(id))
    }
  }

  return (
    <Layout variant={variant}>
      <StyledHeader
        userName={user}
      />
      {/** Main */}
      <StyledGrid>
        {children}
      </StyledGrid>
      {variant === 'menu' && (
        <StyledFooter
          items={menus}
          onChangeMenu={handleChangeMenu}
        />
      )}
    </Layout>
  )
}

const Layout = styled.div<{ variant?: any }>`
  position: fixed;
  overflow: hidden;
  display: grid;
  grid-template-rows: 50px minmax(0, 1fr);
  width: 100%;
  height: 100vh;

  ${({ variant }) => {
    switch (variant) {
      case 'empty': // 가운데 정렬
        return css`
          grid-template-areas:
            "header "
            "content";
        `
      default:
        return css`
          grid-template-areas:
            "header  header"
            "content content"
            "footer footer"
          ;
          grid-template-columns: 120px minmax(0, 1fr);
        `
    }
  }}
`

const StyledHeader = styled(Header)`
  grid-area: header;
`

const StyledFooter = styled(Footer)`
  overflow: auto;
`

const StyledGrid = styled(GridSpaceBetween)`
  overflow: hidden;
  grid-area: content;
  padding: 20px;
`

export default FrameLayout
