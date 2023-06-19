import styled from '@emotion/styled'
import { COLOR } from '@TMOBI-WEB/ads-ui'

// footer를 하단에 정렬시킬 때 사용
export const GridSpaceBetween = styled.div`
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  min-height: 100%;
`

export const Container = styled.main`
  overflow: auto;
  padding: 25px 40px;

  // 등록/조회/정보에서 960 Fix 컨텐츠를 사용할 때
  &.endPage {
    ${GridSpaceBetween} {
      margin: 0 auto;
      width: 960px;
    }
  }
`
// 좌우 정렬시 사용
export const Row = styled.div`
  display: flex;
  align-items: center;
`

export const Col = styled.div`
  &.right {
    margin-left: auto;
  }
`

// 수평형 테이블
export const TableRow = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  caption {
    margin-bottom: 12px;
    color: ${COLOR.gray.color.gray[900]};
    font-size: ${({ theme }) => theme.font[16].size};
    line-height: ${({ theme }) => theme.font[16].lineHeight};
    font-weight: 500;
    text-align: left;
  }

  table + &  {
    margin-top: 40px;
  }

  table + &:has(caption)  {
   margin-top: 70px;
  }

  .w4-margin {
    width: calc(50% - 144px);
  }

  .w4 {
    width: 144px;
  }

  th, td {
    height: 49px;
    color: ${COLOR.gray.color.gray[700]};
    font-size: ${({ theme }) => theme.font[14].size};
    line-height: ${({ theme }) => theme.font[14].lineHeight};
    text-align: left;
    border: 1px solid #E0E2E8;
    border-width: 1px 0;
  }

  th {
    padding: 13px 12px;
    color: ${COLOR.gray.color.gray[700]};
    background-color: #F8F9FA;

    // * 필수 아이콘 위치 조정
      em {
        margin-left: 6px;
        position: relative;
        top: -1px;
      }
    }

  td {
    padding: 7px 20px;

    & + td {
      padding-left: 20px;
      border-left: 1px solid #E0E2E8;
    }
  }
`

// 수직형 테이블
export const TableCol = styled.table`
  margin-top: 32px;
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  caption {
    margin-bottom: 12px;
    color: ${COLOR.gray.color.gray[900]};
    font-size: ${({ theme }) => theme.font[16].size};
    line-height: ${({ theme }) => theme.font[16].lineHeight};
    font-weight: 500;
    text-align: left;
  }

  table + & {
    margin-top: 40px;
  }

  table + &:has(caption)  {
    margin-top: 70px;
  }

  .w3 {
    width: 30%;
  }

  th, td {
    padding: 12px 0;
    color: ${COLOR.gray.color.gray[700]};
    font-size: ${({ theme }) => theme.font[14].size};
    line-height: ${({ theme }) => theme.font[14].lineHeight};
    text-align: center;
  }

  th {
    background-color: ${COLOR.gray.color.gray[100]};
  }

  tbody td {
    padding: 15px 0;
    border-bottom: 1px solid ${COLOR.gray.color.gray[200]};
  }
`

export const ContainerBottom = styled.div`
  // 상단에 라인이 있는 Bottom Buttom 레이아웃에 사용
  &.line {
  border-top: 1px solid #EEF0F3;
  }


  ${Row} {
    padding: 15px 40px;

  button {
    min-width: 88px;
  }

  ${Col} {
    display: flex;
    gap: 8px;
    }
  }
`
