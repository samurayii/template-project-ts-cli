import { Command } from "commander";
import * as chalk from "chalk";
import * as fs from "fs";
import * as path from "path";
import { IAppConfig } from "./interfaces";

type TPackage = {
    [key: string]: unknown
}

const findPkg = (): TPackage => {

    const cwd_pkg_full_path = path.resolve(process.cwd(), "package.json");
    const dirname_pkg_full_path = path.resolve(__dirname, "package.json");
    const app_pkg_full_path = path.resolve(path.dirname(process.argv[1]), "package.json");
    const require_pkg_full_path = path.resolve(path.dirname(require.main.filename), "package.json"); 

    if (fs.existsSync(dirname_pkg_full_path) === true) {
        return <TPackage>JSON.parse(fs.readFileSync(dirname_pkg_full_path).toString());
    }
    if (fs.existsSync(app_pkg_full_path) === true) {
        return <TPackage>JSON.parse(fs.readFileSync(app_pkg_full_path).toString());
    }
    if (fs.existsSync(require_pkg_full_path) === true) {
        return <TPackage>JSON.parse(fs.readFileSync(require_pkg_full_path).toString());
    }   
    if (fs.existsSync(cwd_pkg_full_path) === true) {
        return <TPackage>JSON.parse(fs.readFileSync(cwd_pkg_full_path).toString());
    }

};

const program = new Command();
const pkg = findPkg();

if (pkg === undefined) {
    console.error(chalk.red("[ERROR] package.json not found"));
    process.exit(1);
}

program.version(`${pkg.name} version: ${pkg.version}`, "-v, --version", "output the current version.");
program.name(<string>pkg.name);
program.option("-l, --logs <type>", "Logs details, can be none, none, prod, dev or debug (Environment variable: TEMPLATE_LOGS=<type>). Example: --logs prod", "prod");








program.parse(process.argv);

const options = program.opts();

const config: IAppConfig = {
    logs: options.logs.trim().toLowerCase()
};

if (process.env["TEMPLATE_LOGS"] !== undefined) {
    config.logs = process.env["TEMPLATE_LOGS"].trim();
}

export default config;
