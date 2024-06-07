import {
  Avatar as Image,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'

export function Avatar({
  src,
  alt,
  fallBack = 'KN',
  role,
  size = 10,
  ...props
}) {
  return (
    <Image className={`m-2  border-2 border-secondary  size-${size}`}>
      <AvatarImage src={src} alt={alt} className={`size-${size}`} {...props} />
      <AvatarFallback>{fallBack.substring(0, 2).toUpperCase()}</AvatarFallback>
    </Image>
  )
}
//
