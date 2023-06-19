export const enum TARGET {
  NONE = 'NONE',
  LOCAL = 'local',
  DEV = 'dev',
  DTG = 'dtg',
  STG = 'stg',
  RTG = 'rtg',
  PRD = 'prd',
}

export const CONFIG = {
  TITLE: '',
  DESCRIPTION: '',
  VERSION: process.env.NEXT_PUBLIC_APP_VERSION ?? null,
  TARGET: (process.env.NEXT_PUBLIC_TARGET ?? TARGET.NONE) as TARGET,
  DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
  HEADERS: { USER_AGENT: 'user-agent' },
}
