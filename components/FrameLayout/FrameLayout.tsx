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
    <Layout variant={variant}>
      <StyledHeader
        userName={user}
      />
      <Main>
        {children}
      </Main>
      <StyledFooter
        items={menus}
        onChangeMenu={handleChangeMenu}
      />
    </Layout>
  )
}

const Layout = styled.div<{ variant?: any }>`
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100vh;
`

const StyledHeader = styled(Header)`
  height: 50px;
`

const StyledFooter = styled(Footer)`
  height: 50px;
  overflow: auto;
`

const Main = styled.div`
  padding: 20px;
  height: calc(100vh - 100px);
`

export default FrameLayout
