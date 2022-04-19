const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //плагин для html страниц
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

//переменная для формирования названий файлов согласно типу сборки
const isDev = process.env.NODE_ENV === 'development';        //значение тру
const  isProd = !isDev;                                       //значение фальш
//определение для названий файлов исходя из того какой режим будем использовать
const namefile = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;  //
//--------------------------------------------------//
//-----функция для ввода оптимизации---//
const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	}

	if (isProd) {
		config.minimizer = [
			new OptimizeCssAssetWebpackPlugin(),
			new TerserWebpackPlugin()
		]
	}
	return config
};
//-------------------------------------------------//
module.exports = {                                            //
	context: path.resolve(__dirname, 'src'),                    //
	//entry: './index.js',                                        // входной файл - точка входа
	entry: {
		index: './index.js',
		main: './main.js',
		search: './search.js',
	},
	mode: 'development',                                        //
	devtool: 'inline-source-map',                             //
	//devtool: isDev ? 'source-map' : '',
	//devServer: {
		//    /** Будет запускать сервер на localhost:8080 в этой папке*/
		//contentBase: './dist',
	//},
	output: {
		filename: `./js/${namefile('js')}`,
		path: path.resolve(__dirname, 'dist'),
		//assetModuleFilename: 'images/[hash][ext][query]'
		//assetModuleFilename: `./img/${filename('jpg')}`
	},
	//-------------оптимизация-------------------//
	optimization: optimization(),
	//--------------плагины вэбпака--------------//
	plugins: [
		//new webpack.ProvidePlugin({
		//	$: 'jquery',
		//	jQuery: 'jquery',
		//}),
		new HtmlWebpackPlugin ({
			template: path.resolve(__dirname, './src/index.html'),              //шаблон страницы
			filename: 'index.html',                                             //название выходного файла
			favicon: path.resolve(__dirname, './src/img/icon/favicon.ico'),     //подключение иконки в название вкладки
			chunks: ['index', 'main'],                                          //подключаем точки входа
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HtmlWebpackPlugin ({
			template: path.resolve(__dirname, './src/registration.html'),
			filename: 'registration.html',
			favicon: path.resolve(__dirname, './src/img/icon/favicon.ico'),
			chunks: ['index'],
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new HtmlWebpackPlugin ({
			template: path.resolve(__dirname, './src/searchroom.html'),
			filename: 'searchroom.html',
			favicon: path.resolve(__dirname, './src/img/icon/favicon.ico'),           //подключение иконки в название вкладки
			chunks: ['index', 'search'],
			minify: {
				collapseWhitespace: isProd
			}
		}),
		//------------------------
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, './src/jquery-3.4.1.min.js'),
					to: path.resolve(__dirname, './dist')
				}
			]
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, './src/block/datepicker/datepicker.min.js'),
					to: path.resolve(__dirname, './dist/js')
				}
			]
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, './src/block/datepicker/datepicker.min.css'),
					to: path.resolve(__dirname, './dist/css')
				}
			]
		}),
		new MiniCssExtractPlugin({
			filename: `./css/${namefile('css')}`
		}),
		new CleanWebpackPlugin()
	],
	//-----------------------модули для загрузки-------------
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
							['@babel/preset-env']
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
			{
				test: /\.css$/,
				use:[
					{
						loader: MiniCssExtractPlugin.loader
					},
					//'style-loader',
					'css-loader']
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/,
				type: 'asset/resource',
				generator : {
					filename : 'img/[name][ext][query]',
				}
			},
			//{
			//	test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
			//	type: 'asset/resource',
			//	generator : {
			//		filename : 'img/[name][ext][query]',
			//	}
			//},

			//{
			//	test: /\.(png|jpe?g|gif)$/,
			//	loader: 'file-loader',
			//	options: {
			//		outputPath: 'img',
			//	},
			//},
			//{
			//	test: /\.(jpg|png|svg|gif|ico)$/,
			//	use: ['file-loader'],
			//	option: [{
			//		outputPath: 'img',
			//	}]
			//},
			//{
			//	test: /\.(ttf|eot|woff|woff2)$/,
			//	loader: 'file-loader',
			//	options: {
			//		outputPath: 'fonts',
			//	}
			//},
			//type: 'asset/inline',
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type: 'asset/resource',
				generator : {
					filename : 'fonts/[name][ext][query]',
				}
			},
		]
	}

};
