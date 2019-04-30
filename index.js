const ast = require('./ast')
const fileUtils = require('./fileUtils')

// I take as
const data = ast.build('index.js')

console.log('*************** DEPENDENCY GRAPH ********* ')
ast.traverse(data)
// console.log('*************** BUNDLED ********* ')
const bundled = ast.generateBundle(data)
fileUtils.write(bundled, 'bundle.js')
// console.log('*************** EXECUTABLE ********* ')
const executable = ast.generateExecutable(data)
fileUtils.write(executable, 'executable.js')
