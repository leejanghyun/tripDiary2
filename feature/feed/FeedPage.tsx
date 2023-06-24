import styled from '@emotion/styled'
import {
  Button, COLOR, Input, TextArea,
} from '@TMOBI-WEB/ads-ui'
import { useAtom } from 'jotai'
import { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Container } from '@/components/Container'
import FrameLayout from '@/components/FrameLayout'
import Map from '@/components/Map/Map'
import { MENU_ID } from '@/components/Menu'
import { getPosition } from '@/utils/map'

import { useMount } from '../../hooks/useMount'
import { feedMetaState } from '../shared/atoms/feedMetaState'
import { AddressSearch } from './components/AddressSearch'
import { CreateFeedFormType, FORM_FIELD, getCreateDefaultValue } from './constants/form'

function FeedPage() {
  const defaultValues = getCreateDefaultValue()
  const formMethods = useForm<CreateFeedFormType>({
    defaultValues,
    mode: 'onBlur',
  })
  const { watch, setValue, control } = formMethods
  const [location, imageFile] = watch([FORM_FIELD.LOCATION, FORM_FIELD.FILE])
  const [meta, setMeta] = useAtom(feedMetaState)

  const initLocation = async () => {
    const location = await getPosition()

    setValue(FORM_FIELD.LOCATION, location)
  }

  useMount(() => {
    initLocation()
  })

  /**
   * 소재 이미지 파일 업로드 시
   */
  const handleImageFileUpload = useCallback((file: File) => {
    const reader = new FileReader()
    console.log(file)

    reader.onload = () => {
      const dataUrl = reader.result

      setValue(FORM_FIELD.FILE, dataUrl as string)
    }

    reader.readAsDataURL(file)
  }, [setValue])

  /**
   * Camera로 이미지 파일 업로드 시
   */
  useEffect(() => {
    if (meta) {
      handleImageFileUpload(meta)
    }

    return () => {
      setMeta(null)
    }
  }, [setMeta, meta, handleImageFileUpload])

  return (
    <FrameLayout
      title="피드 생성"
      descriptionTooltipMessages={['피드를 생성하시오.']}
      titleTooltipMessage="피드 생성"
      menuId={MENU_ID.ADD_FEED}
    >
      <Container>
        <FormProvider {...formMethods}>
          <AddressSearch
            name={FORM_FIELD.SEARCH_TEXT}
          />
          <MapWrapper>
            <Map
              defaultLocation={location}
              zoom={15}
              markers={location ? [location] : []}
            />
          </MapWrapper>
          <Line>
            <Input
              control={control}
              name={FORM_FIELD.TITLE}
              label="제목"
              placeholder="제목을 입력하세요."
            />
          </Line>
          <Line>
            <TextArea
              control={control}
              name={FORM_FIELD.CONTENT}
              maxLength={200}
              label="내용"
              placeholder="내용을 입력하세요."
            />
          </Line>
          <ImageFileUploadBlock
            hasFile={Boolean(imageFile)}
          >
            <div>
              등록할 이미지를 선택해주세요.
            </div>
            <div>
              <Button
                palette="blue-stroke"
                size="small"
                uploadImageMultiple
                onUpload={handleImageFileUpload}
              >
                {imageFile ? '재선택' : '조회선택' }
              </Button>
            </div>
          </ImageFileUploadBlock>
          {imageFile && (
          <ImageWrapper>
            <img
              width="100%"
              height="auto"
              src={imageFile as string}
              alt="feed"
            />
          </ImageWrapper>
          )}
        </FormProvider>
      </Container>
    </FrameLayout>
  )
}

const MapWrapper = styled.div`
  margin: 10px 0 0 0;
  width: 100%;
  height: 25vh;
  border: 1px solid ${COLOR.primary.color.tmobi.blue[200]};
  border-radius: 10px;
`

const Line = styled.div`
  margin: 10px 0;
`

const ImageWrapper = styled.div`
  margin: 10px 0 0 0;
  border: 1px solid ${COLOR.primary.color.tmobi.blue[300]};
`

const ImageFileUploadBlock = styled.div<{ hasFile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: ${COLOR.gray.color.gray[500]};
  font-size: ${({ theme }) => theme.font[12].size};
  line-height: ${({ theme }) => theme.font[12].lineHeight};

  > div {
    margin: 10px 0;
  }
`

export default FeedPage
