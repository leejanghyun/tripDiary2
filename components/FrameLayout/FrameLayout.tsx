import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import {
  PropsWithChildren, useCallback,
} from 'react'

import { globalState } from '@/atoms/globalState'
import { menus } from '@/constants/menus'
import { getMenuPath, ROUTER } from '@/constants/router'

import Header from '../Header'
import { MENU_ID } from '../Menu/Menu'
import Sidebar from '../Sidebar/Sidebar'
import { GridSpaceBetween } from './styled'

interface Props {
  variant?: 'sidebar' | 'center'
}

function FrameLayout({
  children, variant = 'sidebar',
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

  /**
   * 광고 생성 버튼 클릭 시
   */
  const handlAdCreateButtonClick = useCallback(() => {
    router.push(ROUTER.ADVERTISEMENT_CAMPAIGN_MANAGEMENT.CREATE)
  }, [router])

  return (
    <Layout variant={variant}>
      <StyledHeader
        userName={user}
      />
      {/** 사이드 바 */}
      {variant === 'sidebar' && (
        <StyledSidebar
          items={menus}
          onChangeMenu={handleChangeMenu}
          onClickAdvertisementCreate={handlAdCreateButtonClick}
        />
      )}
      {/** Main */}
      <StyledGrid>
        {children}
      </StyledGrid>
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
      case 'center': // 가운데 정렬
        return css`
          grid-template-areas:
          "header "
          "content";
        `
      default: // sidebar
        return css`
          grid-template-areas:
          "header  header"
          "sidebar content";
          grid-template-columns: 120px minmax(0, 1fr);
        `
    }
  }}
`

const StyledHeader = styled(Header)`
  grid-area: header;
`

const StyledSidebar = styled(Sidebar)`
  grid-area: sidebar;
  overflow: auto;
`

const StyledGrid = styled(GridSpaceBetween)`
  overflow: hidden;
  grid-area: content;
`

export default FrameLayout
