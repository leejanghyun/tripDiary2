import {
  memo, useEffect, useRef,
} from 'react'

type Props = {
  images: string[]
}

const drawInfo = (width: number, height: number, idx: number, length: number) => {
  const DEFAULT_POS = {
    x: 0,
    y: 0,
    width,
    height,
  }

  if (length === 1) {
    return DEFAULT_POS
  }

  if (length === 2) {
    if (idx === 0) {
      return {
        ...DEFAULT_POS,
        width: width / 2,
      }
    }
    return {
      ...DEFAULT_POS,
      x: width / 2,
      width: width / 2,
    }
  }

  if (length === 3) {
    if (idx === 0) {
      return {
        ...DEFAULT_POS,
        width: width / 2,
        height: (height / 2),
      }
    }

    if (idx === 1) {
      return {
        ...DEFAULT_POS,
        x: width / 2,
        width: width / 2,
        height: (height / 2),
      }
    }

    return {
      ...DEFAULT_POS,
      y: height / 2,
      height: (height / 2),
    }
  }

  if (idx === 0) {
    return {
      ...DEFAULT_POS,
      width: width / 2,
      height: (height / 2),
    }
  }

  if (idx === 1) {
    return {
      ...DEFAULT_POS,
      x: width / 2,
      width: width / 2,
      height: (height / 2),
    }
  }

  if (idx === 2) {
    return {
      ...DEFAULT_POS,
      y: height / 2,
      width: width / 2,
      height: (height / 2),
    }
  }

  if (idx === 3) {
    return {
      x: width / 2,
      y: height / 2,
      width: width / 2,
      height: (height / 2),
    }
  }

  return null
}

/**
 * Image 컴포넌트
 * @component Image 컴포넌트
 */
function CustomImage({
  images,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement
    const context = canvas.getContext('2d')

    images.forEach((src, index) => {
      const image = new Image()
      image.src = src

      const canvas = canvasRef.current as HTMLCanvasElement
      const { width: canvasWidth, height: canvasHeight } = canvas

      image.onload = () => {
        if (!context) {
          return
        }

        const res = drawInfo(canvasWidth, canvasHeight, index, images.length)

        if (!res) {
          return
        }

        const {
          x, y, width, height,
        } = res

        context.drawImage(image, x, y, width, height)
      }
    })
  }, [images])

  return (
    <canvas
      style={{ width: '100%', height: '100%' }}
      ref={canvasRef}
    />
  )
}

export default memo(CustomImage)
