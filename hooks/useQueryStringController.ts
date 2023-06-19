import { useRouter } from 'next/router'
import { useCallback } from 'react'

function useQueryStringController() {
  const router = useRouter()

  const replace = useCallback(async (query: any) => {
    const baseUrl = `${window.location.origin}${window.location.pathname}`

    await router.replace({
      pathname: baseUrl,
      query,
    })
    router.query = query
  }, [router])

  const updateQuery = useCallback(async (updateValue: any, removeName?: any) => {
    const { query } = router
    const currentQuery = { ...query }

    if (removeName) {
      if (typeof removeName === 'object') {
        removeName.forEach((key: any) => delete currentQuery[key])
      } else {
        delete currentQuery[removeName]
      }
    }

    const newQuery = {
      ...currentQuery,
      ...updateValue,
    }

    replace(newQuery)
  }, [router, replace])

  const removeQuery = useCallback(async (name: string | string[]) => {
    const { query } = router

    if (typeof name === 'object') {
      const { ...newQuery } = query

      name.forEach((key: string) => delete newQuery[key])

      await replace(newQuery)
    } else {
      const { [name]: removeValue, ...newQuery } = query

      await replace(newQuery)
    }
  }, [router, replace])

  return {
    updateQuery,
    removeQuery,
  }
}

export default useQueryStringController
