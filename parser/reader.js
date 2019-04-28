const readline = require('readline')
const fs = require('fs')

/**
 * Read a file and return its
 * lines as an array of strings.
 * @param {string} filePath
 * @returns {Array} Lines read from the file, if it exists; null, otherwise.
 */
const readFile = filePath =>
  new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      reject({
        error: new Error('Entry file does not exist'),
      })

      return
    }

    const reader = readline.createInterface({
      input: fs.createReadStream(filePath),
    })

    const lines = []
    reader
      .on('line', (line = '') => {
        lines.push(line)
      })
      .on('close', () => {
        resolve({
          data: lines,
        })
      })
  })

module.exports = {
  read: readFile,
}
