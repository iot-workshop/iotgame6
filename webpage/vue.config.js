const API_URL = {
    production: JSON.stringify('https://workshop-functions6.azurewebsites.net'),
    development: JSON.stringify('https://localhost:8081')
};


// check environment mode
const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';
module.exports = {
    publicPath: '/iotgame6/',
    devServer: {
        port: 8081,
        https: true,
        proxy: {
            '^/api': {
                'target': 'https://workshop-functions6.azurewebsites.net',
                'ws': true,
                'changeOrigin': true
            }
        }
    },
    "chainWebpack": (config) => {
        config.plugin('define').tap((definitions) => {
            definitions[0]['API_URL'] = API_URL[environment];
            return definitions;
        });
    }
}
