import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'

import FeedPage from '@/feature/feed/FeedPage'

const pageInitialized = async ({ query, req }: GetServerSidePropsContext) => {
  const sessions = await getSession({ req })
  const { user } = sessions || {}
  const { id } = query

  if (!id || !user) {
    return {
      redirect: { permanent: false, destination: '/home' },
    }
  }

  return {
    props: {
      query,
    },
  }
}

export const getServerSideProps = pageInitialized
export default FeedPage
