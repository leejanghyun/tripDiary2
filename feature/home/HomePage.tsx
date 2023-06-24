import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { Map } from '@/components/Map'
import { MENU_ID } from '@/components/Menu'
import { ROUTER } from '@/constants/router'

import FrameLayout from '../../components/FrameLayout'
import AddButton from './components/AddButton'

function HomePage() {
  const router = useRouter()

  const moveFeedAdd = useCallback(() => {
    router.push(ROUTER.ADD_FEED)
  }, [router])

  return (
    <FrameLayout
      menuId={MENU_ID.MAIN}
      isFullSize
    >
      <Map />

      <AddButton onClick={moveFeedAdd} />
    </FrameLayout>
  )
}

export default HomePage
