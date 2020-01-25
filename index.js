const { createServer } = require('./lib/kernel/server');
const logger = require('./lib/kernel/logger.js');

/**
 * start server
 *
 * @param {Object=} options
 * @return {Object} { http.Server }
 */
function startServer(options) {
  const version = require('./package.json').version;
  logger.info(`version ${version}`);
  return createServer(options).launch();
}

module.exports = startServer;
