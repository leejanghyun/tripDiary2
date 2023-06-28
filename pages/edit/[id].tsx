import { GetServerSidePropsContext } from 'next'

import FeedPage from '@/feature/feed/FeedPage'

const pageInitialized = async ({ query }: GetServerSidePropsContext) => {
  return {
    props: {
      query,
    },
  }
}

export const getServerSideProps = (pageInitialized)
export default FeedPage
