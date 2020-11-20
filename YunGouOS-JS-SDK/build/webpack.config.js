const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

process.env.NODE_ENV = process.env.NODE_ENV || 'production'
module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist/'),
    libraryTarget: 'umd',
    library:'yungouos-pay-sdk'
  },
  module: {
    rules: [
        {
            test:/\.js$/,
            loader:'babel-loader',
            exclude:/node_modules/,
            options:{
                presets:[[
                    '@babel/preset-env',
                    {
                        useBuiltIns:'usage',
                        corejs:{
                            version: 3
                        },
                        targets:{
                            chrome:'58',
                            ie:'9'
                        }
                    }
                ]]
            }
        }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: 'package.json',
          to: path.resolve(__dirname, '../dist/')
        },
        {
          from: 'README.md',
          to: path.resolve(__dirname, '../dist/')
        }
      ]
    })
  ],
  devtool: false,
  //target: 'node'
}
