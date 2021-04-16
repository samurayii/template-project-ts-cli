#!/usr/bin/env node
import config from "./lib/entry";
import { ILogger, Logger } from "logger-flx";

console.log(config);

let logger: ILogger;

if (config.logs === "none") {
    logger = new Logger({
        mode: "prod",
        type: true,
        timestamp: "none",
        enable: false
    });
} else {
    logger = new Logger({
        mode: config.logs,
        type: true,
        timestamp: "none",
        enable: true
    });
}

logger.log("start");