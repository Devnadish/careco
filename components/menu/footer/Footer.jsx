'use client'
import React from 'react'
import GoHome from '../../shared/GoHome'
import DropMenu from '../../shared/DropMenu'
import { BotMessageSquare, HeartHandshake } from '@/more/lib/icons'
import CarToSelect from '@/app/_pagecomp/home/CarToSelect'
import NewMail from '@/app/_pagecomp/admin/mailsystem/NewMail'
import { Separator } from '../../ui/separator'
import Text from '../../shared/Text'
import { Button } from '../../ui/button'
import ClearCarFilter from '../../svg/ClearCarFilter'
import FavCar from '../../svg/FavCar'
import { MyCar } from '../../svg/MyCar'
import { usePathname, useSearchParams } from 'next/navigation'
import { useMediaQuery } from '@react-hook/media-query'
import { InboxIcon } from '../../svg/InboxIcon'
// TODO: Read data from db

import { SliderMenu } from './SliderMenu'
import ServiceFooter from './ServiceFooter'
import SelectCar from './SelectCar'

const Footer = ({ session, newMails }) => {
  return (
    <footer
      className='fixed bottom-0 z-50 flex h-14 w-full items-center justify-between bg-background px-5 '
      id='footer'
    >
      {/* <SliderMenu /> */}
      <ServiceFooter />
      <SelectCar />
    </footer>
  )
}

export default Footer
