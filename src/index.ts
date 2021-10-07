#!/usr/bin/env node
import config from "./lib/entry";
import { FastifySmallLogger, IFastifySmallLoggerConfig } from "fastify-small-logger";

console.log(config);

const logger_options: IFastifySmallLoggerConfig = {
    name: "",
    levels: [],
    bindings: {},
    output: {
        timestamp: "none",
        bindings: "none",
        levels: ["fatal","info","error","warn", "debug", "trace"]
    }
};

if (config.logs === "prod") {
    logger_options.levels = ["fatal","info","error","warn"];
}
if (config.logs === "dev") {
    logger_options.levels = ["fatal","info","error","warn", "debug"];
}
if (config.logs === "debug") {
    logger_options.levels = ["fatal","info","error","warn", "debug", "trace"];
}

const logger = new FastifySmallLogger(logger_options);

logger.info("start");