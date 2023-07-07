import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { COLOR, DropdownMenu, DropDownMenuDataType } from '@TMOBI-WEB/ads-ui'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import bg1 from '@/images/ico_bg_1.svg'
import bg2 from '@/images/ico_bg_2.svg'
import bg3 from '@/images/ico_bg_3.svg'
import bg4 from '@/images/ico_bg_4.svg'
import { ReactComponent as EmptyBox } from '@/images/ico_empty_box.svg'
import { ReactComponent as IconMore } from '@/images/ico_three_dot.svg'

type Props = {
  id?: string
  title?: string
  feeds?: string[]
  onDelete?: (id: string) => void
  onClick?: (id: string, isEmpty?: boolean) => void
}

function MyStoryCard({
  id, title, feeds, onDelete, onClick,
}: Props) {
  const isEmpty = !(feeds && feeds?.length)
  const router = useRouter()

  const getRandomBackgroundItem = () => {
    const items: string[] = [bg1, bg2, bg3, bg4]
    const randomIndex: number = Math.floor(Math.random() * items.length)

    return items[randomIndex]
  }

  const dropDownMenu = useMemo(() => {
    return [
      {
        text: '편집',
        onClick: (e: Event) => {
          e.preventDefault()
          router.push(`/story/${id}`)
        },
      },
      {
        text: '삭제',
        onClick: (e: Event) => {
          e.preventDefault()
          onDelete?.(id as string)
        },
      },
    ]
  }, [id, onDelete, router])

  return (
    <Wrapper
      background={isEmpty ? getRandomBackgroundItem() : ''}
      onClick={() => onClick?.(id as string, isEmpty)}
    >
      <div>
        {title}
        <div>
          <DropdownMenu
            trigger={(
              <button
                type="button"
              >
                <IconMore />
              </button>
                )}
            data={dropDownMenu as DropDownMenuDataType[]}
            sideOffset={8}
            side="bottom"
            align="end"
          />
        </div>
      </div>
      {isEmpty && (
      <div>
        <EmptyBox />
        등록된 스토리가 없습니다.
      </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div<{ isFullWidth?: boolean, background?: string }>`
  border-radius: 12px;
  height: 100%;
  max-height: 400px;
  margin-bottom: 50px;
  padding-bottom: 50px;

  ${({ background }) => {
    return css`
      background-image: url(${background});
      background-size: 100% auto;
      background-repeat: no-repeat;
    `
  }}

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

  > div:first-of-type {
    display: flex;
    justify-content: space-between;
    color: ${COLOR.gray.color.gray[900]};
    font-size: ${({ theme }) => theme.font[18].size};
    line-height: ${({ theme }) => theme.font[18].lineHeight};
    font-weight: 500;
  }

  > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${COLOR.gray.color.gray[600]};
    font-size: ${({ theme }) => theme.font[16].size};
    position: relative;
    top: -5px;
    line-height: ${({ theme }) => theme.font[16].lineHeight};
    font-weight: 500;
  }
`

export default MyStoryCard
