import { addDays } from 'date-fns'

import { resetTime } from '@/utils'
import { Location } from '@/utils/map'

export const enum FORM_FIELD {
  SEARCH_TEXT = 'SEARCH_TEXT',
  LOCATION = 'LOCATION',
  TITLE = 'TITLE',
  CONTENT = 'CONTENT',
  FILE_LIST = 'FILE_LIST',
  DATE = 'DATE',
  IMG_DESCRIPTION = 'IMG_DESCRIPTION',
}

export const DEFAULT_DATE = [addDays(resetTime(new Date()), 0), addDays(resetTime(new Date()), 0)]

export interface CreateFeedFormType {
  [FORM_FIELD.SEARCH_TEXT]: string
  [FORM_FIELD.LOCATION]: Location | null
  [FORM_FIELD.TITLE]: string
  [FORM_FIELD.CONTENT]: string
  [FORM_FIELD.FILE_LIST]: string[] | null,
  [FORM_FIELD.DATE]: Array<Date | null>
  [FORM_FIELD.IMG_DESCRIPTION]: string[]
}

export const getCreateDefaultValue = () => {
  return {
    [FORM_FIELD.SEARCH_TEXT]: '',
    [FORM_FIELD.LOCATION]: null,
    [FORM_FIELD.TITLE]: '',
    [FORM_FIELD.CONTENT]: '',
    [FORM_FIELD.FILE_LIST]: null,
    [FORM_FIELD.DATE]: DEFAULT_DATE,
    [FORM_FIELD.IMG_DESCRIPTION]: [],
  }
}
