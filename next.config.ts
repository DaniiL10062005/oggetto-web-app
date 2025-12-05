import type { NextConfig } from 'next'
import { Env } from './src/shared/config/env'


const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: Env.API_URL.replace('https://', ''),
      //   pathname: '/kyc/avatar/**',
      // },
      // {
      //   protocol: 'https',
      //   hostname: Env.API_URL.replace('https://', ''),
      //   pathname: '/images/**',
      // },
    ],
  },
}

export default nextConfig
