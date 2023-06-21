import { Location } from '@/utils/map'

export const enum FORM_FIELD {
  SEARCH_TEXT = 'SEARCH_TEXT',
  LOCATION = 'LOCATION',
}

export interface CreateFeedFormType {
  [FORM_FIELD.SEARCH_TEXT]: string
  [FORM_FIELD.LOCATION]: Location | null
}

export const getCreateDefaultValue = () => {
  return {
    [FORM_FIELD.SEARCH_TEXT]: '',
    [FORM_FIELD.LOCATION]: null,
  }
}
