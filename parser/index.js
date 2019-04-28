const ast = require('./ast')

/**
 * Parse a file and return its
 * lines as an array of string.
 * @param {string} filePath
 * @returns {Array} Lines read from the file, if it exists; null, otherwise.
 */
const parse = filePath =>
  new Promise((resolve, reject) => {
    ast
      .build(filePath)
      .then(({ data }) => {
        resolve({
          data,
        })
      })
      .catch(error => {
        reject(error)
      })
  })

module.exports = {
  parse,
}
