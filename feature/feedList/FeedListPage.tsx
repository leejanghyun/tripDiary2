import { MENU_ID } from '@/components/Menu'

import FrameLayout from '../../components/FrameLayout'

function FeedListPage() {
  return (
    <FrameLayout menuId={MENU_ID.FEED_LIST}>
      Feed List
      <input
        type="file"
        accept="image/*"
        // @ts-ignore
        capture="camera"
      />
      <input
        type="file"
        accept="image/*;capture=camera"
      />
    </FrameLayout>
  )
}

export default FeedListPage
