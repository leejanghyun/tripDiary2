import { API } from '@/constants'

export type GetSearchPlaceResponse = {
  results: SearchPlaceResult[]
}

type SearchPlaceResult = {
  formatted_address: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
  },
  name: string
  photos: unknown
}

export async function getSearchPlace() {
  const DEFAULT_RADIUS = 1000

  try {
    const response = await fetch(`${API.EXTERNAL.SEARCH_PLACE}/search?query=africa&radius=${DEFAULT_RADIUS}&key=AIzaSyDRpy4jGxB2gWpyaaLS7kzx7kJ71VCnnl4`, { method: 'GET' })
    const res = await response.json()

    return res
  } catch (e) {
    return null
  }
}