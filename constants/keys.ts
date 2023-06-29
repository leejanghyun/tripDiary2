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
  ALL: ['trip'] as const,
  USERKEYS: () => [...KEYS.ALL, 'userKeys'] as const,
  FEED_LIST: () => [...KEYS.ALL, 'feedList'] as const,
  MY_FEED: () => [...KEYS.ALL, 'myFeed'] as const,
  MY_FEEDS: () => [...KEYS.ALL, 'myFeeds'] as const,
}
