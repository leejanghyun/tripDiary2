import { addDays } from 'date-fns'

import { resetTime } from '@/utils'
import { Location } from '@/utils/map'

export const enum FORM_FIELD {
  SEARCH_TEXT = 'searchText',
  LOCATION = 'location',
  TITLE = 'title',
  CONTENT = 'content',
  FILE_LIST = 'fileList',
  DATE = 'date',
  IMG_DESCRIPTION = 'imageDescriptions',
  STARS = 'stars',
  HAS_TAGS = 'hashTags',
}

export const DEFAULT_DATE = [addDays(resetTime(new Date()), 0), addDays(resetTime(new Date()), 0)]

export interface CreateFeedFormType {
  [FORM_FIELD.SEARCH_TEXT]: string | null
  [FORM_FIELD.LOCATION]: Location | null
  [FORM_FIELD.TITLE]: string
  [FORM_FIELD.CONTENT]: string
  [FORM_FIELD.FILE_LIST]: string[] | null,
  [FORM_FIELD.DATE]: Array<Date>
  [FORM_FIELD.IMG_DESCRIPTION]: string[] | null
  [FORM_FIELD.STARS]: number
  [FORM_FIELD.HAS_TAGS]: string[] | null
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
    [FORM_FIELD.STARS]: 0,
    [FORM_FIELD.HAS_TAGS]: null,
  }
}
