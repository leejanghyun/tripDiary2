import styled from '@emotion/styled'
import { COLOR } from '@TMOBI-WEB/ads-ui'

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
      <Content>
        <TextBlock>
          <div>{title}</div>
          <div>{content}</div>
          <div>
            {startDate === endDate ? startDate : `${startDate} ~ ${endDate}`}
          </div>
        </TextBlock>
        <ImageWrapper>
          {fileList.map((file, idx) => {
            return (
              <Image
                alt={`feed-img-${idx}`}
                key={idx}
                src={file}
              />
            )
          })}
        </ImageWrapper>
      </Content>
      <SearchText>
        <IcoMarker /> {searchText}
      </SearchText>
    </Wrapper>
  )
}

const ImageWrapper = styled.div`
  width: 105px;
  height: 105px;
`

const Image = styled.img`
  width: 100%; 
  height: 100%;
  object-fit: scale-down; 

`

const Wrapper = styled.div`
  padding: 10px;
  margin: 0 0 10px 0;
  border: 1px solid ${COLOR.gray.color.gray[300]};
  border-radius: 10px;
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`

const SearchText = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 10px 0 0px 0;
  padding: 5px 0;
`

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  flex-wrap: wrap;

  > div:first-of-type {
    font-size: ${({ theme }) => theme.font[16].size};
    line-height: ${({ theme }) => theme.font[16].lineHeight};
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

  > div:nth-of-type(3) {
    display: flex;
    justify-content: space-between;
    color: ${COLOR.gray.color.gray[600]};
    font-size: ${({ theme }) => theme.font[9].size};
    line-height: ${({ theme }) => theme.font[9].lineHeight};
  }
`

export default FeedCard
