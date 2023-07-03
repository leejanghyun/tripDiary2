import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { COLOR } from '@TMOBI-WEB/ads-ui'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import FrameLayout from '@/components/FrameLayout'
import { MENU_ID } from '@/components/Menu'
import { ReactComponent as IconAlbum } from '@/images/ico_albums.svg'
import { ReactComponent as IconCollection } from '@/images/ico_collection.svg'
import { ReactComponent as IcoHeart } from '@/images/ico_heart.svg'
import { ReactComponent as RightArrowIcon } from '@/images/icon_right_arrow.svg'

import { FEEDLIST_FILTER_TYPE } from '../feedList/constants/form'
import useFeedList from '../shared/hooks/useFeedList'
import useMyFeeds from '../shared/hooks/useMyFeeds'

function MyPage() {
  const { data } = useMyFeeds()
  const { data: myBookmarkData } = useFeedList({ filter: `${FEEDLIST_FILTER_TYPE.MY_BOOKMARK as string}` })
  const { content: bookmarkContent } = myBookmarkData || {}
  const { totalDocs: totalBookMarks } = bookmarkContent || {}
  const { content: feed } = data || {}
  const { length } = feed || {}
  const router = useRouter()

  const handleMyFeedList = useCallback(() => {
    router.push('/feed-list?filter=["my"]')
  }, [router])

  const handleBookmarks = useCallback(() => {
    router.push('/feed-list?filter=["myBookmark"]')
  }, [router])

  return (
    <FrameLayout
      menuId={MENU_ID.MY}
      background="gray"
      title="마이페이지"
    >
      <BoxWrapper>
        <Box>
          <div>
            <Circle color="blue">
              <IconAlbum />
            </Circle>
            <div>
              생성한 피드
              <BlueText>
                {`${length || 0}`}
              </BlueText>
              개
            </div>
          </div>
          <div>
            <RightArrowIcon onClick={handleMyFeedList} />
          </div>
        </Box>
        <Box>
          <div>
            <Circle color="orange">
              <IconCollection />
            </Circle>
            <div>
              생성한 스토리
              <BlueText>
                {`${0}`}
              </BlueText>
              개
            </div>
          </div>
          <div>
            <RightArrowIcon onClick={() => alert('cpmming soon...')} />
          </div>
        </Box>
        <Box>
          <div>
            <Circle color="red">
              <IcoHeart
                fill="red"
              />
            </Circle>
            <div>
              찜한 피드
              <BlueText>
                {`${totalBookMarks || 0}`}
              </BlueText>
              개
            </div>
          </div>
          <div>
            <RightArrowIcon onClick={handleBookmarks} />
          </div>
        </Box>
      </BoxWrapper>
    </FrameLayout>
  )
}

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const BlueText = styled.div`
  color: ${COLOR.primary.color.tmobi.blue[600]};
`

const Circle = styled.div<{ color: 'blue' | 'orange' | 'red' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  ${({ color }) => {
    switch (color) {
      case 'blue':
        return css`
          background-color: ${COLOR.primary.color.tmobi.blue[200]};
        `
      case 'red':
        return css`
          background-color: ${COLOR.seconary.color.tmobi.pink[200]};
        `
      default:
        return css`
          background-color: ${COLOR.semantic.color.orange[200]};
        `
    }
  }}
`

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  width: 100%;
  background: ${COLOR.gray.color.wb[0]};
  border-radius: 10px;
  margin: 0 auto;
  height: 70px;
  padding: 10px 15px;
  border: 1px solid ${COLOR.gray.color.gray[200]}
  font-size: ${({ theme }) => theme.font[18].size};
  line-height: ${({ theme }) => theme.font[18].lineHeight};
  font-weight: 500;

  >div:first-of-type {
    display: flex;
    align-items: center;
    gap: 10px;

    > div:nth-of-type(2) {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  > div:nth-of-type(2) {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`

export default MyPage
