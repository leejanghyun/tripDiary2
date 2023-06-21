import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Tooltip } from '@TMOBI-WEB/ads-ui'
import { ReactNode } from 'react'

type Props = {
  title?: string | ReactNode
  titleTooltipMessage?: string
  descriptionTooltipMessages?: string[]
  paddingTop?: number,
  children?: ReactNode
}

function Container({
  title,
  titleTooltipMessage,
  descriptionTooltipMessages,
  paddingTop = 0,
  children,
}: Props) {
  return (
    <Main paddingTop={paddingTop}>
      {(title) && (
      <article>
        {title && (
          <TitleBlock>
            <Title>
              {title}
            </Title>
            {(titleTooltipMessage || descriptionTooltipMessages) && (
              <Tooltip
                side="bottom"
                align="start"
                title={titleTooltipMessage}
                descriptions={descriptionTooltipMessages}
              />
            )}
          </TitleBlock>
        )}
      </article>
      )}
      {children}
    </Main>
  )
}

const Main = styled.main<{ paddingTop: number }>`
  flex-grow: 1;
  
  ${({ paddingTop }) => css`
    padding-top: ${paddingTop}px;
  `}
`

const TitleBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`

const Title = styled.h2`
  margin-right: 8px;
  display: inline-flex;
  font-size: 20px;
  line-height: 30px;
  font-weight: 500;
`

export default Container
