import styled from '@emotion/styled'
import {
  GoogleMap, InfoWindow,
  LoadScript, Marker,
} from '@react-google-maps/api'
import { Loader } from '@TMOBI-WEB/ads-ui'
import { useRouter } from 'next/router'
import {
  useCallback,
  useEffect, useMemo, useRef, useState,
} from 'react'

import { Feed } from '@/db'
import { useMount } from '@/hooks/useMount'
import { ReactComponent as IcoMarker } from '@/images/ico_marker.svg'
import { formatDisplayDateTime } from '@/utils'
import { getGoogleMapApi, getPosition, Location } from '@/utils/map'

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
  disableAutoLocation?: boolean
}

function Map({
  disableAutoLocation = false,
  defaultLocation = null, zoom = DEFAULT_ZOOM_LEVEL, height = '100%', width = '100%', markers = [], feeds,
}: Props) {
  const [currentLocation, setCurrentLocation] = useState<null | Location>(null)
  const apiKey = getGoogleMapApi()
  const router = useRouter()
  const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null)
  const {
    title, content: feedContent, _id, date, searchText, fileList, location,
  } = selectedFeed || {}
  const startDate = formatDisplayDateTime(new Date(date ? date[0] : ''), 'yy년 MM월 dd일')
  const endDate = formatDisplayDateTime(new Date(date ? date[1] : ''), 'yy년 MM월 dd일')
  const [selectedMarker, setSelectedMarker] = useState(null)
  const { lat, lng } = location || {}
  const infoWindowLocation = { lat: lat || currentLocation?.lat, lng: lng || currentLocation?.lng }
  const isValidWindowLocation = Boolean(infoWindowLocation?.lat && infoWindowLocation?.lng)
  const mapRef = useRef<google.maps.Map | null>(null)
  const [mapWidth, setWidth] = useState<number>(100)

  const handleClickMarker = useCallback((marker: any, id: string) => {
    const target = (feeds || []).find((feed) => feed._id === id)

    if (!target) {
      return
    }

    setSelectedMarker(marker)
    setSelectedFeed(target)
  }, [feeds])

  const handleCloseInfoWindow = () => {
    setSelectedMarker(null)
  }

  const handleMoveFeed = useCallback(() => {
    router.push(`/edit/${_id}`)
  }, [_id, router])

  const initLocation = async () => {
    const location = await getPosition()

    setCurrentLocation(location)
  }

  useMount(() => {
    if (!disableAutoLocation) {
      initLocation()
    }
  })

  useEffect(() => {
    console.log('22', defaultLocation)
    setCurrentLocation(defaultLocation)
  }, [defaultLocation])

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map

    setWidth(map.getDiv().offsetWidth - 50)
  }

  useEffect(() => {
    const handleWindowResize = () => {
      if (mapRef.current) {
        setWidth(mapRef.current.getDiv().offsetWidth - 50)
      }
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return (
    <LoadScript
      googleMapsApiKey={apiKey as string}
      loadingElement={<Loader open />}
    >
      <GoogleMap
        onLoad={handleMapLoad}
        onClick={() => setSelectedMarker(null)}
        center={currentLocation as Location}
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
              onClick={(a) => handleClickMarker(a, id as string)}
              key={index}
              position={feed?.location}
              {...(hadFileList && {
                icon: {
                  url: `${fileList?.[0] as string}#custom_marker`,
                  scaledSize: ICON_SIZE,
                },
              })}
            />
          )
        })}
        {selectedMarker && isValidWindowLocation && (
          <InfoWindow
            position={infoWindowLocation as Location}
            onCloseClick={handleCloseInfoWindow}
            options={{ minWidth: mapWidth }}
          >
            <FeedInfoBox
              onClick={handleMoveFeed}
            >
              <div>{title}</div>
              <div>{feedContent}</div>
              <ImageWrapper>
                <CustomImage
                  width={55}
                  height={55}
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
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
}

const FeedInfoBox = styled.div`
  display: flex;
  position: relative;
  top: -100px;
  flex-direction: column;
  padding: 10px;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 10%;
  z-index: 10;
  width: 100%;
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
    font-size: ${({ theme }) => theme.font[12].size};
    line-height: ${({ theme }) => theme.font[12].lineHeight};
  }

  > div:nth-of-type(5) { // 위치
    font-size: ${({ theme }) => theme.font[12].size};
    line-height: ${({ theme }) => theme.font[12].lineHeight};
  }
`

const ImageWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  margin: 10px 0;
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
