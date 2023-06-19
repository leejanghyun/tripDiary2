import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxyMiddleware from 'next-http-proxy-middleware'

import { API } from '@/constants'

export const config = {
  api: {
    bodyParser: false,
  },
}
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return await httpProxyMiddleware(req, res, {
      target: API.ENDPOINT.ADS_API,
      changeOrigin: true,
      pathRewrite: [{
        patternStr: '^/api/proxy/',
        replaceStr: '/',
      }],
    })
  } catch (err) {
    return res.status(400).send('proxy error')
  }
}

export default handler
