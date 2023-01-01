#!/usr/bin/env node
import config from "./lib/entry";
import { LoggerEventEmitter, ILoggerEventEmitterConfig } from "logger-event-emitter";

console.log(config);

const logger_options: ILoggerEventEmitterConfig = {
    name: "",
    enable: true,
    level: "error",
    timestamp: "none"
};

if (config.logs === "prod") {
    logger_options.level = "error";
}
if (config.logs === "dev") {
    logger_options.level = "debug";
}
if (config.logs === "debug") {
    logger_options.level = "trace";
}

const logger = new LoggerEventEmitter(logger_options);

logger.info("start");