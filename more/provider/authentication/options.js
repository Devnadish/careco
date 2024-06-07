import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import db from 'more/lib/prisma'
import bcrypt from 'bcrypt'
import { Notify } from '@/lib/nadish'

export const options = {
  // adapter: PrismaAdapter(db),
  providers: [
    GitHubProvider({
      profile(profile) {
        let userRole = 'GitHub User'
        if (profile?.email == 'devnadish@gmail.com') {
          userRole = 'owner'
        }

        return {
          ...profile,
          role: userRole,
          image: profile?.avatar_url
        }
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_Secret
    }),

    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials
        const user = await db.user.findFirst({
          where: {
            email: email
          }
        })

        const isCorrectPassword = await bcrypt.compare(password, user.password)

        if (!user) {
          // User not found (email might be wrong)
          throw new Error('Invalid email or password')
        }
        if (user) {
          // User not found (email might be wrong)
          return user
        } else {
          Notify('خطا في البيانات', 'error')
        }

        if (email === user.email && password === user?.password) {
          return user
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') return { ...token, ...session.user }

      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          pageId: user.pageId,
          isVerified: user.isVerified
        }
      }
      return token
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          pageId: token.pageId,
          isVerified: token.isVerified
        }
      }
    },

    async signIn({ user, account, profile }) {
      // Optional: Customize user data before saving
      const newUser = { ...user, providerAccountId: account.id }

      return true
    }
  },
  session: {
    strategy: 'jwt'
    // maxAge: 1 * 24 * 60 * 60
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  pages: {
    // signIn: '/auth/signin',
    signOut: '/auth/login',
    error: '/auth/error'
  }
}
