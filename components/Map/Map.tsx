import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { Loader } from '@TMOBI-WEB/ads-ui'
import {
  useEffect, useMemo, useState,
} from 'react'

import { getGoogleMapApi, getPosition, Location } from '@/utils/map'

const DEFAULT_ZOOM_LEVEL = 11

const DEFAULT_MAP_OPTIONS = {
  fullscreenControl: false,
  mapTypeId: 'terrain', // ('roadmap', 'satellite', 'hybrid', 'terrain')
  mapTypeControl: false,
  zoomControl: false,
  disableDefaultUI: true,
}

type Props = {
  defaultLocation?: Location | null
  markers?: Location[]
  width?: string | number
  height?: string | number
  zoom?: number
}

function Map({
  defaultLocation = null, zoom = DEFAULT_ZOOM_LEVEL, height = '100%', width = '100%', markers = [],
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

  return (
    <LoadScript
      googleMapsApiKey={apiKey as string}
      loadingElement={<Loader open />}
    >
      <GoogleMap
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
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
