const webpack = require('webpack');
const path = require('path');
const autoprefixer = require("autoprefixer");
const config = require("./config");

process.env.NODE_ENV = config.env;

let settings = [{
  name: "app",
  entry: [
    './src/app/index'
  ],
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'app.js'
  },
  module: {
    rules: [
      { test: /\.js?$/, 
        use: ["babel-loader"], 
        exclude: /node_modules/,
        },
      { test: /\.sass$/, 
        use: [
          'style-loader',
          {loader:'css-loader',
            options:{
              minimize: true
            }
          },
          'postcss-loader',
          'sass-loader'
        ], 
        exclude: /node_modules/ 
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000 /* file smaller than 10kB would be transformed into base64 */
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js','.sass', ".jsx"]
  },
  devServer: {
    port: process.env.PORT || 8080,
    host: "localhost",
    contentBase: "./public",
    historyApiFallback: true,
    hot: true,
    inline: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM:'react-dom'
    })
  ]
}];


if(process.env.NODE_ENV != 'production'){
  settings.forEach(function(settings){
    settings.entry = settings.entry.concat([
      'eventsource-polyfill',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
    ]);
    settings.plugins = settings.plugins.concat([    
      new webpack.NoErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]);
  });
}else{
  settings.push(Object.assign({},settings[0],{
    name: "resetPassword",
    entry: [
      './src/resetPassword/index'
    ],
    output: {
      path: path.join(__dirname, '/public'),
      filename: 'resetPassword.js'
    }
  }));
}


module.exports = settings;