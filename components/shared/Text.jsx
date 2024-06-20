import React from 'react'
import { cn } from '@/more/lib/utils'
import { cva } from 'class-variance-authority'

const textVariants = cva(
  'flex items-center gap-1 text-wrap leading-3 text-foreground transition-colors font-noto text-foreground text-right leading-6',
  {
    variants: {
      fontSize: {
        default: 'text-xs',
        xs: 'text-[.7rem]',
        small: 'text-sm',
        large: 'text-lg',
        xl: 'text-xl',
        xl2: 'text-2xl',
        xl3: 'text-3xl'
      },
      fontFamily: {
        cairo: 'font-cairo',
        tajwal: 'font-tajwal',
        noto: 'font-noto'
      },
      opacity: {
        O100: 'opacity-100',
        O70: 'opacity-70',
        O40: 'opacity-40',
        O10: 'opacity-10'
      }
    }
  }
)

function Text({ children, fontSize, fontFamily, opacity, className }) {
  return (
    <div
      className={cn(textVariants({ fontSize, fontFamily, opacity, className }))}
    >
      {children}
    </div>
  )
}

export default Text
