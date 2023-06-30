import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  Checkbox, COLOR,
  PopoverContent, PopoverRoot, PopoverTrigger,
} from '@TMOBI-WEB/ads-ui'
import { ParsedUrlQuery } from 'querystring'
import {
  memo, useCallback, useEffect, useMemo, useState,
} from 'react'
import { useFormContext } from 'react-hook-form'

import useTreeCheckbox, { DataNode } from '@/hooks/ui/useTreeCheckbox'
import useQueryStringController from '@/hooks/useQueryStringController'
import { ReactComponent as IconArrowDowm } from '@/images/ico_16_arrow_down.svg'
import { ReactComponent as IconArrowUp } from '@/images/ico_16_arrow_up.svg'

type Props = {
  query: ParsedUrlQuery
  name: string
  label: string
  options: DataNode[]
}

function FilterSelect({
  label, query, name, options,
}: Props) {
  const { updateQuery, removeQuery } = useQueryStringController()
  const { setValue, watch } = useFormContext()
  const { length: optionsLen } = options || []
  const filterList = watch(name)
  const [isOpen, setOpen] = useState(false)

  const getSelectedItems = useCallback(() => {
    const { [name]: items } = query || {}
    let selectedItems: string[] = []

    try {
      selectedItems = items ? JSON.parse(items as string) : []
    } catch (error) {
      selectedItems = []
    }

    return selectedItems
  }, [query, name])

  /**
   * URL Query Params 로 Default 값 설정
   */
  useEffect(() => {
    const queryFilterSelectIds: string[] = getSelectedItems()

    setValue(name, queryFilterSelectIds) // Query Params에 저장된 인벤토리 저장
  }, [setValue, getSelectedItems, name])

  const defaultValues = useMemo(() => {
    const isTotal = options?.every((item) => item.isChecked)
    const selectedQuryFilters: string[] = getSelectedItems()
    const newChildren = options.map((item) => {
      return {
        isChecked: Boolean((selectedQuryFilters || []).find((id) => id === `${item?.id}`)) || false,
        id: `${item?.id}`,
        label: `${item?.label}`,
      }
    })

    return {
      isChecked: isTotal,
      id: 'total',
      children: newChildren,
    }
  }, [options, getSelectedItems])

  const { handleClick, treeNode } = useTreeCheckbox({ data: defaultValues })
  const {
    children,
  } = { ...treeNode }

  /**
   * 필터 조건에 따른 URL QueryParameter 수정
   * @param newFilters 신규 필터
   */
  const updateUrlQuery = useCallback((newFilters: string[]) => {
    const { length } = newFilters

    if (!length) {
      removeQuery(name)
      return
    }

    updateQuery({ [name]: JSON.stringify(newFilters) })
  }, [updateQuery, removeQuery, name])

  return (
    <PopoverRoot>
      <TriggerButton
        data-filtered={Boolean(filterList?.length < optionsLen)}
        onClick={() => setOpen(!isOpen)}
      >
        <FilterSelectPopOverWrapper isOpen={isOpen}>
          <div>
            {label}
          </div>
          <div>
            {isOpen ? <IconArrowUp /> : <IconArrowDowm /> }
          </div>
        </FilterSelectPopOverWrapper>
      </TriggerButton>
      <Content
        sideOffset={0}
        alignOffset={0}
        align="end"
        side="bottom"
      >
        {children?.map((item) => {
          const {
            name, label, isChecked, id,
          } = item
          return (
            <CheckBoxBlock key={id}>
              <Checkbox
                checked={isChecked}
                name={name}
                label={label}
                styles={FilterSelectCheckboxStyles}
                onChange={(e) => {
                  const { checked } = e.target
                  const newFilters = filterList

                  if (checked) {
                    newFilters.push(id)
                  } else {
                    const findIndex = newFilters.findIndex((filter: string) => filter === id)

                    newFilters.splice(findIndex, 1)
                  }

                  updateUrlQuery(newFilters)
                  setValue(name as string, newFilters)
                  handleClick(item, checked)
                }}
              />
            </CheckBoxBlock>
          )
        })}
      </Content>
    </PopoverRoot>
  )
}

const FilterSelectPopOverWrapper = styled.div<{ isOpen?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 16px;
  gap: 20px;
  width: 100px;
  height: 40px;
  border: 1px solid ${COLOR.gray.color.gray[200]};
  border-radius: 8px;

  &:hover {
    border-color: ${COLOR.primary.color.tmobi.blue[400]};
    background: #f5f9ff;
  } 

  > div:first-of-type { // label 명
    color: ${COLOR.gray.color.gray[500]};
    font-size: ${({ theme }) => theme.font[14].size};
    line-height: ${({ theme }) => theme.font[14].lineHeight};
  }

  > div:nth-of-type(2) { // Toggle 아이콘
    display: flex;
    gap: 5px;
    align-items: center;   
  }
`

const FilterSelectCheckboxStyles = css`
  color: ${COLOR.gray.color.gray[900]};
`

const TriggerButton = styled(PopoverTrigger)`
  position: relative;

  &[data-state=open] > div {
    border-color: black;
  }
`

const Content = styled(PopoverContent)`
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 8px;
  width: 150px;
`

const CheckBoxBlock = styled.div`
  label {
    padding:  14px 8px;
  }
  
  &:hover {
    background-color: ${COLOR.primary.color.tmobi.blue[100]} !important;
    border-radius: 4px !important;
  }
`

export default memo(FilterSelect)
