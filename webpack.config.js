const path = require('path');
const fs = require('fs');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildPath = path.join(__dirname, '/build');

module.exports = (_, options) => {
  const prod = options.mode === 'production';

  if (!fs.existsSync(buildPath)) {
    fs.mkdirSync(buildPath, {
      recursive: true,
    });
  }

  return {
    entry: path.join(__dirname, '/src/index'),
    output: {
      path: buildPath,
      filename: 'bundle.js',
      publicPath: prod ? './' : '/',
    },
    target: 'web',
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        components: path.join(__dirname, '/src/components'),
        styles: path.join(__dirname, '/src/styles'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /main.scss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  path: './postcss.config.js',
                },
              },
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /main.scss$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[local]_[hash:base64:5]',
                },
              },
            },

            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  path: './postcss.config.js',
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name].[ext]',
                esModule: false,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [new CssMinimizerPlugin()],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, './src/index.html'),
        inject: true,
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],
    devServer: {
      historyApiFallback: true,
      port: 9000,
      proxy: {},
    },
  };
};
