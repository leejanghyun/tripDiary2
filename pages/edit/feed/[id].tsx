import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'

import FeedPage from '@/feature/feed/FeedAddPage'

const pageInitialized = async ({ query, req }: GetServerSidePropsContext) => {
  const sessions = await getSession({ req })
  const { user } = sessions || {}
  const { email } = user || { email: 'jangheon.lee012@gmail.com' }
  const { id } = query

  if (!id || !email) {
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
