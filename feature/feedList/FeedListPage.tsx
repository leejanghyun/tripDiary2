import { MENU_ID } from '@/components/Menu'

import FrameLayout from '../../components/FrameLayout'
import { feedListMock } from '../../mocks/feedList'
import FeedCard from './components/FeedCard'

function FeedListPage() {
  const data = feedListMock

  return (
    <FrameLayout
      title="피드 리스트"
      menuId={MENU_ID.FEED_LIST}
    >
      {data.map(((feed, idx) => {
        const {
          id, title, content, fileList, date, searchText,
        } = feed

        return (
          <FeedCard
            key={idx}
            searchText={searchText}
            date={date}
            id={id}
            title={title}
            content={content}
            fileList={fileList}
          />
        )
      }))}
    </FrameLayout>
  )
}

export default FeedListPage
