import { DataNode } from '@/hooks/ui/useTreeCheckbox'

export const DEFAULT_PAGE = 1
export const DEFAULT_SIZE = 10

export const enum FORM_FIELD {
  SORT = 'sort',
  PAGE = 'page',
  LIMIT = 'limit',
  FILTER = 'filter',
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
}

export const filterOptions: DataNode[] = [
  { id: FEEDLIST_FILTER_TYPE.MY, label: '내 피드만', isChecked: false },
]

export interface FeedListFormType {
  [FORM_FIELD.SORT]: FEEDLIST_SORT_TYPE | null
  [FORM_FIELD.PAGE]: number
  [FORM_FIELD.LIMIT]: number
  [FORM_FIELD.FILTER]: FEEDLIST_FILTER_TYPE[]
}

export const getDefaultValue = () => {
  return {
    [FORM_FIELD.SORT]: FEEDLIST_SORT_TYPE.CREATED_AT_DESC,
    [FORM_FIELD.PAGE]: DEFAULT_PAGE,
    [FORM_FIELD.LIMIT]: DEFAULT_SIZE,
    [FORM_FIELD.FILTER]: [],
  }
}
