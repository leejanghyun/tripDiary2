import { API } from '../constants'

export async function getValidDomain(domain: string) {
  try {
    const response = await fetch(`${API.EXTERNAL.EXISTS}/check?domain=${domain}`, { method: 'GET' })
    return response.ok
  } catch (e) {
    return false
  }
}
