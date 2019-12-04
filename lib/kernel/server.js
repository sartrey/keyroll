const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');
const mime = require('mime-types')
const assist = require('./assist');
const logger = require('./logger');

const product = 'keyroll';
const homedir = os.homedir();
const maindir = path.join(homedir, `.${product}`);

const prefixRoot = '/';
const prefixData = '/__/data';
const prefixFile = '/__/file';

const loaderHTML = fs.readFileSync(path.join(__dirname, 'loader.html'), 'utf8');

function openBrowser(options) {
  if (os.platform() === 'darwin') {
    assist.startProcess(`open http://localhost:${options.port}`);
  }
}

/**
 * serve view
 *
 * @param {Object} context
 * @param {String} view
 */
function serveView(context, view) {
  const headers = {
    'Content-Type': 'text/html; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Timing-Allow-Origin': '*'
  };
  context.response.writeHead(200, headers);
  context.response.write(
    loaderHTML.replace(/\/\$\{key\}/g, path.join(view, 'index'))
  )
  context.response.end()
}

/**
 * serve data
 *
 * @param {Object} context
 * @param {String} route
 * @param {Object} query
 */
function serveData(context, route, query) {
  var headers = {}
  headers['Content-Type'] = 'application/json'
  context.response.writeHead(200, headers)
  try {
    var action = require('../server' + route)
    var result = action.call(null, context, query)
    if (result instanceof Promise) {
      context.response.async = true
      result.then(json => {
        context.response.write(JSON.stringify(json))
        context.response.end()
      })
    } else {
      context.response.write(JSON.stringify(result))
      context.response.end()
    }
  } catch (error) {
    context.response.write(JSON.stringify(assist.getJSON(false, error.message)))
    context.response.end()
  }
}

/**
 * serve file
 *
 * @param {Object} context
 * @param {String} file
 */
async function serveFile(context, file, root) {
  const fullPath = path.join(root || __dirname, file);
  const fileStat = await assist.getFileStat(fullPath);
  if (!fileStat) {
    context.response.writeHead(404);
    return context.response.end('not found');
  }

  const headers = {
    'Connection': 'close',
    'Content-Type': mime.contentType(path.extname(file)) || 'application/octet-stream',
    'Content-Length': fileStat.size,
    'Access-Control-Allow-Origin': '*',
    'Timing-Allow-Origin': '*'
  };
  context.response.writeHead(200, headers);
  if (context.debug) {
    logger.info('=> request');
    Object.keys(context.request.headers).forEach(key => {
      logger.warn(`=> [${key}]`, context.request.headers[key]);
    });
    logger.info('<= response');
    Object.keys(headers).forEach(key => {
      logger.warn(`<= [${key.toLowerCase()}]`, headers[key]);
    });
  }

  const stream = fs.createReadStream(fullPath);
  stream.pipe(context.response)
    .on('error', function (error) {
      logger.halt(error.message)
      context.response.end()
    });
}

function lintOptions(options) {
  const mergedOptions = {
    port: 9988,
    path: maindir
  };
  if (options) {
    if (options.port) mergedOptions.port = options.port;
    if (options.path) mergedOptions.path = options.path;
  }
  return mergedOptions;
}

function handleRequest(request, response) {
  const context = { request, response };
  const url = require('url').parse(request.url, true);
  if (url.query.debug) context.debug = true;

  // handle root path
  if (url.pathname === prefixRoot) {
    serveView(context, '/');
    return;
  }

  // output debug url info
  if (process.env.NODE_ENV === 'development') {
    logger.info('=>', request.url);
  }

  // handle data
  if (url.pathname.startsWith(prefixData)) {
    serveData(context, url.pathname.replace(prefixData, ''), url.query);
    return;
  }

  // handle file
  if (url.pathname.startsWith(prefixFile)) {
    serveFile(context, url.pathname.replace(prefixFile, ''), path.join(__dirname, '../static'));
    return;
  }

  // default response
  if (response.headerSent || response.finished) return;
  response.writeHead(404)
  response.end('not found')
}

/**
 * create server
 *
 * @param  {Object=} options
 * @return {Function} standard http.Server callback
 */
function createServer(options) {
  // verify options
  const newOptions = lintOptions(options);

  // write port file
  assist.createDirectory(maindir);
  fs.writeFileSync(path.join(maindir, 'port'), newOptions.port.toString());

  // create http server
  const httpServer = http
    .createServer(handleRequest)
;
  // httpServer.timeout = 60000
  httpServer.on('clientError', (error, socket) => {
    logger.halt('http error >', error.stack);
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  });
  httpServer.on('timeout', (socket) => {
    socket.end();
  });
  httpServer.launch = () => {
    httpServer.listen(newOptions.port, () => {
      logger.warn(`listening at ${newOptions.port}`);
      openBrowser(newOptions);
    });
    return httpServer;
  };
  return httpServer;
}

module.exports = {
  createServer
};
