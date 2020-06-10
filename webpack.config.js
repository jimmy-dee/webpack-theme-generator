const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const themeKeys = [
  'black',
  'blue',
  'gray',
  'green',
  'purple',
  'red',
  'yellow'
];

const entries = themeKeys.reduce((obj, key) => {
  obj[`${key}-theme`] = `./styles/all.scss?key=${key}`;

  return obj;
}, {});

module.exports = {
  entry: {
    ...entries,
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              prependData: (loaderContext) => {
                const searchParams = new URLSearchParams(loaderContext.resourceQuery);

                if (searchParams.has('key')) {
                  return `$key: ${searchParams.get('key')};`;
                }
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};