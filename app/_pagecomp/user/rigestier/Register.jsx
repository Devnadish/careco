'use client'
import React, { useState } from 'react'
import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import { RegisterOutline } from '@/components/svg/Register'
import SideBox from '@/components/shared/SideBox'
import InputWithIcon from '@/components/shared/InputWithIcon'
import { Check, Lock, Mail, User } from 'more/lib/icons'

import Submit from '@/components/shared/Submit'
import { newUser } from '@/app/_pagecomp/user/db/user'
import { Notify } from 'more/lib/nadish'
import { Important } from '@/components/svg/Important'
import DialogBox from '@/components/shared/DialogBox'
import ActivationForm from './ActivationForm'
import ImageUploader from '@/components/shared/image/ImageUploader'
import UploadCloudinary from '@/components/shared/image/UploadCloudinary'
import {
  UploadAvatar,
  UploadToCloudnary,
  getSignature,
  uploadImagex
} from 'more/db/imageDb'

export function Register() {
  const [openRegister, setOpenRegister] = useState(false)

  return (
    <div className='flex w-full flex-col items-center gap-4'>
      {/* <Text fontFamily={'tajwal'} fontSize={'medium'}>
        سجل في المنصة واحصل علي هدايا وخصومات
      </Text> */}
      <div className='flex w-[80%]  items-center justify-around gap-4 self-start'>
        <Button
          variant='outline'
          className='flex w-full items-center gap-4'
          onClick={() => {
            setOpenRegister(true)
          }}
        >
          <RegisterOutline className='size-6' />
          <Text fontFamily={'tajwal'} fontSize={'medium'}>
            تسجيل
          </Text>
        </Button>
      </div>
      <SideBox open={openRegister} setOpen={setOpenRegister}>
        <RegisterForm />
      </SideBox>
    </div>
  )
}

export const RegisterForm = () => {
  const [register, setOpenRegister] = useState(false)
  const [profileImage, setProfileImage] = useState([])

  const upload = async () => {
    const imageId = await UploadAvatar(profileImage[0])
  }

  async function UploadAvatar(file) {
    // carfirendUserAvatar
    const { timestamp, signature } = await getSignature('nextUsrAvatar')
    const formData = new FormData()
    formData.append('file', file)
    formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
    formData.append('signature', signature)
    formData.append('timestamp', timestamp)
    formData.append('folder', 'nextUserAvatar')
    const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL
    const data = await fetch(endpoint, {
      method: 'POST',
      body: formData
    }).then(res => res.json())

    // write to database using server actions for each file
    const imageId = await UploadToCloudnary({
      version: data?.version,
      signature: data?.signature,
      public_id: data?.public_id
    })
    //  }
  }

  const handleNewUser = async formData => {
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      image: '/carlogo/chevrolet-logo.svg'
      // image: imageId
    }
    const NewUser = await newUser(data)
    if (NewUser.code === 400) {
      return Notify(NewUser.msg, 'error', 'خلل')
    }

    if (NewUser.code === 401) {
      return Notify(NewUser.msg, 'error', 'غير مسموح')
    }

    if (NewUser.code === 200) {
      setOpenRegister(true)
      return Notify(NewUser.msg, 'info', 'مرحبا')
    }
  }

  return (
    <div className='mt-6   flex max-w-xs flex-col items-center gap-2   '>
      <form
        action={handleNewUser}
        className='flex w-full flex-col items-center justify-center gap-4 '
      >
        <div className='flex  items-center justify-center '>
          <UploadCloudinary
            name={'image'}
            files={profileImage}
            setFiles={setProfileImage}
          />
          <Button
            type='button'
            onClick={() => {
              upload()
            }}
          ></Button>
          {/* <ImageUploader
            files={profileImage}
            setFiles={setProfileImage}
            title='صورة الملف'
          /> */}
        </div>
        <InputWithIcon
          placeholder='الاسم'
          name='name'
          icon={<User strokeWidth={1} />}
        />
        <InputWithIcon
          placeholder='الايميل'
          name='email'
          icon={<Mail strokeWidth={1} />}
        />
        <InputWithIcon
          placeholder='كلمة السر'
          name='password'
          icon={<Lock strokeWidth={1} />}
        />

        {/* <InputWithIcon
          placeholder='الصورة'
          name='image'
          icon={<Image strokeWidth={1} />}
        /> */}
        <Submit
          title='تسجيل'
          icon={<Check className='text-primary' />}
          w='w-full'
          color='bg-secondary'
        />
      </form>

      <div className='flex w-full flex-col gap-4 rounded-md border-2 border-blue-700 bg-blue-900 p-3 shadow-md'>
        <div className='flex items-start justify-start gap-2'>
          <Important className='size-6 text-yellow-400' />

          <Text fontFamily={'tajwal'} fontSize={'xs'}>
            بعد التسجيل سيتم ارسال كود علي الايميل سجله في المكان المخصص
          </Text>
        </div>
        <div className='flex items-start justify-start gap-2'>
          <Important className='size-6' />
          <Text fontFamily={'tajwal'} fontSize={'xs'}>
            بعد التسجيل اذهب للملف الشخصي واستكمال البيانات المتبقية للاسفادة
            القصوى من المنصة
          </Text>
        </div>
      </div>

      {/* <div className='relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md border p-4'>
        <OTPDisgits />
        <div
          // data-register={register}
          className='absolute  left-0 top-0 flex h-full w-full animate-pulse items-center  justify-center bg-primary opacity-30 data-[register=true]:hidden'
        >
          <Lock size={100} />
        </div>
      </div> */}
      <DialogBox open={register} setOpen={setOpenRegister}>
        <ActivationForm />
      </DialogBox>
    </div>
  )
}
