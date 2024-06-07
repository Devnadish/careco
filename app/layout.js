import ThemeProvider from 'more/provider/ThemeProvider'
import './globals.css'
import { Tajwal, Cairo, Noto } from 'more/lib/fonts'
import { Toaster } from '@/components/ui/sonner'
import UrlProvider from 'more/context/serviceProvider'
import { getServerSession } from 'next-auth'
import AuthProvider from 'more/provider/authentication/AuthProvider'
import { options } from 'more/provider/authentication/options'
import { checkMails } from '@/app/_pagecomp/admin/mailsystem/db/inbox'
import NavBar from '@/components/menu/NavBar'
import Footer from '@/components/menu/Footer'
// import Footer from '@/components/menu/Footer'
export const dynamic = 'force-dynamic'
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(options)
  const newMails = await checkMails(session?.user?.email)

  return (
    <html lang='en' dir='rtl' suppressHydrationWarning>
      <body
        className={`${Tajwal.variable} ${Cairo.variable} ${Noto.variable}  container flex   w-full  flex-col   items-center justify-center  bg-background text-foreground  `}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          // enableSystem
          // defaultTheme='system'
          // enableSystem
          // disableTransitionOnChange
        >
          <UrlProvider>
            <AuthProvider session={session}>
              <NavBar session={session} newMails={newMails} />
              <main
                className=' mt-12 flex    w-full grow flex-col items-center justify-center text-foreground'
                id='mainlayout'
              >
                {children}
              </main>
              <Footer session={session} newMails={newMails} />
            </AuthProvider>
          </UrlProvider>
          <Toaster richColors position='top-center' closeButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
