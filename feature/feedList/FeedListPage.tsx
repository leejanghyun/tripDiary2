import { useAtomValue } from 'jotai'
import { PaginateResult } from 'mongoose'

import { MENU_ID } from '@/components/Menu'

import FrameLayout from '../../components/FrameLayout'
import { Feed } from '../../db'
import { feedListParamsState } from '../shared/atoms/searchParamsState'
import useFeedList from '../shared/hooks/useFeedList'
import FeedCard from './components/FeedCard'

function FeedListPage() {
  const feedListParams = useAtomValue(feedListParamsState)
  const { data } = useFeedList(feedListParams)
  const { content } = data || {}
  const { docs } = content as PaginateResult<Feed> || {}

  return (
    <FrameLayout
      isFullSize
      background="gray"
      title="피드 리스트"
      menuId={MENU_ID.FEED_LIST}
    >
      {(docs || []).map(((feed, idx) => {
        return (
          <FeedCard
            key={idx}
            {...feed}
          />
        )
      }))}
    </FrameLayout>
  )
}

export default FeedListPage
