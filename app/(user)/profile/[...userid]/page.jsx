import React from 'react'

function page({ params }) {
  const userid = params.userid[0]

  return <div>profile {params.userid}</div>
}

export default page
