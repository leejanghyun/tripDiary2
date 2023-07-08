import styled from '@emotion/styled'

import { ReactComponent as DeleteItem } from '@/images/ico_20_delete.svg'
import { ReactComponent as NakeDelete } from '@/images/ico_nake_delete.svg'

type Props = {
  variant?: 'default' | 'naked'
  onClick: () => void
}

export function RemoveButton({ variant = 'default', onClick }: Props) {
  return (
    <RemoveBtn onClick={onClick}>
      {variant === 'default' ? <DeleteItem /> : <NakeDelete />}
    </RemoveBtn>
  )
}

const RemoveBtn = styled.div`
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  cursor: pointer;
  border-width: 0px;
`
