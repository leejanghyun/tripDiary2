import { getAddressByCode } from './getAddressByCode'

type Item = {
  name: string,
  code: {
    sidoCode: string,
    gunguCode: string,
    dongCode: string
  }
}

export const getAreaNameByCode = async (
  sidoCode: string,
  gunguCode: string,
  dongCode: string,
  count?: number,
): Promise<Item> => {
  const result = await getAddressByCode({
    sidoCode, gunguCode, dongCode, count,
  })
  const { areaCodeInfo } = result || {}
  const { poiAreaCodes } = areaCodeInfo || {}
  const target = poiAreaCodes?.find((poi: any) => {
    const { largeCd, middleCd, smallCd } = poi || {}

    return largeCd === sidoCode && middleCd === gunguCode && dongCode === smallCd
  })
  const { districtName } = target || {}
  const item = {
    name: districtName || '-',
    code: {
      sidoCode,
      gunguCode,
      dongCode,
    },
  }

  return item
}
