import React from 'react'
import CardSkelton from './_pagecomp/skelton/CardSkelton'

function loading() {
  return (
    // <div className='absolute top-20 flex w-full    flex-wrap items-center  justify-center  gap-4'>
    <div className='grid w-full   grid-cols-1  justify-items-center gap-4 p-4 md:grid-cols-2 lg:grid-cols-3'>
      <CardSkelton />
      <CardSkelton />
      <CardSkelton />
      <CardSkelton />
      <CardSkelton />
      <CardSkelton />
    </div>
  )
}

export default loading
