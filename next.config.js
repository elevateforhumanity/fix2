/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Only process .js and .jsx files to avoid TypeScript compilation of src/
  pageExtensions: ['js', 'jsx'],
  typescript: {
    // Don't run type checking during build (project has separate TS setup)
    ignoreBuildErrors: true,
  },
}

export default nextConfig
