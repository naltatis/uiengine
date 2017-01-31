const path = require('path')
const R = require('ramda')
const yaml = require('./util/yaml')

const readPackageJson = () => {
  let data = {}
  try {
    const packageJson = path.resolve(process.cwd(), 'package.json')
    data = require(packageJson)
  } catch (err) {}

  return data
}

const readFlags = (flags) => {
  const debug = flags.debug || false
  const data = { debug }

  return data
}

const resolveTheme = (basedir, { theme }) => {
  // use path of default theme if no theme has been provided
  theme = theme || path.relative(__dirname, '../default_theme')

  // if theme is a relative path, resolve the absolute path,
  // relative to project config directory (basedir).
  // otherwise assume it's a node module that can be required.
  if (theme.startsWith('.')) {
    theme = path.resolve(basedir, theme)
  }

  return theme
}

const resolvePaths = (basedir, { source, target }) => {
  const resolvePath = (relativePath) => path.resolve(basedir, relativePath)

  source = R.map(resolvePath, source)
  target = R.map(resolvePath, target)

  return { source, target }
}

async function read (configFilePath, flags = {}) {
  // retrieve config and options
  const projectConfig = await yaml.fromFile(configFilePath)
  const configPath = path.dirname(configFilePath)
  const packageData = readPackageJson()
  const options = readFlags(flags)

  // initialize data with defaults
  const { name, version } = packageData
  const defaults = { name, version }
  let data = R.mergeAll([defaults, projectConfig, options])

  // resolve paths and theme
  const { source, target } = resolvePaths(configPath, projectConfig)
  const theme = resolveTheme(configPath, projectConfig)
  data = R.assoc('source', source, data)
  data = R.assoc('target', target, data)
  data = R.assoc('theme', theme, data)

  return data
}

module.exports = {
  read
}