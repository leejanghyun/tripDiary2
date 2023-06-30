import { css } from '@emotion/react'
import { COLOR } from '@TMOBI-WEB/ads-ui'

export const globalStyles = css`
  body {
    /** 구글 맵 Logo 지우기 */
    a[href^="http://maps.google.com/maps"],
    a[href^="https://maps.google.com/maps"],
    a[href^="https://www.google.com/maps"] {
      display: none !important;
    }

    img[src$="#custom_marker"]{
      border: 1px solid ${COLOR.primary.color.tmobi.blue[400]} !important;
      border-radius: 20%;
    }
  }
`
