import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { COLOR, Input } from '@TMOBI-WEB/ads-ui'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const enum FORM_TYPE {
  HASH_TAG = 'hasTag',
}

type FormType = {
  [FORM_TYPE.HASH_TAG]: string
}

type Props = {
  defaultValue: string[]
  onChange: (values: string[]) => void
}

export const MAX_HASH_TAG_LEN = 3

function HashtagInput({ defaultValue, onChange }: Props) {
  const formMethods = useForm<FormType>({
    defaultValues: {
      [FORM_TYPE.HASH_TAG]: '',
    },
    mode: 'onBlur',
  })
  const { control, setValue } = formMethods
  const [tags, setTags] = useState<string[]>(defaultValue || [])

  const addTag = (tag: string) => {
    if (tags.length < 3 && !tags.includes(tag)) {
      setTags([...tags, tag])
    }
  }

  useEffect(() => {
    setTags(defaultValue || [])
  }, [defaultValue])

  const handleRemoveTag = (index: number) => {
    const updatedTags = [...tags]

    updatedTags.splice(index, 1)
    setTags(updatedTags || [])
    onChange(updatedTags)
  }

  return (
    <div css={ContainerStyles}>
      <Input
        control={control}
        disabled={tags?.length === MAX_HASH_TAG_LEN}
        name={FORM_TYPE.HASH_TAG}
        label={`해쉬 태그 입력 (최대 ${MAX_HASH_TAG_LEN}개)`}
        placeholder="최대 글자수 15자"
        onKeyDown={(e) => {
          const inputValue = (e.target as HTMLInputElement).value.trim()

          if (e.key === 'Enter' && inputValue !== '') {
            e.preventDefault()

            const value = inputValue.toLowerCase()

            addTag(value)
            onChange([...tags, value])
            setValue(FORM_TYPE.HASH_TAG, '')
          }
        }}
        maxLength={10}
      />
      <div css={TagContainerStyles}>
        {tags.map((tag, index) => (
          <Tag
            key={index}
          >
            #{tag}
            <button
              type="button"
              css={removeButtonStyles}
              onClick={() => handleRemoveTag(index)}
            >
              &times;
            </button>
          </Tag>
        ))}
      </div>
    </div>
  )
}

const ContainerStyles = css`
  display: flex;
  flex-direction: column;
  margin: 12px 0 6px 0;
`

const TagContainerStyles = css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 8px;
`

const Tag = styled.span`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.font[16].size};
  line-height: ${({ theme }) => theme.font[16].lineHeight};
  color: ${COLOR.primary.color.tmobi.blue[600]};
  padding: 4px 8px;
`

const removeButtonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: ${COLOR.gray.color.gray[900]};
  border: none;
  margin-left: 4px;
  padding: 0;
  cursor: pointer;
`

export default HashtagInput
