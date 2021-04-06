const HTMLWeebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env, options) => {
  return {
    entry: path.resolve(__dirname, 'src/ui/index.tsx'),
    module: {
      rules: [
        { test: /\.tsx?$/, loader: 'ts-loader' }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      // alias: { 
      //   "@/icons": path.resolve(__dirname, "src/components/icons/"),
      //   "@/images": path.resolve(__dirname, "src/components/images/"),
      //   "@/layout": path.resolve(__dirname, "src/components/layout/")
      // }
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new HTMLWeebPackPlugin({
        template: path.resolve(__dirname, 'src/ui/index.html'),
        filename: './index.html'
      })
    ]
  }
};