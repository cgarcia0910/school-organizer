const isProd = process.env['NODE_ENV'] === 'production';

const config: ModuleFederationConfig = {
  name: 'shell',

  remotes: isProd
    ? [
        ['config', 'https://config.onrender.com'],
        ['planning', 'https://planning.onrender.com'],
      ]
    : ['config', 'planning'],

  shared: (libraryName, defaultConfig) => {
    if (libraryName === '@ngneat/transloco') {
      return {
        singleton: true,
        strictVersion: true,
        requiredVersion: 'auto'
      };
    }
    return defaultConfig;
  }
};

export default config;
