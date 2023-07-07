import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useEffect, useRef, useState } from 'react'

interface VideoProps {
  imageUrls: string[];
}

function Video({ imageUrls }: VideoProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [prevImageIndex, setPrevImageIndex] = useState<number>(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [audioSrc, setAudioSrc] = useState<string>('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = prevIndex + 1
        return nextIndex >= imageUrls.length ? prevIndex : nextIndex
      })

      // setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length) []
    }, 2000)

    return () => clearTimeout(timer)
  }, [currentImageIndex, imageUrls])

  const getRandomAudioItem = () => {
    const items: string[] = ['/audio/1.mp3', '/audio/2.mp3', '/audio/3.mp3', '/audio/4.mp3']
    const randomIndex: number = Math.floor(Math.random() * items.length)

    return items[randomIndex]
  }

  useEffect(() => {
    setAudioSrc(getRandomAudioItem())
  }, [])

  useEffect(() => {
    setPrevImageIndex(currentImageIndex)
  }, [currentImageIndex])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.load()
      audioRef.current.play()
    }
  }, [])

  return (
    <Wrapper>
      {imageUrls.map((imageUrl, index) => (
        <Image
          key={index}
          src={imageUrl}
          alt={imageUrl}
          current={index === currentImageIndex}
          prev={index === prevImageIndex}
        />
      ))}
      <audio
        ref={audioRef}
        src={audioSrc}
        autoPlay
        controls
        css={css`
          display: none;
        `}
      >
        <track
          src="audio"
          kind="captions"
          srcLang="en"
          label="English"
          default
        />
      </audio>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const Image = styled.img<{ current: boolean; prev: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  opacity: ${(props) => (props.current || props.prev ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  z-index: ${(props) => (props.current ? 2 : 1)};
  object-fit: contain;
`

export default Video
