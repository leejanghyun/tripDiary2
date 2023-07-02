import { useSetAtom } from 'jotai'
import _ from 'lodash-es'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import {
  useCallback, useEffect, useMemo, useState,
} from 'react'

import { GetMyFeedsResponse } from '@/api'
import FrameLayout from '@/components/FrameLayout'
import { Map } from '@/components/Map'
import { MENU_ID } from '@/components/Menu'
import { ROUTER } from '@/constants/router'
import { feedMetaState } from '@/feature/shared/atoms/feedMetaState'
import useMyFeeds from '@/feature/shared/hooks/useMyFeeds'
import { Location } from '@/utils/map'

import { DEFAULT_ZOOM_LEVEL } from '../../components/Map/Map'
import AddButton from './components/AddFeedButton'
import CameraButton from './components/CameraButton'

interface Props {
  query: ParsedUrlQuery
}

const DEFAULT_ENLARGE_ZOOM_LEVEL = 15

function HomePage({ query }: Props) {
  const router = useRouter()
  const setMeta = useSetAtom(feedMetaState)
  const { data } = useMyFeeds()
  const { content } = data as GetMyFeedsResponse || {}
  const { lat, lng } = query || {}
  const [defaultLocation, setDefaultLocation] = useState<Location | null>(null)

  useEffect(() => {
    if (typeof lat === 'string' && typeof lng === 'string') {
      const numberLat = parseFloat(lat as string)
      const numberLng = parseFloat(lng as string)

      if (_.isNumber(numberLat) && _.isNumber(numberLng)) {
        setDefaultLocation({ lat: numberLat, lng: numberLng })
      }
    }
  }, [lat, lng])

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
        isShowTitle
        zoom={defaultLocation ? DEFAULT_ENLARGE_ZOOM_LEVEL : DEFAULT_ZOOM_LEVEL}
        defaultLocation={defaultLocation}
        feeds={content}
        markers={markers}
      />
      <CameraButton onUpload={handleUpload} />
      <AddButton onClick={moveFeedAdd} />
    </FrameLayout>
  )
}

export default HomePage
