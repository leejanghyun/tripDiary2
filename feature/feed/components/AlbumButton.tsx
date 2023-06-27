import styled from '@emotion/styled'
import { COLOR } from '@TMOBI-WEB/ads-ui'
import { ChangeEvent, useRef } from 'react'

import { ReactComponent as Album } from '@/images/ico_album.svg'

interface AlbumButtonProps {
  onUpload: (imageData: FileList) => void;
}

function AlbumButton({ onUpload }: AlbumButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = () => {
    if (!fileInputRef.current) {
      return
    }

    fileInputRef.current.click()
  }

  const onUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files

    if (file) {
      onUpload(file)
      event.target.value = ''
    }
  }

  return (
    <AlbumButtonStyles
      onClick={handleUploadClick}
    >
      <Album />
      <InputStyle
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*;capture=camera"
        onChange={onUploadImage}
      />
    </AlbumButtonStyles>
  )
}

const InputStyle = styled.input`
  display: none;
`

const AlbumButtonStyles = styled.div`
  position: fixed;
  bottom: 75px;
  right: 20px;
  background-color: ${COLOR.gray.color.wb[0]};
  opacity: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
  border-color: ${COLOR.primary.color.tmobi.blue[300]};
`

export default AlbumButton
