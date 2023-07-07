import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  Button,
  COLOR,
  Dialog, Input,
} from '@TMOBI-WEB/ads-ui'
import { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

type Props = {
  isOpen: boolean
  onCancel: () => void
  onMakeStory: (storyName: string) => void
}

export const enum FORM_FIELD {
  TITLE = 'title',
}

export interface FormType {
  [FORM_FIELD.TITLE]: string
}

export const getCreateDefaultValue = () => {
  return {
    [FORM_FIELD.TITLE]: '',
  }
}

function FeedSelectModal({ isOpen, onCancel, onMakeStory }: Props) {
  const [isOpenFeedModal, setOpenFeedModal] = useState(isOpen)
  const defaultValues = getCreateDefaultValue()
  const formMethods = useForm<FormType>({
    defaultValues,
    mode: 'onBlur',
  })
  const {
    control, setValue, getValues, watch,
  } = formMethods
  const title = watch(FORM_FIELD.TITLE)

  useEffect(() => {
    setOpenFeedModal(isOpen)
  }, [isOpen])

  const handleCancelClick = useCallback(() => {
    setValue(FORM_FIELD.TITLE, '')

    onCancel()
  }, [setValue, onCancel])

  const handleMakeClick = useCallback(() => {
    const { [FORM_FIELD.TITLE]: title } = getValues()

    setValue(FORM_FIELD.TITLE, '')

    onMakeStory(title)
  }, [setValue, getValues, onMakeStory])

  return (
    <FormProvider {...formMethods}>
      <Dialog
        open={isOpenFeedModal}
        styles={DialogStyles}
      >
        <Container>
          <div>
            <div>
              스토리 생성
            </div>
            <Input
              control={control}
              name={FORM_FIELD.TITLE}
              maxLength={100}
              label="제목 입력"
              placeholder="스토리 제목을 입력하세요."
              rules={{
                required: true,
              }}
            />
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
                onClick={handleMakeClick}
                disabled={!title}
              >
                생성하기
              </Button>
            </ButtonWrapper>
          </div>
        </Container>
      </Dialog>
    </FormProvider>
  )
}

const DialogStyles = css`
  width: 80% !important;
  height: 30%;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
  width: 100%;
  height: 100%;
  color: ${COLOR.gray.color.gray[900]};
  font-weight: 500;
  font-size: ${({ theme }) => theme.font[18].size};
  line-height: ${({ theme }) => theme.font[18].lineHeight};

  > div {
    display: flex;
    gap: 15px;
    flex-direction: column;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`

export default FeedSelectModal
