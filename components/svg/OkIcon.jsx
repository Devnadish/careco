import React from 'react'

export function OkIcon(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 48 48'
      {...props}
    >
      <circle cx={24} cy={24} r={21} fill='#4caf50'></circle>
      <path
        fill='#ccff90'
        d='M34.6 14.6L21 28.2l-5.6-5.6l-2.8 2.8l8.4 8.4l16.4-16.4z'
      ></path>
    </svg>
  )
}
