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
import { getGoogleMapApi, getPosition, Location } from '@/utils/map'

import FeedCard from '../../feature/shared/components/FeedCard/FeedCard'
import OverlayText from './OverlayText'

export const DEFAULT_ZOOM_LEVEL = 11
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
  panControl: false,
  scaleControl: true,
}

type Markers = {
  location: Location
  fileList?: string[] | null
  id?: string
}

type Props = {
  disableTtile?: boolean
  defaultLocation?: Location | null
  markers: Markers[]
  feeds?: Feed[]
  width?: string | number
  height?: string | number
  zoom?: number
  disableAutoLocation?: boolean
}

function Map({
  disableTtile,
  disableAutoLocation = false,
  defaultLocation = null, zoom = DEFAULT_ZOOM_LEVEL, height = '100%', width = '100%', markers = [], feeds,
}: Props) {
  const [currentLocation, setCurrentLocation] = useState<null | Location>(null)
  const apiKey = getGoogleMapApi()
  const router = useRouter()
  const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null)
  const { location } = selectedFeed || {}
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

  const handleMoveFeed = useCallback((id: string) => {
    router.push(`/feed/${id}`)
  }, [router])

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
        zoom={zoom || 0}
        mapContainerStyle={useMemo(() => {
          return {
            width: typeof width === 'string' ? width : `${width}px`,
            height: typeof height === 'string' ? height : `${height}px`,
          }
        }, [width, height])}
        options={DEFAULT_MAP_OPTIONS}
      >
        {!disableTtile && <OverlayText />}
        {markers.map((feed, index) => {
          const { fileList, id } = feed
          const hadFileList = Boolean(fileList && fileList.length > 0)

          return (
            <Marker
              onClick={(marker) => handleClickMarker(marker, id as string)}
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
            {selectedFeed && (
            <FeedCard
              isFullWidth
              disableEditDropDown
              onClick={handleMoveFeed}
              {...selectedFeed}
            />
            )}
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
