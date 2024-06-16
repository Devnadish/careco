import Image from 'next/image'

export function useMDXComponents(components) {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className='rounded-md border border-primary  bg-primary/30 p-2  text-center font-cairo  text-2xl text-primary'>
        {children}
      </h1>
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
