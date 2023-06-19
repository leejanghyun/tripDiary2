export enum LOG_TYPE {
  ORDER_CREATE = 'ORDER_CREATE',
  ORDER_MODIFY = 'ORDER_MODIFY',
  ORDER_CANCEL_REQUEST = 'ORDER_CANCEL_REQUEST',
  ORDER_CANCEL = 'ORDER_CANCEL',
  ORDER_FILE_MODIFY = 'ORDER_FILE_MODIFY',
  RETURN_CREATE = 'RETURN_CREATE',
  RETURN_MODIFY = 'RETURN_MODIFY',
  RETURN_CANCEL = 'RETURN_CANCEL',
  MANUAL_PAY_MODIFY = 'MANUAL_PAY_MODIFY',
  ACCIDENT_MODIFY = 'ACCIDENT_MODIFY',
  ORDER_INFORMATION_NETWORK_DISPATCH = 'ORDER_INFORMATION_NETWORK_DISPATCH',
  ORDER_INFORMATION_NETWORK_AUTO_CANCEL = 'ORDER_INFORMATION_NETWORK_AUTO_CANCEL',
  ORDER_INFORMATION_NETWORK_CANCEL = 'ORDER_INFORMATION_NETWORK_CANCEL',
  ORDER_INFORMATION_NETWORK_MODIFY = 'ORDER_INFORMATION_NETWORK_MODIFY',
  ORDER_INFORMATION_NETWORK_CREATE = 'ORDER_INFORMATION_NETWORK_CREATE',
  ORDER_INFORMATION_NETWORK_FORCE_DISPATCH = 'ORDER_INFORMATION_NETWORK_FORCE_DISPATCH',
  NEGOTIATION_MODIFY = 'NEGOTIATION_MODIFY',
  SETTLEMENT_SALE_ISSUE_INVOICE = 'SETTLEMENT_SALE_ISSUE_INVOICE',
  SETTLEMENT_SALE_MODIFY = 'SETTLEMENT_SALE_MODIFY',
  SETTLEMENT_PURCHASE_MODIFY = 'SETTLEMENT_PURCHASE_MODIFY',
  SETTLEMENT_PURCHASE_DELETE = 'SETTLEMENT_PURCHASE_DELETE',
  REMITTANCE_COMPLETE = 'REMITTANCE_COMPLETE',
  SETTLEMENT_PURCHASE_REMITTANCE = 'SETTLEMENT_PURCHASE_REMITTANCE',
  SETTLEMENT_PURCHASE_REMITTANCE_MODIFY = 'SETTLEMENT_PURCHASE_REMITTANCE_MODIFY',
}
export enum LOG_TYPE_KO {
  ORDER_CREATE = '화물 접수',
  ORDER_MODIFY = '화물 수정',
  ORDER_CANCEL_REQUEST = '화물 취소요청',
  ORDER_CANCEL = '화물 취소',
  ORDER_FILE_MODIFY = '화물 파일 수정/등록',
  RETURN_CREATE = '회차처리등록',
  RETURN_MODIFY = '회차처리수정',
  RETURN_CANCEL = '회차처리취소',
  MANUAL_PAY_MODIFY = '추가비용 수정/등록',
  ACCIDENT_MODIFY = '사고발생처리',
  ORDER_INFORMATION_NETWORK_DISPATCH = '정보망 배차완료',
  ORDER_INFORMATION_NETWORK_AUTO_CANCEL = '정보망 배차취소',
  ORDER_INFORMATION_NETWORK_CANCEL = '콜 취소',
  ORDER_INFORMATION_NETWORK_MODIFY = '콜 수정',
  ORDER_INFORMATION_NETWORK_CREATE = '콜 생성',
  ORDER_INFORMATION_NETWORK_FORCE_DISPATCH = '콜 강제배차',
  NEGOTIATION_MODIFY = '협의단가 변경',
  SETTLEMENT_SALE_ISSUE_INVOICE = '매출 거래명세서 생성',
  SETTLEMENT_SALE_MODIFY = '매출 거래명세서 수정 - 계산서 승인번호 등록',
  SETTLEMENT_PURCHASE_MODIFY = '매입 내역 등록,수정 및 송금 요청 등록',
  SETTLEMENT_PURCHASE_DELETE = '매입 내역 삭제',
  REMITTANCE_COMPLETE = '송금 완료',
  SETTLEMENT_PURCHASE_REMITTANCE = '송금 완료',
  SETTLEMENT_PURCHASE_REMITTANCE_MODIFY = '송금 정보 수정',
}