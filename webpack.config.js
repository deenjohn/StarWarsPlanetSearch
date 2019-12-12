const webpack = require('webpack');
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry : {
       main: "./src/index.js" ,
    },
    output: {
      filename :"[name].js", //code-splitting
      path : path.resolve(__dirname ,"dist")
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
            }
          },
 //https://medium.com/a-beginners-guide-for-webpack-2/webpack-loaders-css-and-sass-2cc0079b5b3a
          {
            test:/\.css$/,
            use:['style-loader','css-loader']
        }
        ]
      },
      optimization: {
        splitChunks: {
            chunks : "all" ,
            "name": "commons", //generate commons.bundle.js
            //split so not to fetch heavy nodemodules everytime code changes
        }
    },
//https://stackoverflow.com/questions/39798095/multiple-html-files-using-webpack
    plugins: [ ],
 //without devServer,server won't go to correct folder and take index.html 
      devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000
      }
}

