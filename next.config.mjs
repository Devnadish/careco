/** @type {import('next').NextConfig} */
import nextMDX from '@next/mdx'
import withPlaiceholder from '@plaiceholder/next'

import remarkFrontmatter from 'remark-frontmatter'
import rehypeHighlight from 'rehype-highlight'

const withMDX = nextMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkFrontmatter],
    rehypePlugins: [rehypeHighlight]
  }
})

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

export default withMDX({
  ...nextConfig,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
})
// export default withPlaiceholder(nextConfig)
