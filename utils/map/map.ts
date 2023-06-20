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
