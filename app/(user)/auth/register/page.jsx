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
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('upload_preset', 'carecoUserAvatar')
      formData.append('cloud_name', 'dhyh7aufp')

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dhyh7aufp/image/upload',
        {
          method: 'POST',
          body: formData
        }
      )
        .then(response => response.json())
        .then(data => {
          console.log(data)
          return data.public_id
        })
        .catch(error => {
          console.error(error)
        })
      console.log(response)
      return response
    }
  }

  const handleNewUser = async formData => {
    const imageURL = await handleUpload()
    console.log(imageURL)

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      image: imageURL
    }
    console.log(data)
    const NewUser = await newUser(data)
    if (NewUser.code === 400) {
      return Notify(NewUser.msg, 'error', 'خلل')
    }

    if (NewUser.code === 401) {
      return Notify(NewUser.msg, 'error', 'غير مسموح')
    }

    // if (NewUser.code === 200) {
    //   setOpenRegister(true)
    //   return Notify(NewUser.msg, 'info', 'مرحبا')
    // }
  }

  // NEXT_PUBLIC_CLOUDINARY_IMAGE_URL >>> this the .end url imae to show the image
  return (
    <div className='flex h-full max-w-sm flex-col items-start justify-start gap-2 rounded-lg border border-border p-4   '>
      <form
        action={handleNewUser}
        className='flex w-full flex-col items-center justify-center gap-4 '
      >
        <UploadUserImage
          handleUpload={handleUpload}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
        />
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
      </form>

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

const UploadUserImage = ({
  onUpload,
  handleUpload,
  selectedFile,
  setSelectedFile,

  previewImage,
  setPreviewImage
}) => {
  const handleFileChange = event => {
    const file = event.target.files[0]
    setSelectedFile(file)
    setPreviewImage(URL.createObjectURL(file))
  }

  const handleCircularDivClick = () => {
    document.getElementById('fileInput').click()
  }

  return (
    <>
      <div
        className='relative flex size-20 cursor-pointer items-center justify-center  rounded-full '
        style={{
          backgroundImage: `url(${previewImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        onClick={handleCircularDivClick}
      >
        {!previewImage && (
          <>
            <AvatarPlaceHolder className='size-20 text-secondary' />
            <div className='absolute bottom-0 left-2 z-50  flex size-6 items-center justify-center rounded-full bg-secondary   outline outline-background '>
              <span className='text-[16px]'>+</span>
            </div>
          </>
        )}

        <input
          id='fileInput'
          type='file'
          accept='image/*'
          className='hidden'
          onChange={handleFileChange}
        />
      </div>
      {/* <button
        className='mt-2 rounded bg-blue-500 px-4 py-2 text-white'
        onClick={handleUpload}
        type='button'
      >
        Upload
      </button> */}
    </>
  )
}
