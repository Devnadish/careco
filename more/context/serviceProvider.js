'use client'
import React, { useState } from 'react'
import UrlContext from './providerServiceContext'

export const UrlProvider = ({ children }) => {
  const [recordCounter, setRecordCounter] = useState(null) // Use an empty string as initial value
  const [pageCount, setPageCount] = useState(null) // Use an empty string as initial value

  const updateRecordCount = count => {
    setRecordCounter(count)
  }

  const updatePageCount = count => {
    setPageCount(count)
  }

  return (
    <UrlContext.Provider
      value={{ recordCounter, updateRecordCount, pageCount, updatePageCount }}
    >
      {children}
    </UrlContext.Provider>
  )
}
export default UrlProvider
