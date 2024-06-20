import GoHome, { GoBack } from '@/components/shared/GoHome'

export const dynamic = 'force-dynamic'
export default async function providerLayout({
  children // will be a page or nested layout
}) {
  return (
    <div
      className='container mt-[30px] flex w-full flex-col items-center justify-center bg-secondary/20 px-4'
      id='providerlayout'
    >
      <div className='mb-8 flex w-full flex-col items-center justify-center'>
        <GoHome />
      </div>
      <div
        dir='rtl'
        className='mb-16 flex w-full  flex-col  items-start gap-4 font-noto '
      >
        {children}
      </div>
    </div>
  )
}
