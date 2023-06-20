import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import {
  PropsWithChildren, useCallback,
} from 'react'

import { globalState } from '@/atoms/globalState'
import { menus } from '@/constants/menus'
import { getMenuPath } from '@/constants/router'

import { Footer } from '../Footer'
import Header from '../Header'
import { MENU_ID } from '../Menu/Menu'

interface Props {
  variant?: 'menu' | 'empty'
}

function FrameLayout({
  children, variant = 'menu',
}: PropsWithChildren<Props>) {
  const router = useRouter()
  const [state, setGlobalState] = useAtom(globalState)
  const { username: user } = state

  const handleChangeMenu = useCallback((id: MENU_ID | null) => {
    if (id) {
      setGlobalState({ ...state, menuId: id || null })

      router.push(getMenuPath(id))
    }
  }, [state, setGlobalState, router])

  return (
    <Layout>
      <Header
        userName={user}
      />
      <Main variant={variant}>
        {children}
      </Main>
      <Footer
        items={menus}
        onChangeMenu={handleChangeMenu}
      />
    </Layout>
  )
}

const Layout = styled.div`
  width: 100%;
  height: 100vh;
`

const Main = styled.div<{ variant?: string }>`
  padding: 20px;
  overflow: auto;

  ${({ variant }) => {
    switch (variant) {
      case 'empty':
        return css`
          height: calc(100vh - 50px);
        `
      default:
        return css`
          height: calc(100vh - 100px);
        `
    }
  }}
`

export default FrameLayout
