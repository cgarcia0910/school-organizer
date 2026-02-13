import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'config',
  exposes: {
    './Routes':
      'apps/frontend/config/config/src/app/remote-entry/entry.routes.ts',
  },
  shared: (libraryName, defaultConfig) => {
    if (libraryName === '@ngneat/transloco') {
      return {
        singleton: true,
        strictVersion: false,
        requiredVersion: 'auto'
      };
    }
    return defaultConfig;
  }
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
