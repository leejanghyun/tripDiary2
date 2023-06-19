import { API } from '@/constants'

export type GetIpResponse = any

export async function getIp() {
  try {
    const response = await fetch(`${API.EXTERNAL.IP}/myIp`, { method: 'GET' })
    const jsonData = await response.json()
    return jsonData
  } catch (e) {
    return null
  }
}
