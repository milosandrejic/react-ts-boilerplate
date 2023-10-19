const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
    const isProduction = argv.mode === "production";

    return {
        mode: argv.mode,
        entry: {
            index: "./src/index.tsx",
        },
        output: {
            path: path.join(__dirname, "dist"),
            publicPath: "/",
            clean: true,
            filename: isProduction ? "[name].[contenthash].js" : "[name].js",
            chunkFilename: isProduction
                ? "static/[name].[contenthash:8].chunk.js"
                : "static/[name].chunk.js",
        },
        target: "web",
        devtool: isProduction ? false : "inline-source-map",
        devServer: {
            port: 3002,
            open: true,
            historyApiFallback: true,
            hot: true,
            liveReload: true
        },
        optimization: {
            splitChunks: {
                chunks: "all",
                maxInitialRequests: Infinity,
                minSize: 10000,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name (module) {
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                            return `npm.${packageName.replace("@", "")}`;
                        }
                    }
                }
            }
        },
        module: {
            rules: [
                {
                    test: /\.(js|tsx|ts)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
                {
                    test: /\.(png|svg|jpg)$/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 8192,
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "src/index.html",
            }),
            new Dotenv()
        ],
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
            modules: [
                path.resolve("src"),
                "node_modules",
            ],
            preferRelative: true,
        },
    };
};
