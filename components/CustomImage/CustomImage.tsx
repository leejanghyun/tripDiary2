import styled from '@emotion/styled'
import {
  memo, useEffect, useRef,
} from 'react'

import ImageError from '@/images/image_default.svg'

type Props = {
  src: string
  maxWidth?: number
  maxHeight?: number
}

/**
 * Image 컴포넌트
 * @component Image 컴포넌트
 */
function CustomImage({
  src, maxWidth, maxHeight,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.src = src
    img.onload = () => {
      if (!ctx) {
        return
      }

      const { naturalWidth, naturalHeight } = img
      let width = naturalWidth
      let height = naturalHeight

      if (maxWidth && (naturalWidth > maxWidth)) {
        width = maxWidth
      }

      if (maxHeight && (naturalHeight > maxHeight)) {
        height = maxHeight
      }

      canvas.width = width
      canvas.height = height

      ctx.drawImage(img, 0, 0, width, height) // 이미지 그리기
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'
      ctx.fillRect(0, 0, width, height) // 오버레이
    }

    img.onerror = () => {
      const DEFAULT_SIZE = 35
      const img = new Image()

      img.src = ImageError

      canvas.width = DEFAULT_SIZE
      canvas.height = DEFAULT_SIZE

      img.onload = () => {
        if (!ctx) {
          return
        }
        ctx.drawImage(img, 0, 0, DEFAULT_SIZE, DEFAULT_SIZE)
      }
    }
  }, [src, maxWidth, maxHeight])
  return (
    <Canvas
      ref={canvasRef}
    />
  )
}

const Canvas = styled.canvas`
  border: 1px solid rgba(0, 0, 0, 0.08);
`

export default memo(CustomImage)
