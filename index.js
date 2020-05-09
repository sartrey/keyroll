const path = require('path');
const epiiMinion = require('@epiijs/minion');

/**
 * start server
 *
 * @param {Object=} options
 * @return {Object} { http.Server }
 */
function startServer(options) {
  const version = require('./package.json').version;
  console.log(`version ${version}`);
  if (!options.path) {
    options.path = {};
  }
  if (!options.path.root) {
    options.path.root = path.join(__dirname, 'lib')
  }
  return epiiMinion.start({
    name: 'keyroll',
    port: options.port,
    path: options.path,
    layout: {
      styles: [],
      scripts: [
        'assets/react.development.js',
        'assets/react-dom.development.js',
      ]
    }
  });
}

module.exports = startServer;
