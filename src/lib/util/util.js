const winston = require("winston");
const path = require("path");
const url = require("url");

const format = winston.format;
const combine = format.combine;
const timestamp = format.timestamp;
const json = format.json;
const prettyPrint = format.prettyPrint;
const simple = format.simple;
const colorize = format.colorize;

const errorFilter = format(function (info, opts) {
  return info.level === "error" ? info : false;
});

const infoFilter = format(function (info, opts) {
  return info.level === "info" ? info : false;
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "debug",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    json({ deterministic: false })
  ),
  transports: [
    new winston.transports.Console({
      level: process.env.LOG_LEVEL || "info",
      format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        simple(),
        prettyPrint(),
        colorize({
          all: true,
          colors: {
            info: "cyan",
            error: "red",
            success: "green",
            debug: "yellow",
          },
        })
      ),
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../../../logs/all.log"),
      format: combine(timestamp(), json({ deterministic: false })),
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../../../logs/app-error.log"),
      level: "error",
      format: combine(errorFilter()),
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../../../logs/app-info.log"),
      level: "info",
      format: combine(
        infoFilter(),
        timestamp(),
        json({ deterministic: false })
      ),
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../../../logs/app-warn.log"),
      level: "warn",
      format: combine(
        infoFilter(),
        timestamp(),
        json({ deterministic: false })
      ),
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../../../logs/app-debug.log"),
      level: "debug",
      format: combine(
        infoFilter(),
        timestamp(),
        json({ deterministic: false })
      ),
    }),
  ],
});

module.exports = logger;
