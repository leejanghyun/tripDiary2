import {
  memo, useEffect, useRef, useState,
} from 'react'

type Props = {
  src: string
}

/**
 * Image 컴포넌트
 * @component Image 컴포넌트
 */
function UploadImage({
  src,
}: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setSelectedImage(src)

    return () => {
      setSelectedImage(null)
    }
  }, [src])

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D

    if (!selectedImage) {
      context.clearRect(0, 0, canvas.width, canvas.height)
      return
    }

    const image = new Image()

    image.src = selectedImage
    image.onload = () => {
      const aspectRatio = image.width / image.height

      canvas.height = canvas.width / aspectRatio

      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
    }
  }, [selectedImage])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%' }}
    />
  )
}

export default memo(UploadImage)
