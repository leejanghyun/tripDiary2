export const filterUinqueObject = (arr: unknown[]) => {
  const uniqueObject: any = {}

  arr.forEach((item) => {
    uniqueObject[JSON.stringify(item)] = item
  })

  return Object.keys(uniqueObject).map((key) => JSON.parse(key))
}
