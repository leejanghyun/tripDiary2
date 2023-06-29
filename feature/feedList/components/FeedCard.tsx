import styled from '@emotion/styled'
import { COLOR } from '@TMOBI-WEB/ads-ui'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import CustomImage from '@/components/CustomImage'
import { Feed } from '@/db/scheme/feedScheme'
import { ReactComponent as IcoMarker } from '@/images/ico_marker.svg'
import { formatDisplayDateTime } from '@/utils'

type Props = Feed

function FeedCard({
  _id, fileList, content, title, date, searchText, imageDescriptions,
}: Props) {
  const startDate = formatDisplayDateTime(date[0], 'yy년 MM월 dd일')
  const endDate = formatDisplayDateTime(date[0], 'yy년 MM월 dd일')
  const router = useRouter()

  const handleMove = useCallback(() => {
    router.push(`/edit/${_id}`)
  }, [router, _id])

  return (
    <Wrapper
      key={_id}
      onClick={handleMove}
    >
      <div>
        <TextBlock>
          <div>{title}</div>
          <div>{content}</div>
        </TextBlock>
        <ImageWrapper>
          <CustomImage
            imageDescriptions={imageDescriptions || []}
            images={fileList || []}
          />
        </ImageWrapper>
      </div>
      <FooterWrapper>
        <SearchText>
          <IcoMarker /> {searchText}
        </SearchText>
        <div>
          {startDate === endDate ? startDate : `${startDate} ~ ${endDate}`}
        </div>
      </FooterWrapper>

    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 20px;
  margin: 0 0 10px 0;
  border-top: 1px solid ${COLOR.gray.color.gray[300]};
  border-bottom: 1px solid ${COLOR.gray.color.gray[300]};
  background: ${COLOR.gray.color.wb[0]}
`

const ImageWrapper = styled.div`
  width: 100%;
  height: auto;
  margin: 10px 0 10px 0;
  flex-wrap: wrap;
`

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${COLOR.gray.color.gray[600]};
  font-size: ${({ theme }) => theme.font[10].size};
  line-height: ${({ theme }) => theme.font[10].lineHeight};
  margin: 0 5px;
`

const SearchText = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  font-size: ${({ theme }) => theme.font[12].size};
  line-height: ${({ theme }) => theme.font[12].lineHeight};
`

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-wrap: wrap;
  gap: 5px;

  > div:first-of-type {
    font-size: ${({ theme }) => theme.font[24].size};
    line-height: ${({ theme }) => theme.font[24].lineHeight};
    font-weight: 500;
  }

  > div:nth-of-type(2) {
    flex: 1;
    overflow: hidden;
    width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* Specify the desired number of lines */
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    color: ${COLOR.gray.color.gray[600]};
    font-size: ${({ theme }) => theme.font[14].size};
    line-height: ${({ theme }) => theme.font[14].lineHeight};
  }
`

export default FeedCard
