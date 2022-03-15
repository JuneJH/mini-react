const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
    entry:"./src/index.ts",



    plugins:[
        new HtmlWebpackPlugin({template:"./public/index.html"}),
        new CleanWebpackPlugin()
    ],
    module:{
        rules:[{
            test:/.ts$/,
            loader:"ts-loader"
        }]
    },
    resolve:{
        extensions:[".ts",".js"]
    },
    mode:"development"
}