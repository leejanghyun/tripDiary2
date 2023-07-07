import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { imageUrl } = req.query

  if (!imageUrl || typeof imageUrl !== 'string') {
    res.status(404).end()
    return
  }

  try {
    // 이미지 요청을 원격 서버로 전달
    const imageResponse = await axios.get(imageUrl, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })

    res.setHeader('Content-Type', imageResponse.headers['content-type'])
    res.send(imageResponse.data)
  } catch (error) {
    // console.log(error)
    res.status(500).end()
  }
}
