import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  Button,
  COLOR, Input, TextArea,
} from '@TMOBI-WEB/ads-ui'
import { useAtom } from 'jotai'
import {
  Fragment, useCallback, useEffect,
} from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Container } from '@/components/Container'
import FrameLayout from '@/components/FrameLayout'
import Map from '@/components/Map/Map'
import { MENU_ID } from '@/components/Menu'
import { feedMetaState } from '@/feature/shared/atoms/feedMetaState'
import { useMount } from '@/hooks/useMount'
import { getPosition } from '@/utils/map'

import CustomImage from '../../components/CustomImage/CustomImage'
import { AddressSearch } from './components/AddressSearch'
import AlbumButton from './components/AlbumButton'
import { CreateFeedFormType, FORM_FIELD, getCreateDefaultValue } from './constants/form'

function FeedPage() {
  const defaultValues = getCreateDefaultValue()
  const formMethods = useForm<CreateFeedFormType>({
    defaultValues,
    mode: 'onBlur',
  })
  const {
    watch, setValue, control, getValues,
  } = formMethods
  const [location, imageFileList] = watch([FORM_FIELD.LOCATION, FORM_FIELD.FILE_LIST])
  const [meta, setMeta] = useAtom(feedMetaState)

  const initLocation = async () => {
    const location = await getPosition()

    setValue(FORM_FIELD.LOCATION, location)
  }

  useMount(() => {
    initLocation()
  })

  const uploadFile = useCallback((file: File) => {
    const reader = new FileReader()

    reader.onload = () => {
      const dataUrl = reader.result
      const imageFileList = getValues(FORM_FIELD.FILE_LIST)

      if (!imageFileList) {
        setValue(FORM_FIELD.FILE_LIST, [dataUrl as string])
      } else {
        setValue(FORM_FIELD.FILE_LIST, [...imageFileList, dataUrl as string])
      }
    }

    reader.readAsDataURL(file)
  }, [setValue, getValues])

  /**
   * 소재 이미지 파일 업로드 시
   */
  const handleImageFileUpload = useCallback((file: FileList) => {
    const { length } = file

    for (let i = 0; i < length; i += 1) {
      uploadFile(file[i])
    }
  }, [uploadFile])

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

  const handleDeletePicture = useCallback((idx: number) => {
    const imageFileList = getValues(FORM_FIELD.FILE_LIST)

    if (!imageFileList) {
      return
    }

    const newArray = [...imageFileList.slice(0, idx), ...imageFileList.slice(idx + 1)]

    console.log(newArray)

    setValue(FORM_FIELD.FILE_LIST, newArray)
  }, [setValue, getValues])

  return (
    <FrameLayout
      title="피드 생성"
      descriptionTooltipMessages={['피드를 생성하시오.']}
      titleTooltipMessage="피드 생성"
      menuId={MENU_ID.ADD_FEED}
      left={(
        <Button
          size="small"
          palette="blue-stroke"
        >
          등록
        </Button>
)}
    >
      <Container>
        <FormProvider {...formMethods}>
          <MapWrapper>
            <Map
              defaultLocation={location}
              zoom={15}
              markers={location ? [location] : []}
            />
          </MapWrapper>
          <AddressSearch
            name={FORM_FIELD.SEARCH_TEXT}
          />
          <Line>
            <Input
              control={control}
              name={FORM_FIELD.TITLE}
              label="제목을 입력하세요."
            />
          </Line>
          <Line>
            <TextArea
              control={control}
              name={FORM_FIELD.CONTENT}
              maxLength={200}
              label="내용을 입력하세요."
              styles={
                css`
                  height: 100px;
                `
              }
            />
          </Line>
          <ImageFileWrapper>
            {(imageFileList as string[] || []).map((file, idx) => (
              <Fragment
                key={`img-${idx}`}
              >
                <CustomImage
                  src={file}
                  onDelete={() => handleDeletePicture(idx)}
                />
                <Input
                  control={control}
                  name={FORM_FIELD.TITLE}
                  variant="naked"
                  label="이미지에 대한 설명을 입력하시오."
                  isStretch
                />
              </Fragment>
            ))}
          </ImageFileWrapper>
        </FormProvider>
        <AlbumButton onUpload={handleImageFileUpload} />
      </Container>
    </FrameLayout>
  )
}

const MapWrapper = styled.div`
  margin: 0 0 12px 0;
  width: 100%;
  height: 25vh;
  border: 1px solid ${COLOR.primary.color.tmobi.blue[200]};
  border-radius: 10px;
`

const Line = styled.div`
  margin: 12px 0;
`

const ImageFileWrapper = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin: 12px 0;
`

export default FeedPage
