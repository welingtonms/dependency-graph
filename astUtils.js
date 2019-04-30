const fileUtils = require('./fileUtils')

const REQUIRE_REGEX = new RegExp(/require\((.*?)\)/)
const SINGLE_QUOTE_REGEX = new RegExp("'", 'gm')

/**
 * Prints an indented text.
 * @param {string} text text to be printed
 * @param {number} level level of indentation
 */
const indent = (text, level) => `${'    '.repeat(level)}${text}`

/**
 * Gets the full path to the file, inside the base folder (/test/code)
 * @param {string} file file name
 * @returns {string} Full path to the fiven file
 */
const getFilePath = file =>
  `./test/code/${file}${file.endsWith('.js') ? '' : '.js'}`

/**
 * Takes a line of code and creates its node.
 * @param {string} line of code
 * @returns {Object} Object containing useful properties for this line of code.
 */
const createNode = (line = '') => {
  let node = {
    value: line,
  }

  const matches = line.match(REQUIRE_REGEX)
  const isDependency = matches !== null

  /**
   * If this is a 'require' line of code then we set its properties
   * for future use
   */
  if (isDependency) {
    node = {
      ...node,
      isDependency,
      requires: matches[1].replace(SINGLE_QUOTE_REGEX, ''),
    }
  }

  return node
}

/**
 * Parses a file and return its AST.
 * @param {string} file Path to the file which AST must be generated
 * @returns {Object} Root node for the AST.
 */
const build = file => {
  const root = {
    file: file,
    dependencies: [],
    children: [],
  }

  // reads the entry file from this path
  const lines = fileUtils.read(getFilePath(file))

  lines.forEach(line => {
    const node = createNode(line)

    /**
     * If this is a dependency file then we need to, recursively,
     * build it own AST branch
     */
    if (node.isDependency) {
      root.dependencies.push(build(`${node.requires}`))
    }

    root.children.push(node)
  })

  return root
}

/**
 * Traverses recursively an AST showing its dependency graph.
 * A file (module) in a certain level (indentation) depends on the
 * file listed in the next identation level.
 * E.g. If A depends on B, then it will be printed as:
 *        A
 *          B
 * @param {node} node AST node to be traversed
 * @param {number} level (Optional) level of indetation which this node must be printed
 */
const traverse = (node, level = 0) => {
  console.log(indent(node.file, level))

  node.dependencies.forEach(child => {
    traverse(child, level + 1)
  })
}

/**
 * Crosses recursively an AST bundling its dependencies.
 * @param {node} node AST node to be traversed
 * @param {array} content Bundled code generated so far
 */
const generateBundle = (node, content = []) => {
  // firstly we generate the code for the dependencies
  node.dependencies.forEach(child => {
    content = content.concat(generateBundle(child))
  })

  // then we print the code for this node
  node.children.forEach(child => {
    content.push(child.value)
  })

  return content
}

/**
 * Traverses recursively an AST replacing dependencies by its code,
 * wrapping it in inline functions in order to keep its own scope.
 * @param {node} node AST node to be traversed
 * @param {array} content Bundled code generated so far
 * @param {number} level (Optional) level of indetation which this line of code must be printed
 */
const generateExecutable = (node, content = [], level = 0) => {
  node.children.forEach(child => {
    if (child.isDependency) {
      const dependency = (node.dependencies || []).find(dependency => {
        return dependency.file === child.requires
      })

      content.push(indent(`// ${child.value}`, level))

      /**
       * Here we need to wrap the dependency code in its own scope.
       */
      content.push(
        indent(`${child.value.replace(/\=(.*)/, '')} = (function() {`, level)
      )

      generateExecutable(dependency, content, level + 1)

      content.push(indent('})()', level))
    } else {
      content.push(
        indent(child.value.replace('module.exports =', 'return'), level)
      )
    }
  })

  return content
}

module.exports = {
  build,
  traverse,
  generateBundle,
  generateExecutable,
}
