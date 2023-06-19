import { MessageBox } from '@TMOBI-WEB/ads-ui'
import { useRouter } from 'next/router'
import {
  useCallback,
  useEffect, useRef, useState,
} from 'react'
import { FieldValues, FormState } from 'react-hook-form'

type DialogMessage = {
  title: string
  description: string
  cancelText?: string
  confirmText?: string
}

type LeaveConfirmDialogProps<T extends FieldValues> = {
  enabled?: boolean
  formState?: FormState<T>
  messages: DialogMessage
  isFinish: boolean
  finishFallbackUrl: string
}

export const enum State {
  BACK = 'back',
  PAGE_MOVE = 'pageMove',
  RELOAD = 'reload',
  NONE = 'none',
}

function LeaveConfirmDialog<T extends FieldValues>({
  enabled = true,
  formState,
  messages,
  isFinish,
  finishFallbackUrl,
}: LeaveConfirmDialogProps<T>) {
  const [isShowDialog, setShowDialog] = useState(false)
  const [isAllowRouteMove, setAllowRouteMove] = useState(false)
  const router = useRouter()
  const [state, setState] = useState<State>(State.NONE)
  const [moveUrl, setMoveUrl] = useState('')
  const clickedState = useRef<State>(State.NONE)

  /**
   * 완료시 라우터 이동
   */
  useEffect(() => {
    if (isFinish) {
      router.push(finishFallbackUrl)
    }
  }, [isFinish, router, finishFallbackUrl])

  const handlePageMove = useCallback(() => {
    if (enabled && !isFinish) {
      setShowDialog(true)
    }
  }, [enabled, setShowDialog, isFinish])

  /**
   * reload 버튼 입력시 호출
   */
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''

      setMoveUrl(window.location.pathname)
      setState(State.RELOAD)
    }

    if (enabled) { // block 이동
      window.addEventListener('beforeunload', handleBeforeUnload)
    } else { // move page
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [enabled, handlePageMove])

  /**
   * 페이지 이동시 호출
   */
  useEffect(() => {
    const handleBeforeChangeRoute = (url: string) => {
      if (clickedState.current === State.BACK) {
        return
      }

      clickedState.current = State.PAGE_MOVE
      if (isAllowRouteMove) {
        return
      }
      setMoveUrl(url)
      setState(State.PAGE_MOVE)
      handlePageMove()

      /** route Block */
      router.events.emit('routeChangeError')
      /* eslint no-throw-literal: "off" */
      /* eslint @typescript-eslint/no-throw-literal: "off" */
      throw ''
    }

    if (enabled && !isFinish) { // block
      router.events.on('routeChangeStart', handleBeforeChangeRoute)
    } else { // move page
      router.events.off('routeChangeStart', handleBeforeChangeRoute)
    }

    return () => {
      router.events.off('routeChangeStart', handleBeforeChangeRoute)
    }
  }, [router, enabled, isAllowRouteMove, handlePageMove, isFinish])

  /**
   * Back 버튼 입력 시
   */
  useEffect(() => {
    router.beforePopState(({ as }) => {
      clickedState.current = State.BACK

      if (as === router.asPath || (formState && !formState.isDirty)) {
        return true
      }

      if (!enabled) {
        return true
      }

      setMoveUrl(as)
      setState(State.BACK)
      handlePageMove()
      window.history.forward()
      return false
    })

    return () => router.beforePopState(() => true)
  }, [enabled, router, formState, handlePageMove])

  const {
    title, description, cancelText = '계속 추가', confirmText = '이동',
  } = messages || {}

  return (
    <MessageBox
      open={isShowDialog}
      title={title}
      description={description}
      cancelText={cancelText}
      confirmText={confirmText}
      onConfirm={useCallback(() => {
        if (state === State.BACK) {
          setAllowRouteMove(true)
          router.push(moveUrl)
        } else if (state === State.PAGE_MOVE) {
          setAllowRouteMove(true)
          router.push(moveUrl)
        }
      }, [router, moveUrl, state])}
      onCancel={useCallback(() => {
        clickedState.current = State.NONE
        setShowDialog(false)
      }, [])}
    />
  )
}

export default LeaveConfirmDialog
