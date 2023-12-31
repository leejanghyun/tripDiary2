import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  Button,
  COLOR, DateRangePicker, IcoImage, Input, SchemeType, Tabmenu, TextArea, toastError, toastSuccess,
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

import { deleteFeed, postFeed, putFeed } from '@/api/'
import { Container } from '@/components/Container'
import FrameLayout from '@/components/FrameLayout'
import { Map } from '@/components/Map'
import { MENU_ID } from '@/components/Menu'
import StarRating from '@/components/StarRating/StarRating'
import { UploadImage } from '@/components/UploadImage'
import { KEYS } from '@/constants'
import { Feed } from '@/db'
import { feedMetaState } from '@/feature/shared/atoms/feedMetaState'
import { useMount } from '@/hooks/useMount'
import { getPlaceName, getPosition, Location } from '@/utils/map'

import { deleteUploadedFile } from '../../api/deleteUploadedFile'
import { uploadFeedFile } from '../../api/uploadFeedFile'
import { RemoveButton } from '../../components/RemoveButton/RemoveButton'
import useMyFeed from '../shared/hooks/useMyFeed'
import { AddressSearch } from './components/AddressSearch'
import AlbumButton, { MAX_UPLOAD_SIZE } from './components/AlbumButton'
import HashtagInput from './components/HashTag'
import {
  CreateFeedFormType, FEED_KIND, FEED_KIND_DATA_SOURCES, FORM_FIELD, getCreateDefaultValue,
} from './constants/form'

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
  const [address, hashTags, stars, location, feedKind] = watch([
    FORM_FIELD.ADDRESS,
    FORM_FIELD.HAS_TAGS,
    FORM_FIELD.STARS,
    FORM_FIELD.LOCATION,
    FORM_FIELD.FEED_KIND,
  ])
  const [meta, setMeta] = useAtom(feedMetaState)
  const imageFileList = useWatch({ control, name: FORM_FIELD.FILE_LIST })
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data } = useMyFeed(id as string)
  const { content: feed } = data || {}
  const schema: SchemeType<FEED_KIND | null>[] = FEED_KIND_DATA_SOURCES.map((item) => {
    return {
      design: 'Switch',
      ...item,
    }
  })

  const { mutate: submitFeed, isLoading } = useMutation<boolean, AxiosError, Omit<Feed, '_id'> | Feed>(
    (data) => (isEdit ? putFeed(data as Feed) : postFeed(data)),
    {
      onSuccess: () => {
        queryClient.refetchQueries([KEYS.FEED_LIST()])
        toastSuccess(`피드를 성공적으로 ${isEdit ? '수정' : '등록'}했습니다.`)
        router.push('/feed-list')
      },
    },
  )

  const { mutate: deleteUserFeed } = useMutation<boolean, AxiosError, string>(
    (id: string) => (deleteFeed(id)),
    {
      onSuccess: () => {
        toastSuccess('피드를 삭제 했습니다.')
        router.push('/feed-list')
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
      address,
      title,
      stars,
      hashTags,
      feedKind,
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
      [FORM_FIELD.ADDRESS]: address,
      [FORM_FIELD.TITLE]: title,
      [FORM_FIELD.HAS_TAGS]: hashTags,
      [FORM_FIELD.STARS]: stars,
      [FORM_FIELD.FEED_KIND]: feedKind || FEED_KIND.ETC,
    })
  }, [isEdit, reset, setValue, feed])

  const onSubmit: SubmitHandler<CreateFeedFormType> = (data) => {
    const { location } = data

    if (!location) {
      toastError('위치를 입력해주세요.')
      return
    }

    if (isEdit) {
      submitFeed({
        ...data,
        location,
        _id: id as string,
        bookmarks: feed?.bookmarks as string[] || [],
      })
      return
    }

    submitFeed({ ...data, location, bookmarks: [] })
  }

  const initLocation = async () => {
    const location = await getPosition()

    if (!location) {
      return
    }

    setValue(FORM_FIELD.LOCATION, location)

    const address = await getPlaceName(location)

    if (address) {
      setValue(FORM_FIELD.ADDRESS, address)
    }
  }

  useMount(() => {
    if (!isEdit) {
      initLocation()
    }
  })

  const uploadFile = useCallback((file: File) => {
    const reader = new FileReader()

    reader.onload = async () => {
      const body = new FormData()
      const fileName = `multer/${Math.random().toString(36).substring(2, 11)}${file.name}`

      body.append('image', file)
      body.append('name', fileName)

      const content = await uploadFeedFile(body)

      if (!content) {
        return
      }

      const imageFileList = getValues(FORM_FIELD.FILE_LIST)

      if (!imageFileList) {
        setValue(FORM_FIELD.FILE_LIST, [content as string])
      } else {
        setValue(FORM_FIELD.FILE_LIST, [...imageFileList, content as string])
      }
    }

    reader.readAsDataURL(file)
  }, [setValue, getValues])

  /**
   * 소재 이미지 파일 업로드 시
   */
  const handleImageFileUpload = useCallback((file: FileList) => {
    let { length } = file

    if (length > MAX_UPLOAD_SIZE) {
      toastError(`이미지 업로드는 최대${MAX_UPLOAD_SIZE}장만 가능합니다.`)
      length = MAX_UPLOAD_SIZE
    }

    for (let i = 0; i < length; i += 1) {
      uploadFile(file[i])
    }
  }, [uploadFile])

  const handleHashTags = useCallback((values: string[]) => {
    setValue(FORM_FIELD.HAS_TAGS, values)
  }, [setValue])

  const handleStars = useCallback((value: number) => {
    setValue(FORM_FIELD.STARS, value)
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

  const handleDeletePicture = useCallback(async (idx: number) => {
    const {
      [FORM_FIELD.FILE_LIST]: imageFileList,
      [FORM_FIELD.IMG_DESCRIPTION]: imageDescriptions,
    } = getValues()

    if (!imageFileList) {
      return
    }

    const res = await deleteUploadedFile(imageFileList[idx])

    if (!res) {
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
          right={(
            <RightSide>
              {isEdit && (
                <Button
                  palette="red-stroke"
                  type="button"
                  size="small"
                  onClick={() => { deleteUserFeed(id as string) }}
                >
                  삭제
                </Button>
              )}
              <Button
                type="submit"
                size="small"
                disabled={isLoading}
                palette={`${isEdit ? 'white-stroke' : 'blue-stroke'}`}
              >
                {isEdit ? '수정' : '등록'}
              </Button>
            </RightSide>
          )}
        >
          <Container>
            <FirstLine>
              <StarRating
                size={35}
                initialRating={stars}
                onChange={handleStars}
              />
              <div>평가하려면 별표 탭하기</div>
            </FirstLine>
            <Line>
              <Tabmenu
                width={5}
                selected={feedKind}
                scheme={schema}
                onChange={(value) => {
                  setValue(FORM_FIELD.FEED_KIND, value as FEED_KIND)
                }}
              />
            </Line>
            <DateRangePicker
              control={control}
              name={FORM_FIELD.DATE}
              rules={{
                required: true,
              }}
            />
            <AddressSearch
              defaultValues={address}
              name={FORM_FIELD.ADDRESS}
            />
            <MapWrapper>
              <Map
                disableTtile
                disableAutoLocation={isEdit}
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
                maxLength={50}
                rules={{
                  required: true,
                }}
              />
            </Line>
            <Line>
              <TextArea
                control={control}
                name={FORM_FIELD.CONTENT}
                maxLength={200}
                label="내용을 입력하세요."
              />
            </Line>
            <HashtagInput
              defaultValue={hashTags}
              onChange={handleHashTags}
            />
            <NotiInfoBlock>
              <IcoImage
                type="noti"
                visibleText={`이미지 업로드는 최대${MAX_UPLOAD_SIZE}장만 가능합니다.`}
                styles={NotiIcon}
              />
            </NotiInfoBlock>
            <ImageFileWrapper>
              {(imageFileList as string[] || []).map((file, idx) => (
                <CustomImage
                  key={`img-${idx}`}
                >
                  <RemoveButton
                    onClick={() => handleDeletePicture(idx)}
                  />
                  <UploadImage
                    src={file}
                  />
                  <Input
                    control={control}
                    name={`${FORM_FIELD.IMG_DESCRIPTION}.${idx}`}
                    variant="naked"
                    maxLength={100}
                    label={`${idx + 1}번 이미지에 대한 설명을 입력하시오.`}
                    isStretch
                  />
                </CustomImage>
              ))}
            </ImageFileWrapper>
            <AlbumButton
              isMaxUploaded={Boolean((imageFileList || []).length > MAX_UPLOAD_SIZE - 1)}
              onUpload={handleImageFileUpload}
            />
          </Container>
        </FrameLayout>
      </form>
    </FormProvider>
  )
}

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const MapWrapper = styled.div`
  margin: 0 0 12px 0;
  width: 100%;
  height: 20vh;
  border: 1px solid ${COLOR.primary.color.tmobi.blue[200]};
  border-radius: 10px;
`

const FirstLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 12px;

  > div:nth-of-type(2) {
    color: ${COLOR.gray.color.gray[900]};
    font-size: ${({ theme }) => theme.font[14].size};
    line-height: ${({ theme }) => theme.font[14].lineHeight};
  }
`

const Line = styled.div<{ margin?: number }>`
  margin: ${({ margin = 12 }) => `${margin}px 0;`};
`

const NotiIcon = css`
  color: ${COLOR.gray.color.gray[600]};
  font-weight: 300;
`

const NotiInfoBlock = styled.div`
  padding: 1px 0 9px 0px;
`

const CustomImage = styled.div`
  position: relative;
  width: 100%;
`

const ImageFileWrapper = styled.div`
  display: flex;
  position: relative;
  gap: 5px;
  flex-wrap: wrap;
  margin: 12px 0;
`

export default FeedPage
