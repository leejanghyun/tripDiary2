import { GetServerSidePropsContext } from 'next'

import { FeedListPage } from '@/feature/feedList'

const pageInitialized = async ({ query }: GetServerSidePropsContext) => {
  return {
    props: {
      query,
    },
  }
}

export const getServerSideProps = pageInitialized
export default FeedListPage
