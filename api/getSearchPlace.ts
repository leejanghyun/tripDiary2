import { API } from '@/constants'

import { getGoogleMapApi } from '../utils/map'

export type GetSearchPlaceResponse = {
  results: SearchPlaceResult[]
}

export type SearchPlaceResult = {
  business_status: string
  formatted_address: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
    viewport: {
      northeast: {
        lat: number
        lng: number
      },
      southwest: {
        lat: number
        lng: number
      }
    },
  },
  icon: string
  icon_background_color: string
  icon_mask_base_uri: string
  name: string
  photos: unknown
  opening_hours: {
    open_now: boolean
  }
  plus_code: {
    compound_code: string
    global_code: string
  },
  reference: string
  rating: number
  types: string[]
  user_ratings_total: number
}

export async function getSearchPlace(text: string): Promise<SearchPlaceResult[]> {
  const DEFAULT_RADIUS = 10000

  try {
    const response = await fetch(`${API.EXTERNAL.SEARCH_PLACE}/search?query=${text}&radius=${DEFAULT_RADIUS}&key=${getGoogleMapApi()}`, { method: 'GET' })
    const res = await response.json()
    const { status, results = [] } = res || {}

    if (status !== 'OK') {
      return []
    }

    return results
  } catch (e) {
    return []
  }
}
