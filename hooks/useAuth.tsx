import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function useAuth(redirectPath = '/login') {
  const { data: session, status } = useSession()
  const router = useRouter()
  const isLoading = status === 'loading'

  useEffect(() => {
    if (!isLoading && !session) {
    //  router.push(redirectPath)
    }
  }, [isLoading, session, router, redirectPath])

  return { session, isLoading }
}
