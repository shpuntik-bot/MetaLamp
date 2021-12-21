const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
    //    /** ����� ��������� ������ �� localhost:8080 � ���� �����*/
        contentBase: './dist',
    },
    //watch: true,
    plugins: [
	new HtmlWebpackPlugin({ 
		template: './index.html'
		}),
	new MiniCssExtractPlugin(),
	new CleanWebpackPlugin()
	],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            /** Babel **/
            {
		test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', { targets: "defaults" }]
						]
					}
				}
                //test: /\.m?js$/,
                //exclude: /(node_modules|bower_components)/,
                //use: {
                //    loader: 'babel-loader',
                //    options: {
                //        presets: ['@babel/preset-env']
                //    }
                //}
                // npm install babel-loader @babel/core @babel/preset-env -D
            },
            /** CSS */
            //{
            //    test: /\.css$/i,
            //    use: ['style-loader', 'css-loader'],
            //    // npm i style-loader css-loader -D
            //},
            /** SCSS/SAAS */
            {
		test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
				/*test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: "css-loader"
				})*/
				/*exclude: /node_modules/,
				use: [
					'style-loader',
					'css-loader'
				]*/
                //test: /\.s[ac]ss$/i,
                //use: [
                //    // Creates `style` nodes from JS strings
                //    "style-loader",
                //    // Translates CSS into CommonJS
                //    "css-loader",
                //    // Compiles Sass to CSS
                //    "sass-loader",
                //],
                // npm i style-loader css-loader sass sass-loader -D
            },
            /** �������� */
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
								//use: [{
								//		loader: 'file-loader',
								//		option: {
								//		name: './img/${filename('[ext]')}'
								//						}
								//		}]
                type: 'asset/resource',
            },
            /** ������ */
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            /** ����� CSV */
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
                // npm i csv-loader -D
            },
            /** ����� XML */
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
                // npm i xml-loader -D 
            },
//html loader ����� ��� ���������
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ],
    },
};