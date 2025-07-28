const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'development', // Change to development for better debugging
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: '@bank-portal/ui-kit',
    libraryTarget: 'umd',
    globalObject: 'this',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      'react-native': 'react-native-web', // Fixed the syntax error
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: false,
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
    'react-native': {
      root: 'ReactNative',
      commonjs2: 'react-native-web',
      commonjs: 'react-native-web',
      amd: 'react-native-web',
    },
  },
};