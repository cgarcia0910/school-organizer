import { generateFiles, Tree } from "@nx/devkit";
import { EntityGeneratorSchema } from "../schema";
import path = require("path");

export async function generateEntityApiService(tree: Tree, options: EntityGeneratorSchema) {
    console.log('Generating entity API service...');
    generateFiles(tree, 
        path.join(
            `${__dirname}`, 
            '../files/src/app'), 
            'apps/backend/src/app', {
                entity: options.name,
                entityClassName: options.name.charAt(0).toUpperCase() + options.name.slice(1),
                tpl: ''
            });
    console.log('Entity API service generated successfully');
}