import { GetServerSidePropsContext } from 'next'

import HomePage from '@/feature/home/HomePage'

const pageInitialized = async ({ query }: GetServerSidePropsContext) => {
  return {
    props: {
      query,
    },
  }
}

export const getServerSideProps = pageInitialized

export default HomePage
