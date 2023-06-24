import styled from '@emotion/styled'
import { COLOR } from '@TMOBI-WEB/ads-ui'
import { ChangeEvent, useRef } from 'react'

import { ReactComponent as Camera } from '@/images/ico_camera_img.svg'

export interface Props {
  onUpload: (imageData: File) => void;
}

function CameraButton({ onUpload }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = () => {
    if (!fileInputRef.current) {
      return
    }

    fileInputRef.current.click()
  }

  const onUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      onUpload(file)
    }
  }

  return (
    <CameraStyles
      onClick={handleUploadClick}
    >
      <Camera />
      <InputStyle
        ref={fileInputRef}
        type="file"
        accept="image/*;capture=camera"
        onChange={onUploadImage}
      />
    </CameraStyles>
  )
}

const InputStyle = styled.input`
  display: none;
`

const CameraStyles = styled.div`
  position: fixed;
  bottom: 135px;
  right: 25px;
  background-color: ${COLOR.gray.color.wb[0]};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
`

export default CameraButton
