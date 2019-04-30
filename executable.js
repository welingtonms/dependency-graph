// const c = require('./c')
const c  = (function() {
    // const a = require('./a')
    const a  = (function() {
        const a = 'This is module a'
        return a
    })()
    // const b = require('./b')
    const b  = (function() {
        const b = 'This is module b'
        return b
    })()
    console.log(a, b)
    const c = 'This is module c'
    return c
})()
console.log(c)