import styled from '@emotion/styled'
import { COLOR } from '@TMOBI-WEB/ads-ui'
import { PropsWithChildren, ReactNode } from 'react'

import { ReactComponent as ErrorIcon } from '@/images/ico_20_sign_error.svg'
import { ReactComponent as IconStar } from '@/images/ico_star_char.svg'

type Props = {
  isError?: boolean
  isRequired?: boolean
  label: string
  borderBottom?: boolean
  borderTop?: boolean
  width?: number
}

export function TitleCol({
  label, isError = false, width, isRequired = false, borderBottom = true, borderTop = false, children,
}: PropsWithChildren<Props>) {
  return (
    <Wrapper
      width={width}
      isError={isError}
      isRequired={isRequired}
      borderBottom={borderBottom}
      borderTop={borderTop}
    >
      <div>
        {label}
        {isError && <IconError /> }
        {!isError && isRequired && <IconAsterisk />}
        {children}
      </div>
    </Wrapper>
  )
}

type StypeProps = {
  isError?: boolean
  isRequired?: boolean
  borderTop?: boolean
  borderBottom?: boolean
  width?: number
}

const Wrapper = styled.div<StypeProps>`
  color: ${COLOR.gray.color.gray[700]};
  font-weight: 250;
  font-size: ${({ theme }) => theme.font[14].size};
  line-height: ${({ theme }) => theme.font[14].lineHeight};
  display: flex;
  align-items: center;
  text-align: center;
  padding: 14px 12px;
  height: 100%;
  width: ${({ width }) => (width ? `${width}px;` : '100%;')};
  background: ${({ isError }) => (isError ? '#FEF7F6;' : '#F8F9FA;')};
  border-bottom: ${({ borderBottom }) => (borderBottom ? '1px solid #E5E5E5;' : '0px;')};
  border-top:: ${({ borderTop }) => (borderTop ? '1px solid #E5E5E5;' : '0px;')};
  gap: ${({ isError }) => (isError ? '37px;' : '8px;')};
  justify-content:${({ isError }) => (isError ? 'space-between;' : 'flex-start;')};

  > div {
    display:  flex;
    gap: 10px;
    text-align: center;
    align-items: center;
  }
`

export function MessageBoxContent({ children }: PropsWithChildren<{}>) {
  return (
    <MessageBoxWrapper>
      {children}
    </MessageBoxWrapper>
  )
}

const MessageBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export function IconError() {
  return (
    <IconErrorBase>
      <ErrorIcon
        width={23}
        height={23}
        viewBox="0 0 23 23"
      /><VisuallyHidden>에러</VisuallyHidden>
    </IconErrorBase>
  )
}

export function IconAsterisk() {
  return (
    <IconAsteriskBase>
      <IconStar
        width={12}
        height={12}
        viewBox="0 0 20 20"
      /><VisuallyHidden>필수</VisuallyHidden>
    </IconAsteriskBase>
  )
}

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

const IconAsteriskBase = styled.em`
  display: inline-flex;
  place-content: center;
  vertical-align: middle;
  position: relative;
  top: -1px;
  
  svg {
    path {
      fill: ${COLOR.primary.color.tmobi.blue[500]};
    }
  }
`

const IconErrorBase = styled.em`
  display: inline-flex;
  place-content: center;
  vertical-align: middle;
  position: relative;
  top: 3px;
  
  svg {
    path {
      fill: ${COLOR.semantic.color.red[500]};
    }
  }
`
