import { Jumbotron } from '@TMOBI-WEB/ads-ui'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { ROUTER } from '../constants/router'

function NotFoundErrorPage() {
  const router = useRouter()
  return (
    <Jumbotron
      title="페이지를 표시할 수 없어요."
      description={([
        '예상하지 못한 오류가 발생했습니다.',
        '일시적인 현상이거나 네트워크 문제일 수 있으니,',
        '잠시 후 다시 시도해주세요. (-500)',
      ])}
      buttonLabel="홈으로 이동"
      onClick={useCallback(() => {
        router.push({ pathname: ROUTER.MAIN })
      }, [router])}
    />
  )
}

export default NotFoundErrorPage
