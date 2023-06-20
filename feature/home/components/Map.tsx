import { GoogleMap, LoadScript } from '@react-google-maps/api'
import { useEffect, useState } from 'react'

import { getGoogleMapApi, getPosition, Location } from '@/utils/map'

function Map() {
  const [location, setLocation] = useState<null | Location>(null)
  const zoomLevel = 8
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
        zoom={zoomLevel}
        mapContainerStyle={{ width: '100%', height: '100%' }}
      >
        {/* Add any additional components or markers here */}
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
