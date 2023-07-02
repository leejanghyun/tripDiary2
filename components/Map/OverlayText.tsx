import styled from '@emotion/styled'
import { COLOR } from '@TMOBI-WEB/ads-ui'

function OverlayText() {
  return (
    <Wrapper>
      <div>
        <div>내가 다녀온 장소의 사진을</div>
        <div>한눈에 볼 수 있어요</div>
      </div>
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
  height: 100%;

  div {
    width: 100%;
    color: ${COLOR.gray.color.gray[900]};
    font-size: ${({ theme }) => theme.font[24].size};
    line-height: ${({ theme }) => theme.font[24].lineHeight};
    font-weight: 500;
  }

  div:first-of-type {
    padding: 7px 0 0 7px;
  }

  div:nth-of-type(2) {
    padding: 0px 0 0 7px;
  }
`

export default OverlayText
