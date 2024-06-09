'use client'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from '@/more/lib/icons'
import { getSignature, saveToDatabase } from '@/more/db/imageDb'
import { Button } from '@/components/ui/button'
import Submit from '../Submit'

const UploadCloudinary = ({ className, name, files, setFiles }) => {
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxSize: 5242880, // Set the maximum file size to 5MB (in bytes)
    maxFiles: 1, // Limit the number of files to 1
    onDrop
  })

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeAll = () => {
    setFiles([])
  }

  // async function action(formDescription) {
  //   for (const file of files) {
  //     // get a signature using server action for each file
  //     const { timestamp, signature } = await getSignature('next')

  //     // upload each file to cloudinary using the signature
  //     const formData = new FormData()

  //     formData.append('file', file)
  //     formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
  //     formData.append('signature', signature)
  //     formData.append('timestamp', timestamp)
  //     formData.append('folder', 'next')
  //     const description = formDescription.get('description')

  //     const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL
  //     const data = await fetch(endpoint, {
  //       method: 'POST',
  //       body: formData
  //     }).then(res => res.json())

  //     // write to database using server actions for each file
  //     await saveToDatabase({
  //       version: data?.version,
  //       signature: data?.signature,
  //       public_id: data?.public_id,
  //       carId: carId,
  //       cardId,
  //       description
  //     })
  //   }
  // }

  return (
    // <form action={action} className='flex flex-col   gap-4 rounded border p-2'>
    <div className='flex w-full flex-1 flex-col gap-4'>
      <div
        {...getRootProps({
          className: className
        })}
      >
        <input {...getInputProps({ name: 'file' })} name={name} />
        <div className='flex flex-col items-center justify-center gap-4'>
          <div className='relative flex size-24 items-center justify-center rounded-full  border border-border '>
            {files[0]?.preview && (
              <Image
                src={files[0]?.preview}
                alt={files[0]?.name}
                fill
                onLoad={() => {
                  URL.revokeObjectURL(files[0]?.preview)
                }}
                className='  rounded-full '
              />
            )}
          </div>
        </div>
      </div>
    </div>
    // </form>
  )
}
export default UploadCloudinary
