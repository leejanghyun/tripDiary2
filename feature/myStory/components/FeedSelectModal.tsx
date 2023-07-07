import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  Button,
  Checkbox,
  COLOR,
  Dialog,
} from '@TMOBI-WEB/ads-ui'
import {
  ChangeEvent, useCallback, useEffect, useState,
} from 'react'
import { useFormContext } from 'react-hook-form'

import { Feed } from '@/db'
import FeedCard from '@/feature/shared/components/FeedCard/FeedCard'
import useMyFeeds from '@/feature/shared/hooks/useMyFeeds'

import { FORM_FIELD } from '../constants/form'

type Props = {
  isOpen: boolean
  onCancel: () => void
  onFeedAdd: () => void
}

function FeedSelectModal({
  isOpen, onCancel, onFeedAdd,
}: Props) {
  const { setValue, watch, getValues } = useFormContext()
  const [isOpenFeedModal, setOpenFeedModal] = useState(isOpen)
  const { data } = useMyFeeds()
  const { content = [] } = data || {}
  const selectedFeeds = watch(FORM_FIELD.SELECTED_FEEDS)

  console.log(selectedFeeds)

  useEffect(() => {
    setOpenFeedModal(isOpen)
  }, [isOpen])

  const handleCancelClick = useCallback(() => {
    onCancel()
  }, [onCancel])

  const handleAddClick = useCallback(() => {
    onFeedAdd()
  }, [onFeedAdd])

  const handleCheckboxChange = useCallback((e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const isChecked = (e.target as HTMLInputElement).checked

    const { [FORM_FIELD.SELECTED_FEEDS]: selectedFeeds } = getValues()
    const target = selectedFeeds.find((item: Feed) => item._id === content[idx]._id)

    if (isChecked && !target) {
      const newItem = [...selectedFeeds, content[idx]]

      setValue(FORM_FIELD.SELECTED_FEEDS, newItem)
    } else if (!isChecked && target) {
      const newItem = selectedFeeds.filter((item: Feed) => item._id !== content[idx]._id)

      setValue(FORM_FIELD.SELECTED_FEEDS, newItem)
    }
  }, [setValue, content, getValues])

  return (
    <Dialog
      open={isOpenFeedModal}
      styles={DialogStyles}
    >
      <Container>
        <Title>
          피드 선택
        </Title>
        <FeedsContent>
          {(content || []).map((feed, idx) => {
            const { title, ...rest } = feed || {}
            return (
              <CardWrapper
                key={feed._id}
              >
                <Checkbox
                 // disabled={Boolean(selectedIds.find((item) => item === rest?._id))}
                  label={title}
                  onChange={(e) => handleCheckboxChange(e, idx)}
                  styles={css`
                    padding-left: 0px;
                  `}
                />
                <FeedCard
                  isFullWidth
                  title=""
                  disableEditDropDown
                  hideBottom
                  {...rest}
                />
              </CardWrapper>
            )
          })}
        </FeedsContent>
        <ButtonWrapper>
          <Button
            palette="white"
            type="button"
            size="small"
            onClick={handleCancelClick}
          >
            취소
          </Button>
          <Button
            palette="blue"
            type="button"
            size="small"
            onClick={handleAddClick}
          >
            추가
          </Button>
        </ButtonWrapper>
      </Container>
    </Dialog>
  )
}

const CardWrapper = styled.div`
  display: flex;
  align-items: flex-start;;
  flex-direction: column;
  padding-bottom: 10px;
  border-bottom: 1px solid ${COLOR.gray.color.gray[300]};
`

const DialogStyles = css`
  width: 90%;
  height: 90%;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 20px;
  width: 100%;
  height: 100%;
  color: ${COLOR.gray.color.gray[900]};
  font-weight: 500;
  font-size: ${({ theme }) => theme.font[18].size};
  line-height: ${({ theme }) => theme.font[18].lineHeight};
`

const Title = styled.div`
  display: flex;
  width: 100%;
  padding-top: 20px;
  height: 10%;
`

const FeedsContent = styled.div`
  display: flex;
  overflow-x: hidden;
  overflow-y: auto;
  height: 80%;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 10px;
  height: 10%;
  width: 100%;
  gap: 10px;
`

export default FeedSelectModal
