'use client'
import React, { useState } from 'react'
import InputWithIcon from '@/components/shared/InputWithIcon'
import { Check, Lock, Mail, User } from 'more/lib/icons'
import Submit from '@/components/shared/Submit'
import { newUser } from '@/app/_pagecomp/user/db/user'
import { AvatarPlaceHolder } from '@/components/svg/AvatarPlaceHolder'
import { GoBack } from '@/components/shared/GoHome'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import {
  errorMessages,
  htmlmsg,
  successMessage
} from '@/app/_pagecomp/user/rigestier/registrationLogic'

const RegisterForm = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const router = useRouter()
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
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      image: imageURL
    }
    const NewUser = await newUser(data)

    if (NewUser.code === 200) {
      Swal.fire({
        icon: 'success',
        title: successMessage(data.name),
        html: htmlmsg(data.email, data.name)
      }).then(() => router.push('/auth/login'))
    } else if (NewUser.code in errorMessages) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: errorMessages[NewUser.code],
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'موافق'
      })
    }
  }
  return (
    <div className='flex h-full w-full  max-w-sm flex-col items-start justify-start gap-2 rounded-lg border border-border p-4   '>
      <GoBack
        url='/auth/login'
        className='flex w-1/2 items-center gap-2 self-end'
      />

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
          icon={<Check className='text-primary-foreground' />}
          className='w-1/2 bg-primary'
          color='bg-secondary'
        />
      </form>
    </div>
  )
}

export default RegisterForm

const UploadUserImage = ({
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
  )
}
