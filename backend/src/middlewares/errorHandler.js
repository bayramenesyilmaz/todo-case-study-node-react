const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  level: "error",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log" }),
  ],
});