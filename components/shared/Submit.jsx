'use client'
import React, { useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import Spinner from './Spinner'
import { Notify } from 'more/lib/nadish'
import { cn } from 'more/lib/utils'
import { cva } from 'class-variance-authority'

const ButtonVariants = cva(
  'flex items-center  gap-1 text-primary-foreground bg-primary font-cairo',
  {
    variants: {
      position: {
        center: 'justify-center',
        end: 'justify-end',
        start: 'justify-start'
      }
    }
  }
)

function Submit({
  children,
  position,
  className,
  icon = <Send size={18} />,
  title = 'حفظ',
  isDisabled = false,
  notifyMsg,
  ...props
}) {
  const status = useFormStatus()
  const t = ButtonVariants()

  useEffect(() => {
    if (status.pending && notifyMsg) {
      Notify(notifyMsg, 'success', 'تم')
    }
  }, [status.pending])

  return (
    // <div className='flex w-full items-center justify-center'>
    <Button
      disabled={status.pending || isDisabled}
      className={cn(ButtonVariants({ position, className }))}
      type='submit'
    >
      {status.pending ? (
        <div className={`flex items-center justify-center gap-2`}>
          <span>جاري الحفظ..</span>
          <Spinner />
        </div>
      ) : (
        <div className='flex items-center justify-center gap-2'>
          <span>{title}</span>
          {icon}
        </div>
      )}
    </Button>
    // </div>
  )
}

export default Submit

// import { useFormStatus } from 'react-dom'
// import { Button } from '@/components/ui/button'
// import { Send } from 'lucide-react'
// import Spinner from './Spinner'
// import { Notify } from '@/lib/nadish'
// import { useEffect } from 'react'

// import { cn } from 'lib/utils'
// import { cva } from 'class-variance-authority'

// const ButtonVariants = cva(
//   'flex items-center  gap-1 text-primary-foreground  bg-primary font-cairo  ',
//   {
//     variants: {
//       postion: {
//         center: 'justify-center',
//         end: 'self-end',
//         start: 'self-start'
//       }
//     }
//   }
// )

// function Submit({
//   children,
//   postion,
//   className,
//   icon = <Send size={18} />,
//   title = 'حفظ',
//   isDisabled = false,
//   notifyMsg,
//   ...props
// }) {
//   const status = useFormStatus()

//   useEffect(() => {
//     if (status.pending && notifyMsg) {
//       Notify(notifyMsg, 'success', 'تم')
//     }
//   }, [status.pending])

//   return (
//     <div className='flex w-full items-center bg-red-200 '>
//       <Button
//         disabled={status.pending || isDisabled}
//         className={cn(ButtonVariants({ postion, className }))}
//         type='submit'
//       >
//         {status.pending ? (
//           <div
//             className={`flex items-center justify-center gap-2 ${textColor}`}
//           >
//             <span>جاري الحفظ..</span>
//             <Spinner />
//           </div>
//         ) : (
//           <div className='flex items-center justify-center gap-2 '>
//             <span>{title}</span>
//             {icon}
//           </div>
//         )}
//       </Button>
//     </div>
//   )
// }

// export default Submit
