const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'mf_auth',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './AuthApp': './components/AuthWidget.tsx'
        },
        shared: {
          react: { singleton: true, requiredVersion: false, eager: false },
          'react-dom': { singleton: true, requiredVersion: false, eager: false }
        }
      })
    );

    return config;
  }
};
