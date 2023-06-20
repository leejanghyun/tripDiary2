import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { useEffect, useMemo, useState } from 'react'

import { getGoogleMapApi, getPosition, Location } from '@/utils/map'

const DEFAULT_ZOOM_LEVEL = 10

function Map() {
  const [location, setLocation] = useState<null | Location>(null)
  const apiKey = getGoogleMapApi()

  const initLocation = async () => {
    const location = await getPosition()

    setLocation(location)
  }

  useEffect(() => {
    initLocation()
  }, [])

  return (
    <LoadScript googleMapsApiKey={apiKey as string}>
      <GoogleMap
        center={location as Location}
        zoom={DEFAULT_ZOOM_LEVEL}
        mapContainerStyle={useMemo(() => {
          return { width: '100%', height: '100%' }
        }, [])}
      >
        <Marker
          position={location as Location}
        />
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
