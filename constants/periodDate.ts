import dayjs from 'dayjs'

export const enum PERIOD {
  YESTERDAY = 'yesterday',
  LAST_7_DAYS = 'last7days',
  LAST_30_DAYS = 'last30days',
  LAST_WEEK = 'lastweek',
  THIS_MONTH = 'thismonth',
  LAST_MONTH = 'lastmonth',
  LAST_3_MONTHS = 'last3months',
  CUSTOM = 'custom',
}

export const periodOptions = [
  { text: '어제', value: PERIOD.YESTERDAY },
  { text: '지난 7일', value: PERIOD.LAST_7_DAYS },
  { text: '지난 30일', value: PERIOD.LAST_30_DAYS },
  { text: '지난 주', value: PERIOD.LAST_WEEK },
  { text: '이번 달', value: PERIOD.THIS_MONTH },
  { text: '저번 달', value: PERIOD.LAST_MONTH },
  { text: '지난 3개월', value: PERIOD.LAST_3_MONTHS },
  { text: '사용자 지정', value: PERIOD.CUSTOM },
]

export const getPeriod = (fromDate: string, toDate: string) => {
  const today = dayjs()
  const yesterday = today.subtract(1, 'day')
  const last7daysStart = today.subtract(6, 'day')
  const last30daysStart = today.subtract(29, 'day')
  const lastWeekStart = today.subtract(1, 'week').startOf('week')
  const thisMonthStart = today.startOf('month')
  const lastMonthStart = today.subtract(1, 'month').startOf('month')
  const last3MonthsStart = today.subtract(3, 'month').startOf('month')

  if (fromDate === yesterday.format('YYYY-MM-DD') && toDate === yesterday.format('YYYY-MM-DD')) {
    return PERIOD.YESTERDAY
  }

  if (fromDate === last7daysStart.format('YYYY-MM-DD') && toDate === today.format('YYYY-MM-DD')) {
    return PERIOD.LAST_7_DAYS
  }

  if (fromDate === last30daysStart.format('YYYY-MM-DD') && toDate === today.format('YYYY-MM-DD')) {
    return PERIOD.LAST_30_DAYS
  }

  if (fromDate === lastWeekStart.format('YYYY-MM-DD') && toDate === lastWeekStart.add(6, 'day').format('YYYY-MM-DD')) {
    return PERIOD.LAST_WEEK
  }

  if (fromDate === thisMonthStart.format('YYYY-MM-DD') && toDate === today.format('YYYY-MM-DD')) {
    return PERIOD.THIS_MONTH
  }

  if (fromDate === lastMonthStart.format('YYYY-MM-DD') && toDate === lastMonthStart.endOf('month').format('YYYY-MM-DD')) {
    return PERIOD.LAST_MONTH
  }

  if (fromDate === last3MonthsStart.format('YYYY-MM-DD') && toDate === today.format('YYYY-MM-DD')) {
    return PERIOD.LAST_3_MONTHS
  }

  return PERIOD.CUSTOM
}

export const getDateArray = (period: PERIOD) => {
  const today = dayjs() // 현재 시간

  if (period === PERIOD.YESTERDAY) {
    const yesterday = today.subtract(1, 'day')

    return [yesterday.toDate(), yesterday.toDate()]
  }

  if (period === PERIOD.LAST_7_DAYS) {
    const last7daysStart = today.subtract(6, 'day')
    const last7daysEnd = today

    return [last7daysStart.toDate(), last7daysEnd.toDate()]
  }

  if (period === PERIOD.LAST_30_DAYS) {
    const last30daysStart = today.subtract(29, 'day')
    const last30daysEnd = today

    return [last30daysStart.toDate(), last30daysEnd.toDate()]
  }

  if (period === PERIOD.LAST_WEEK) {
    const lastWeekStart = today.subtract(1, 'week').startOf('week')
    const lastWeekEnd = lastWeekStart.add(6, 'day')

    return [lastWeekStart.toDate(), lastWeekEnd.toDate()]
  }

  if (period === PERIOD.THIS_MONTH) {
    const thisMonthStart = today.startOf('month')
    const thisMonthEnd = today.endOf('month')

    return [thisMonthStart.toDate(), thisMonthEnd.toDate()]
  }

  if (period === PERIOD.LAST_MONTH) {
    const lastMonthStart = today.subtract(1, 'month').startOf('month')
    const lastMonthEnd = lastMonthStart.endOf('month')

    return [lastMonthStart.toDate(), lastMonthEnd.toDate()]
  }

  if (period === PERIOD.LAST_3_MONTHS) {
    const last3MonthsStart = today.subtract(3, 'month').startOf('month')
    const last3MonthsEnd = today.endOf('month')

    return [last3MonthsStart.toDate(), last3MonthsEnd.toDate()]
  }

  return []
}
