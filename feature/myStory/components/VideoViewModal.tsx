import styled from '@emotion/styled'
import {
  COLOR,
} from '@TMOBI-WEB/ads-ui'
import {
  useCallback,
  useEffect, useState,
} from 'react'

import { getFeeds } from '@/api/getFeeds'
import { RemoveButton } from '@/components/RemoveButton/RemoveButton'
import { Story } from '@/db'
import { formatDate } from '@/utils'

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
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [selectedImageUrls, setSelectedImageUrls] = useState<string[]>([])
  const [selectedImageDate, setSelectedImageDate] = useState<string[]>([])
  const [selectedImageTitle, setSelectedImageTitle] = useState<string[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = prevIndex + 1
        return nextIndex >= selectedImageUrls.length ? prevIndex : nextIndex
      })

      // setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length) []
    }, 2000)
    return () => clearTimeout(timer)
  }, [currentImageIndex, selectedImageUrls])

  const init = useCallback(async (ids: string[]) => {
    if (ids && ids.length > 0) {
      const res = await getFeeds(ids)
      const { content: feedContents } = res || {}
      const { length } = feedContents || {}
      const titles: string[] = []
      const fileLists: string[] = []
      const dates: string[] = []
      const DATE_FORMAT = 'yyyy년 M월 d일'

      for (let i = 0; i < length; i += 1) {
        const { title, date, fileList } = feedContents[i]
        const { length: fileLen = 0 } = fileList || {}

        if (fileList) {
          for (let j = 0; j < fileLen; j += 1) {
            const [startDate, endDate] = date
            const formatStartDate = formatDate(startDate, DATE_FORMAT)
            const formatEndDate = formatDate(endDate, DATE_FORMAT)
            const target = formatStartDate === formatEndDate ? formatDate(startDate, DATE_FORMAT)
              : `${formatDate(startDate, DATE_FORMAT)} ~ ${formatDate(endDate, DATE_FORMAT)}`

            dates.push(target)
            titles.push(title)
            fileLists.push(fileList[j])
          }
        }
      }

      setSelectedImageTitle(titles)
      setSelectedImageUrls(fileLists)
      setSelectedImageDate(dates)
    }
  }, [])

  useEffect(() => {
    const ids = story?.feedList || []

    if (ids && ids.length > 0) {
      init(ids)
    }
  }, [story, init])

  useEffect(() => {
    setCurrentImageIndex(0)
    setOpenModal(isOpen)
  }, [isOpen])

  if (!isOpenModal) {
    return null
  }

  return (
    <FullDialog>
      <RemoveButton
        variant="naked"
        onClick={onCancel}
      />
      <Top>
        <Title>
          {selectedImageTitle[currentImageIndex]}
        </Title>
        <DateRange>{selectedImageDate[currentImageIndex]}</DateRange>
      </Top>
      <Container>
        <Video
          imageUrls={selectedImageUrls}
          currentImageIndex={currentImageIndex}
        />
      </Container>
    </FullDialog>
  )
}

const Top = styled.div`
  height: 12%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 20px;
  gap: 5px;
  color: ${COLOR.gray.color.wb[0]};
`

const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: ${({ theme }) => theme.font[18].size};
  line-height: ${({ theme }) => theme.font[18].lineHeight};
`

const DateRange = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.font[14].size};
  line-height: ${({ theme }) => theme.font[14].lineHeight};

`

const FullDialog = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`

const Container = styled.div`
  display: flex;
  align-items: center;
  height: calc(88% - 50px);
  justify-content: center;
  width: 100%;
`

export default VideoViewModal
