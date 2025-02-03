export default {
    mode: 'production',
    entry: {
        svgifier: './src/svgifier.js'
    },
    output: {
        filename: '[name].umd.min.js',
        library: {
            type: 'umd'
        }
    },
    optimization: {
        minimize: true
    }
}
