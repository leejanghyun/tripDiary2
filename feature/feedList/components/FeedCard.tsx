import styled from '@emotion/styled'
import {
  COLOR, DropdownMenu,
} from '@TMOBI-WEB/ads-ui'
import { useAtomValue } from 'jotai'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { globalState } from '@/atoms/globalState'
import CustomImage from '@/components/CustomImage'
import { DEFAULT_TOTAL_STARS, StarRating } from '@/components/StarRating'
import { Feed } from '@/db/scheme/'
import { ReactComponent as IcoMarker } from '@/images/ico_marker.svg'
import { ReactComponent as IconShare } from '@/images/ico_share.svg'
import { ReactComponent as IconMore } from '@/images/ico_three_dot.svg'
import { ReactComponent as IcoYoutube } from '@/images/icon_youtube.svg'
import { formatDisplayDateTime } from '@/utils'

interface Props extends Feed {
  onDelete: (id: string) => void
}

function FeedCard({
  _id, fileList, content, title, date, searchText, imageDescriptions, createdBy, stars,
  hashTags = [],
  onDelete,
}: Props) {
  const startDate = formatDisplayDateTime(new Date(date[0]), 'yy년 MM월 dd일')
  const endDate = formatDisplayDateTime(new Date(date[1]), 'yy년 MM월 dd일')
  const router = useRouter()
  const global = useAtomValue(globalState)
  const { userId } = global || {}
  const isMyFeed = userId === createdBy

  return (
    <Wrapper
      key={_id}
    >
      <div>
        <TextBlock>
          <div>
            <div>{title}</div>
            {isMyFeed && (
            <div>
              <DropdownMenu
                trigger={(
                  <button
                    type="button"
                  >
                    <IconMore />
                  </button>
                )}
                data={[
                  {
                    text: '편집',
                    onClick: () => {
                      router.push(`/edit/${_id}`)
                    },
                  },
                  {
                    text: '삭제',
                    onClick: () => {
                      onDelete(_id)
                    },
                  },
                ]}
                sideOffset={8}
                side="bottom"
                align="end"
              />
            </div>
            )}
          </div>
          <div>{content}</div>
        </TextBlock>
        <ImageWrapper>
          <CustomImage
            imageDescriptions={imageDescriptions || []}
            images={fileList || []}
          />
        </ImageWrapper>
      </div>
      <SubInfoWrapper>
        <SearchText>
          <IcoMarker /><div>{searchText}</div>
        </SearchText>
        <div>
          {startDate === endDate ? `${startDate}` : `${startDate}/${endDate}`}
        </div>
      </SubInfoWrapper>
      <FooterWrapper>
        <div>
          <div>
            <StarRating
              gap={4}
              initialRating={stars}
              size={15}
            />
            {stars || 0} / {DEFAULT_TOTAL_STARS}
          </div>
          <div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${searchText}`}
            >
              <IconShare />
            </a>
            <a
              href={`https://www.youtube.com/results?search_query=${searchText}`}
            >
              <IcoYoutube />
            </a>
          </div>
        </div>
        <div>
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
        </div>
      </FooterWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 15px 20px 8px;
  margin: 0 0 10px 0;
  border-top: 1px solid ${COLOR.gray.color.gray[300]};
  border-bottom: 1px solid ${COLOR.gray.color.gray[300]};
  background: ${COLOR.gray.color.wb[0]}
`

const ImageWrapper = styled.div`
  width: 100%;
  height: auto;
  margin: 5px 0 5px 0;
  flex-wrap: wrap;
`

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  > div:first-of-type {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;

    > div:first-of-type { // 별점
      display: flex;
      align-items: center;
      position: relative;
      gap: 4px;
      padding-left: 3px;
      font-size: ${({ theme }) => theme.font[12].size};
      line-height: ${({ theme }) => theme.font[12].lineHeight};
    }

    > div:nth-of-type(2) { // 유튜브, 공유
      display: flex;
      position: relative;
      top: 3px;
      align-items: center;
      gap: 6px;
    }
  }

  > div:nth-of-type(2) { // 해시 태그 Wrapper
    display: flex;
    align-items: center;
    gap: 2px;
    flex-wrap: wrap;
    font-size: ${({ theme }) => theme.font[12].size};
    line-height: ${({ theme }) => theme.font[12].lineHeight};
    color: ${COLOR.primary.color.tmobi.blue[600]};

    > div {// 해시 태그
      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;
      background-color: ${COLOR.primary.color.tmobi.blue[100]};
      border-radius: 10px;
      padding: 3px 6px;
    }
  }
`

const SubInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${COLOR.gray.color.gray[600]};
  font-size: ${({ theme }) => theme.font[12].size};
  line-height: ${({ theme }) => theme.font[12].lineHeight};
  margin-bottom: 5px;

  > div:nth-of-type(2) {
    width: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
  }
`

const SearchText = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 50%;

  > div {
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-wrap: wrap;
  gap: 10px;

  > div:first-of-type {
    font-size: ${({ theme }) => theme.font[24].size};
    line-height: ${({ theme }) => theme.font[24].lineHeight};
    font-weight: 500;
    display: flex;
    justify-content: space-between;

    > div:first-of-type {
      @media screen and (max-width: 375px) {
        width: 280px;
      }
      @media screen and (max-width: 280px) {
        width: 200px;
      }
      @media screen and (min-width: 400px) {
        width: 400px;
      }

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
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
