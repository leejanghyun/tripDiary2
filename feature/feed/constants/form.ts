import { Location } from '@/utils/map'

export const enum FORM_FIELD {
  SEARCH_TEXT = 'SEARCH_TEXT',
  LOCATION = 'LOCATION',
  TITLE = 'TITLE',
  CONTENT = 'CONTENT',
  FILE_LIST = 'FILE_LIST',
}

export interface CreateFeedFormType {
  [FORM_FIELD.SEARCH_TEXT]: string
  [FORM_FIELD.LOCATION]: Location | null
  [FORM_FIELD.TITLE]: string
  [FORM_FIELD.CONTENT]: string
  [FORM_FIELD.FILE_LIST]: string[] | null,
}

export const getCreateDefaultValue = () => {
  return {
    [FORM_FIELD.SEARCH_TEXT]: '',
    [FORM_FIELD.LOCATION]: null,
    [FORM_FIELD.TITLE]: '',
    [FORM_FIELD.CONTENT]: '',
    [FORM_FIELD.FILE_LIST]: null,
  }
}
