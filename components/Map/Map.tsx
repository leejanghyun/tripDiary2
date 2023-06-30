import styled from '@emotion/styled'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { Loader } from '@TMOBI-WEB/ads-ui'
import { useRouter } from 'next/router'
import {
  useCallback,
  useEffect, useMemo, useState,
} from 'react'

import { ReactComponent as IcoMarker } from '@/images/ico_marker.svg'
import { formatDisplayDateTime } from '@/utils'
import { getGoogleMapApi, getPosition, Location } from '@/utils/map'

import { Feed } from '../../db'
import CustomImage from '../CustomImage'

const DEFAULT_ZOOM_LEVEL = 11
const ICON_SIZE = {
  width: 40,
  height: 40,
} as google.maps.Size

const DEFAULT_MAP_OPTIONS = {
  fullscreenControl: false,
  mapTypeId: 'roadmap', // ('roadmap', 'satellite', 'hybrid', 'terrain')
  mapTypeControl: false,
  zoomControl: false,
  disableDefaultUI: true,
}

type Markers = {
  location: Location
  fileList?: string[] | null
  id?: string
}

type Props = {
  defaultLocation?: Location | null
  markers: Markers[]
  feeds?: Feed[]
  width?: string | number
  height?: string | number
  zoom?: number
}

function Map({
  defaultLocation = null, zoom = DEFAULT_ZOOM_LEVEL, height = '100%', width = '100%', markers = [], feeds,
}: Props) {
  const [location, setLocation] = useState<null | Location>(null)
  const apiKey = getGoogleMapApi()
  const router = useRouter()
  const [isShowFeedInfoBox, setShowFeedInfoBox] = useState<boolean>(false)
  const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null)
  const {
    title, content: feedContent, _id, date, searchText, fileList,
  } = selectedFeed || {}
  const startDate = formatDisplayDateTime(new Date(date ? date[0] : ''), 'yy년 MM월 dd일')
  const endDate = formatDisplayDateTime(new Date(date ? date[1] : ''), 'yy년 MM월 dd일')

  const handleClickMarker = useCallback((id: string) => {
    const target = (feeds || []).find((feed) => feed._id === id)

    if (!target) {
      return
    }

    setSelectedFeed(target)
    setShowFeedInfoBox(true)
  }, [feeds])

  const handleClickOutside = useCallback(() => {
    setShowFeedInfoBox(false)
  }, [])

  const handleMoveFeed = useCallback(() => {
    router.push(`/edit/${_id}`)
  }, [_id, router])

  const initLocation = async () => {
    const location = await getPosition()

    setLocation(location)
  }

  useEffect(() => {
    initLocation()
  }, [])

  useEffect(() => {
    setLocation(defaultLocation)
  }, [defaultLocation])

  return (
    <LoadScript
      googleMapsApiKey={apiKey as string}
      loadingElement={<Loader open />}
    >
      {isShowFeedInfoBox && (
      <FeedInfoBox
        onClick={handleMoveFeed}
      >
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
      <GoogleMap
        onClick={handleClickOutside}
        center={location as Location}
        zoom={zoom}
        mapContainerStyle={useMemo(() => {
          return {
            width: typeof width === 'string' ? width : `${width}px`,
            height: typeof height === 'string' ? height : `${height}px`,
          }
        }, [width, height])}
        options={DEFAULT_MAP_OPTIONS}
      >
        {markers.map((feed, index) => {
          const { fileList, id } = feed
          const hadFileList = Boolean(fileList && fileList.length > 0)

          return (
            <Marker
              onClick={() => handleClickMarker(id as string)}
              key={index}
              position={feed?.location}
              {...(hadFileList && {
                icon: {
                  url: fileList?.[0] as string,
                  scaledSize: ICON_SIZE,
                },
              })}
            />
          )
        })}
      </GoogleMap>

    </LoadScript>
  )
}

const FeedInfoBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 10%;
  z-index: 10;
  width: 95%;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 5px;

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

export default Map
