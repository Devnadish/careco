import React from 'react'

const Spinner = () => {
  return (
    <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
      <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-200'></div>
    </div>
  )
}

export default Spinner

export const SubSpinner = () => {
  return (
    // <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
    <div className='size-6 animate-spin rounded-full border-b-2 border-t-2 border-gray-200'></div>
    // </div>
  )
}
