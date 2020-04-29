const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("@babel/core");

module.exports = {
  getAst: (fileName) => {
    const content = fs.readFileSync(fileName, "utf-8");
    // parse() parses the provided code as an entire ECMAScript program
    const ast = parser.parse(content, {
      sourceType: "module",
    });

    return ast;
  },
  getDependencies: (ast, fileName) => {
    const dependencies = {};
    // We can use it alongside the babel parser to traverse and update nodes
    traverse(ast, {
      // we can target particular node types in the Syntax Tree
      ImportDeclaration({ node }) {
        const dirname = path.dirname(fileName);
        const newPath = "./" + path.join(dirname, node.source.value);
        dependencies[node.source.value] = newPath;
      },
    });
    return dependencies;
  },
  getCode: (ast) => {
    // Given an AST, transform it
    const { code } = transformFromAst(ast, null, {
      presets: ["@babel/preset-env"],
    });
    return code;
  },
};
