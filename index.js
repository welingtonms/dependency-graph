const ast = require('./ast')

const data = ast.build('index')

console.log('*************** DEPENDENCY GRAPH ********* ')
ast.traverse(data)
console.log('*************** BUNDLED ********* ')
ast.generateBundle(data)
console.log('*************** EXECUTABLE ********* ')
ast.generateExecutable(data)
