import React from 'react'

export function SortDesc(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='currentColor'
        d='M9 11V3H7.314L5 3.62v2.329l2-.539V11zm13-3l-4-5l-4 5h3v13h2V8zM8 16.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2m2.573.544a3 3 0 1 0-3.121 1.406L5.979 21h2.31z'
      ></path>
    </svg>
  )
}

export function SortAsc(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='currentColor'
        d='M9 3v8H7V5.41l-2 .539v-2.33L7.313 3zm10 0v13h3l-4 5l-4-5h3V3zm-8 12.5a2.99 2.99 0 0 1-.427 1.544L8.289 21h-2.31l1.473-2.55A3.001 3.001 0 1 1 11 15.5m-3 1a1 1 0 1 0 0-2a1 1 0 0 0 0 2'
      ></path>
    </svg>
  )
}
