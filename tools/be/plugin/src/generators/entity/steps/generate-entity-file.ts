import { generateFiles, Tree } from "@nx/devkit";
import path = require("path");
import { EntityGeneratorSchema } from "../schema";

export function generateEntityFile(tree: Tree, options: EntityGeneratorSchema) {
    console.log('Generating entity file...')
    generateFiles(tree, 
        path.join(
            `${__dirname}`, 
            '../files/src/entities'), 
            'apps/backend/src/entities', {
                entity: options.name,
                entityClassName: options.name.charAt(0).toUpperCase() + options.name.slice(1),
                tpl: ''
            });
    console.log('Entity file generated successfully');
}   