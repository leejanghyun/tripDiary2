export const getGoogleMapApi = (): string | null => {
  const googleMapApi = process.env.NEXT_PUBLIC_GOOGLE_MAP_API || null

  return googleMapApi
}

export const getCurrentPosition = () => {
  const { geolocation } = window.navigator || {}

  if (!geolocation) {
    return
  }

  // Request the current position
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude } = position.coords
      const { longitude } = position.coords

      return {
        latitude,
        longitude,
      }
    },
    () => {
      return null
    },
  )
}
