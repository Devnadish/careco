/** @type {import('next').NextConfig} */
import withPlaiceholder from '@plaiceholder/next'
const nextConfig = {
  // logging:{
  //   fetches:{fullUrl:true}
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com'
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      }
    ]
  }
}

export default withPlaiceholder(nextConfig)
