import {
  Tree
} from '@nx/devkit';
import { RefreshYamlGeneratorSchema } from './schema';
import { execSync } from 'child_process';

export async function refreshYamlGenerator(
  tree: Tree,
  options: RefreshYamlGeneratorSchema,
) {
  const apiPath = options.apiPath || 'libs/frontend/infrastructure/api';
  const importPath = `@organizer/${options.name}-api`;
  execSync(`openapi-generator-cli generate   -i apps/backend/api/${options.name}.yaml   -g typescript-angular   -o ${apiPath}/${options.name}-api/src/lib   --additional-properties=providedInRoot=true,stringEnums=true`, {
    stdio: 'inherit',
  });
}

export default refreshYamlGenerator;
