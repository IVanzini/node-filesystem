import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const workDir = process.cwd();
let index = 0;
let paths: string[] = [];

export function walkDirectory(dir: string): void {
    //se 0 pusho workdir; in ogni caso pusho dir
    if (index == 0) {
        paths.push(workDir);
    }
    paths.push(dir);
    printEntity(dir, index);
    try {
        const entities = fs.readdirSync(path.join(...paths), { withFileTypes: true });
        ++index;
        for (const entity of entities) {
            if (entity.isDirectory()) {
                walkDirectory(entity.name);
            } else {
                printEntity(entity.name, index);
            }
        }
        --index;
        paths.pop();
        //rimuovo dir
    } catch (err) {
        console.error("errore nella lettura della directory: ", dir, err);
    }
}

function printEntity(entity: string, index: number): void  {
    if (index > 0) {
        let tab = "";
        for (let i = 0; i < index; i++) {
            tab += "|   ";
        }
        let row = tab + "|-- " + entity;
        console.log(row);
    } else {
        console.log("|-- ", entity); 
    }
}