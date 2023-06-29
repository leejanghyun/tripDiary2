import { useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { Map } from '@/components/Map'
import { MENU_ID } from '@/components/Menu'
import { ROUTER } from '@/constants/router'

import { GetMyFeedsResponse } from '../../api/getMyFeeds'
import { globalState } from '../../atoms/globalState'
import FrameLayout from '../../components/FrameLayout'
import { feedMetaState } from '../shared/atoms/feedMetaState'
import useMyFeeds from '../shared/hooks/useMyFeeds'
import AddButton from './components/AddFeedButton'
import CameraButton from './components/CameraButton'

function HomePage() {
  const router = useRouter()
  const global = useAtomValue(globalState)
  const setMeta = useSetAtom(feedMetaState)

  const { data } = useMyFeeds(Boolean(global.userId))
  const { content } = data as GetMyFeedsResponse || {}

  console.log(content)

  const markers = (content || []).map((feed) => {
    const { _id, location, fileList } = feed || {}
    return {
      id: _id,
      location,
      fileList,
    }
  })

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
      <Map markers={markers} />
      <CameraButton onUpload={handleUpload} />
      <AddButton onClick={moveFeedAdd} />
    </FrameLayout>
  )
}

export default HomePage
