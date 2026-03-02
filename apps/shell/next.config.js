const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@company/ui'],
  webpack(config, options) {
    const location = options.isServer ? 'ssr' : 'chunks';

    config.plugins.push(
      new NextFederationPlugin({
        name: 'shell',
        remotes: {
          mf_auth: `mf_auth@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
          mf_dashboard: `mf_dashboard@http://localhost:3002/_next/static/${location}/remoteEntry.js`,
          mf_products: `mf_products@http://localhost:3003/_next/static/${location}/remoteEntry.js`
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          'react-dom': { singleton: true, requiredVersion: false },
          '@company/ui': { singleton: true, requiredVersion: '^1.0.0' }
        }
      })
    );

    return config;
  }
};
