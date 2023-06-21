export enum FORM_FIELD {
  SEARCH_TEXT = 'SEARCH_TEXT',
}

export interface CreateFeedFormType {
  [FORM_FIELD.SEARCH_TEXT]: string
}

export const getCreateDefaultValue = () => {
  return {
    [FORM_FIELD.SEARCH_TEXT]: '',
  }
}
