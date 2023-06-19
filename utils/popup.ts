type featureBooleanOption = 'yes' | 'no' | 1 | 0

export function openPopup({
  url, target, features, callback,
}: {
  url: string | URL,
  target?: string,
  features?: {
    width?: string | number
    height?: string | number
    top?: string | number
    left?: string | number
    fullscreen?: featureBooleanOption
    location?: featureBooleanOption
    menubar?: featureBooleanOption
    resizable?: featureBooleanOption
    scrollbars?: featureBooleanOption
    status?: featureBooleanOption
    titlebar?: featureBooleanOption
    toolbar?: featureBooleanOption
  }
  callback?: (w: WindowProxy | null) => void
}) {
  const strFeatures = features ? Object.entries(features).map((f) => f.join('=')).join(',') : undefined
  const newWindow = window.open(url, target, strFeatures)
  callback?.(newWindow)
}
