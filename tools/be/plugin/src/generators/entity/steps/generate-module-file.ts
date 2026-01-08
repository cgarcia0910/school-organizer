import path = require("path");
import { EntityGeneratorSchema } from "../schema";
import { generateFiles, Tree } from "@nx/devkit";

export function generateModuleFile(tree: Tree, options: EntityGeneratorSchema) {
    console.log('Generating module file...');
    generateFiles(tree, 
      path.join(
        `${__dirname}`, 
        '../files/src/modules'), 
        'apps/backend/src/modules', {
          entity: options.name,
          entityClassName: options.name.charAt(0).toUpperCase() + options.name.slice(1),
          tpl: ''
        });
    console.log('Module file generated successfully');
}