'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Notify } from 'more/lib/nadish'
const ImageUploader = ({
  onDrop,
  acceptedFiles = [],
  maxSize = 1024 * 1024,
  files,
  setFiles,
  maxImage = 1 //
}) => {
  const [selectedIamge, setselectedIamge] = useState([])
  const clearAll = () => {
    setFiles([])
    setselectedIamge([])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: acceptedFiles,
    maxSize,
    onDrop: acceptedFiles => {
      setselectedIamge(acceptedFiles)

      if (acceptedFiles.length > maxImage) {
        return Notify(
          `يُسمح بحد أقصى ${maxImage} من الصور`,
          'error',
          'غير مسموح'
        ) // Handle exceeding maxImage
      }
      setFiles(
        acceptedFiles.map(file =>
          Object.assign({}, file, { preview: URL.createObjectURL(file) })
        )
      )
      if (onDrop) onDrop(acceptedFiles) // Call the provided onDrop function
    }
  })

  return (
    <div className='mx-auto flex w-full flex-row  items-center justify-center  rounded-full border-[6px]  border-gray-300 shadow-lg   '>
      <div
        {...getRootProps({ className: `dropzone ${isDragActive && 'active'}` })}
        className='flex w-full flex-row items-center justify-between gap-2 md:flex-col   '
      >
        <div className='relative flex size-24 items-center justify-center rounded-full  border border-border '>
          {files[0]?.preview && (
            <Image
              src={`${files[0]?.preview}`}
              alt='sd'
              fill
              className='  rounded-full '
            />
          )}
        </div>

        <input {...getInputProps()} />
      </div>

      <div className='w-full'></div>
    </div>
  )
}

export default ImageUploader
