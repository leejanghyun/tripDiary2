import { useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { Map } from '@/components/Map'
import { MENU_ID } from '@/components/Menu'
import { ROUTER } from '@/constants/router'

import FrameLayout from '../../components/FrameLayout'
import { feedMetaState } from '../shared/atoms/feedMetaState'
import AddButton from './components/AddFeedButton'
import CameraButton from './components/CameraButton'

function HomePage() {
  const router = useRouter()
  const setMeta = useSetAtom(feedMetaState)

  const moveFeedAdd = useCallback(() => {
    router.push(ROUTER.ADD_FEED)
  }, [router])

  const handleUpload = useCallback((file: File) => {
    setMeta(file)
    router.push(ROUTER.ADD_FEED)
  }, [router, setMeta])

  return (
    <FrameLayout
      menuId={MENU_ID.MAIN}
      isFullSize
    >
      <Map />

      <CameraButton onUpload={handleUpload} />
      <AddButton onClick={moveFeedAdd} />
    </FrameLayout>
  )
}

export default HomePage
