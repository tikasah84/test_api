const { createLogger, format, transports, config } = require("winston");
const { combine, timestamp, json } = format;

const Logger = createLogger({
  levels: config.syslog.levels,
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    json()
  ),

  transports: [
    new transports.Console(),
    new transports.File({ filename: "app.log" }),
  ],
  exceptionHandlers: [
    new transports.Console(),
    new transports.File({ filename: "app.log" }),
  ],
});

module.exports = Logger;
