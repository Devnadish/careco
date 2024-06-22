import Image from 'next/image'

export const InlineSpinner = () => {
  return (
    <div className='animate-spin-slow relative size-8 rounded-full  '>
      <Image
        src='/logo6spinner.svg'
        alt='careco'
        fill
        className='absolute inset-0'
        style={{ animation: 'spin 1.5s linear infinite' }}
      />
    </div>
  )
}
