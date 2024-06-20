import Image from 'next/image'
import { Dot } from './more/lib/icons'

export function useMDXComponents(components) {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className='rounded-md border border-primary  bg-primary/30 p-2  text-center font-cairo  text-2xl text-primary'>
        {children}
      </h1>
    ),
    h3: ({ children }) => (
      <h3 className='border-b-2 border-primary  bg-foreground/70  p-1  text-center font-cairo  text-2xl text-foreground '>
        {children}
      </h3>
    ),

    h4: ({ children }) => (
      <h4 className='flex  items-center  justify-center gap-3  rounded-lg bg-primary/30 px-2 text-center font-cairo text-xl text-foreground '>
        <Dot className='size-8' />
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className='mr-10 flex items-center justify-start      text-center font-cairo text-lg text-foreground '>
        {/* <div className='w-[130px]' /> */}
        <Dot className='size-8' />

        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h5 className='mr-10 inline-flex items-center  justify-start rounded-lg  bg-secondary p-2 font-noto text-lg text-foreground shadow-sm '>
        {children}
      </h5>
    ),
    p: ({ children }) => (
      <p className='  font-noto text-lg leading-6 text-foreground '>
        {children}
      </p>
    ),
    img: props => (
      <Image
        width={200}
        height={200}
        sizes='100vw'
        className='h-auto w-full'
        {...props}
      />
    ),
    ...components
  }
}
