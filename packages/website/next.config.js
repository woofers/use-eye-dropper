/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  distDir: 'build',
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    path: 'https://example.com/myaccount/'
  },
  basePath: '/use-eye-dropper',
  assetPrefix: '/use-eye-dropper/',
  trailingSlash: true
}
