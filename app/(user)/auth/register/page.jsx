'use client'
import React, { useState } from 'react'
import Text from '@/components/shared/Text'
import InputWithIcon from '@/components/shared/InputWithIcon'
import { Check, Lock, Mail, User } from 'more/lib/icons'
import Submit from '@/components/shared/Submit'
import { newUser } from '@/app/_pagecomp/user/db/user'
import { Notify } from 'more/lib/nadish'
import { Important } from '@/components/svg/Important'
import { AvatarPlaceHolder } from '@/components/svg/AvatarPlaceHolder'

const RegisterForm = () => {
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
    <div className='flex h-full max-w-sm flex-col items-start justify-start gap-2 rounded-lg border border-border p-4   '>
      <UploadUserImage />
      {/* <form
        action={handleNewUser}
        className='flex w-full flex-col items-center justify-center gap-4 '
      >
        

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
        <Submit
          title='تسجيل'
          icon={<Check className='text-primary' />}
          w='w-full'
          color='bg-secondary'
        />
      </form> */}

      <RegisterNote />
    </div>
  )
}

export default RegisterForm
// <OTPDisgits />
// <ActivationForm />

function RegisterNote() {
  return (
    <div className='flex w-full flex-col gap-4 rounded-md border  border-border  p-3 text-primary-foreground shadow-md'>
      <div className='flex items-start justify-start gap-2'>
        <Important className='size-6 text-yellow-400' />
        <Text fontFamily={'tajwal'} fontSize={'xs'}>
          بعد التسجيل سيتم ارسال كود علي الايميل سجله في المكان المخصص
        </Text>
      </div>
      <div className='flex items-start justify-start gap-2'>
        <Important className='size-6 text-yellow-400' />
        <Text fontFamily={'tajwal'} fontSize={'xs'}>
          بعد التسجيل اذهب للملف الشخصي واستكمال البيانات المتبقية للاسفادة
          القصوى من المنصة
        </Text>
      </div>
    </div>
  )
}
const AvatarImage = () => {
  return (
    <div
      className='relative flex size-20 items-center justify-center rounded-full  '
      onClick={() => {
        alert('sd')
      }}
    >
      <AvatarPlaceHolder className='size-20 text-secondary' />
      <div className='absolute bottom-0 left-2 z-50  flex size-6 items-center justify-center rounded-full bg-secondary   outline outline-background '>
        <span className='text-[16px]'>+</span>
      </div>
    </div>
  )
}

const UploadUserImage = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = event => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('upload_preset', 'carecoUserAvatar')
      formData.append('cloud_name', 'dhyh7aufp')

      // const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL
      // NEXT_PUBLIC_CLOUDINARY_URL

      //  fetch('https://api.cloudinary.com/v1_1/your-cloud-name/image/upload', {
      fetch('https://api.cloudinary.com/v1_1/dhyh7aufp/image/upload', {
        method: 'POST',
        body: formData
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          const imageUrl = data.secure_url
          console.log(imageUrl)
          onUpload(imageUrl)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  return (
    <div>
      <input type='file' accept='image/*' onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}
