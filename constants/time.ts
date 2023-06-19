export const timeOptions = () => {
  return Array.from({ length: 25 }, (v, k) => k).map((v) => {
    const value = v < 10 ? `0${v}` : `${v}`
    return { text: `${value}시`, value }
  })
}

export const minuteOptions = () => {
  return [
    { text: '00분', value: '00' },
    { text: '10분', value: '10' },
    { text: '20분', value: '20' },
    { text: '30분', value: '30' },
    { text: '40분', value: '40' },
    { text: '50분', value: '50' },
  ]
}

export const TIME_OPTIONS = timeOptions()
export const MINUTE_OPTIONS = minuteOptions()
