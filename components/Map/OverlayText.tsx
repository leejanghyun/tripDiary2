import styled from '@emotion/styled'
import { COLOR } from '@TMOBI-WEB/ads-ui'

function OverlayText() {
  const overlayLen = 10
  const height = 100 / overlayLen
  const arr: number[] = Array.from({ length: overlayLen }, (_, i) => overlayLen - i)

  return (
    <Wrapper>
      {arr.map((item, index) => {
        return (
          <OverlayBlock
            key={index}
            opactity={(item / 100) * 3}
            height={height}
          >
            {index === 0 && (
              <>
                <div>내가 다녀온 장소의 사진을</div>
                <div>한눈에 볼 수 있어요</div>
              </>
            )}
          </OverlayBlock>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  color: #333;
  width: 100%;
  height: 100%;
  animation: fadeOut 4s ease-in-out;
  pointer-events: none;

  div {
    width: 100%;
    color: ${COLOR.gray.color.gray[900]};
    font-size: ${({ theme }) => theme.font[20].size};
    line-height: ${({ theme }) => theme.font[20].lineHeight};
    font-weight: 500;
  }

  div:first-of-type {
    padding: 7px 0 0 7px;
  }

  div:nth-of-type(2) {
    padding: 0px 0 0 7px;
  }
`

const OverlayBlock = styled.div<{ opactity: number, height: number }>`
  background-color: ${({ opactity }) => `rgba(255, 255, 255, ${opactity});`} ;
  height: ${({ height }) => `${height}%;`}
`

export default OverlayText
