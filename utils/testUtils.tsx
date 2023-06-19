import { render, RenderOptions } from '@testing-library/react'
import { CustomThemeProvider } from '@TMOBI-WEB/ads-ui'
import { PropsWithChildren, ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { NEXT_ID, PORTAL_ID } from '@/constants'

export * from '@testing-library/react'

/**
 * Theme Provider 컴포넌트
 * @category Theme Provider 컴포넌트
 */
function ThemeProviders({ children }: PropsWithChildren<unknown>) {
  return <CustomThemeProvider>{children}</CustomThemeProvider>
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

/**
 * Query Provider 컴포넌트
 * @category Query Provider 컴포넌트
 */
export function QueryProvider({ children }: PropsWithChildren<unknown>) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

/**
 * 모든 Provider Import하는 컴포넌트
 * @category 모든 Provider Import하는 컴포넌트
 */
function AllTheProviders({ children }: PropsWithChildren<unknown>) {
  return (
    <QueryProvider>
      <ThemeProviders>
        {children}
      </ThemeProviders>
    </QueryProvider>
  )
}

/**
 * 모든 필요한 Container 반환
 * - Rendering 전에 필요한 Dom Container 반환
 * @returns Document Frangemt 객체
 */
function AllTheContainer() {
  const fragment = document.createDocumentFragment()
  const next = document.createElement('div')
  const portal = document.createElement('div')

  next.id = NEXT_ID
  portal.id = PORTAL_ID

  next.appendChild(portal)
  fragment.append(next)

  return fragment
}

/**
 * Jest의 렌더링을 감싼 CustemRender 함수
 * @param ui 리엑트 컴포넌트
 * @param options RenderOptions
 * @returns 렌더링 결과
 */
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queryies'>,
) => {
  document.body.appendChild(AllTheContainer())
  const next = document.getElementById(NEXT_ID)
  const testDiv = document.createElement('div')

  return render(ui, {
    wrapper: AllTheProviders,
    container: next?.appendChild(testDiv),
    ...options,
  })
}

export { customRender as render }
