import {
  generateFiles, readJson, runTasksInSerial, Tree,
  updateJson,
  writeJson
} from '@nx/devkit';
import * as path from 'path';
import { EntityGeneratorSchema } from './schema';
import { libraryGenerator } from '@nx/js';
import { execSync } from 'child_process';
import { flushChanges } from 'nx/src/generators/tree';
import { generateEntityLib } from './steps/generate-entity-lib';
import { generateYamlFile } from './steps/generate-yaml';
import { generateModuleFile } from './steps/generate-module-file';
import { generateServiceFile } from './steps/generate-service-file';
import { generateEntityFile } from './steps/generate-entity-file';
import { generateEntityApiService } from './steps/generate-entity-api-service';
import { addApiImportsToNestModule } from './steps/add-api-to-module';

export async function entityGenerator(
  tree: Tree,
  options: EntityGeneratorSchema
) {
  await generateEntityLib(tree, options)
  generateYamlFile(tree, options)
  generateModuleFile(tree, options)
  generateServiceFile(tree, options)
  generateEntityFile(tree, options)
  generateEntityApiService(tree, options)
  addApiImportsToNestModule(tree, 'apps/backend/src/app/app.module.ts', options.name)
}

export default entityGenerator;
