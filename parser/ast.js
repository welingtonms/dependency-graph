const reader = require('./reader')

const createNode = (line = '') => {
  // making the assumption that space is used to split token
  const tokens = line
    .split(/(\s*=\s*|\s+|\(|\)|'.+')/)
    .map(token => token.trim())
    .filter(Boolean)

  tokens.map(token => console.log(token))
}

const build = filePath => {
  const root = {
    file: filePath,
    dependencies: [],
    children: [],
    value: '',
  }

  return new Promise((resolve, reject) => {
    reader
      .read(filePath)
      .then(({ data: lines = [] }) => {
        root.children = lines.map(createNode)

        resolve({
          data,
        })
      })
      .catch(error => {
        reject(error)
      })
  })
}

const traverse = () => {
  console.log('TBD')
}

module.exports = {
  build,
  traverse,
}
