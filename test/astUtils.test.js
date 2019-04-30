const expect = require('chai').expect
const ast = require('../astUtils')

describe('astUtils', function() {
  it('should build the AST for a given file', function() {
    const expectedAST = {
      file: 'c.js',
      dependencies: [
        {
          file: './a',
          dependencies: [],
          children: [
            { value: "const a = 'This is module a'" },
            { value: 'module.exports = a' },
          ],
        },
        {
          file: './b',
          dependencies: [],
          children: [
            { value: "const b = 'This is module b'" },
            { value: 'module.exports = b' },
          ],
        },
      ],
      children: [
        {
          value: "const a = require('./a')",
          isDependency: true,
          requires: './a',
        },
        {
          value: "const b = require('./b')",
          isDependency: true,
          requires: './b',
        },
        { value: 'console.log(a, b)' },
        { value: "const c = 'This is module c'" },
        { value: 'module.exports = c' },
      ],
    }

    const generatedAST = ast.build('c.js')
    expect(generatedAST).to.eql(expectedAST)
  })

  it('should bundle in order of execution', function() {
    const expectedBundle = [
      "const a = 'This is module a'",
      'module.exports = a',
      "const b = 'This is module b'",
      'module.exports = b',
      "const a = require('./a')",
      "const b = require('./b')",
      'console.log(a, b)',
      "const c = 'This is module c'",
      'module.exports = c',
    ]

    const generatedAST = ast.build('c.js')
    const generatedBundle = ast.generateBundle(generatedAST)
    expect(generatedBundle).to.eql(expectedBundle)
  })

  it('should generate executable bundle', function() {
    const expectedBundle = [
      "// const a = require('./a')",
      'const a  = (function() {',
      "    const a = 'This is module a'",
      '    return a',
      '})()',
      "// const b = require('./b')",
      'const b  = (function() {',
      "    const b = 'This is module b'",
      '    return b',
      '})()',
      'console.log(a, b)',
      "const c = 'This is module c'",
      'return c',
    ]

    const generatedAST = ast.build('c.js')
    const generatedBundle = ast.generateExecutable(generatedAST)
    expect(generatedBundle).to.eql(expectedBundle)
  })
})
