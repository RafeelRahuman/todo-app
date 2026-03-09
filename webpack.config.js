import path from "node:path";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from "html-webpack-plugin";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

export default  {
    mode : "development",
    entry : "./src/index.js",
    output : {
        filename : "main.js",
        path :path.resolve(_dirname,"dist"),
        clean : true,
    },

    devtool : "eval-source-map",
    devServer : {
        static :"./dist",
        port : 8080,
        watchFiles : ["./src/template.html"],
    },

    module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },

    plugins : [
        new HtmlWebpackPlugin({
            template : "./src/template.html",
        }),
    ],
};  