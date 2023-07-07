import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  Button,
  COLOR,
  Dialog,
} from '@TMOBI-WEB/ads-ui'
import {
  useCallback,
  useEffect, useState,
} from 'react'

import { getFeeds } from '@/api/getFeeds'
import { Story } from '@/db'

import Video from './Video'

type Props = {
  story?: Story | null
  isOpen: boolean
  onCancel: () => void
}

function VideoViewModal({
  story, isOpen, onCancel,
}: Props) {
  const [isOpenModal, setOpenModal] = useState<boolean>(isOpen)
  const [selectedImageUrls, setSelectedImageUrls] = useState<string[]>([])

  const init = useCallback(async (ids: string[]) => {
    if (ids && ids.length > 0) {
      const res = await getFeeds(ids)
      const { content: feedContents } = res || {}
      const joinedImageUrls = feedContents.flatMap((item) => item.fileList || [])
      const filteredUrls = joinedImageUrls.filter((item) => item)

      setSelectedImageUrls(filteredUrls)
    }
  }, [])

  useEffect(() => {
    const ids = story?.feedList || []

    if (ids && ids.length > 0) {
      init(ids)
    }
  }, [story, init])

  useEffect(() => {
    setOpenModal(isOpen)
  }, [isOpen])

  return (
    <Dialog
      open={isOpenModal}
      styles={DialogStyles}
    >
      <Container>
        <Title>
          스토리 재생
        </Title>
        <Content>
          <Video imageUrls={selectedImageUrls} />
        </Content>
        <ButtonWrapper>
          <Button
            palette="white"
            type="button"
            size="small"
            onClick={onCancel}
          >
            취소
          </Button>
        </ButtonWrapper>
      </Container>
    </Dialog>
  )
}

const DialogStyles = css`
  width: 90%;
  height: 60%;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 10px 20px;
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
`

const Content = styled.div`
  display: flex;
  overflow-x: hidden;
  overflow-y: hidden;
  height: 70%;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 10px;
  width: 100%;
  gap: 10px;
`

export default VideoViewModal
