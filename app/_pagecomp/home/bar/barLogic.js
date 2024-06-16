import React, { useEffect, useState } from 'react'
import { multiUrlQuery } from '@/more/lib/nadish'
export const useStateHook = () => {
  const [url, setUrl] = useState({})
  const [providerTYPE, setProviderTYPE] = useState(null)
  const [department, setDepartment] = useState('')
  const [service, setService] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  return {
    url,
    setUrl,
    providerTYPE,
    setProviderTYPE,
    department,
    setDepartment,
    service,
    setService,
    data,
    setData,
    loading,
    setLoading
  }
}

export const handleRoute = (pathName, router, url, setOpen) => {
  const queryString = multiUrlQuery(url)
  const updatedUrl = `${pathName}${queryString ? `?${queryString}` : ''}`
  router.replace(updatedUrl, { scroll: true })
  setOpen(false)
}

export const removeRoute = (
  setUrl,
  setProviderTYPE,
  setDepartment,
  setService
) => {
  setUrl({})
  setProviderTYPE(null)
  setDepartment('')
  setService('')
}

// const [providerTYPE, setProviderTYPE] = useState(null)
// const [department, setDepartment] = useState()
// const [service, setService] = useState('')
// const [url, setUrl] = useState({ type: '', department: '', service: '' })
// const [data, setData] = useState([])
// const [loading, setLoading] = useState(false)
