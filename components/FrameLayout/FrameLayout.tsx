import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { COLOR } from '@TMOBI-WEB/ads-ui'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import {
  PropsWithChildren, useCallback, useEffect,
} from 'react'

import { globalState } from '@/atoms/globalState'
import { Footer } from '@/components/Footer'
import { menus } from '@/constants/menus'
import { getMenuPath } from '@/constants/router'
import useAuth from '@/hooks/useAuth'

import Header from '../Header'
import { TitleProps } from '../Header/Header'
import { MENU_ID } from '../Menu/Menu'

type Props = {
  menuId?: MENU_ID
  variant?: 'menu' | 'empty'
  isFullSize?: boolean
  background?: 'white' | 'gray'
  headerPadding?: number
} & TitleProps

function FrameLayout({
  children, left, right, variant = 'menu',
  headerPadding,
  isFullSize, menuId, title, titleTooltipMessage, descriptionTooltipMessages, background,
}: PropsWithChildren<Props>) {
  const isShowMenu = variant === 'menu'
  const router = useRouter()
  const [state, setGlobalState] = useAtom(globalState)
  const { userId: user } = state
  const { session } = useAuth()

  useEffect(() => {
    const { user } = session || {}

    setGlobalState({
      ...state, userId: user?.email || user?.name || 'jangheon.lee012@gmail.com', menuId: menuId || null,
    })
  }, [session, setGlobalState, menuId])

  const handleChangeMenu = useCallback((id: MENU_ID | null) => {
    if (!id) {
      return
    }

    setGlobalState({ ...state, menuId: id || null })
    router.push(getMenuPath(id))
  }, [state, setGlobalState, router])

  return (
    <Layout background={background}>
      <Header
        title={title}
        titleTooltipMessage={titleTooltipMessage}
        descriptionTooltipMessages={descriptionTooltipMessages}
        userName={user}
        left={left}
        padding={headerPadding}
        right={right}
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

const Layout = styled.div<{ background?: string }>`
  width: 100%;
  height: 100vh;
  overflow: hidden;

  ${({ background }) => {
    switch (background) {
      case 'gray':
        return css`
          background: ${COLOR.gray.color.gray[100]}
        `
      default:
        return css`
          background: ${COLOR.gray.color.wb[0]}
        `
    }
  }}
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
