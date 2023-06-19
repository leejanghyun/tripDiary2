import type { NextApiRequest, NextApiResponse } from 'next'

const dns = require('dns')

function hostnameExists(hostname: string): Promise<{ hostname: string, exists: boolean }> {
  return new Promise((resolve) => {
    dns.lookup(hostname, (error: unknown) => resolve({ hostname, exists: !error }))
  })
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req
  const { domain } = query

  try {
    const target = (domain as string).split('/')
    const [targetDomain] = target

    if (targetDomain) {
      const existResult = await hostnameExists(targetDomain as string)
      const { exists } = existResult || {}

      if (exists) {
        return res.status(200).send('exists')
      }
    }

    return res.status(400).send('not exists')
  } catch (err) {
    return res.status(500).send('error')
  }
}

export default handler
