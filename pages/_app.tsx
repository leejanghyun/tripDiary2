import { Global } from '@emotion/react'
import {
  CustomThemeProvider,
} from '@TMOBI-WEB/ads-ui'
import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'
import Head from 'next/head'
import absoluteUrl from 'next-absolute-url'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider } from 'react-query'

import GlobalStatus from '@/components/GlobalStatus/GlobalStatus'
import {
  CONFIG, COOKIE_KEYS,
} from '@/constants'
import { queryClient } from '@/constants/queryClient'
import { globalStyles } from '@/styles/global'
import { encode, isServer } from '@/utils'

require('dotenv').config()

type PageComponentProps = {
  pageName?: string
  session?: Session
}

export default function ManagersApp({
  Component,
  pageProps,
  origin,
}: AppProps & { origin: string }) {
  const pageName = ((pageProps as AppProps['pageProps'] & PageComponentProps).pageName
  || (Component as AppProps['Component'] & PageComponentProps).pageName) || ''
  const session = ((pageProps as AppProps['pageProps'] & PageComponentProps).session
  || (Component as AppProps['Component'] & PageComponentProps).session)

  console.log('develop')

  return (
    <>
      <DefaultHead
        origin={origin}
        title={pageName}
      />
      <Global styles={globalStyles} />
      <QueryClientProvider client={queryClient}>
        <CustomThemeProvider>
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </CustomThemeProvider>
      </QueryClientProvider>

      {/** GlobalStatus(Toast, Spinner) 컴포넌트 */}
      <GlobalStatus />
    </>
  )
}

function DefaultHead({ origin, title }: { origin: string, title?: string }) {
  return (
    <Head>
      {title && <title>{title}</title>}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <meta
        name="description"
        content={CONFIG.DESCRIPTION}
      />
      <meta
        httpEquiv="X-UA-Compatible"
        content="IE=edge"
      />
      <meta
        name="apple-mobile-web-app-title"
        content={CONFIG.TITLE}
      />
      <meta
        property="og:type"
        content="website"
      />
      <meta
        property="og:url"
        content={origin}
      />
      <meta
        property="og:title"
        content={CONFIG.TITLE}
      />
      <meta
        property="og:image:width"
        content="1200"
      />
      <meta
        property="og:image:height"
        content="630"
      />
      <meta
        property="og:description"
        content={CONFIG.DESCRIPTION}
      />
      <meta
        property="og:site_name"
        content={CONFIG.TITLE}
      />
      <meta
        property="og:locale"
        content="ko_KR"
      />
      <meta
        name="twitter:card"
        content="summary"
      />
      <meta
        name="twitter:url"
        content={origin}
      />
      <meta
        name="twitter:title"
        content={CONFIG.TITLE}
      />
      <meta
        name="twitter:description"
        content={CONFIG.DESCRIPTION}
      />
      <meta
        name="twitter:image"
        content={`${origin}/images/banner.jpg`}
      />
      <meta
        name="naver-site-verification"
        content="72f5d31298efafef8a32f31e3cc15abb52fdbe4c"
      />
      <meta
        name="google-site-verification"
        content="-0nUMvRr3xJSIEkrAHu02d4GRtnY1IOHprQ1FyY67EM"
      />
    </Head>
  )
}

ManagersApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)
  const { req, res } = appContext.ctx
  const setCookies = []

  setCookies.push(`domain=${CONFIG.DOMAIN}; path=/;`)

  if (isServer) {
    const ua = req?.headers[CONFIG.HEADERS.USER_AGENT]

    if (ua) {
      setCookies.push(`${COOKIE_KEYS.USER_AGENT}=${encode(ua as string)}; domain=${CONFIG.DOMAIN}; path=/;`)
    }
  }

  res?.setHeader('Set-Cookie', setCookies)

  return {
    ...appProps,
    origin: `https://${absoluteUrl(req).host}`,
  }
}
