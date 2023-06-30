import { useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

import { GetMyFeedsResponse } from '@/api'
import FrameLayout from '@/components/FrameLayout'
import { Map } from '@/components/Map'
import { MENU_ID } from '@/components/Menu'
import { ROUTER } from '@/constants/router'
import { feedMetaState } from '@/feature/shared/atoms/feedMetaState'
import useMyFeeds from '@/feature/shared/hooks/useMyFeeds'

import AddButton from './components/AddFeedButton'
import CameraButton from './components/CameraButton'

function HomePage() {
  const router = useRouter()
  const setMeta = useSetAtom(feedMetaState)
  const { data } = useMyFeeds()
  const { content } = data as GetMyFeedsResponse || {}

  /** 지도 마커 */
  const markers = useMemo(() => {
    return (content || []).map((feed) => {
      const { _id, location, fileList } = feed || {}

      return { id: _id, location, fileList }
    })
  }, [content])

  const moveFeedAdd = useCallback(() => {
    router.push(ROUTER.ADD_FEED)
  }, [router])

  const handleUpload = useCallback((file: FileList) => {
    setMeta(file)
    router.push(ROUTER.ADD_FEED)
  }, [router, setMeta])

  return (
    <FrameLayout
      title="홈"
      menuId={MENU_ID.MAIN}
      isFullSize
    >
      <Map
        feeds={content}
        markers={markers}
      />
      <CameraButton onUpload={handleUpload} />
      <AddButton onClick={moveFeedAdd} />
    </FrameLayout>
  )
}

export default HomePage
