import styled from '@emotion/styled'
import { Button, Loader } from '@TMOBI-WEB/ads-ui'
import { useState } from 'react'

function LoginPage() {
  const [isLoading] = useState(false)

  return (
    <LoginLayout>
      {isLoading ? <Loader open /> : (
        <Main>
          <Button
            fullWidth
            onClick={() => {}}
          >
            로그인
          </Button>
        </Main>
      )}

    </LoginLayout>
  )
}

export default LoginPage

const LoginLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Main = styled.main`
  margin: 320px auto;
  width: ${({ theme }) => theme.width.narrow};

  @media screen and (max-width: ${({ theme }) => theme.mediaQuery.laptop}) {
    margin: auto;
  }
`
