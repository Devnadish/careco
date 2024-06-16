import UnderConsraction from '@/components/UnderConsraction'
import React from 'react'

function page({ params }) {
  return (
    <div>
      <UnderConsraction pageName={'صفحة  الاستشارات'}>
        {params.userid}
      </UnderConsraction>
    </div>
  )
}

export default page
