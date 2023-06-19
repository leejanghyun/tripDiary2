export const REACT_QUERY_KEYS = {
  ALL: ['root'] as const,
}

export const PERSIST_STORAGE_KEYS = {}

export const BLACK_LOCAL_PERSIST_STORAGE_KEYS = []

export const COOKIE_KEYS = {
  TOKEN_KEY: {
    ACCESS: 'X-CLIENT-ACCESS-TOKEN',
    REFRESH: 'X-CLIENT-REFRESH-TOKEN',
  },
  MAINTAIN: '_maintain',
  USER_AGENT: '_ua',
  SERVICE: '_svc',
}

export const KEYS = {
  ALL: ['ad'] as const,
  USERKEYS: () => [...KEYS.ALL, 'userKeys'] as const,
  MDNS: () => [...KEYS.ALL, 'mdns'] as const,
  ADDISPLAY_BY_ID: () => [...KEYS.ALL, 'adDisplayByID'] as const,
  CAMPAIGN_LIST: () => [...KEYS.ALL, 'campaignList'] as const,
  MATERIAL_LIST_BY_NAME: () => [...KEYS.ALL, 'materialListByName'] as const,
  CAMPAIGN_LIST_BY_NAME: () => [...KEYS.ALL, 'campaignListByName'] as const,
  AD_DISPLAY_LIST: () => [...KEYS.ALL, 'adDisplayList'] as const,
  MATERIAL_LIST: () => [...KEYS.ALL, 'materialList'] as const,
  MATERIALS: () => [...KEYS.ALL, 'materials'] as const,
  INVENTORY: () => [...KEYS.ALL, 'inventory'] as const,
  MATERIAL_TYPES: () => [...KEYS.ALL, 'MATERIAL_TYPES'] as const,
  MATERIAL_TYPES_BY_INVENTORY_ID: () => [...KEYS.ALL, 'materialTypesByInventoryId'] as const,
  APP_VERSIONS: () => [...KEYS.ALL, 'appVersions'] as const,
  TOS: () => [...KEYS.ALL, 'tos'] as const,
  COMPANY_LIST: () => [...KEYS.ALL, 'companyList'] as const,
  ADVERTISER_LIST: () => [...KEYS.ALL, 'advertiserList'] as const,
  AD_MODIFY_HISTORY: () => [...KEYS.ALL, 'adModifyHistory'] as const,
  REPORT_LIST_AD_DETAIL: () => [...KEYS.ALL, 'reportListAdDetail'] as const,
  MATERIAL_BY_ID: () => [...KEYS.ALL, 'materialById'] as const,
  REPORT_LIST_AD: () => [...KEYS.ALL, 'reportListAd'] as const,
  REPORT_LIST_AD_ALL: () => [...KEYS.ALL, 'reportAdListAll'] as const,
  REPORT_LIST_DAILY: () => [...KEYS.ALL, 'reportListDaily'] as const,
  REPORT_LIST_DAILY_ALL: () => [...KEYS.ALL, 'reportListDailyAll'] as const,
  REPORT_CAMPAIGN_LIST: () => [...KEYS.ALL, 'reportCampaignList'] as const,
  REPORT_CAMPAIGN_LIST_ALL: () => [...KEYS.ALL, 'reportCampaignListAll'] as const,
}
