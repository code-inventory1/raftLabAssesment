const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const webpack = require('webpack');
const path = require('path');
require('dotenv').config();

// Get environment variables
const HOST_IP = process.env.HOST_IP || 'localhost';
const BACKEND_PORT = process.env.BACKEND_PORT || '4000';
const PROTOCOL = process.env.PROTOCOL || 'http';

// Build the GraphQL URL
const BACKEND_GRAPHQL_URL = `${PROTOCOL}://${HOST_IP}:${BACKEND_PORT}`;

console.log('🌐 Using HOST_IP:', HOST_IP);
console.log('🔗 Backend GraphQL URL:', `${BACKEND_GRAPHQL_URL}/graphql`);

module.exports = {
  entry: './src/index.web.tsx',
  mode: 'development',
  devServer: {
    port: 3000,
    host: '0.0.0.0',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    allowedHosts: 'all',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      'react-native': 'react-native-web',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            compilerOptions: {
              noEmit: false,
            },
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    // ✅ Define environment variables for browser
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.HOST_IP': JSON.stringify(HOST_IP),
      'process.env.BACKEND_PORT': JSON.stringify(BACKEND_PORT),
      'process.env.PROTOCOL': JSON.stringify(PROTOCOL),
      'process.env.BACKEND_GRAPHQL_URL': JSON.stringify(BACKEND_GRAPHQL_URL),
    }),
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        accountOverview: `accountOverview@${PROTOCOL}://${HOST_IP}:3001/remoteEntry.js`,
        transactionDetails: `transactionDetails@${PROTOCOL}://${HOST_IP}:3002/remoteEntry.js`,
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.2.0',
          eager: false,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.2.0',
          eager: false,
        },
        '@apollo/client': {
          singleton: true,
          eager: false,
        },
        '@bank-portal/ui-kit': {
          singleton: true,
          eager: false,
        },
        'react-native-web': {
          singleton: true,
          eager: false,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      title: 'Bank Portal - Host App',
    }),
  ],
  devtool: 'source-map',
};