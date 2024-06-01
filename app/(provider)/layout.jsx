export const dynamic = 'force-dynamic'
export default async function providerLayout({
  children // will be a page or nested layout
}) {
  return (
    <div
      className='container mt-[30px] flex w-full flex-col items-center justify-center bg-secondary/20 px-4'
      id='providerlayout'
    >
      {children}
    </div>
  )
}
