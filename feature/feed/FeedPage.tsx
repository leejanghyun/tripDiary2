import styled from '@emotion/styled'
import {
  Button,
  COLOR,
} from '@TMOBI-WEB/ads-ui'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useCallback } from 'react'

import { Container } from '@/components/Container'
import FrameLayout from '@/components/FrameLayout'
import { Map } from '@/components/Map'
import StarRating from '@/components/StarRating/StarRating'
import { UploadImage } from '@/components/UploadImage'
import { formatDisplayDateTime } from '@/utils'
import { Location } from '@/utils/map'

import useFeed from '../shared/hooks/useFeed'
import { getFeedKindTag } from './constants/form'

type Props = {
  query?: ParsedUrlQuery
}

function FeedPage({ query }: Props) {
  const { id } = query || {}
  const { data } = useFeed(id as string)
  const { content: feed } = data || {}
  const {
    stars, location, hashTags, fileList, title, content, feedKind, date,
  } = feed || {}
  const router = useRouter()
  const startDate = date ? formatDisplayDateTime(new Date(date[0]), 'yy년 MM월 dd일') : '-'
  const endDate = date ? formatDisplayDateTime(new Date(date[1]), 'yy년 MM월 dd일') : '-'

  const handleEdit = useCallback(() => {
    router.push(`/edit/feed/${id}`)
  }, [router, id])

  return (
    <FrameLayout
      title="피드 보기"
      right={(
        <RightSide>
          <Button
            type="submit"
            size="small"
            palette="blue-stroke"
            onClick={handleEdit}
          >
            편집
          </Button>
        </RightSide>
          )}
    >
      <Container>
        <FirstLine>
          <StarRating
            size={35}
            disabled
            initialRating={stars}
          />
        </FirstLine>
        <DateFeedKindInfo>
          {getFeedKindTag(feedKind)}
          {startDate === endDate ? `${startDate}` : `${startDate}/${endDate}`}
        </DateFeedKindInfo>
        <MapWrapper>
          <Map
            disableTtile
            disableAutoLocation
            defaultLocation={location}
            zoom={15}
            markers={location ? [{ location: location as Location }] : []}
          />
        </MapWrapper>
        <Title>{title}</Title>
        <Content> {content}</Content>
        <HashTagLine>
          {hashTags?.map((item, idx) => {
            return (
              <div key={idx}>
                <Link
                  href={`https://www.youtube.com/results?search_query=${item}`}
                >
                  <div>
                    #{item}
                  </div>
                </Link>
              </div>
            )
          })}
        </HashTagLine>
        <ImageFileWrapper>
          {(fileList as string[] || []).map((file, idx) => (
            <UploadImage
              key={`imgae-${idx}`}
              src={file}
            />
          ))}
        </ImageFileWrapper>
      </Container>
    </FrameLayout>
  )
}

const DateFeedKindInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin: 12px 0 18px 0;
  color: ${COLOR.gray.color.gray[900]};
`

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
`

const Title = styled.div`
  line-height: ${({ theme }) => theme.font[24].lineHeight};
  font-size: ${({ theme }) => theme.font[24].size};
  color: ${COLOR.gray.color.gray[900]};
  margin: 12px 0 18px 0;
`

const Content = styled.div`
  line-height: ${({ theme }) => theme.font[18].lineHeight};
  font-size: ${({ theme }) => theme.font[18].size};
  color: ${COLOR.gray.color.gray[700]};
  margin: 12px 0 18px 0;
`

const HashTagLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  line-height: ${({ theme }) => theme.font[16].lineHeight};
  font-size: ${({ theme }) => theme.font[16].size};
  color: ${COLOR.primary.color.tmobi.blue[600]};
`

const ImageFileWrapper = styled.div`
  display: flex;
  position: relative;
  gap: 5px;
  flex-wrap: wrap;
  margin: 12px 0;
`

export default FeedPage
