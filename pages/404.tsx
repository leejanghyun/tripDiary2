import { Jumbotron } from '@TMOBI-WEB/ads-ui'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { ROUTER } from '../constants/router'

function NotFoundErrorPage() {
  const router = useRouter()
  return (
    <Jumbotron
      type="notice"
      title="페이지를 찾을 수 없어요."
      description={[
        '입력하신 주소는 존재하지 않는 페이지입니다.',
        '다시 한 번 확인 후 이용해주세요. (-404)',
      ]}
      buttonLabel="홈으로 이동"
      onClick={useCallback(() => {
        router.push({ pathname: ROUTER.MAIN })
      }, [router])}
    />
  )
}

export default NotFoundErrorPage
