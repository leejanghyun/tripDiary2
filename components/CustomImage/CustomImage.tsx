import { css } from '@emotion/react'
import {
  memo,
  MouseEvent,
  useState,
} from 'react'
import { Tooltip } from 'react-tooltip'

type Props = {
  imageDescriptions: string[]
  images: string[]
}

/**
 * Image 컴포넌트
 * @component Image 컴포넌트
 */
function CustomImage({
  imageDescriptions = [],
  images = [],
}: Props) {
  const [showTooltip, setShowTooltip] = useState(false)

  const handleImageClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()

    setShowTooltip(true)
    setTimeout(() => setShowTooltip(false), 1500)
  }
  return (
    <div css={PhotoGridStyles}>
      {images.map((image, index) => (
        <button
          key={index}
          type="button"
          onClick={handleImageClick}
        >
          <a
            data-tooltip-id="tooltip"
            data-tooltip-content={imageDescriptions[index]}
            data-tooltip-place="bottom"
          >
            <img
              src={image}
              alt={imageDescriptions[index]}
              css={PhotoStyles}
            />
          </a>
          <Tooltip
            id="tooltip"
            place="top"
            style={{ display: showTooltip ? 'block' : 'none', backgroundColor: '#3d8bff', color: '#FFFFFF' }}
          >
            이미지 설명이 없습니다.
          </Tooltip>
        </button>
      ))}
    </div>
  )
}

const PhotoStyles = css`
  flex-basis: calc(33% - 5px);
  object-fit: cover;
  height: 100px;
  width: 105px;
`

const PhotoGridStyles = css`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
`

export default memo(CustomImage)
