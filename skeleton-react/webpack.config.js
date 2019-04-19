// Webpack
var path = require("path");
var webpack = require("webpack");

// Plugins
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var BrowserSyncPlugin = require("browser-sync-webpack-plugin");

// Postcss Config
require("./postcss.config.js");

const env =
  process.env.NODE_ENV == "development" ? "development" : "production";
const envBoolean = process.env.NODE_ENV == "development" ? true : false;

/* ------------------------------------------------------ */
// COMMON

const config = {
  mode: env,
  entry: {
    bundle: "./src/index.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "js/[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.(scss|sass|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader", "sass-loader"]
        })
      },
      {
        test: /\.html$/,
        use: "html-loader"
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/"
            }
          },
          "img-loader" // Calling img loader
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }
        ]
      },
      {
        test: /\.(mov|mp4)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]-[hash].[ext]",
              outputPath: "videos/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]), // Cleaning 'dist' folder
    new ExtractTextPlugin({
      // Extracting css to production
      filename: "css/style.[chunkhash].css",
      disable: envBoolean
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html" // Duplicating and injecting script tags for our output files
    })
  ]
};

/* ------------------------------------------------------ */
// DEVELOPMENT

if (process.env.NODE_ENV == "development") {
  config.plugins.push(
    new BrowserSyncPlugin(
      {
        host: "localhost",
        port: 3000,
        proxy: "http://localhost:8080/"
      },
      {
        reload: false // Reload browsersync on all devices
      }
    ),
    new webpack.NamedModulesPlugin(), // Make it easier to see which dependencies are being patched
    new webpack.HotModuleReplacementPlugin() // HMR plugin
  );

  config.devtool = "source-map";

  config.devServer = {
    historyApiFallback: true,
    contentBase: "./dist", // Which root-folder devServer should serve
    watchContentBase: true,
    hot: true,
    stats: {
      assets: false,
      hash: false,
      modules: false,
      publicPath: false,
      entrypoints: false,
      version: false,
      warnings: true,
      colors: true,
      children: false,
      chunks: false,
      chunkOrigins: false
    }
  };
}

/* ------------------------------------------------------ */
// PRODUCTION

if (process.env.NODE_ENV == "production") {
  config.output.filename = "js/[name].[hash].js"; // Chuckhash depending of the content in the file. same content = same name
}

module.exports = config;
