const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
require('dotenv').config();

// Get the host IP for network access
const HOST_IP = process.env.HOST_IP || 'localhost';
console.log('process.env',process.env);


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
    allowedHosts: 'all', // Important for network access
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
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        // Use network IP instead of localhost
        accountOverview: `accountOverview@http://192.168.31.185:3001/remoteEntry.js`,
        transactionDetails: `transactionDetails@http://192.168.31.185:3002/remoteEntry.js`,
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