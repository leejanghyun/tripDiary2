import { css } from '@emotion/react'
import { COLOR } from '@TMOBI-WEB/ads-ui'

export const globalStyles = css`
  body {
    /** 구글 맵 Logo 지우기 */


    img[src$="#custom_marker"]{
      border: 1px solid ${COLOR.primary.color.tmobi.blue[200]} !important;
      border-radius: 20%;
    }

    #__next {
    overflow: hidden;

    }
  }
`
