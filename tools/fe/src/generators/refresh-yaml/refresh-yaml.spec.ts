import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { refreshYamlGenerator } from './refresh-yaml';
import { RefreshYamlGeneratorSchema } from './schema';

describe('refresh-yaml generator', () => {
  let tree: Tree;
  const options: RefreshYamlGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await refreshYamlGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
