import styled from '@emotion/styled'
import { COLOR } from '@TMOBI-WEB/ads-ui'

import { ReactComponent as AddItemButton } from '@/images/ico_blue_add.svg'

interface AddButtonProps {
  onClick: () => void;
}

function AddButton({ onClick }: AddButtonProps) {
  return (
    <AddButtonStyles
      onClick={onClick}
    >
      <AddItemButton />
    </AddButtonStyles>
  )
}

const AddButtonStyles = styled.div`
  position: fixed;
  bottom: 85px;
  right: 30px;
  background-color: ${COLOR.gray.color.wb[0]};
  opacity: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
`

export default AddButton
