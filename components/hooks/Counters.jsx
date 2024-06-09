'use client'

import UrlContext from '@/more/context/providerServiceContext'
import { useContext, useEffect } from 'react'

function Counters({ records, pages }) {
  const { updateRecordCount, updatePageCount } = useContext(UrlContext)
  useEffect(() => {
    updateRecordCount(records)
    updatePageCount(pages)
  }, [records, pages])

  return
}
export default Counters
