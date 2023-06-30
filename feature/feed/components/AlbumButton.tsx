import styled from '@emotion/styled'
import { COLOR, toastError } from '@TMOBI-WEB/ads-ui'
import { ChangeEvent, useCallback, useRef } from 'react'

import { ReactComponent as Album } from '@/images/ico_album.svg'

export const MAX_UPLOAD_SIZE = 6

interface AlbumButtonProps {
  isMaxUploaded: boolean
  onUpload: (imageData: FileList) => void;
}

function AlbumButton({ isMaxUploaded, onUpload }: AlbumButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = useCallback(() => {
    if (isMaxUploaded) {
      toastError(`이미지 업로드는 최대${MAX_UPLOAD_SIZE}장만 가능합니다.`)
    }

    if (!fileInputRef.current) {
      return
    }

    fileInputRef.current.click()
  }, [isMaxUploaded])

  const onUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files

    if (file) {
      onUpload(file)
      event.target.value = ''
    }
  }

  return (
    <AlbumButtonStyles
      isMaxUploaded={isMaxUploaded}
      onClick={handleUploadClick}
    >
      <Album fill={isMaxUploaded ? COLOR.gray.color.gray[400] : COLOR.primary.color.tmobi.blue[600]} />
      <InputStyle
        disabled={isMaxUploaded}
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

const AlbumButtonStyles = styled.div<{ isMaxUploaded?: boolean }>`
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

  border-color: ${({ isMaxUploaded = false }) => (isMaxUploaded
    ? `${COLOR.gray.color.gray[400]}` : `${COLOR.primary.color.tmobi.blue[600]}`)};
`

export default AlbumButton
