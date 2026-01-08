import { Tree } from '@nx/devkit';
import { Project, SyntaxKind } from 'ts-morph';

export function addApiImportsToNestModule(
  tree: Tree,
  modulePath: string,
  name: string,
) {
  const className = name.charAt(0).toUpperCase() + name.slice(1);
  const lowerName = name.charAt(0).toLowerCase() + name.slice(1);
  console.log({className, lowerName})
  const project = new Project({
    useInMemoryFileSystem: true,
  });

  const sourceText = tree.read(modulePath)?.toString();
  if (!sourceText) {
    throw new Error(`No se pudo leer ${modulePath}`);
  }

  const sourceFile = project.createSourceFile(
    modulePath,
    sourceText,
    { overwrite: true }
  );

  // ---------- IMPORTS ----------
  const importsToAdd = [
    { name: `${className}Module`, from: `../modules/${lowerName}.module` },
    { name: `${className}ApiService`, from: `./${lowerName}-api.service` },
    { name: 'ApiModule', alias: `${className}ApiModule`, from: `@organizer/generated-server-${lowerName}` },
  ];

  for (const imp of importsToAdd) {
    const exists = sourceFile.getImportDeclarations().some(d => {
      if (d.getModuleSpecifierValue() !== imp.from) return false;

      return d.getNamedImports().some(n => {
        if (imp.alias) {
          return (
            n.getName() === imp.name &&
            n.getAliasNode()?.getText() === imp.alias
          );
        }
        return n.getName() === imp.name;
      });
    });

    if (!exists) {
      sourceFile.addImportDeclaration({
        namedImports: imp.alias
          ? [{ name: imp.name, alias: imp.alias }]
          : [imp.name],
        moduleSpecifier: imp.from,
      });
    }
  }

  // ---------- @Module ----------
  const moduleDecorator = sourceFile
    .getClassOrThrow('AppModule')
    .getDecoratorOrThrow('Module');

  const moduleArg = moduleDecorator
    .getArguments()[0]
    ?.asKindOrThrow(SyntaxKind.ObjectLiteralExpression);

  // ---------- imports: [] ----------
  const importsProp = moduleArg.getProperty('imports')
    ?.asKindOrThrow(SyntaxKind.PropertyAssignment);

  const importsArray = importsProp
    ?.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

  const importTexts = importsArray?.getElements().map(e => e.getText()) || [];

    if (!importTexts.includes(`${className}Module`)) {
    importsArray?.addElement(`${className}Module`);
  }

  const entityApiCall =
    `${className}ApiModule.forRoot({\n      ${lowerName}Api: ${className}ApiService,\n    })`;

  if (!importTexts.some(t => t.startsWith(`${className}ApiModule.forRoot`))) {
    importsArray?.addElement(entityApiCall);
  }

  // ---------- providers: [] ----------
  let providersProp = moduleArg.getProperty('providers')
    ?.asKind(SyntaxKind.PropertyAssignment);

  if (!providersProp) {
    moduleArg.addPropertyAssignment({
      name: 'providers',
      initializer: `[${className}ApiService]`,
    });
  } else {
    const providersArray = providersProp
      .getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

    const providers = providersArray.getElements().map(e => e.getText());

    if (!providers.includes(`${className}ApiService`)) {
      providersArray.addElement(`${className}ApiService`);
    }
  }

  tree.write(modulePath, sourceFile.getFullText());
}
