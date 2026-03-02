const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

module.exports = {
  reactStrictMode: true,
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'APP_NAME',
        filename: 'static/chunks/remoteEntry.js',
        exposes: EXPOSES,
        remotes: REMOTES,
        shared: {
          react: { singleton: true, requiredVersion: false },
          'react-dom': { singleton: true, requiredVersion: false }
        }
      })
    );

    return config;
  }
};
