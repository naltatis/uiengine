const File = require('./util/file')

const getTheme = ({ config: { theme } }) => require(theme)

async function render (state, templateId, data = {}) {
  const theme = getTheme(state)
  return await theme.render(templateId, data)
}

async function setup (state) {
  const theme = getTheme(state)
  const tasks = [copyStatic(state)]

  if (typeof theme.setup === 'function') {
    const markdownIt = require('./util/markdown').markdownIt
    tasks.push(theme.setup({ markdownIt }))
  }

  await Promise.all(tasks)

  return state
}

async function copyStatic (state) {
  const { staticPath } = getTheme(state)
  const { target } = state.config

  await File.copy(staticPath, target)

  return state
}

async function teardown (state) {
  const theme = getTheme(state)
  const tasks = []

  if (typeof theme.teardown === 'function') {
    tasks.push(theme.teardown())
  }

  await Promise.all(tasks)

  return state
}

module.exports = {
  setup,
  render,
  teardown
}
