import styled from '@emotion/styled'
import { COLOR } from '@TMOBI-WEB/ads-ui'

import CustomImage from '@/components/CustomImage'
import { ReactComponent as IcoMarker } from '@/images/ico_marker.svg'
import { Feed } from '@/mocks/feedList'
import { formatDisplayDateTime } from '@/utils'

type Props = Pick<Feed, 'id' | 'fileList' | 'content' | 'title' | 'date' | 'searchText'>

function FeedCard({
  id, fileList, content, title, date, searchText,
}: Props) {
  const startDate = formatDisplayDateTime(date[0], 'yy년 MM월 dd일')
  const endDate = formatDisplayDateTime(date[0], 'yy년 MM월 dd일')

  return (
    <Wrapper key={id}>
      <div>
        <TextBlock>
          <div>{title}</div>
          <div>{content}</div>
        </TextBlock>
        <ImageWrapper>
          <CustomImage
            images={fileList}
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

const ImageWrapper = styled.div`
  width: 100%;
  height: auto;;
  margin: 2px 0 10px 0;
  flex-wrap: wrap;
`

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${COLOR.gray.color.gray[600]};
  font-size: ${({ theme }) => theme.font[9].size};
  margin: 0 5px;
  line-height: ${({ theme }) => theme.font[9].lineHeight};
`

const Wrapper = styled.div`
  padding: 10px;
  margin: 0 0 10px 0;
  border: 1px solid ${COLOR.gray.color.gray[300]};
  border-radius: 10px;
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

  > div:first-of-type {
    font-size: ${({ theme }) => theme.font[20].size};
    line-height: ${({ theme }) => theme.font[20].lineHeight};
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
    font-size: ${({ theme }) => theme.font[12].size};
    line-height: ${({ theme }) => theme.font[12].lineHeight};
  }
`

export default FeedCard
