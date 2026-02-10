import { withModuleFederation } from '@nx/module-federation/angular';
import { Configuration } from 'webpack';
import config from './module-federation.config';
import * as path from 'path';

/**
 * DTS Plugin is disabled in Nx Workspaces as Nx already provides Typing support for Module Federation
 * The DTS Plugin can be enabled by setting dts: true
 * Learn more about the DTS Plugin here: https://module-federation.io/configure/dts.html
 */
export default async function (webpackConfig: Configuration, options: any) {
  const mfConfig = await withModuleFederation(config, { dts: false });
  const finalConfig = await mfConfig(webpackConfig, options);

  // Add SCSS includePaths to sass-loader
  if (finalConfig.module && finalConfig.module.rules) {
    finalConfig.module.rules = finalConfig.module.rules.map((rule: any) => {
      if (rule.test && rule.test.toString().includes('scss')) {
        return {
          ...rule,
          use: rule.use?.map((loader: any) => {
            if (loader.loader?.includes('sass-loader')) {
              return {
                ...loader,
                options: {
                  ...loader.options,
                  sassOptions: {
                    ...loader.options?.sassOptions,
                    includePaths: [
                      path.resolve(__dirname, '../../../../libs/frontend/devkit/design-tokens')
                    ]
                  }
                }
              };
            }
            return loader;
          })
        };
      }
      return rule;
    });
  }

  return finalConfig;
}
