import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxyMiddleware from 'next-http-proxy-middleware'

import { API } from '../../../../constants'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return await httpProxyMiddleware(req, res, {
      target: 'https://toptmap.tmap.co.kr',
      changeOrigin: true,
      pathRewrite: [{
        patternStr: `^${API.EXTERNAL.TOPTMAP}`,
        replaceStr: '/',
      }],
    })
  } catch (err) {
    return res.status(400).send('proxy error')
  }
}

export default handler
