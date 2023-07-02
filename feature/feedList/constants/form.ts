import { cloneDeep } from 'lodash-es'
import { ParsedUrlQuery } from 'querystring'

import { FEED_KIND } from '@/feature/feed/constants/form'
import { DataNode } from '@/hooks/ui/useTreeCheckbox'

export const DEFAULT_PAGE = 1
export const DEFAULT_SIZE = 10

export const enum FORM_FIELD {
  SORT = 'sort',
  PAGE = 'page',
  LIMIT = 'limit',
  FILTER = 'filter',
  SEARCH_TEXT = 'searchText',
}

export const enum FEEDLIST_SORT_TYPE {
  CREATED_AT_DESC = 'createdAt_desc',
  CREATED_AT_ASC = 'createdAt_asc',
}

export const sizeOptions = [
  { text: '최신순', value: FEEDLIST_SORT_TYPE.CREATED_AT_DESC },
  { text: '오래된순', value: FEEDLIST_SORT_TYPE.CREATED_AT_ASC },
]

export const enum FEEDLIST_FILTER_TYPE {
  MY = 'my',
  MY_BOOKMARK = 'myBookmark',
  CAFE = 'cafe',
  RESTAURANT = 'restaurant',
  SIGHTS = 'sights',
  LODGMENT = 'lodgment',
}

export const filterOptions: DataNode[] = [
  { id: FEEDLIST_FILTER_TYPE.MY, label: '내 피드만', isChecked: false },
  { id: FEEDLIST_FILTER_TYPE.MY_BOOKMARK, label: '내가 찜한 피드', isChecked: false },
  { id: FEED_KIND.CAFE, label: '카페', isChecked: false },
  { id: FEED_KIND.RESTAURANT, label: '음식', isChecked: false },
  { id: FEED_KIND.SIGHTS, label: '명소', isChecked: false },
  { id: FEED_KIND.LODGMENT, label: '숙박', isChecked: false },
]

export interface FeedListFormType {
  [FORM_FIELD.SORT]: FEEDLIST_SORT_TYPE | null
  [FORM_FIELD.PAGE]: number
  [FORM_FIELD.LIMIT]: number
  [FORM_FIELD.FILTER]: FEEDLIST_FILTER_TYPE[]
  [FORM_FIELD.SEARCH_TEXT]: string
}

export const getDefaultValue = (query?: ParsedUrlQuery) => {
  const defaultValue = {
    [FORM_FIELD.SORT]: FEEDLIST_SORT_TYPE.CREATED_AT_DESC,
    [FORM_FIELD.PAGE]: DEFAULT_PAGE,
    [FORM_FIELD.LIMIT]: DEFAULT_SIZE,
    [FORM_FIELD.FILTER]: [],
    [FORM_FIELD.SEARCH_TEXT]: '',
  }

  if (!query) {
    return defaultValue
  }

  const newDefaultValue = cloneDeep(defaultValue)
  const {
    [FORM_FIELD.SEARCH_TEXT]: querySearchText,
    [FORM_FIELD.LIMIT]: queryLimit,
    [FORM_FIELD.PAGE]: queryPage,
    [FORM_FIELD.SORT]: querySort,
  } = query

  if (querySearchText) {
    newDefaultValue[FORM_FIELD.SEARCH_TEXT] = querySearchText as string
  }

  if (queryLimit) {
    newDefaultValue[FORM_FIELD.LIMIT] = parseInt(queryLimit as string, 10) as number
  }

  if (queryPage) {
    newDefaultValue[FORM_FIELD.PAGE] = parseInt(queryPage as string, 10) as number
  }

  if (querySort) {
    newDefaultValue[FORM_FIELD.SORT] = querySort as FEEDLIST_SORT_TYPE
  }

  return newDefaultValue
}
