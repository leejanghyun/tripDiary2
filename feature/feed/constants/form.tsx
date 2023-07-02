import { PaletteType, SchemeType, Tag } from '@TMOBI-WEB/ads-ui'
import { addDays } from 'date-fns'

import { resetTime } from '@/utils'
import { Location } from '@/utils/map'

export const enum FEED_KIND {
  RESTAURANT = 'restaurant',
  CAFE = 'cafe',
  LODGMENT = 'lodgment',
  ETC = 'etc',
  SIGHTS = 'sights',
}

export const getFeedKindTag = (feed?: FEED_KIND) => {
  let label = '기타'
  let palette: PaletteType = 'gray'

  if (feed === FEED_KIND.CAFE) {
    label = '카페'
    palette = 'pink'
  } else if (feed === FEED_KIND.LODGMENT) {
    label = '숙박'
    palette = 'purple'
  } else if (feed === FEED_KIND.RESTAURANT) {
    label = '음식'
    palette = 'blue'
  } else if (feed === FEED_KIND.SIGHTS) {
    label = '명소'
    palette = 'red'
  }
  return (
    <Tag
      label={label}
      palette={palette}
    />
  )
}

export const enum FORM_FIELD {
  ADDRESS = 'address',
  LOCATION = 'location',
  TITLE = 'title',
  CONTENT = 'content',
  FILE_LIST = 'fileList',
  DATE = 'date',
  IMG_DESCRIPTION = 'imageDescriptions',
  STARS = 'stars',
  HAS_TAGS = 'hashTags',
  FEED_KIND = 'feedKind',
}

export const FEED_KIND_DATA_SOURCES = [
  {
    key: FEED_KIND.ETC,
    name: '기타',
  },
  {
    key: FEED_KIND.RESTAURANT,
    name: '음식',
  },
  {
    key: FEED_KIND.CAFE,
    name: '카페',
  },
  {
    key: FEED_KIND.LODGMENT,
    name: '숙박',
  },
  {
    key: FEED_KIND.SIGHTS,
    name: '명소',
  },
] as SchemeType<FEED_KIND | null>[]

export const DEFAULT_DATE = [addDays(resetTime(new Date()), 0), addDays(resetTime(new Date()), 0)]

export interface CreateFeedFormType {
  [FORM_FIELD.ADDRESS]: string | null
  [FORM_FIELD.LOCATION]: Location | null
  [FORM_FIELD.TITLE]: string
  [FORM_FIELD.CONTENT]: string
  [FORM_FIELD.FILE_LIST]: string[] | null,
  [FORM_FIELD.DATE]: Array<Date>
  [FORM_FIELD.IMG_DESCRIPTION]: string[] | null
  [FORM_FIELD.STARS]: number
  [FORM_FIELD.HAS_TAGS]: string[] | null
  [FORM_FIELD.FEED_KIND]: FEED_KIND
}

export const getCreateDefaultValue = () => {
  return {
    [FORM_FIELD.ADDRESS]: '',
    [FORM_FIELD.LOCATION]: {
      lat: 37.5334465,
      lng: 126.9013542,
    },
    [FORM_FIELD.TITLE]: '',
    [FORM_FIELD.CONTENT]: '',
    [FORM_FIELD.FILE_LIST]: null,
    [FORM_FIELD.DATE]: DEFAULT_DATE,
    [FORM_FIELD.IMG_DESCRIPTION]: [],
    [FORM_FIELD.STARS]: 0,
    [FORM_FIELD.HAS_TAGS]: null,
    [FORM_FIELD.FEED_KIND]: FEED_KIND.ETC,
  }
}
