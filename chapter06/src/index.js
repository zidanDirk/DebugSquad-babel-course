const acorn = require("acorn");
const evaKeywordPlugin = require("./evaKeywordPlugin.js")


const Parser = acorn.Parser;

const newParser = Parser.extend(evaKeywordPlugin);


var program = 
`
    eva
    const a = 1
`;

const ast = newParser.parse(program, {ecmaVersion: 2020});
console.log(ast);