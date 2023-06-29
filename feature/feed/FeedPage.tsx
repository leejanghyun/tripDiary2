import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  Button,
  COLOR, DateRangePicker, Input, TextArea, toastError, toastSuccess,
} from '@TMOBI-WEB/ads-ui'
import { AxiosError } from 'axios'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import {
  useCallback, useEffect,
} from 'react'
import {
  FormProvider, SubmitHandler, useForm, useWatch,
} from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

import { Container } from '@/components/Container'
import FrameLayout from '@/components/FrameLayout'
import Map from '@/components/Map/Map'
import { MENU_ID } from '@/components/Menu'
import UploadImage from '@/components/UploadImage/UploadImage'
import { Feed } from '@/db'
import { feedMetaState } from '@/feature/shared/atoms/feedMetaState'
import { useMount } from '@/hooks/useMount'
import { ReactComponent as DeleteItem } from '@/images/ico_20_delete.svg'
import { getPlaceName, getPosition, Location } from '@/utils/map'

import { postFeed } from '../../api/postFeed'
import { KEYS } from '../../constants'
import useMyFeed from '../shared/hooks/useMyFeed'
import { AddressSearch } from './components/AddressSearch'
import AlbumButton from './components/AlbumButton'
import { CreateFeedFormType, FORM_FIELD, getCreateDefaultValue } from './constants/form'

type Props = {
  query?: ParsedUrlQuery
}

function FeedPage({ query }: Props) {
  const { id } = query || {}
  const isEdit = Boolean(id)
  const defaultValues = getCreateDefaultValue()
  const formMethods = useForm<CreateFeedFormType>({
    defaultValues,
    mode: 'onBlur',
  })
  const {
    watch, setValue, control, getValues, reset, handleSubmit,
  } = formMethods
  const [location] = watch([FORM_FIELD.LOCATION])
  const [meta, setMeta] = useAtom(feedMetaState)
  const imageFileList = useWatch({ control, name: FORM_FIELD.FILE_LIST })
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data } = useMyFeed(id as string)
  const { content: feed } = data || {}

  const { mutate: submit } = useMutation<boolean, AxiosError, Omit<Feed, '_id'>>(
    (data) => postFeed(data),
    {
      onSuccess: () => {
        queryClient.refetchQueries([...KEYS.FEED_LIST()])
        toastSuccess('피드를 성공적으로 등록했습니다.')
        router.push('/feed-list')
      },
      onError: () => {
        toastSuccess('피드 등록에 실패 하셨습니다.')
      },
    },
  )

  /**
   * 초기화
   */
  useEffect(() => {
    if (!isEdit || !feed) {
      return
    }

    const {
      content,
      date,
      fileList,
      imageDescriptions,
      location,
      searchText,
      title,
    } = feed

    const defaultValues = getCreateDefaultValue()
    const dateObjects = Array.isArray(date) ? date.map((dateString) => new Date(dateString))
      : [new Date(), new Date()]

    reset({
      ...defaultValues,
      [FORM_FIELD.CONTENT]: content,
      [FORM_FIELD.DATE]: dateObjects,
      [FORM_FIELD.FILE_LIST]: fileList,
      [FORM_FIELD.IMG_DESCRIPTION]: imageDescriptions,
      [FORM_FIELD.LOCATION]: location,
      [FORM_FIELD.SEARCH_TEXT]: searchText,
      [FORM_FIELD.TITLE]: title,
    })
  }, [isEdit, reset, setValue, feed])

  const onSubmit: SubmitHandler<CreateFeedFormType> = (data) => {
    const { location } = data

    if (!location) {
      toastError('위치를 입력해주세요.')
      return
    }

    submit({ ...data, location })
  }

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
      [FORM_FIELD.IMG_DESCRIPTION]: imageDescriptions,
    } = getValues()

    if (!imageFileList) {
      return
    }

    const newImageList = (imageFileList as string[]).slice(0, idx).concat((imageFileList as string[]).slice(idx + 1))
    const newDescriptions = (imageDescriptions as string[]).slice(0, idx)
      .concat((imageDescriptions as string[]).slice(idx + 1))

    setValue(FORM_FIELD.FILE_LIST, newImageList)
    setValue(FORM_FIELD.IMG_DESCRIPTION, newDescriptions)
  }, [setValue, getValues])

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FrameLayout
          title="피드 생성"
          descriptionTooltipMessages={['피드를 생성하시오.']}
          titleTooltipMessage="피드 생성"
          menuId={MENU_ID.ADD_FEED}
          left={(
            <Button
              type="submit"
              size="small"
              palette="blue-stroke"
            >
              등록
            </Button>
        )}
        >
          <Container>
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
                markers={location ? [{ location: location as Location }] : []}
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
            <AlbumButton onUpload={handleImageFileUpload} />
          </Container>
        </FrameLayout>
      </form>
    </FormProvider>
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
