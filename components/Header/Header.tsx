import styled from '@emotion/styled'
import { COLOR, Tooltip } from '@TMOBI-WEB/ads-ui'
import {
  memo, ReactNode,
} from 'react'

import UtilContent from './UtilContent'

export type TitleProps = {
  title?: string | ReactNode
  titleTooltipMessage?: string
  descriptionTooltipMessages?: string[]
  left?: ReactNode
  right?: ReactNode
}

type HeaderProps = {
  className?: string
  userName: string
  padding?: number
} & TitleProps

/**
 * Header 컴포넌트
 * @category Header 컴포넌트
 */
function Header({
  userName,
  left = '',
  padding = 20,
  right = <UtilContent userName={userName} />,
  className, title, titleTooltipMessage, descriptionTooltipMessages,
}: HeaderProps) {
  return (
    <Wrapper
      className={className}
      padding={padding}
    >
      <div>
        {left
        || (title && (
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
        ))}
        {right}
      </div>
    </Wrapper>
  )
}

const TitleBlock = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.h2`
  margin-right: 8px;
  display: inline-flex;
  font-size: 17px;
  line-height: 30px;
  font-weight: 500;
`

const Wrapper = styled.header<{ padding?: number }>`
  background-color: ${COLOR.gray.color.wb[0]};
  border-bottom: 1px solid ${COLOR.gray.color.gray[200]};

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 50px;
    padding: ${({ padding = 20 }) => `0 ${padding}px;`}
  }
`

export default memo(Header)
