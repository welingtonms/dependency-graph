Experimenting with how bundlers handle dependencies.

# Solution

In order to load files, I consider the base path as the directory test/code/ (that's why the index file builds the AST from index.js, i.e., test/code/index.js).
You can run the solution with `node index.js`.

## Dependency graph

Once you run `node index.js` The dependency graph in printed on the screen, with the indentation level indicating the 'depends on' relation.
That means:
`index.js a.js`
In this case, `index.js` depends on `a.js`.

## Bundle

As described in the exercise goal, the file `bundle.js` contains the source code of each file in the correct order
of execution. That **does not** mean this will be executable, since it might contain some code violations (multiple declarations of the same constant, for example).

## Executable bundle

This bundle version takes into account the dependency in isolated functions, run when the required dependency is needed. Therefore, it shows the code structure necessary for the bundled code to be executable.

You can check the executable bundle by running `node executable.js`

# Dependencies

I added Mocha ( a test runner) and Chai (a very useful assertion library).

# Consulting sources

- [Reading a file line-by-line in NodeJs](https://usefulangle.com/post/95/nodejs-read-file-line-by-line)
- [NodeJs Streams](https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93)
- [How to check if a file exists in Node.js](https://flaviocopes.com/how-to-check-if-file-exists-node/)
- [JSDoc documentation](http://usejsdoc.org)
- [Get content between parenthesis](https://stackoverflow.com/questions/6208367/regex-to-match-stuff-between-parentheses)
