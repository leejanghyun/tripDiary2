import styled from '@emotion/styled'
import { COLOR } from '@TMOBI-WEB/ads-ui'
import { ReactNode } from 'react'

import { ReactComponent as IconStar } from '@/images/ico_star_char.svg'

type PageTitleProps = {
  title: ReactNode
}

export function PageTitle({ title }: PageTitleProps) {
  return (
    <PageTitleBase>
      {title}
    </PageTitleBase>
  )
}

const PageTitleBase = styled.h2`
  margin-bottom: 40px;
  color: ${COLOR.gray.color.gray[900]};
  font-size: ${({ theme }) => theme.font[24].size};
  line-height: ${({ theme }) => theme.font[24].lineHeight};
  font-weight: 500;
`

export function VisuallyHidden({ children, as }: {
  children: ReactNode
  as?: any
}) {
  return (
    <StyledVisuallyHidden as={as}>
      {children}
    </StyledVisuallyHidden>
  )
}

const StyledVisuallyHidden = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
`

export function IconAsterisk() {
  return (
    <IconAsteriskBase>
      <IconStar
        width={14}
        height={14}
        viewBox="0 0 24 24"
      /><VisuallyHidden>필수</VisuallyHidden>
    </IconAsteriskBase>
  )
}

const IconAsteriskBase = styled.em`
  display: inline-flex;
  place-content: center;
  vertical-align: middle;
  
  svg {
    path {
      fill: ${COLOR.primary.color.tmobi.blue[500]};
    }
  }
`
