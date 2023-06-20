import { css } from '@emotion/react'

export const globalStyles = css`
  body {
    /** 구글 맵 Logo 지우기 */
    a[href^="http://maps.google.com/maps"],
    a[href^="https://maps.google.com/maps"],
    a[href^="https://www.google.com/maps"] {
      display: none !important;
    }
    .gm-bundled-control .gmnoprint {
      display: block;
    }
    .gmnoprint:not(.gm-bundled-control) {
      display: none;
    }
  }
`
