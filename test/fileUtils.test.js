const expect = require('chai').expect
const assert = require('chai').assert
const fileUtils = require('../fileUtils')

describe('fileUtils', function() {
  it('should read file content if file exists', function() {
    const expectedContents = [
      "const a = 'This is module a'",
      'module.exports = a',
    ]

    const fileContents = fileUtils.read('./test/code/a.js')

    expect(fileContents).to.eql(expectedContents)
  })

  it('should return empty array for files not found', function() {
    const fileContents = fileUtils.read('./test/code/non-existing.js')

    expect(fileContents).to.have.lengthOf(0)
  })

  it('should write file content', function() {
    const expectedContents = [
      "const a = 'This is module a'",
      'module.exports = a',
    ]
    const result = fileUtils.write(expectedContents, './test/code/written.js')

    assert.isTrue(result)
  })
})
