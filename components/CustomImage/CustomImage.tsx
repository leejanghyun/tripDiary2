import styled from '@emotion/styled'
import { COLOR } from '@TMOBI-WEB/ads-ui'
import {
  memo,
} from 'react'

type Props = {
  imageDescription: string[]
  images: string[]
}

/**
 * Image 컴포넌트
 * @component Image 컴포넌트
 */
function CustomImage({
  imageDescription = [],
  images,
}: Props) {
  return (
    <ImageWrapper>
      {images.map((image, index) => {
        return (
          <ImageCard key={index}>
            <div>
              <img
                src={image}
                alt="이미지"
                style={{
                  objectFit: 'cover', width: 'auto', height: '90px',
                }}
              />
            </div>
            <div>
              {imageDescription[index]}
            </div>
          </ImageCard>
        )
      })}
    </ImageWrapper>
  )
}

const ImageCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  > div:nth-of-type(2) {
    font-size: ${({ theme }) => theme.font[12].size};
    line-height: ${({ theme }) => theme.font[12].lineHeight};
    color: ${COLOR.gray.color.gray[600]};
  }
`

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
