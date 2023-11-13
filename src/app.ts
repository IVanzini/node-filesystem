import { walkDirectory } from "./handle-fs";
import process from "node:process";

const dir = process.argv[2];
walkDirectory(dir);