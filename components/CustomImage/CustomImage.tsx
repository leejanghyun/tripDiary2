import styled from '@emotion/styled'
import {
  memo,
} from 'react'

type Props = {
  images: string[]
}

/**
 * Image 컴포넌트
 * @component Image 컴포넌트
 */
function CustomImage({
  images,
}: Props) {
  return (
    <ImageWrapper>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt="이미지"
          style={{ objectFit: 'cover', maxWidth: '80px', height: 'auto' }}
        />
      ))}
    </ImageWrapper>
  )
}

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px 0;
  overflow: auto;
  height: 100%;
  gap: 10px;
`

export default memo(CustomImage)
