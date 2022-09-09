const ESLintPlugin = require('eslint-webpack-plugin')
const path = require('path')

module.exports = {
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
  trailingSlash: true,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/[[...section]]' },
      '/documentation/': { page: '/[[...section]]' },
      '/features/': { page: '/[[...section]]' },
      '/usage/': { page: '/[[...section]]' },
      '/methods/': { page: '/[[...section]]' }
    }
  }
}
