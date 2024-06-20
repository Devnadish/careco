import React from 'react'

export function MenuDot(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 16 16'
      {...props}
    >
      <g
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
      >
        <circle cx={8} cy={2.5} r={0.75}></circle>
        <circle cx={8} cy={8} r={0.75}></circle>
        <circle cx={8} cy={13.5} r={0.75}></circle>
      </g>
    </svg>
  )
}
