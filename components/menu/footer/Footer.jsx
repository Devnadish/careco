'use client'
import React from 'react'
// TODO: Read data from db

import ServiceFooter from './ServiceFooter'
import SelectCar from './SelectCar'

const Footer = ({ session, newMails }) => {
  return (
    <footer
      className='fixed bottom-0 z-50 flex h-14 w-full items-center justify-between bg-background px-5 '
      id='footer'
    >
      {/* <SliderMenu /> */}
      <ServiceFooter userId={session?.user?.id} />
      <SelectCar />
    </footer>
  )
}

export default Footer
