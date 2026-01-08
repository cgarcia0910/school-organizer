import { Tree, updateJson } from '@nx/devkit';
import { libraryGenerator } from '@nx/js';
import { EntityGeneratorSchema } from '../schema';

export async function generateEntityLib(tree: Tree,
    options: EntityGeneratorSchema) {
    console.log('Generating entity library...');
      await libraryGenerator(tree, {
        name: `generated-server-${options.name}`,
        bundler: 'tsc',
        unitTestRunner: 'jest',
        directory: `libs/backend/generated-server-${options.name}`,
        linter: 'none'
      });
      // 👉 Actualizar tsconfig.lib.json
      updateJson(tree, `libs/backend/generated-server-${options.name}/tsconfig.lib.json`, (json) => {
        json.compilerOptions ??= {};
        json.compilerOptions.experimentalDecorators = true;
        json.compilerOptions.emitDecoratorMetadata = true;
        json.compilerOptions.noUnusedLocals = false;
        json.compilerOptions.noUnusedParameters = false;
        json.compilerOptions.isolatedModules = false;
        return json;
      });
      console.log('Entity library generated successfully');
      const barrelContent = tree.read(`libs/backend/generated-server-${options.name}/src/index.ts`, 'utf-8')
      tree.write(`libs/backend/generated-server-${options.name}/src/index.ts`, barrelContent?.trimEnd() 
        + '\n' + `export * from './controllers'`
        + '\n' + `export * from './models'`
        + '\n' + `export * from './api'`
        + '\n' + `export * from './api.module'`
        + '\n'
      )
}