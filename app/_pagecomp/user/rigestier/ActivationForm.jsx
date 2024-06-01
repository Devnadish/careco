import React, { useState } from 'react'
import { OTPDisgits } from './OTPDisgits'
import { Lock, Mail, Smile } from 'more/lib/icons'
import InputWithIcon from '@/components/shared/InputWithIcon'
import Submit from '@/components/shared/Submit'
import { activationsUser } from '@/app/_pagecomp/user/db/user'
import { Notify } from 'more/lib/nadish'
import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import DialogBox from '@/components/shared/DialogBox'
import { ThinkingIcon1 } from '@/components/svg/Thinking'
import { Verifyed } from '@/components/svg/Verifyed'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function ActivationForm() {
  const [openActivation, setOpenActivation] = useState(false)

  return (
    <>
      <Button
        variant='outline'
        className='fixed bottom-[50%] left-0 flex  animate-pulse  items-center bg-secondary hover:bg-primary'
        size='small'
        onClick={() => {
          setOpenActivation(true)
        }}
      >
        <Verifyed className='size-10' />
      </Button>

      <DialogBox open={openActivation} setOpen={setOpenActivation}>
        <CreateActivationForm />
      </DialogBox>
    </>
  )
}

export default ActivationForm

const CreateActivationForm = () => {
  const [value, setValue] = useState('')
  const handleActivation = async formData => {
    const data = {
      email: formData.get('email'),
      VerifiedToken: value
    }
    const result = await activationsUser(data)
    if (result.code === 200) {
      Notify(result.msg, 'success', 'مرحبا بك')
    }
    if (result.code === 401) {
      Notify(result.msg, 'error', 'الايميل')
    }
    if (result.code === 402) {
      Notify(result.msg, 'error', 'الرمز')
    }
  }
  const fireAlert = () => {
    // TODO: problem when close is called
    Swal.fire({
      title: 'اهمية تنشيط الحساب',
      icon: 'question',
      iconHtml: '؟',
      confirmButtonText: 'نعم',
      cancelButtonText: 'لا',
      showCloseButton: true,
      allowOutsideClick: false,
      returnFocus: true
    })
  }
  return (
    <div className='flex w-full max-w-xs flex-col items-center justify-center gap-4'>
      <div className='flex items-center gap-8'>
        <Lock size={25} />
        <Button variant='outline' onClick={() => fireAlert()} type='buttonss'>
          <ThinkingIcon1 className='size-6 opacity-40' />
        </Button>
      </div>
      <Text fontSize={'large'}>تنشيط الحساب</Text>
      <form
        action={handleActivation}
        className='flex w-full flex-col items-center justify-center gap-4 '
      >
        <InputWithIcon
          placeholder='الايميل'
          name='email'
          icon={<Mail strokeWidth={1} />}
        />
        <OTPDisgits value={value} setValue={setValue} />
        <Submit
          title={'تنشيط الحساب'}
          className='flex w-full max-w-[220px] items-center gap-4 bg-secondary'
          icon={<Smile />}
          color='bg-secondary'
          w='w-full'
        />
      </form>
    </div>
  )
}
