export function getMimeTypeFromDataUri(dataUri: string) {
  return dataUri.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1]
}

export const base64toBlob = (base64Data: string) => {
  const parts = base64Data.split(';base64,')
  const imageType = parts[0].split(':')[1]
  const decodedData = window.atob(parts[1])
  const uInt8Array = new Uint8Array(decodedData.length)

  for (let i = 0; i < decodedData.length; i += 1) {
    uInt8Array[i] = decodedData.charCodeAt(i)
  }

  return new Blob([uInt8Array], { type: imageType })
}
