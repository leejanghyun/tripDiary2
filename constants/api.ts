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
    IP: '/api/external/ip',
    TOPTMAP: '/api/external/toptmap',
    EXISTS: '/api/external/exists',
  },
  PROXY: '/api/proxy',
}
