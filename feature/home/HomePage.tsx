import { useEffect } from 'react'

import FrameLayout from '../../components/FrameLayout'
import { getPosition } from '../../utils/map'
import { Map } from './components'

function HomePage() {
  useEffect(() => {
    const temp = async () => {
      console.log(await getPosition())
    }

    console.log(temp())
  }, [])

  return (
    <FrameLayout>
      <Map />
    </FrameLayout>
  )
}

export default HomePage
