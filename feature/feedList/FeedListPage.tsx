import { MENU_ID } from '@/components/Menu'

import FrameLayout from '../../components/FrameLayout'

function FeedListPage() {
  return (
    <FrameLayout
      title="피드 리스트"
      menuId={MENU_ID.FEED_LIST}
    >
      Feed List
    </FrameLayout>
  )
}

export default FeedListPage
