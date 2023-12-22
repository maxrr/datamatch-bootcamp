export default {
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
            "os": require.resolve("os-browserify"),
            "crypto": require.resolve("crypto-browserify"),
        }
    }
}