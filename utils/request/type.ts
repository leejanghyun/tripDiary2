import { AxiosRequestConfig } from 'axios'

export type CommonRequestHeader = {
  'Content-Type'?: string;
  Accept?: string;
  Authorization?: string;
}

export interface CommonRequestConfig extends AxiosRequestConfig {
  headers?: CommonRequestHeader;
  isAuthRequred?: boolean; // Access Token 필요 유무
  doNotShowSpinner?: boolean; // spinner 노출 유무
  skipAlert?: boolean; // error 메시지 창 띄우는지 유무
  authRequired?: boolean; // Access Token 필요 유무
  canceler?: (message?: string) => void;
}

export const enum StatusCode {
  AuthRqeuired = 401,
  Success = 200,
  MultipleChoices = 300,
}

export const enum Method {
  POST = 'POST',
  GET = 'GET',
  DELETE = 'DELETE',
  PUT = 'PUT',
  Patch = 'patch',
}

/** 응답 코드 값 */
export const enum StatusType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export const enum EventName {
  Online = 'online',
  OffLine = 'offline',
}

export type ErrorResponseDataType = {
  niceCode?: string | number;
  email?: string;
}

export type CommonResponse<T = any> = {
  status: StatusType;
  resultMsg?: string;
  content: T
}

export const enum AxiosStatus {
  AxiosRequestSuccess = 'AxiosRequestSuccess',
  AxiosRequestPending = 'AxiosRequestPending',
  AxiosRequestFail = 'AxiosRequestFail',
  AxiosResponseFail = 'AxiosResponseFail',
  AxiosNetwork = 'AxiosNetwork',
}
