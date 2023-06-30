import styled from '@emotion/styled'
import { COLOR } from '@TMOBI-WEB/ads-ui'

import { ReactComponent as AddItemButton } from '@/images/ico_blue_add.svg'

interface AddButtonProps {
  onClick: () => void;
}

function AddFeedButton({ onClick }: AddButtonProps) {
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
  bottom: 75px;
  right: 25px;
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
  border-color: ${COLOR.primary.color.tmobi.blue[400]};
`

export default AddFeedButton
