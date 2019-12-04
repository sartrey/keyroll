const fs = require('fs')
const path = require('path')
const child_process = require('child_process')
const util = require('util');

module.exports = {
  tryParseJSON,
  bindReadOnly,
  chainPromise,
  canAccess,
  createDirectory,
  readFile: util.promisify(fs.readFile),
  writeFile: util.promisify(fs.writeFile),
  getFileStat,
  loadModules,
  startProcess
}

/**
 * try to parse json
 * use default json if fail
 *
 * @param  {String} text
 * @param  {Object} json
 * @return {Object}
 */
function tryParseJSON(text, json) {
  try {
    var o = JSON.parse(text)
    return o
  } catch (error) {
    return json
  }
}

/**
 * bind ReadOnly property
 *
 * @param  {Object} target
 * @param  {String} name
 * @param  {*} value
 */
function bindReadOnly(target, name, value) {
  Object.defineProperty(target, name, {
    value: value,
    writable: false,
    configurable: false,
    enumerable: true
  })
}

/**
 * chain promise
 *
 * @param  {Promise[]} promises
 * @return {Promise} chain
 */
function chainPromise(promises) {
  var chain = Promise.resolve()
  promises.forEach(function (promise) {
    chain = chain.then(function (o) {
      return typeof promise === 'function' ? promise(o) : promise
    })
  })
  return chain
}

/**
 * test if path exists
 *
 * @param  {String} p
 * @return {Boolean}
 */
function canAccess(p) {
  try {
    fs.accessSync(p, fs.F_OK)
    return true
  } catch (error) {
    return false
  }
}

/**
 * create directory recursively
 *
 * @param  {String} dir
 */
function createDirectory(dir) {
  const parts = dir.split('/').filter(Boolean);
  let fullPath = '/';
  for (let i = 0; i < parts.length; i ++) {
    fullPath = path.join(fullPath, parts[i])
    if (!canAccess(fullPath)) {
      fs.mkdirSync(fullPath);
    }
  }
}

/**
 * get file stat
 *
 * @param  {fs.Stat} stat
 */
function getFileStat(p) {
  return new Promise((resolve, reject) => {
    fs.stat(p, (error, stat) => {
      if (error) {
        console.error(error);
        resolve();
      } else {
        resolve(stat);
      }
    })
  });
}

/**
 * load modules
 *
 * @param  {String} dir
 * @param  {Function} cb - callback fn(file, module)
 */
function loadModules(dir, cb) {
  var files = fs.readdirSync(dir)
  files.forEach(function (file) {
    // need *.js
    if (!/\.js$/.test(file)) return

    try {
      var o = require(path.join(dir, file))
      if (cb) cb(file, o)
    }
    catch (error) {
      console.log('failed to load: ' + file)
      console.log(error)
    }
  })
}

/**
 * promise to execute command
 * stderr can be ignored, useful for git
 * options:
 *  {Boolean} ignore - skip stderr
 *
 * @param  {String} command
 * @param  {Object=} options
 * @return {Promise}
 */
function startProcess(command, options) {
  return new Promise(function (resolve, reject) {
    /**
     * exec callback
     *
     * @param  {Object} error
     * @param  {Buffer} stdout
     * @param  {Buffer} stderr
     */
    function execCb (error, stdout, stderr) {
      // reject if error
      if (error) return reject(error)

      // resolve if ignore stderr
      if (options && options.ignore) return resolve(stdout)

      // resolve if null or empty stderr(Buffer)
      if (!stderr || stderr.length === 0) return resolve(stdout)

      // reject if stderr
      reject(new Error(stderr.toString()))
    }

    if (options) {
      if (options.cwd && !existSync(options.cwd)) {
        return reject(new Error('cwd not found'))
      }
    }
    child_process.exec(command, options, execCb)
  })
}
