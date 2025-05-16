const fs = require("fs");
const path = require("path");
const { createLogger, format, transports } = require("winston");

const logDir = path.join(__dirname, "../logs");

// Sadece localde klasör oluştur
if (process.env.NODE_ENV !== "production") {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
}

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
    new transports.Console(), // her zaman konsola yaz
    // Sadece localde dosyaya yaz (production'da hata veriyor)
    ...(process.env.NODE_ENV !== "production"
      ? [new transports.File({ filename: path.join(logDir, "error.log") })]
      : []),
  ],
});

module.exports = logger;
