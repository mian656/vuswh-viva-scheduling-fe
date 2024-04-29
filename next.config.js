/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig


module.exports = {
  env: {
    BE_BASE_URL: 'http://192.168.50.49:4002/',
    FE_BASE_URL: 'http://localhost:3000/',
  },
}