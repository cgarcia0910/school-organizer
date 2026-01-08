import {
  Tree,
  formatFiles, applyChangesToString,
  ChangeType,
  StringChange
} from '@nx/devkit';
import { libraryGenerator } from '@nx/angular/generators';
import { FeApiGeneratorSchema } from './schema';
import { execSync } from 'child_process';
import { flushChanges } from 'nx/src/generators/tree';
import ts = require('typescript');



export async function feApiGenerator(
  tree: Tree,
  options: FeApiGeneratorSchema,
) {
  await libraryGenerator(tree, {
    name: `${options.name}-api`,
    directory: `libs/frontend/api/${options.name}-api`,
    importPath: `@organizer/${options.name}-api`,
  })
  // 2️⃣ Limpiar archivos generados
  tree.delete(`libs/frontend/api/${options.name}-api/src/index.ts`);
  
  tree.write(`libs/frontend/api/${options.name}-api/src/index.ts`, `export * from './lib';`);
  
  await formatFiles(tree);
  // 3️⃣ Ejecutar OpenAPI generator
  flushChanges(tree.root, tree.listChanges());
  execSync(`openapi-generator-cli generate   -i apps/backend/api/${options.name}.yaml   -g typescript-angular   -o libs/frontend/api/${options.name}-api/src/lib   --additional-properties=providedInRoot=true,stringEnums=true`, {
    stdio: 'inherit',
  });
  addImport(
    tree,
    'libs/frontend/api/api-config/src/lib/api.config.ts',
    `provideApi as provideApi${options.name.charAt(0).toUpperCase() + options.name.slice(1)}`,
    `@organizer/${options.name}-api`
  );
  addToArray(
    tree,
    'libs/frontend/api/api-config/src/lib/api.config.ts',
    'apiProviderConfig',
    `provideApi${options.name.charAt(0).toUpperCase() + options.name.slice(1)}('/api')`
  );
}

export default feApiGenerator;

function addImport(
  tree: Tree,
  path: string,
  importName: string,
  from: string
) {
  const content = tree.read(path, 'utf-8');
  if (!content) {
    throw new Error(`File not found: ${path}`);
  }

  const source = ts.createSourceFile(
    path,
    content,
    ts.ScriptTarget.Latest,
    true
  );

  const alreadyImported = source.statements.some(
    s =>
      ts.isImportDeclaration(s) &&
      s.moduleSpecifier.getText().replace(/['"]/g, '') === from &&
      s.importClause?.namedBindings &&
      ts.isNamedImports(s.importClause.namedBindings) &&
      s.importClause.namedBindings.elements.some(
        e => e.name.text === importName
      )
  );

  if (alreadyImported) return;

  const changes = [
    {
      type: ChangeType.Insert,
      index: 0,
      text: `import { ${importName} } from '${from}';\n`,
    },
  ];

  tree.write(path, applyChangesToString(content, changes as StringChange[]));
}

function getSourceFile(tree: Tree, path: string): ts.SourceFile {
  const content = tree.read(path, 'utf-8');
  if (!content) {
    throw new Error(`File not found: ${path}`);
  }

  return ts.createSourceFile(
    path,
    content,
    ts.ScriptTarget.Latest,
    true
  );
}

function addToArray(
  tree: Tree,
  path: string,
  arrayName: string,
  element: string
) {
  const content = tree.read(path, 'utf-8');
  if (!content) {
    throw new Error(`File not found: ${path}`);
  }

  const source = ts.createSourceFile(
    path,
    content,
    ts.ScriptTarget.Latest,
    true
  );

  const variable = source.statements.find(
    (s): s is ts.VariableStatement =>
      ts.isVariableStatement(s) &&
      s.declarationList.declarations.some(
        d => d.name.getText() === arrayName
      )
  );

  if (!variable) {
    throw new Error(`Array ${arrayName} not found`);
  }

  const declaration = variable.declarationList.declarations[0];
  const arrayLiteral = declaration.initializer;

  if (!arrayLiteral || !ts.isArrayLiteralExpression(arrayLiteral)) {
    throw new Error(`${arrayName} is not an array`);
  }

  const elements = arrayLiteral.elements.map(e => e.getText());
  if (elements.includes(element)) return;

  const insertIndex =
    arrayLiteral.elements.length === 0
      ? arrayLiteral.getStart() + 1
      : arrayLiteral.elements.end;

  const prefix =
    arrayLiteral.elements.length === 0 ? '\n  ' : ',\n  ';

  const changes = [
    {
      type: ChangeType.Insert,
      index: insertIndex,
      text: `${prefix}${element}`,
    },
    {
      type: ChangeType.Insert,
      index: arrayLiteral.getEnd() - 1,
      text: '\n',
    },
  ];

  tree.write(path, applyChangesToString(content, changes as StringChange[]));
}