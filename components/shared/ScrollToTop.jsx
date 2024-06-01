'use client'
import { ChevronUp } from 'more/lib/icons'
import { useState, useEffect } from 'react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`z-100 fixed bottom-16 right-5  rounded-full bg-yellow-300 px-2 py-2 text-black ${isVisible ? 'block' : 'hidden'}`}
    >
      <ChevronUp />
    </button>
  )
}

export default ScrollToTop
