import styled from '@emotion/styled'
import { COLOR } from '@TMOBI-WEB/ads-ui'
import { useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'

import { GetMyFeedsResponse } from '@/api'
import FrameLayout from '@/components/FrameLayout'
import { Map } from '@/components/Map'
import { MENU_ID } from '@/components/Menu'
import { ROUTER } from '@/constants/router'
import { Feed } from '@/db'
import { feedMetaState } from '@/feature/shared/atoms/feedMetaState'
import useMyFeeds from '@/feature/shared/hooks/useMyFeeds'
import { ReactComponent as IcoMarker } from '@/images/ico_marker.svg'
import { formatDisplayDateTime } from '@/utils'

import CustomImage from '../../components/CustomImage'
import AddButton from './components/AddFeedButton'
import CameraButton from './components/CameraButton'

function HomePage() {
  const router = useRouter()
  const setMeta = useSetAtom(feedMetaState)
  const { data } = useMyFeeds()
  const { content } = data as GetMyFeedsResponse || {}
  const [isShowFeedInfoBox, setShowFeedInfoBox] = useState<boolean>(false)
  const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null)
  const {
    title, content: feedContent, _id, date, searchText, fileList,
  } = selectedFeed || {}
  const startDate = formatDisplayDateTime(new Date(date ? date[0] : ''), 'yy년 MM월 dd일')
  const endDate = formatDisplayDateTime(new Date(date ? date[1] : ''), 'yy년 MM월 dd일')

  /** 지도 마커 */
  const markers = useMemo(() => {
    return (content || []).map((feed) => {
      const { _id, location, fileList } = feed || {}

      return { id: _id, location, fileList }
    })
  }, [content])

  const moveFeedAdd = useCallback(() => {
    router.push(ROUTER.ADD_FEED)
  }, [router])

  const handleUpload = useCallback((file: FileList) => {
    setMeta(file)
    router.push(ROUTER.ADD_FEED)
  }, [router, setMeta])

  const handleClickMarker = useCallback((id: string) => {
    const target = content.find((feed) => feed._id === id)

    if (!target) {
      return
    }

    setSelectedFeed(target)
    setShowFeedInfoBox(true)
  }, [content])

  const handleClickOutside = useCallback(() => {
    setShowFeedInfoBox(false)
  }, [])

  const handleMoveFeed = useCallback(() => {
    router.push(`/edit/${_id}`)
  }, [_id, router])

  return (
    <FrameLayout
      title="홈"
      menuId={MENU_ID.MAIN}
      isFullSize
    >
      <Map
        markers={markers}
        onClickOutside={handleClickOutside}
        onClickMarker={handleClickMarker}
      />
      {isShowFeedInfoBox && (
        <FeedInfoBox onClick={handleMoveFeed}>
          <div>{title}</div>
          <div>{feedContent}</div>
          <ImageWrapper>
            <CustomImage
              width={45}
              height={45}
              imageDescriptions={[]}
              images={fileList || []}
            />
          </ImageWrapper>
          <div>
            {startDate === endDate ? startDate : `${startDate}/${endDate}`}
          </div>
          <div>
            <SearchText>
              <IcoMarker /> <div>{searchText}</div>
            </SearchText>
          </div>
        </FeedInfoBox>
      )}
      <CameraButton onUpload={handleUpload} />
      <AddButton onClick={moveFeedAdd} />
    </FrameLayout>
  )
}

const ImageWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  margin: 5px 0;
  flex-wrap: wrap;
`

const SearchText = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  position: relative;

  > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const FeedInfoBox = styled.div`
  width: 95%;
  position: fixed;
  flex-direction: column;
  top: 60px;
  display: flex;
  padding: 10px;
  margin: 0 auto;
  left: 0;
  right: 0;
  gap: 4px;
  border: 2px solid ${COLOR.gray.color.gray[300]};
  background: ${COLOR.gray.color.wb[0]};
  border-radius: 10px;

  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > div:first-of-type {
    font-size: ${({ theme }) => theme.font[20].size};
    line-height: ${({ theme }) => theme.font[20].lineHeight};
  }

  > div:nth-of-type(2) { // 내용
    font-size: ${({ theme }) => theme.font[14].size};
    line-height: ${({ theme }) => theme.font[14].lineHeight};
  }

  > div:nth-of-type(4) { // 날짜
    font-size: ${({ theme }) => theme.font[10].size};
    line-height: ${({ theme }) => theme.font[10].lineHeight};
  }

  > div:nth-of-type(5) { // 위치
    font-size: ${({ theme }) => theme.font[10].size};
    line-height: ${({ theme }) => theme.font[10].lineHeight};
  }


`

export default HomePage
