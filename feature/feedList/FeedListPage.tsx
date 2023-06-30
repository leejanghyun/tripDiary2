import styled from '@emotion/styled'
import { Button, COLOR } from '@TMOBI-WEB/ads-ui'
import { useAtom } from 'jotai'
import { PaginateResult } from 'mongoose'
import Link from 'next/link'
import {
  useCallback, useEffect, useState,
} from 'react'

import FrameLayout from '@/components/FrameLayout'
import { MENU_ID } from '@/components/Menu'
import { Feed } from '@/db'
import { ReactComponent as IconEmptyBox } from '@/images/ico_empty_box.svg'
import { ReactComponent as AddButton } from '@/images/ico_plus_gray.svg'

import { feedListParamsState } from '../shared/atoms/searchParamsState'
import useFeedList from '../shared/hooks/useFeedList'
import FeedCard from './components/FeedCard'

function FeedListPage() {
  const [feedListParams, setFeedListParams] = useAtom(feedListParamsState)
  const { data, isLoading } = useFeedList(feedListParams)
  const { content } = data || {}
  const { docs, hasNextPage } = content as PaginateResult<Feed> || {}
  const isEmpty = (!docs || (docs || []).length === 0)
  const [feeds, setFeeds] = useState<Feed[]>([])

  const handleClickMore = useCallback(() => {
    const { page } = feedListParams

    setFeedListParams({
      ...feedListParams,
      page: page + 1,
    })
  }, [setFeedListParams, feedListParams])

  /**
   * 전체 피드 카드 리스트
   */
  useEffect(() => {
    let res: Feed[] = []

    if (docs) {
      docs.forEach((page) => {
        res = res.concat((page) || [])
      })
    }

    setFeeds((prevItems) => [...prevItems, ...res])
  }, [docs])

  return (
    <FrameLayout
      isFullSize
      background="gray"
      title="피드 리스트"
      menuId={MENU_ID.FEED_LIST}
    >
      {isEmpty && (
      <EmptyBox>
        {isLoading ? 'Loading...' : (
          <>
            <IconEmptyBox />
            <div>등록된 피드가 없음</div>
            <Link href="/add-feed">
              <AddFeedButton>
                <AddButton />피드 등록 이동
              </AddFeedButton>
            </Link>
          </>
        )}
      </EmptyBox>
      )}
      {feeds.map(((feed, idx) => {
        return (
          <FeedCard
            key={idx}
            {...feed}
          />
        )
      }))}
      {hasNextPage
      && (
        <ButtonWrapper>
          <Button
            palette="white-stroke"
            type="button"
            size="small"
            disabled={isLoading}
            loading={isLoading}
            fullWidth
            onClick={handleClickMore}
          >
            더보기
          </Button>
        </ButtonWrapper>
      )}
    </FrameLayout>
  )
}

const EmptyBox = styled.div`
  display: flex;
  gap: 2px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${COLOR.gray.color.gray[400]};
  font-size: ${({ theme }) => theme.font[18].size};
  line-height: ${({ theme }) => theme.font[18].lineHeight};
  width: 100%;
  height: 100%;
`

const AddFeedButton = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  gap: 5px;
  justify-content: center;
  font-size: ${({ theme }) => theme.font[14].size};
  line-height: ${({ theme }) => theme.font[14].lineHeight};
  color: ${COLOR.gray.color.gray[900]};
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 5px 0;
  padding: 2px 5px;
`

export default FeedListPage
