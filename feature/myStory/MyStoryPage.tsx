import styled from '@emotion/styled'
import {
  Button, toastSuccess,
} from '@TMOBI-WEB/ads-ui'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { postStory } from '@/api'
import { deleteStory } from '@/api/deleteStory'
import { Container } from '@/components/Container'
import FrameLayout from '@/components/FrameLayout'
import { MENU_ID } from '@/components/Menu'
import { KEYS } from '@/constants'
import { Story } from '@/db'
import useMyStories from '@/feature/shared/hooks/useMyStories'

import MyStoryCard from './components/MyStoryCard'
import FeedSelectModal from './components/StoryMakeModal'

function MyStoryPage() {
  const [isOpenFeedModal, setOpenFeedModal] = useState(false)
  const [stories, setStories] = useState<Story[]>([])
  const { data } = useMyStories()
  const { content } = data || {}
  const queryClient = useQueryClient()
  const router = useRouter()

  /**
   * 전체 스토리 카드 리스트
   */
  useEffect(() => {
    let res: Story[] = []

    if (content) {
      content.forEach((page) => {
        res = res.concat((page) || [])
      })
    }

    setStories((prevItems) => [...prevItems, ...res])
  }, [content])

  const { mutate: submitStory, isLoading } = useMutation<boolean, AxiosError, string>(
    (data) => (postStory(data)),
    {
      onSuccess: () => {
        setStories([])
        queryClient.refetchQueries([KEYS.MY_STORIES()])
        toastSuccess('스토리를 생성 했습니다.')
      },
    },
  )

  const { mutate: deleteUserStory } = useMutation<boolean, AxiosError, string>(
    (id: string) => (deleteStory(id)),
    {
      onSuccess: () => {
        setStories([])
        toastSuccess('스토리를 삭제 했습니다.')
        queryClient.refetchQueries([KEYS.MY_STORIES()])
      },
    },
  )

  const handleMakeStoryClick = useCallback(() => {
    setOpenFeedModal(true)
  }, [])

  const handleStoryClick = useCallback((id: string, isEmpty?: boolean) => {
    if (!id) {
      throw new Error('스토리 아이디가 없습니다.')
    }

    if (isEmpty) {
      router.push(`story/${id}`)
    }
  }, [router])

  const handleMakeStory = useCallback((storyName: string) => {
    setOpenFeedModal(false)

    submitStory(storyName)
  }, [submitStory])

  const handleMakeStoryCancel = useCallback(() => {
    setOpenFeedModal(false)
  }, [])

  const handleStoryDelete = useCallback((id: string) => {
    deleteUserStory(id)
  }, [deleteUserStory])

  return (
    <FrameLayout
      title="내 스토리"
      descriptionTooltipMessages={['스토리에 피드를 추가해 보세요.']}
      titleTooltipMessage="스토리 생성하기"
      menuId={MENU_ID.MY_STORIES}
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
        {(stories || []).map((item: Story) => {
          const { title, _id } = item || {}

          return (
            <MyStoryCard
              key={_id}
              id={_id}
              title={title}
              onDelete={handleStoryDelete}
              onClick={handleStoryClick}
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
