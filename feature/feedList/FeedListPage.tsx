import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  Button, COLOR, DropdownMenu, Input,
} from '@TMOBI-WEB/ads-ui'
import { PaginateResult } from 'mongoose'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import {
  useCallback, useEffect, useMemo, useState,
} from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import FrameLayout from '@/components/FrameLayout'
import { MENU_ID } from '@/components/Menu'
import { Feed } from '@/db'
import useQueryStringController from '@/hooks/useQueryStringController'
import { ReactComponent as IconEmptyBox } from '@/images/ico_empty_box.svg'
import { ReactComponent as AddButton } from '@/images/ico_plus_gray.svg'
import { ReactComponent as SortAscButton } from '@/images/icon_sort_asc.svg'
import { ReactComponent as SortDescButton } from '@/images/icon_sort_desc.svg'

import FilterSelect from '../../components/FilterSelect/FilterSelect'
import useFeedList from '../shared/hooks/useFeedList'
import FeedCard from './components/FeedCard'
import {
  DEFAULT_PAGE,
  FEEDLIST_SORT_TYPE,
  FeedListFormType, filterOptions, FORM_FIELD, getDefaultValue, sizeOptions,
} from './constants/form'

interface Props {
  query: ParsedUrlQuery
}

function FeedListPage({ query }: Props) {
  const { updateQuery, removeQuery } = useQueryStringController()
  const defaultValues = getDefaultValue(query)
  const formMethods = useForm<FeedListFormType>({
    defaultValues,
    mode: 'onBlur',
  })
  const {
    setValue, control, watch,
  } = formMethods
  const {
    [FORM_FIELD.PAGE]: page,
    [FORM_FIELD.LIMIT]: size,
    [FORM_FIELD.SORT]: sort,
    [FORM_FIELD.FILTER]: filter,
  } = watch()
  const isDesc = typeof sort === 'string' && sort.split('_')[1] === 'desc'
  const [keyword, setKeyword] = useState((query?.searchText as string) || '')
  const { data, isLoading } = useFeedList({
    page, limit: size, sort, filter: filter.join(','), searchText: keyword,
  })
  const { content } = data || {}
  const { docs, hasNextPage } = content as PaginateResult<Feed> || {}
  const isEmpty = (!docs || (docs || []).length === 0)
  const [feeds, setFeeds] = useState<Feed[]>([])

  const handleClickMore = useCallback(() => {
    setValue(FORM_FIELD.PAGE, page + 1)
  }, [setValue, page])

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

  /**
   * 검색창 입력 시 호출
   */
  const handleSearch = useCallback(
    (value: string) => {
      const { length: hasString } = value
      if (keyword === value) {
        return
      }

      if (!hasString) {
        removeQuery([FORM_FIELD.SEARCH_TEXT, FORM_FIELD.PAGE])
      } else {
        updateQuery({ [FORM_FIELD.SEARCH_TEXT]: value }, FORM_FIELD.PAGE)
        setValue(FORM_FIELD.PAGE, DEFAULT_PAGE)
      }

      setFeeds([])
      setKeyword(value)
    },
    [removeQuery, updateQuery, setValue, keyword],
  )

  const handleSortClick = (value: FEEDLIST_SORT_TYPE) => {
    if (value === sort) {
      return
    }

    if (value === FEEDLIST_SORT_TYPE.CREATED_AT_DESC) {
      removeQuery([FORM_FIELD.SORT])
    } else {
      updateQuery({ [FORM_FIELD.SORT]: value }, FORM_FIELD.PAGE)
    }

    setFeeds([])
    setValue(FORM_FIELD.SORT, value)
    setValue(FORM_FIELD.PAGE, DEFAULT_PAGE)
  }

  return (
    <FormProvider {...formMethods}>
      <FrameLayout
        isFullSize
        background="gray"
        title="피드 리스트"
        headerPadding={5}
        menuId={MENU_ID.FEED_LIST}
        right={(
          <RightSide>
            <DropdownMenu
              trigger={(
                <button
                  type="button"
                >
                  {isDesc ? <SortDescButton /> : <SortAscButton />}
                </button>
                )}
              data={sizeOptions.map((option) => {
                const { text, value } = option
                return {
                  text,
                  onClick: () => { handleSortClick(value) },
                }
              })}
              sideOffset={8}
              side="bottom"
              align="end"
            />
            <FilterSelect
              name={FORM_FIELD.FILTER}
              options={filterOptions}
              query={query}
              onChangeFilter={() => {
                setValue(FORM_FIELD.PAGE, DEFAULT_PAGE)
                setFeeds([])
              }}
            />
          </RightSide>
        )}
        left={(
          <Input
            control={control}
            type="search"
            placeholder="검색어"
            name={FORM_FIELD.SEARCH_TEXT}
            labelInline
            textAlign="left"
            variant="naked"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.keyCode === 13 || e.which === 13) {
                e.preventDefault()
                handleSearch(e.currentTarget.value)
              }
            }}
            onSearch={(value) => handleSearch(value as string)}
            styles={useMemo(() => css`
              height: 10px;
              width: 150px;
              font-weight: 250 !important;
          `, [])}
          />
        )}
      >
        {isEmpty && (
        <EmptyBox>
          {isLoading ? '로딩중...' : (
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
    </FormProvider>
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

const RightSide = styled.div`
  display: flex;
  padding-right: 10px;
  gap: 5px;
  align-items: center;
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
