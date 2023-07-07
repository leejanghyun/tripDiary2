import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  COLOR, DropdownMenu,
} from '@TMOBI-WEB/ads-ui'
import { useAtomValue } from 'jotai'
import _ from 'lodash-es'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

import { globalState } from '@/atoms/globalState'
import CustomImage from '@/components/CustomImage'
import { DEFAULT_TOTAL_STARS, StarRating } from '@/components/StarRating'
import { Feed } from '@/db/scheme/'
import { getFeedKindTag } from '@/feature/feed/constants/form'
import { ReactComponent as IcoHeart } from '@/images/ico_heart.svg'
import { ReactComponent as IcoMarker } from '@/images/ico_marker.svg'
import { ReactComponent as IconShare } from '@/images/ico_share.svg'
import { ReactComponent as IconMore } from '@/images/ico_three_dot.svg'
import { ReactComponent as IcoYoutube } from '@/images/icon_youtube.svg'
import { formatDisplayDateTime } from '@/utils'

interface Props extends Feed {
  isFullWidth?: boolean
  disableEditDropDown?: boolean
  onDelete?: (id: string) => void
  onBookMark?: (id: string, isLink: boolean) => void
  onClick?: (id: string) => void
}

function FeedCard({
  isFullWidth = false,
  _id,
  disableEditDropDown,
  fileList,
  content,
  title,
  feedKind,
  date,
  bookmarks,
  imageDescriptions,
  createdBy,
  stars,
  address,
  location,
  hashTags = [],
  onClick,
  onDelete,
  onBookMark,
}: Props) {
  const startDate = formatDisplayDateTime(new Date(date[0]), 'yy년 MM월 dd일')
  const endDate = formatDisplayDateTime(new Date(date[1]), 'yy년 MM월 dd일')
  const router = useRouter()
  const global = useAtomValue(globalState)
  const { userId } = global || {}
  const isMyFeed = userId === createdBy
  const [isBookmark, setBookmark] = useState(Boolean((bookmarks || []).find((bookmark) => bookmark === userId)))

  const handleLocationClick = useCallback(() => {
    const { lat, lng } = location || {}

    if (_.isNumber(lat) && _.isNumber(lng)) {
      router.push(`/home?lat=${lat}&lng=${lng}`)
    }
  }, [router, location])

  return (
    <Wrapper
      isFullWidth={isFullWidth}
      key={_id}
    >
      <div>
        <TextBlock onClick={() => onClick?.(_id)}>
          <div>
            <div>
              {title}
            </div>
            {isMyFeed && !disableEditDropDown && (
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
                    text: '이동',
                    onClick: () => {
                      router.push(`/feed/${_id}`)
                    },
                  },
                  {
                    text: '편집',
                    onClick: () => {
                      router.push(`/edit/feed/${_id}`)
                    },
                  },
                  {
                    text: '삭제',
                    onClick: () => {
                      onDelete?.(_id)
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
          <div
            role="button"
            tabIndex={-1}
            onKeyDown={() => {}}
            onClick={() => onClick?.(_id)}
          >{content}
          </div>
        </TextBlock>
        <ImageWrapper>
          <CustomImage
            imageDescriptions={imageDescriptions || []}
            images={fileList || []}
          />
        </ImageWrapper>
      </div>
      <SubInfoWrapper>
        <LocationText
          onClick={handleLocationClick}
        >
          <IcoMarker /><div>{address}</div>
        </LocationText>
        <div>
          {startDate === endDate ? `${startDate}` : `${startDate}/${endDate}`}
        </div>
      </SubInfoWrapper>
      <FooterWrapper>
        <div>
          <div>
            <StarRating
              disabled
              gap={4}
              initialRating={stars}
              size={15}
            />
            {stars || 0} / {DEFAULT_TOTAL_STARS}
            {getFeedKindTag(feedKind)}
          </div>
          <div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${address}`}
            >
              <IconShare />
            </a>
            <a
              href={`https://www.youtube.com/results?search_query=${address}`}
            >
              <IcoYoutube />
            </a>
            <div>
              <IcoHeart
                fill={isBookmark ? 'red' : 'none'}
                onClick={() => {
                  setBookmark(!isBookmark)
                  onBookMark?.(_id, !isBookmark)
                }}
              />
            </div>
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

const Wrapper = styled.div<{ isFullWidth: boolean }>`
  background: ${COLOR.gray.color.wb[0]};

   ${({ isFullWidth }) => {
    return isFullWidth
      ? css`
          margin: 0;
          padding: 0;
        `
      : css`
          padding: 15px 20px 8px;
          margin: 0 0 10px 0;
        `
  }}
`

const ImageWrapper = styled.div`
  width: 100%;
  height: auto;
  margin: 5px 0 10px 0;
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

const LocationText = styled.div`
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
        width: 300px;
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
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    color: ${COLOR.gray.color.gray[600]};
    font-size: ${({ theme }) => theme.font[14].size};
    line-height: ${({ theme }) => theme.font[14].lineHeight};
  }
`

export default FeedCard
