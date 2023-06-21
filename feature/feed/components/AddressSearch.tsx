import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  COLOR, Input, PopoverPrimitive, PopoverRoot,
} from '@TMOBI-WEB/ads-ui'
import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react'
import { useFormContext } from 'react-hook-form'

type SearchAddressType = {
  address: string;
  lat: number;
  lon: number;
  detailName: string;
  roadAddress: string;
}

/** 컴포넌트 Property {@link AddressSearch} */
export interface AddressSearchProps {
  name: string;
  data?: { addressList: SearchAddressType[]; }
  isLoading?: boolean
  readOnly?: boolean
  defaultValues?: string
  onSearch: (value: string | number | readonly string[]) => void
  onSearchEnd: (address: SearchAddressType) => void
}

const DISPLAY_LEN = 5

/**
 * AddressSearch 컴포넌트
 * @category  AddressSearch 컴포넌트
 */
export function AddressSearch({
  isLoading, defaultValues = '', readOnly, name, data, onSearch, onSearchEnd,
}: AddressSearchProps) {
  const {
    control, trigger, formState, clearErrors, setError,
  } = useFormContext()
  const [isOpen, setOpen] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<string>(defaultValues)
  const { addressList = [] } = { ...data }
  const displayAddressList = useMemo(() => addressList.slice(0, DISPLAY_LEN), [addressList])
  const { length: AddressLen } = displayAddressList
  const text = useRef<string>(defaultValues)
  const element = useRef<HTMLDivElement>(null)
  const { current: contentRef } = element
  const [keyword, setKeyword] = useState('')

  /**
   * DefaultValue 변경시 호출
   */
  useEffect(() => {
    text.current = defaultValues ?? ''

    setSelectedAddress(defaultValues)
  }, [defaultValues])

  /**
   * 주소 리스트 아이템 클릭시
   * @param index 인덱스
   */
  const handleClickItem = (index: number) => {
    const addressTarget = displayAddressList?.[index]
    const { address } = addressTarget

    text.current = address // 선택한 텍스트 저장

    setSelectedAddress(address)
    onSearchEnd(addressTarget)
    setOpen(false)
  }

  /**
   * 검색하기 클릭 시 호출
   * @param value 주소
   */
  const handleSearch = useCallback(async (value: string | number | readonly string[]) => {
    clearErrors(name)

    const { length } = value as string

    if (length < 2) {
      await trigger(name)
    }

    const { errors } = formState

    if (errors[name]) {
      return
    }

    setOpen(true)
    onSearch(value)
    setKeyword(value as string)
  }, [onSearch, formState, trigger, name, clearErrors])

  /**
   * 외부 영역 클릭 시 호출
   * - 선택한 주소가 바뀔때 Error 출력
   */
  const handleClickOutSide = useCallback(async () => {
    if (text.current !== selectedAddress) {
      setError(name, { message: '정확한 주소를 입력해주세요.' })
    }

    setOpen(false)
  }, [setOpen, name, selectedAddress, setError])

  return (
    <PopoverRoot
      open={isOpen}
    >
      <AddressBlockAnchor ref={element}>
        <Input
          data-testid="addressSearchInput"
          control={control}
          name={name}
          type="search"
          disabled={readOnly}
          label="주소"
          placeholder="도로명/지번 주소 입력 후 검색"
          onSearch={handleSearch}
          onInput={(e) => {
            const { target } = { ...e }
            const searchText = (target as HTMLInputElement).value

            text.current = searchText
          }}
          onKeyDown={(e) => {
            const {
              key, keyCode, which, target,
            } = e
            const isEnter = key === 'Enter' || keyCode === 13 || which === 13
            const searchText = (target as HTMLInputElement).value

            if (isEnter) {
              e.preventDefault()
              setTimeout(() => handleSearch(searchText), 0)
            }
          }}
          rules={{
            required: true,
            validate: (value: string) => {
              if (readOnly) {
                return true
              }

              if (value?.length < 2) {
                return '두 글자 이상 검색해 주세요.'
              }

              if (!selectedAddress && !isOpen) {
                return '정확한 주소를 입력해주세요.'
              }

              if (selectedAddress && text.current.trim() !== selectedAddress.trim()) {
                return '정확한 주소를 입력해주세요.'
              }

              return true
            },
          }}
        />
      </AddressBlockAnchor>
      <AddressSearchContent
        width={contentRef && getComputedStyle(contentRef).width}
        sticky="always"
        tabIndex={-1}
        onPointerDownOutside={handleClickOutSide}
      >
        <Content>
          {(AddressLen) ? (
            <ListBlock>
              {displayAddressList.map(({ address, detailName, roadAddress }, index) => (
                <ListItem
                  key={`addressItem${index}`}
                  type="button"
                  onClick={() => handleClickItem(index)}
                >
                  <Address>
                    <strong>지번</strong>
                    <span>{`${address}${detailName.length ? ` ${detailName}` : ''}`}</span>
                  </Address>
                  <Address>
                    <strong>도로명</strong>
                    <span className="road">{roadAddress}</span>
                  </Address>
                </ListItem>
              ))}
            </ListBlock>
          ) : (
            <EmptyBlock>
              {isLoading ? <strong>해당 주소를 검색중 입니다...</strong> : (
                <>
                  <strong>‘{keyword}’에 대한 검색결과가 없습니다.</strong>
                  <div>
                    검색어에 잘못된 철자는 없는지,<br />
                    정확한 주소가 맞는지 한 번 더 확인해주세요.
                  </div>
                </>
              )}
            </EmptyBlock>
          )}
          <NoticeBlock>
            아래와 같은 조합으로 입력 시 더 정확한 검색결과를 확인할 수 있습니다.<br />
            <PrimaryText>도로명+건물번호/건물명(아파트명)</PrimaryText> 또는 <PrimaryText>지역명+지번/건물명(아파트명)</PrimaryText>
          </NoticeBlock>
        </Content>
      </AddressSearchContent>
    </PopoverRoot>
  )
}

export const AddressBlockAnchor = styled(PopoverPrimitive.Anchor)`
  position: relative;
  width: 100%;
  display: block;

`

const AddressSearchContent = styled(PopoverPrimitive.Content)<{ width?: string | null }>`
  z-index: ${({ theme }) => theme.zIndex.popover};
  margin-top: 8px;
  display: block;
  box-shadow: ${({ theme }) => theme.boxShadow[340]};
  border-radius: 8px;

  &[data-state='open'] {
    ${(props) => props.width && css` width: ${props.width} !important;`}

    &:focus {
      outline: none;
    }
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100% !important;
  min-width: 100% !important;
  max-width: 100% !important;
  position: relative;
  border-radius: 8px;
  padding: 16px;
  background-color: ${COLOR.gray.color.wb[0]};
  z-index: ${({ theme }) => theme.zIndex.select};
`

const Address = styled.span`
  display: flex;
  gap: 8px;
  align-items: center;

  & > strong {
    display: inline-flex;
    justify-content: center;
    padding: 0 2px;
    min-width: 35px;
    border-radius: 2px;
    background-color: ${COLOR.primary.color.tmobi.blue[100]};
    font-weight: 300;
    font-size: ${({ theme }) => theme.font[11].size};
    line-height: ${({ theme }) => theme.font[11].lineHeight};
    color: ${COLOR.primary.color.tmobi.blue[500]};
    letter-spacing: -1px;
    white-space: nowrap;
  }

  & > span {
    flex: 1;
    text-align: left;
    font-size: ${({ theme }) => theme.font[14].size};
    line-height: ${({ theme }) => theme.font[14].lineHeight};
    color: ${COLOR.gray.color.gray[900]};

    &.road {
      font-size: ${({ theme }) => theme.font[11].size};
      line-height: ${({ theme }) => theme.font[11].lineHeight};
      color: ${COLOR.gray.color.gray[500]};
    }
  }
`

const ListItem = styled.button`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 0;

  &:hover {
    background: ${COLOR.primary.color.tmobi.blue[100]};
    border-radius: 8px;
  }
`

const ListBlock = styled.div`
  display: flex;
  flex-direction: column;

  ${ListItem}:nth-of-type(n + 2) {
    border-top: 1px solid ${COLOR.gray.color.gray[200]};
  }
`

const PrimaryText = styled.em`
  color: ${COLOR.primary.color.tmobi.blue[500]};
`

const EmptyBlock = styled.div`
  padding: 24px 0px;
  text-align: center;
  color: ${COLOR.gray.color.gray[500]};

  strong {
    font-weight: 500;
    color: ${COLOR.gray.color.gray[900]};
  }
  
  div {
    margin-top: 8px;
  }
`

const NoticeBlock = styled.div`
  padding: 10px 16px 16px 16px;
  font-size: ${({ theme }) => theme.font[12].size};
  line-height: ${({ theme }) => theme.font[12].lineHeight};
  text-align: center;
  background-color: ${COLOR.gray.color.gray[100]};
  border-radius: 4px;
  
  em:first-of-type {
    position: relative;
    padding-left: 8px;
    
    &:before {
      position: absolute;
      top: 5px;
      left: 0;
      content: '';
      display: inline-flex;
      width: 3px;
      height: 3px;
      background-color: ${COLOR.gray.color.gray[700]};
      border-radius: 100%;
      overflow: hidden;
    }
  }
`
