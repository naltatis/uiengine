/* global describe, it */
const assert = require('assert')

const Markdown = require('../lib/util/markdown')

describe('Markdown', () => {
  describe('#fromFile', () => {
    it('should return rendered markdown', done => {
      Markdown.fromFile('./test/fixtures/markdown.md')
        .then(data => {
          assert.equal(data, '<h1>Homepage</h1>\n<p>Welcome!</p>\n')
          done()
        })
        .catch(done)
    })
  })

  describe('#fromString', () => {
    it('should return rendered markdown', done => {
      Markdown.fromString('# Homepage\n\nWelcome!')
        .then(data => {
          assert.equal(data, '<h1>Homepage</h1>\n<p>Welcome!</p>\n')
          done()
        })
        .catch(done)
    })
  })
})