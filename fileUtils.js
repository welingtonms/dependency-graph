const fs = require('fs')

/**
 * Reads a file and returns its lines
 * @param {string} filePath path to the file
 * @returns {array} File content as an array of strings
 */
const readFile = filePath => {
  if (!fs.existsSync(filePath)) {
    console.log('File not found', filePath)
    return []
  }

  const lines = fs
    .readFileSync(filePath, 'utf-8')
    .split('\n')
    .filter(Boolean)

  return lines
}

/**
 * Writes an array of strings in a file with the given name.
 * Note that, if the file already exists, it will override it.
 * @param {array} contents Content to be written in the file as an array of strings
 * @param {string} fileName Name of the file
 * @returns {boolean} true if file was written, false otherwise
 */
const writeFile = (contents = [], fileName) => {
  const data = contents.join('\n')

  fs.writeFile(fileName, data, err => {
    if (err) {
      console.log(err)
      return false
    }

    console.log('Successfully written to file ', fileName)
  })

  return true
}

module.exports = {
  read: readFile,
  write: writeFile,
}
