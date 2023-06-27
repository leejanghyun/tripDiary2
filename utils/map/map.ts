import { isClient } from '../compare'

export const getGoogleMapApi = (): string | null => {
  const googleMapApi = process.env.NEXT_PUBLIC_GOOGLE_MAP_API || null

  return googleMapApi
}

type GeoLocationPosition = {
  coords: GeolocationCoordinates
  timestamp: number
}

export type Location = {
  lng: number,
  lat: number,
}

export async function getPosition() {
  if (!isClient) {
    return null
  }

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  }

  try {
    const position = await getCurrentPosition() as GeoLocationPosition
    const { latitude, longitude } = position.coords || {}

    return {
      lng: longitude,
      lat: latitude,
    }
  } catch (error) {
    return null
  }
}

export async function getPlaceName(location: Location): Promise<string> {
  return new Promise((resolve) => {
    if (!window.google || !window.google.maps) {
      return
    }

    const geocoder = new window.google.maps.Geocoder()
    const latLng = new window.google.maps.LatLng(location?.lat, location?.lng)

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK') {
        if (results?.[0]) {
          resolve(results[0].formatted_address)
        } else {
          resolve('')
        }
      } else {
        resolve('')
      }
    })
  })
}
