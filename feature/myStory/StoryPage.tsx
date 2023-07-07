import styled from '@emotion/styled'
import {
  Button, COLOR, Input, toastSuccess,
} from '@TMOBI-WEB/ads-ui'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import {
  useCallback, useEffect, useMemo, useState,
} from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

import { getFeeds } from '@/api/getFeeds'
import { putStory } from '@/api/putStory'
import FrameLayout from '@/components/FrameLayout'
import { KEYS } from '@/constants'
import { Feed, Story } from '@/db'
import useStory from '@/feature/shared/hooks/useStory'
import { ReactComponent as DeleteItem } from '@/images/ico_20_delete.svg'
import { ReactComponent as EmptyBox } from '@/images/ico_empty_box.svg'

import FeedCard from '../shared/components/FeedCard/FeedCard'
import FeedSelectModal from './components/FeedSelectModal'
import { FORM_FIELD, FormType } from './constants/form'

type Props = {
  query?: ParsedUrlQuery
}

export const getCreateDefaultValue = () => {
  return {
    [FORM_FIELD.TITLE]: '',
    [FORM_FIELD.SELECTED_FEEDS]: [],
  }
}

function StoryPage({ query }: Props) {
  const { id } = query || {}
  const defaultValues = getCreateDefaultValue()
  const router = useRouter()
  const queryClient = useQueryClient()
  const formMethods = useForm<FormType>({
    defaultValues,
    mode: 'onBlur',
  })
  const {
    control, setValue, watch, getValues,
  } = formMethods
  const { data } = useStory(id as string)
  const { content: story } = data || {}
  const { title, feedList = [] } = story || {}
  const [isOpenFeedSelectModal, setOpenFeedSelectModal] = useState(false)
  const selectedStoryTitle = watch(FORM_FIELD.TITLE)
  const selectedFeeds = watch(FORM_FIELD.SELECTED_FEEDS)
  const isEmpty = !selectedFeeds || selectedFeeds.length === 0

  const { mutate: modifyStory, isLoading } = useMutation<boolean, AxiosError, Story>(
    (data) => putStory(data as Story),
    {
      onSuccess: () => {
        queryClient.refetchQueries([KEYS.MY_STORIES()])
        toastSuccess('스토리를 성공적으로 수정했습니다.')
        router.push('/my-stories')
      },
    },
  )

  const handleModifyClick = useCallback(() => {
    if (!story) {
      return
    }

    const feedIds = selectedFeeds.map((feed) => feed?._id)

    modifyStory({
      ...story,
      title: selectedStoryTitle,
      feedList: feedIds || [],
    })
  }, [modifyStory, story, selectedFeeds, selectedStoryTitle])

  const init = useCallback(async (ids: string[]) => {
    if (ids && ids.length > 0) {
      const res = await getFeeds(ids)
      const { content } = res || {}

      setValue(FORM_FIELD.SELECTED_FEEDS, content || [])
    }

    setValue(FORM_FIELD.TITLE, title || '')
  }, [setValue, title])

  useEffect(() => {
    if (title && feedList) {
      init(feedList)
    }
  }, [title, setValue, feedList, init])

  const handleSelectFeedCancel = useCallback(() => {
    setOpenFeedSelectModal(false)
  }, [])

  const handleFeedAdd = useCallback((newFeedItem: Feed[]) => {
    const { [FORM_FIELD.SELECTED_FEEDS]: selectedFeeds } = getValues()

    setValue(FORM_FIELD.SELECTED_FEEDS, [...selectedFeeds, ...newFeedItem])
    setOpenFeedSelectModal(false)
  }, [getValues, setValue])

  const handleFeedAddClick = useCallback(() => {
    setOpenFeedSelectModal(true)
  }, [])

  const handleDeleteFeed = useCallback((idx: number) => {
    setValue(FORM_FIELD.SELECTED_FEEDS, selectedFeeds.filter((_, i) => i !== idx))
  }, [setValue, selectedFeeds])

  const filteredSelectedFeeds = useMemo(() => {
    const sortedData = selectedFeeds.sort((prev, next) => {
      const prevDate = new Date(prev.date[1])
      const nextDate = new Date(next.date[1])

      return nextDate.getTime() - prevDate.getTime()
    })

    return sortedData
  }, [selectedFeeds])

  return (
    <FormProvider {...formMethods}>
      <FrameLayout
        title="스토리"
        right={(
          <RightSide>
            <Button
              type="submit"
              size="small"
              palette="white-stroke"
              loading={isLoading}
              onClick={handleModifyClick}
            >
              수정
            </Button>
            <Button
              type="submit"
              size="small"
              palette="blue-stroke"
              onClick={handleFeedAddClick}
              loading={isLoading}
            >
              피드 추가
            </Button>
          </RightSide>
          )}
      >
        <Container>
          <div>
            <Input
              control={control}
              name={FORM_FIELD.TITLE}
              isStretch
              maxLength={100}
              label="제목 입력"
              placeholder="스토리 제목을 입력하세요."
              rules={{
                required: true,
              }}
            />
          </div>
          {isEmpty && (
          <EmptyBoxWrapper>
            <EmptyBox />
            등록된 피드가 없습니다.
          </EmptyBoxWrapper>
          )}
          {filteredSelectedFeeds.map((feed: Feed, idx: number) => {
            return (
              <FeedWrapper
                key={`${idx}`}
              >
                <RemoveButtonStyles
                  onClick={() => handleDeleteFeed(idx)}
                >
                  <DeleteItem />
                </RemoveButtonStyles>
                <FeedCard
                  disableEditDropDown
                  {...feed}
                />
              </FeedWrapper>
            )
          })}
        </Container>
      </FrameLayout>
      <FeedSelectModal
        selectedFeeds={selectedFeeds}
        isOpen={isOpenFeedSelectModal}
        onCancel={handleSelectFeedCancel}
        onFeedAdd={handleFeedAdd}
      />
    </FormProvider>
  )
}

const FeedWrapper = styled.div`
  position: relative;
  width: 100%;
`

const RemoveButtonStyles = styled.div`
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  cursor: pointer;
  border-width: 0px;
`

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const Container = styled.div`
  width: 100%;
  height: 100%;

  > div:first-of-type {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`

const EmptyBoxWrapper = styled.div`
  display: flex;
  gap: 2px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${COLOR.gray.color.gray[500]};
  font-size: ${({ theme }) => theme.font[18].size};
  line-height: ${({ theme }) => theme.font[18].lineHeight};
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
`

export default StoryPage
