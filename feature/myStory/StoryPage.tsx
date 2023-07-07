import styled from '@emotion/styled'
import {
  Button, COLOR,
} from '@TMOBI-WEB/ads-ui'
import { ParsedUrlQuery } from 'querystring'

import FrameLayout from '@/components/FrameLayout'
import useStory from '@/feature/shared/hooks/useStory'
import { ReactComponent as EmptyBox } from '@/images/ico_empty_box.svg'

type Props = {
  query?: ParsedUrlQuery
}

function StoryPage({ query }: Props) {
  const { id } = query || {}
  const { data } = useStory(id as string)
  const { content: story } = data || {}
  const { title, feedList = [] } = story || {}
  const isEmpty = !feedList || feedList.length === 0

  return (
    <FrameLayout
      title="스토리"
      right={(
        <RightSide>
          <Button
            type="submit"
            size="small"
            palette="blue-stroke"
          >
            피드 추가
          </Button>
        </RightSide>
          )}
    >
      <Container>
        <div>
          {title}
        </div>
        {isEmpty && (
        <EmptyBoxWrapper>
          <EmptyBox />
          등록된 피드가 없습니다.
        </EmptyBoxWrapper>
        )}
      </Container>
    </FrameLayout>
  )
}

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const Container = styled.div`
  padding: 10px;
  width: 100%;
  height: 100%;
`

const EmptyBoxWrapper = styled.div`
  display: flex;
  gap: 2px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${COLOR.gray.color.gray[500]};
  font-size: ${({ theme }) => theme.font[18].size};
  line-height: ${({ theme }) => theme.font[18].lineHeight};
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
`

export default StoryPage
