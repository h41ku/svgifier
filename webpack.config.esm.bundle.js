export default {
    mode: 'production',
    experiments: {
        outputModule: true
    },
    entry: {
        svgifier: './src/svgifier.js'
    },
    output: {
        filename: '[name].esm.min.js',
        library: {
            type: 'module'
        }
    },
    optimization: {
        minimize: true
    }
}
