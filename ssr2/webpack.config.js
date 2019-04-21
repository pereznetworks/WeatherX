const dev = process.env.NODE_ENV !== "production";
const path = require( "path" );


// plugins for compiling js/jsx/react components
const { BundleAnalyzerPlugin } = require( "webpack-bundle-analyzer" );
const FriendlyErrorsWebpackPlugin = require( "friendly-errors-webpack-plugin" );

// plugins for compiling scss/css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// an array of plugins
const plugins = [
          new FriendlyErrorsWebpackPlugin(),
          new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
          }),
      ];


// what to do if production mode
if ( !dev ) {
    plugins.push( new BundleAnalyzerPlugin( {
        analyzerMode: "static",
        reportFilename: "webpack-report.html",
        openAnalyzer: false,
    } ) );
}

module.exports = {
      mode: dev ? "development" : "production",
      context: path.join( __dirname, "src" ),
      devtool: dev ? "none" : "source-map",
      entry: {
          app: "./client.js",
      },
      resolve: {
          modules: [
              path.resolve( "./src" ),
              "node_modules",
          ],
      },
      module: {
          rules: [
              {
                  test: /\.jsx?$/,
                  exclude: /(node_modules|bower_components)/,
                  loader: "babel-loader",
              },
              {
                  test: /\.(css|scss)?$/,
                  use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: "css-loader"},
                    {loader: "sass-loader"},
                  ],
              },{
                  test: /\.(png|svg|jpg|gif)$/,
                  use: [
                    {loader:'file-loader'}
                  ],
              },
              {
                  test: /\.(eot|ttf|woff|woff2|otf)$/,
                  use: [
                    {loader:'file-loader'}
                  ],
              },
          ],
      },
      output: {
          path: path.resolve( __dirname, "dist" ),
          filename: "[name].bundle.js",
      },
      plugins,
    };


  // MiniCssExtractPlugin Options
  // similar to the same options in webpackOptions.output
  // both options are optional
  // filename: "[name].css",
  // chunkFilename: "[id].css"

  // {
  //     name: 'styles',
  //     mode: dev ? "development" : "production",
  //     context: path.join( __dirname, "src" ),
  //     devtool: dev ? "none" : "source-map",
  //     entry: {
  //         styles: "./app/assets/main.scss",
  //     },
  //     resolve: {
  //         modules: [
  //             path.resolve( "./src" ),
  //             "node_modules",
  //         ],
  //     },
  //     module: {
  //         rules: [
  //             {
  //               test: /\.scss?$/,
  //               use: [
  //                 {loader: MiniCssExtractPlugin.loader},
  //                 {loader: "css-loader"},
  //                 {loader: "sass-loader"},
  //               ],
  //             },
  //             {
  //                 test: /\.(eot|ttf|woff|woff2|png|svg|jpg|gif)$/,
  //                 use: [
  //                   {loader:'file-loader'}
  //                 ],
  //             },
  //         ],
  //     },
  //     output: {
  //         path: path.resolve( __dirname, "dist" ),
  //         filename: "[name].bundle.css",
  //     },
  //     plugins: [
  //       new MiniCssExtractPlugin(
  //         {
  //           path: path.resolve( __dirname, "dist" ),
  //           filename: dev ? '[name].css' : '[name].[hash].css',
  //           chunkFilename: dev? '[id].css' : '[id].[hash].css',
  //         }
  //       )
  //     ],
  //   }
