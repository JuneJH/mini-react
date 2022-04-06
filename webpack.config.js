const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
    // entry: "./src/index.ts",
    entry: "./src/testTsx.js",



    plugins: [
        new HtmlWebpackPlugin({ template: "./public/index.html" }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            // {
            //     test: /.ts$/,
            //     loader: "ts-loader"
            // },
            // {
            //     test: /\.tsx?$/,
            //     use: [
            //         {
            //             loader: 'babel-loader',
            //             options: {
            //                 presets: [
            //                     '@babel/preset-env',
            //                     [
            //                         '@babel/preset-react',
            //                         // { pragma: 'createElement' },
            //                     ],
            //                 ],
            //             },
            //         },
            //         { loader: 'ts-loader' },
                   
            //     ],
            // },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            [
                                '@babel/plugin-transform-react-jsx',
                                { pragma: 'createElement' },  //将React.createElement改成createElement
                            ],
                        ],
                    },
                },
            },
        ]
    },
    resolve: {
        extensions: [".ts", ".js", ".tsx"]
    },
    mode: "development"
}