const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@company/ui'],
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
          'react-dom': { singleton: true, requiredVersion: false, eager: false },
          '@company/ui': { singleton: true, requiredVersion: '^1.0.0', eager: false }
        }
      })
    );

    return config;
  }
};
