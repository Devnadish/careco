import NextAuth from 'next-auth'
import { options } from 'more/provider/authentication/options'

const handler = NextAuth(options)
export { handler as GET, handler as POST }

// import NextAuth from 'next-auth/next'
// import CredentialsProvider from 'next-auth/credentials'
// import bcrypt from 'bcrypt'

// import GitHubProvider from 'next-auth/providers/github'
// import { PrismaAdapter } from '@auth/prisma-adapter'
// // import AppleProvider from 'next-auth/providers/apple'
// // import FacebookProvider from 'next-auth/providers/facebook'
// // import GoogleProvider from 'next-auth/providers/google'
// // import EmailProvider from 'next-auth/providers/email'

// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID ?? '',
//       clientSecret: process.env.GITHUB_SECRET ?? ''
//     })

//     // AppleProvider({
//     //   clientId: process.env.APPLE_ID,
//     //   clientSecret: process.env.APPLE_SECRET
//     // }),
//     // FacebookProvider({
//     //   clientId: process.env.FACEBOOK_ID,
//     //   clientSecret: process.env.FACEBOOK_SECRET
//     // }),
//     // GoogleProvider({
//     //   clientId: process.env.GOOGLE_ID,
//     //   clientSecret: process.env.GOOGLE_SECRET
//     // })
//   ]
// }

// export const handler = NextAuth(authOptions)
// export { handler as GET, handler as POST }
