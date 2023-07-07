import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  Button,
  COLOR,
  Dialog,
} from '@TMOBI-WEB/ads-ui'
import { useCallback, useEffect, useState } from 'react'

import useMyFeeds from '@/feature/shared/hooks/useMyFeeds'

import FeedCard from '../../shared/components/FeedCard/FeedCard'

type Props = {
  feedList: string[]
  isOpen: boolean
  onCancel: () => void
  onFeedAdd: () => void
}

function FeedSelectModal({
  feedList, isOpen, onCancel, onFeedAdd,
}: Props) {
  const [isOpenFeedModal, setOpenFeedModal] = useState(isOpen)
  const { data } = useMyFeeds()
  const { content } = data || {}

  console.log(feedList, content)

  useEffect(() => {
    setOpenFeedModal(isOpen)
  }, [isOpen])

  const handleCancelClick = useCallback(() => {
    onCancel()
  }, [onCancel])

  const handleAddClick = useCallback(() => {
    onFeedAdd()
  }, [onFeedAdd])

  return (
    <Dialog
      open={isOpenFeedModal}
      styles={DialogStyles}
    >
      <Container>
        <Title>
          피드 선택
        </Title>
        <FeedsContent>
          {(content || []).map((feed) => (
            <CardWrapper
              key={feed._id}
            >
              <FeedCard
                disableEditDropDown
                hideBottom
                {...feed}
              />
            </CardWrapper>
          ))}
        </FeedsContent>
        <ButtonWrapper>
          <Button
            palette="white"
            type="button"
            size="small"
            onClick={handleCancelClick}
          >
            취소
          </Button>
          <Button
            palette="blue"
            type="button"
            size="small"
            onClick={handleAddClick}
          >
            추가
          </Button>
        </ButtonWrapper>
      </Container>
    </Dialog>
  )
}

const CardWrapper = styled.div`
  display: flex;
`

const DialogStyles = css`
  width: 90%;
  height: 90%;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 20px;
  width: 100%;
  height: 100%;
  color: ${COLOR.gray.color.gray[900]};
  font-weight: 500;
  font-size: ${({ theme }) => theme.font[18].size};
  line-height: ${({ theme }) => theme.font[18].lineHeight};
`

const Title = styled.div`
  display: flex;
  width: 100%;
  padding-top: 20px;
  height: 10%;
`

const FeedsContent = styled.div`
  display: flex;
  overflow-x: hidden;
  overflow-y: auto;
  height: 75%;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 10px;
`

export default FeedSelectModal
