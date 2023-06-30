import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { Loader } from '@TMOBI-WEB/ads-ui'
import {
  useCallback,
  useEffect, useMemo, useState,
} from 'react'

import { getGoogleMapApi, getPosition, Location } from '@/utils/map'

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
  width?: string | number
  height?: string | number
  zoom?: number
  onClickMarker?: (id: string) => void
  onClickOutside?: () => void
}

function Map({
  defaultLocation = null, zoom = DEFAULT_ZOOM_LEVEL, height = '100%', width = '100%', markers = [], onClickMarker, onClickOutside,
}: Props) {
  const [location, setLocation] = useState<null | Location>(null)
  const apiKey = getGoogleMapApi()

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

  const handleMarkerClick = useCallback((id: string) => {
    if (!id) {
      return
    }

    onClickMarker?.(id)
  }, [onClickMarker])

  return (
    <LoadScript
      googleMapsApiKey={apiKey as string}
      loadingElement={<Loader open />}
    >
      <GoogleMap
        onClick={onClickOutside}
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
              onClick={() => handleMarkerClick(id as string)}
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

export default Map
