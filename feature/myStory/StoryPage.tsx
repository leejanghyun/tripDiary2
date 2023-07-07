import styled from '@emotion/styled'
import {
  Button, COLOR, Input,
} from '@TMOBI-WEB/ads-ui'
import { ParsedUrlQuery } from 'querystring'
import { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { getFeeds } from '@/api/getFeeds'
import FrameLayout from '@/components/FrameLayout'
import useStory from '@/feature/shared/hooks/useStory'
import { ReactComponent as EmptyBox } from '@/images/ico_empty_box.svg'

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
  const formMethods = useForm<FormType>({
    defaultValues,
    mode: 'onBlur',
  })
  const {
    control, setValue, watch,
  } = formMethods
  const { data } = useStory(id as string)
  const [isOpenFeedSelectModal, setOpenFeedSelectModal] = useState(false)
  const { content: story } = data || {}
  const { title, feedList = [] } = story || {}
  const isEmpty = !feedList || feedList.length === 0
  const selectedFeeds = watch(FORM_FIELD.SELECTED_FEEDS)
  console.log(selectedFeeds)

  const initFeedList = useCallback(async (ids: string[]) => {
    if (ids && ids.length > 0) {
      const res = await getFeeds(ids)
      const { content } = res || {}

      setValue(FORM_FIELD.SELECTED_FEEDS, content || [])
    }
  }, [setValue])

  useEffect(() => {
    setValue(FORM_FIELD.TITLE, title || '')

    if (feedList) {
      initFeedList(feedList)
    }
  }, [title, setValue, feedList, initFeedList])

  const handleSelectFeedCancel = useCallback(() => {
    setOpenFeedSelectModal(false)
  }, [])

  const handleFeedAdd = useCallback(() => {
    setOpenFeedSelectModal(false)
  }, [])

  const handleFeedAddClick = useCallback(() => {
    setOpenFeedSelectModal(true)
  }, [])

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
            >
              수정
            </Button>
            <Button
              type="submit"
              size="small"
              palette="blue-stroke"
              onClick={handleFeedAddClick}
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
        </Container>
      </FrameLayout>
      <FeedSelectModal
        isOpen={isOpenFeedSelectModal}
        onCancel={handleSelectFeedCancel}
        onFeedAdd={handleFeedAdd}
      />
    </FormProvider>
  )
}

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
