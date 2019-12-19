var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
              test: /\.jsx?$/,
              loader: 'babel-loader'
            }
        ]
    },

    // output: {
    //     path: __dirname,
    //     filename: '../src/main.js'
    // },

    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true,
       https: true,
       host: "https://ls-inv-mgt.herokuapp.com/",
       proxy: {
      '/internal': 'http://localhost:8084'
        }      
    },
    
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrlLogin: 'http://18.217.112.188:8084/warehouse_user',
            apiUrl: 'http://18.217.112.188:8084/api/v1/inventory'
        })
    }
}

