const path = require('path')
const UIengine = require('../uiengine')

module.exports = require('yargs')
  // debug
  .boolean('debug')
  .global('debug')
  .default('debug', false)
  .describe('debug', 'Flag to enable debug mode')
  .alias('d', 'debug')
  // config
  .string('config')
  .global('config')
  .default('config', UIengine.CONFIG_FILENAME)
  .describe('config', 'Path to config file')
  .alias('c', 'config')
  // command
  .demandCommand(1)
  .commandDir(path.join(__dirname, 'commands'))
  // help / usage
  .usage(`Usage: $0 <command> [options]`)
  .help()
  .alias('h', 'help')
  .argv
