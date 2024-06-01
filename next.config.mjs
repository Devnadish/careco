/** @type {import('next').NextConfig} */
const nextConfig = {
  // logging:{
  //   fetches:{fullUrl:true}
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com' // if your website has no www, drop it
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com' // if your website has no www, drop it
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com'
      }, // if your website has no www, drop it},
      {
        protocol: 'http',
        hostname: 'localhost'
      }
    ]
  }
}

export default nextConfig
