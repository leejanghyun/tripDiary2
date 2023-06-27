import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import KakaoProvider from 'next-auth/providers/kakao'
import NaverProvider from 'next-auth/providers/naver'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET || '',
    }),
    NaverProvider({
      clientId: process.env.NEXT_PUBLIC_NAVER_AUTH_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_NAVER_AUTH_CLIENT_ID || '',
    }),
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_AUTH_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_AUTH_CLIENT_ID || '',
    }),
  ],
})
