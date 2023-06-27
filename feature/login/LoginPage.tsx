import styled from '@emotion/styled'
import { COLOR, Loader } from '@TMOBI-WEB/ads-ui'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { useCallback, useEffect } from 'react'

function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const isLoading = status === 'loading'

  const handleGoogleLogin = useCallback(() => {
    signIn('google')
  }, [])

  const handleKakaoLogin = useCallback(() => {
    signIn('kakao')
  }, [])

  const handleNaverLogin = useCallback(() => {
    signIn('naver')
  }, [])

  useEffect(() => {
    if (!session) {
      return
    }

    router.push('/home')
  }, [router, session])

  return (
    <LoginLayout>
      {isLoading ? <Loader open /> : (
        <Main>
          <Logo>
            Trip Diary
          </Logo>
          <SNSLogin>
            <Image
              src="/images/ico_google.png"
              alt=""
              width={40}
              height={40}
              onClick={handleGoogleLogin}
            />
            <Image
              src="/images/ico_kakao.png"
              alt=""
              width={40}
              height={40}
              onClick={handleKakaoLogin}
            />
            <Image
              src="/images/ico_naver.png"
              alt=""
              width={40}
              height={40}
              onClick={handleNaverLogin}
            />
          </SNSLogin>
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
  display: flex;
  flex-direction: column;
  width: ${({ theme }) => theme.width.narrow};
  margin: auto;

  @media screen and (max-width: ${({ theme }) => theme.mediaQuery.laptop}) {
    margin: auto;
  }
`

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color:  ${COLOR.primary.color.tmobi.blue[500]};
  padding-top: 25px;
  height: 150px;
  font-size: ${({ theme }) => theme.font[24].size};
  line-height: ${({ theme }) => theme.font[24].lineHeight};
  font-weight: 500;
`

const SNSLogin = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 70px;
  padding-top: 25px;
`
