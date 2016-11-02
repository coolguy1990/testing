/* eslint-disable one-var */
const winston = require('winston'),
  path = require('path'),
  fs = require('fs-extra'),
  logDirectory = path.join(__dirname, '../logs'),
  logFile = `${logDirectory}/all-logs.log`;
/* eslint-disable one-var */

winston.emitErrs = true;
winston.setLevels(winston.config.syslog.levels);
/* eslint-disable no-sync */
fs.ensureFileSync(logFile);
/* eslint-disable no-sync */

const logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: logFile,
      handleExceptions: true,
      json: true,
      maxsize: 5242880,
      maxFiles: 5,
      colorize: false,
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
module.exports.stream = {
  write(message) {
    logger.info(message);
  },
};
