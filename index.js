const parser = require('./parser')

parser
  .parse('./test/code/c.js')
  .then(({ data: lines = [] }) => {
    console.log(lines)
  })
  .catch(({ error }) => {
    console.error(error)
    process.exit(0)
  })
