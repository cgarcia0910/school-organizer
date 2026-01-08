import { generateFiles, Tree } from "@nx/devkit";
import { EntityGeneratorSchema } from "../schema";
import path = require("path");

export function generateServiceFile(tree: Tree, options: EntityGeneratorSchema) {
    console.log('Generating service file...')
    generateFiles(tree, 
        path.join(
            `${__dirname}`, 
            '../files/src/services'), 
            'apps/backend/src/services', {
                entity: options.name,
                entityClassName: options.name.charAt(0).toUpperCase() + options.name.slice(1),
                tpl: ''
            });
    console.log('Service file generated successfully');
}