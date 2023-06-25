import {
  memo, useCallback, useEffect, useRef,
} from 'react'

import ImageError from '@/images/image_default.svg'

type Props = {
  src: string
  onDelete?: () => void
}

const DELETE_BUTTON_POS = 20

/**
 * Image 컴포넌트
 * @component Image 컴포넌트
 */
function CustomImage({
  src,
  onDelete,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawDeleteCircle = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fillStyle = '#191919'
    ctx.fill()
    ctx.closePath()

    ctx.font = 'bold 10px Arial'
    ctx.fillStyle = '#F4F4F4'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('X', x, y)

    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const canvasWidth = getComputedStyle(canvas as HTMLCanvasElement).width
    const clickableArea = {
      x: parseInt(canvasWidth, 10) - DELETE_BUTTON_POS - radius,
      y: y - radius,
      width: radius * 2,
      height: radius * 2,
    }

    const handleClick = (event: MouseEvent) => {
      const { offsetX, offsetY } = event

      if (
        offsetX >= clickableArea.x
        && offsetX <= clickableArea.x + clickableArea.width
        && offsetY >= clickableArea.y
        && offsetY <= clickableArea.y + clickableArea.height
      ) {
        onDelete?.()
      }
    }

    canvasRef.current?.addEventListener('click', handleClick)
  }, [onDelete])

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

      const aspectRatio = img.width / img.height

      canvas.height = canvas.width / aspectRatio

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height) // 이미지 그리기
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'
      ctx.fillRect(0, 0, canvas.width, canvas.height) // 오버레이

      drawDeleteCircle(ctx, canvas.width - DELETE_BUTTON_POS, DELETE_BUTTON_POS, 9)
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
        drawDeleteCircle(ctx, canvas.width - DELETE_BUTTON_POS, DELETE_BUTTON_POS, 9)
      }
    }
  }, [src, onDelete, drawDeleteCircle])

  return (
    <canvas
      style={{ width: '100%' }}
      ref={canvasRef}
    />
  )
}

export default memo(CustomImage)
