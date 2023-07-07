import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  Button,
  Checkbox,
  COLOR,
  Dialog,
} from '@TMOBI-WEB/ads-ui'
import dayjs from 'dayjs'
import {
  ChangeEvent, Fragment, useCallback, useEffect, useMemo, useState,
} from 'react'

import { Feed } from '@/db'
import FeedCard from '@/feature/shared/components/FeedCard/FeedCard'
import useMyFeeds from '@/feature/shared/hooks/useMyFeeds'

type Props = {
  isOpen: boolean
  selectedFeeds: Feed[]
  onCancel: () => void
  onFeedAdd: (newItems: Feed[]) => void
}

function FeedSelectModal({
  isOpen, selectedFeeds, onCancel, onFeedAdd,
}: Props) {
  const { data } = useMyFeeds()
  const { content = [] } = data || {}
  const selectedIds = selectedFeeds.map((item) => item?._id)
  const [isOpenFeedModal, setOpenFeedModal] = useState(isOpen)
  const [newSelectedFeeds, setNewSelectedFeeds] = useState<Feed[]>([])

  useEffect(() => {
    setOpenFeedModal(isOpen)
  }, [isOpen])

  const handleCancelClick = useCallback(() => {
    onCancel()
  }, [onCancel])

  const handleAddClick = useCallback(() => {
    setNewSelectedFeeds([])
    onFeedAdd(newSelectedFeeds)
  }, [newSelectedFeeds, onFeedAdd])

  const filteredContent = useMemo(() => {
    const sortedData = content.sort((prev, next) => {
      const prevDate = new Date(prev.date[1])
      const nextDate = new Date(next.date[1])

      return nextDate.getTime() - prevDate.getTime()
    })
    const DATE_ARR: string[] = []
    const filteredData = sortedData.filter((item: Feed) => !selectedIds.includes(item._id))

    return filteredData.map((item) => {
      const { date } = item || {}
      const lastDate = date?.[1] || ''
      const koDate = dayjs(lastDate).locale('ko')
      const formattedDate = koDate.format('YYYY년 MM월 DD일')
      const target = DATE_ARR.find((date) => date === formattedDate)

      if (!target) {
        DATE_ARR.push(formattedDate)
      }

      return { ...item, firstOfDate: !target ? formattedDate : '' }
    })
  }, [content, selectedIds])

  const handleCheckboxChange = useCallback((e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const isChecked = (e.target as HTMLInputElement).checked
    const target = newSelectedFeeds.find((item: Feed) => item._id === filteredContent[idx]._id)

    if (isChecked && !target) {
      const newItem = [...newSelectedFeeds, filteredContent[idx]]

      setNewSelectedFeeds(newItem)
    } else if (!isChecked && target) {
      const newItem = newSelectedFeeds.filter((item: Feed) => item._id !== filteredContent[idx]._id)

      setNewSelectedFeeds(newItem)
    }
  }, [filteredContent, newSelectedFeeds])

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
          {(filteredContent || []).map((feed, idx) => {
            const { title, firstOfDate, ...rest } = feed || {}

            return (
              <Fragment key={idx}>
                {firstOfDate && <DateBlock>{firstOfDate}</DateBlock>}
                <CardWrapper key={feed._id}>
                  <Checkbox
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
              </Fragment>
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

const DateBlock = styled.div`
  color: ${COLOR.gray.color.gray[600]};
  font-size: ${({ theme }) => theme.font[18].size};
  line-height: ${({ theme }) => theme.font[18].lineHeight};
  padding-bottom: 10px;
`

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
