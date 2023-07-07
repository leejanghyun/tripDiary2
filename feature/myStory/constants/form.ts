import { Feed } from '@/db'

export const enum FORM_FIELD {
  TITLE = 'title',
  SELECTED_FEEDS = 'selectedFeeds',
}

export interface FormType {
  [FORM_FIELD.TITLE]: string
  [FORM_FIELD.SELECTED_FEEDS]: Feed[],
}
