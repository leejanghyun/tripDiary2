import * as process from 'process'

export const API = {
  CONFIG: {
    DEFAULT_TIMEOUT: 1000 * 100,
  },
  ENDPOINT: {
    ADS_API: process.env.NEXT_PUBLIC_ADS_API_ENDPOINT,
  },
  PREFIX_URL: {
  },
  EXTERNAL: {
    SEARCH_PLACE: '/api/external/search-place',
  },
  PROXY: '/api/proxy',
  TRIP_DIARY: '/api/trip-diary',
}
