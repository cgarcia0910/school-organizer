import {
  Tree
} from '@nx/devkit';
import { RefreshYamlGeneratorSchema } from './schema';
import { execSync } from 'child_process';
import { flushChanges } from 'nx/src/generators/tree';

export async function refreshYamlGenerator(
  tree: Tree,
  options: RefreshYamlGeneratorSchema,
) {
  execSync(`openapi-generator-cli generate -g typescript-nestjs-server -i apps/backend/api/${options.name}.yaml -o libs/backend/generated-server-${options.name}/src --additional-properties=supportsES6=true`, {
    stdio: 'inherit',
  });
  const barrelContent = tree.read(`libs/backend/generated-server-${options.name}/src/index.ts`, 'utf-8')
      tree.write(`libs/backend/generated-server-${options.name}/src/index.ts`, barrelContent?.trimEnd() 
        + '\n' + `export * from './controllers'`
        + '\n' + `export * from './models'`
        + '\n' + `export * from './api'`
        + '\n' + `export * from './api.module'`
        + '\n'
      )
  console.log('Barrel file refreshed successfully');
  flushChanges(tree.root, tree.listChanges());
  console.log('Yaml file refreshed successfully');
}

export default refreshYamlGenerator;
