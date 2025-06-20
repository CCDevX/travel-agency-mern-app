const winston = require("winston");

const transports = [];

if (process.env.NODE_ENV === "production") {
  // En production sur Vercel : uniquement la console
  transports.push(
    new winston.transports.Console({
      format: winston.format.json(),
    })
  );
} else {
  // En développement : console + fichiers locaux
  const fs = require("fs");
  const path = require("path");
  const logsDir = path.join(__dirname, "logs");

  if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

  transports.push(
    new winston.transports.File({ filename: path.join(logsDir, "all.log") }),
    new winston.transports.File({
      filename: path.join(logsDir, "error.log"),
      level: "error",
    }),
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.json({ space: 2 }),
  transports,
});

module.exports = { logger };

// const fs = require("fs");
// const path = require("path");
// const winston = require("winston");

// const logsDir = path.join(__dirname, "logs");

// // Check if the directory exists, if not, create it
// if (!fs.existsSync(logsDir)) {
//   fs.mkdirSync(logsDir);
// }

// const logger = winston.createLogger({
//   level: process.env.LOG_LEVEL || "info",
//   format: winston.format.json({ space: 4 }),
//   transports: [
//     new winston.transports.File({ filename: path.join(logsDir, "all.log") }),
//     new winston.transports.File({
//       filename: path.join(logsDir, "error.log"),
//       level: "error",
//     }),
//   ],
// });

// if (process.env.NODE_ENV !== "production") {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     })
//   );
// }

// module.exports = { logger };
