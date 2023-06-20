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
import { useMount } from '@/hooks/useMount'

import { Footer } from '../Footer'
import Header from '../Header'
import { MENU_ID } from '../Menu/Menu'

interface Props {
  menuId: MENU_ID
  variant?: 'menu' | 'empty'
  isFullSize?: boolean
}

function FrameLayout({
  children, variant = 'menu', isFullSize, menuId,
}: PropsWithChildren<Props>) {
  const isShowMenu = variant === 'menu'
  const router = useRouter()
  const [state, setGlobalState] = useAtom(globalState)
  const { username: user } = state

  useMount(() => {
    setGlobalState({
      ...state, menuId: menuId || null,
    })
  })

  const handleChangeMenu = useCallback((id: MENU_ID | null) => {
    console.log(id)
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
      <Main
        variant={variant}
        isFullSize={isFullSize}
      >
        {children}
      </Main>
      {isShowMenu && (
      <Footer
        items={menus}
        onChangeMenu={handleChangeMenu}
      />
      )}
    </Layout>
  )
}

const Layout = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`

const Main = styled.div<{ variant?: string, isFullSize?: boolean }>`

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

${({ isFullSize }) => {
    return css`
      padding: ${isFullSize ? '0' : '15px 20px'}};
    `
  }}

`

export default FrameLayout
