'use client'
import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import ClassNames from 'embla-carousel-class-names'
import Image from 'next/image'
import './empla.css'
import DialogBox from '@/components/shared/DialogBox'
import { SectionTitle } from '@/components/shared/SectionTitle'

const ImageSlider = props => {
  const OPTIONS = {}
  const { images } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [ClassNames()])
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)
  const [showImage, setShowImage] = useState(false)
  const [imgUrl, setImgUrl] = useState('')
  const handleShowImage = url => {
    setImgUrl(url)
    setShowImage(true)
  }

  if (images.length === 0) {
    return (
      <div className='flex w-full flex-col gap-4 lg:flex-row'>
        <p>No Image</p>
      </div>
    )
  }

  return (
    <section className='flex w-full flex-col items-center justify-center border-b  border-r border-primary bg-secondary  p-2 py-4'>
      <SectionTitle title={'صورنا'} />
      <div
        className='embla w-full rounded-lg rounded-tr-none bg-secondary/50 p-2'
        dir='LTR'
      >
        <div className='embla__viewport' ref={emblaRef}>
          <div className='embla__container'>
            {images.map((image, index) => (
              <div
                className='embla__slide embla__class-names max-w-sm'
                key={index}
                onClick={() => handleShowImage(image.image)}
              >
                <Image
                  src={image.image} // Handle missing logo
                  alt={image.image}
                  width={1300}
                  height={100}
                  className='embla__slide__img rounded-lg'
                />
              </div>
            ))}
          </div>
        </div>

        <div className='embla__controls'>
          <div className='embla__buttons'>
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>

          <div className='embla__dots'>
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={'embla__dot'.concat(
                  index === selectedIndex ? ' embla__dot--selected' : ''
                )}
              />
            ))}
          </div>
        </div>

        <DialogBox open={showImage} setOpen={setShowImage}>
          <ShowImage url={imgUrl} />
        </DialogBox>
      </div>
    </section>
  )
}

export default ImageSlider

export const usePrevNextButtons = (emblaApi, onButtonClick) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onSelect = useCallback(emblaApi => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}

export const PrevButton = props => {
  const { children, ...restProps } = props

  return (
    <button
      className='embla__button embla__button--prev'
      type='button'
      {...restProps}
    >
      <svg className='embla__button__svg' viewBox='0 0 532 532'>
        <path
          fill='currentColor'
          d='M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z'
        />
      </svg>
      {children}
    </button>
  )
}

export const NextButton = props => {
  const { children, ...restProps } = props

  return (
    <button
      className='embla__button embla__button--next'
      type='button'
      {...restProps}
    >
      <svg className='embla__button__svg' viewBox='0 0 532 532'>
        <path
          fill='currentColor'
          d='M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z'
        />
      </svg>
      {children}
    </button>
  )
}

// import React, { useCallback, useEffect, useState } from 'react'

export const useDotButton = (emblaApi, onButtonClick) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const onDotButtonClick = useCallback(
    index => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
      if (onButtonClick) onButtonClick(emblaApi)
    },
    [emblaApi, onButtonClick]
  )

  const onInit = useCallback(emblaApi => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback(emblaApi => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick
  }
}

export const DotButton = props => {
  const { children, ...restProps } = props

  return (
    <button type='button' {...restProps}>
      {children}
    </button>
  )
}

const ShowImage = ({ url }) => {
  return (
    <>
      <Image
        src={url} // Handle missing logo
        alt={url}
        width={1300}
        height={100}
        className='embla__slide__img rounded-lg p-2'
      />
    </>
  )
}
