import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  Button,
  COLOR, DateRangePicker, Input, TextArea,
} from '@TMOBI-WEB/ads-ui'
import { useAtom } from 'jotai'
import {
  useCallback, useEffect,
} from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'

import { Container } from '@/components/Container'
import FrameLayout from '@/components/FrameLayout'
import Map from '@/components/Map/Map'
import { MENU_ID } from '@/components/Menu'
import { feedMetaState } from '@/feature/shared/atoms/feedMetaState'
import { useMount } from '@/hooks/useMount'
import { ReactComponent as DeleteItem } from '@/images/ico_20_delete.svg'
import { getPlaceName, getPosition } from '@/utils/map'

import UploadImage from '../../components/UploadImage/UploadImage'
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
  const [location] = watch([FORM_FIELD.LOCATION])
  const [meta, setMeta] = useAtom(feedMetaState)
  const imageFileList = useWatch({ control, name: FORM_FIELD.FILE_LIST })

  const initLocation = async () => {
    const location = await getPosition()

    setValue(FORM_FIELD.LOCATION, location)

    if (!location) {
      return
    }

    const placeName = await getPlaceName(location)

    if (placeName) {
      setValue(FORM_FIELD.SEARCH_TEXT, placeName)
    }
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
    const {
      [FORM_FIELD.FILE_LIST]: imageFileList,
      [FORM_FIELD.IMG_DESCRIPTION]: imageDescription,
    } = getValues()

    if (!imageFileList) {
      return
    }

    const newArray = (imageFileList as string[]).slice(0, idx).concat((imageFileList as string[]).slice(idx + 1))
    const newDescriptions = (imageDescription as string[]).slice(0, idx)
      .concat((imageDescription as string[]).slice(idx + 1))

    setValue(FORM_FIELD.FILE_LIST, newArray)
    setValue(FORM_FIELD.IMG_DESCRIPTION, newDescriptions)
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
          <DateRangePicker
            control={control}
            name={FORM_FIELD.DATE}
            rules={{
              required: true,
            }}
          />
          <Line>
            <AddressSearch
              name={FORM_FIELD.SEARCH_TEXT}
            />
          </Line>
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
              label="제목을 입력하세요."
            />
          </Line>
          <Line>
            <TextArea
              control={control}
              name={FORM_FIELD.CONTENT}
              maxLength={200}
              label="내용을 입력하세요."
              styles={css` height: 100px;`}
            />
          </Line>
          <ImageFileWrapper>
            {(imageFileList as string[] || []).map((file, idx) => (
              <CustomImage
                key={`img-${idx}`}
              >
                <RemoveButtonStyles
                  onClick={() => handleDeletePicture(idx)}
                >
                  <DeleteItem />
                </RemoveButtonStyles>
                <UploadImage
                  src={file}
                />
                <Input
                  control={control}
                  name={`${FORM_FIELD.IMG_DESCRIPTION}.${idx}`}
                  variant="naked"
                  label={`${idx + 1}번 이미지에 대한 설명을 입력하시오.`}
                  isStretch
                />
              </CustomImage>
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

const CustomImage = styled.div`
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

const ImageFileWrapper = styled.div`
  display: flex;
  position: relative;
  gap: 5px;
  flex-wrap: wrap;
  margin: 12px 0;
`

export default FeedPage
