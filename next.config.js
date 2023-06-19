/** @type {import('next').NextConfig} */
const { merge } = require('webpack-merge')
const webpackCommonConfig = require('./webpack.common.config')

module.exports = {
  webpack: (config) => {
    return merge(config, webpackCommonConfig) // webpack 공통 설정 Merge
  },
  compiler: {
    emotion: {
      autoLabel: 'never',
    },
  },
  // reactStrictMode: true,
}
