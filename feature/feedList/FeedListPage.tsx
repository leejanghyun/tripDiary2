import { MENU_ID } from '@/components/Menu'

import FrameLayout from '../../components/FrameLayout'
import { feedListMock } from '../../mocks/feedList'
import FeedCard from './components/FeedCard'

function FeedListPage() {
  const data = feedListMock

  return (
    <FrameLayout
      isFullSize
      background="gray"
      title="피드 리스트"
      menuId={MENU_ID.FEED_LIST}
    >
      {data.map(((feed, idx) => {
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
