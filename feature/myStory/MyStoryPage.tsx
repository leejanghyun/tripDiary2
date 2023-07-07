import styled from '@emotion/styled'
import {
  Button, toastError, toastSuccess,
} from '@TMOBI-WEB/ads-ui'
import { AxiosError } from 'axios'
import { useCallback, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { postStory } from '@/api'
import { Container } from '@/components/Container'
import FrameLayout from '@/components/FrameLayout'
import { MENU_ID } from '@/components/Menu'
import { KEYS } from '@/constants'
import { Story } from '@/db'

import useMyStories from '../shared/hooks/useMyStories'
import FeedSelectModal from './components/FeedSelectModal'
import MyStoryCard from './components/MyStoryCard'

function MyStoryPage() {
  const [isOpenFeedModal, setOpenFeedModal] = useState(false)
  const { data } = useMyStories()
  const { content } = data || {}
  const queryClient = useQueryClient()

  const { mutate: submitStory, isLoading } = useMutation<boolean, AxiosError, string>(
    (data) => (postStory(data)),
    {
      onSuccess: () => {
        queryClient.refetchQueries([KEYS.MY_STORIES()])
        toastSuccess('스토리를 생성 했습니다.')
      },
      onError: () => {
        toastError('스토리를 생성 실패 했습니다.')
      },
    },
  )

  const handleMakeStoryClick = useCallback(() => {
    setOpenFeedModal(true)
  }, [])

  const handleMakeStory = useCallback((storyName: string) => {
    setOpenFeedModal(false)

    submitStory(storyName)
  }, [submitStory])

  const handleMakeStoryCancel = useCallback(() => {
    setOpenFeedModal(false)
  }, [])

  return (
    <FrameLayout
      title="내 스토리"
      descriptionTooltipMessages={['스토리를 생성하시오.']}
      titleTooltipMessage="스토리를 생ㅓ하기오."
      menuId={MENU_ID.MY_STORY}
      right={(
        <RightSide>
          <Button
            type="submit"
            size="small"
            palette="blue-stroke"
            onClick={handleMakeStoryClick}
            loading={isLoading}
          >
            스토리 생성
          </Button>
        </RightSide>
          )}
    >
      <Container>
        {(content || []).map((item: Story) => {
          const { title, _id } = item || {}

          return (
            <MyStoryCard
              key={_id}
              title={title}
            />
          )
        })}
      </Container>
      <FeedSelectModal
        isOpen={isOpenFeedModal}
        onCancel={handleMakeStoryCancel}
        onMakeStory={handleMakeStory}
      />
    </FrameLayout>
  )
}

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export default MyStoryPage
