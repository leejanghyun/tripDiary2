export function downloadCSV(csv: string[], filename: string) {
  const blob = new Blob([`\ufeff${csv[0]}`], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function objectArrayToCsvString(items: any[]): string {
  const fields = Object.keys(items[0])
  const csv = items.map((row) => {
    return fields.map((fieldName) => {
      return JSON.stringify(row[fieldName], (key, value: any) => {
        return value === null ? '' : value
      })
    }).join(',')
  })
  csv.unshift(fields.join(',')) // add header column

  return csv.join('\r\n')
}
