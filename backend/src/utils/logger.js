const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "error",
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message, stack }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message} ${
        stack ? "\nStack: " + stack : ""
      }`;
    })
  ),
  transports: [
    new transports.Console(), // konsola yaz
    new transports.File({ filename: "logs/error.log" }), // dosyaya yaz
  ],
});

module.exports = logger;
