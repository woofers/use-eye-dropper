const ESLintPlugin = require('eslint-webpack-plugin')
const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  distDir: 'build',
  swcMinify: true,
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    path: 'https://example.com/myaccount/',
  },
  webpack(config, { isServer }) {
    config.plugins.push(new ESLintPlugin())
    config.module.rules.push({
      test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: {
                  removeViewBox: false
                }
              }
            }
          },
          'file-loader'
        ],
    })
    return config
  },
  basePath: '/use-eye-dropper',
  assetPrefix: '/use-eye-dropper/',
  trailingSlash: true
}
