import Image from 'next/image'

import { cn } from '@/more/lib/utils'
import { getImage } from '@/more/lib/imgPlaceholder'
// import { getImage } from '@/lib/getImage'

export default async function Image64({ url, alt, containerClass }) {
  const { base64, img } = await getImage(url)

  return (
    <div className={cn('relative', containerClass)}>
      <Image
        {...img}
        alt={alt || ''}
        placeholder='blur'
        blurDataURL={base64}
        className='rounded-lg object-cover '
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      />
    </div>
  )
}
