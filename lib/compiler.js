const fs = require("fs");
const path = require("path");

const { getAst, getDependencies, getCode } = require("./parser.js");

module.exports = class Compiler {
  constructor(options) {
    this.entry = options.entry;
    this.output = options.output;
    this.modules = [];
  }
  run() {
    const info = this.build(this.entry);
    this.modules.push(info);
    for (let i = 0; i < this.modules.length; i++) {
      const item = this.modules[i];
      const { dependencies } = item;
      if (dependencies) {
        for (let j in dependencies) {
          this.modules.push(this.build(dependencies[j]));
        }
      }
    }
    const obj = {};
    this.modules.forEach((item) => {
      obj[item.filename] = {
        dependencies: item.dependencies,
        code: item.code,
      };
    });
    this.file(obj);
  }

  file(code) {
    const filePath = path.join(this.output.path, this.output.filename);
    const newCode = JSON.stringify(code);
    const bundle = `(function(graph){
      function require(module){
        function localRequire(relativePath) {
          return require(graph[module].dependencies[relativePath]);
        }
        var exports = {};
        (function(require, exports, code){
          eval(code)
        })(localRequire, exports, graph[module].code)
        return exports;
      }
      require('${this.entry}')
    })(${newCode})`;
    fs.writeFileSync(filePath, bundle, "utf-8");
  }

  build(filename) {
    const ast = getAst(filename);
    const dependencies = getDependencies(ast, filename);
    const code = getCode(ast);
    return {
      filename,
      dependencies,
      code,
    };
  }
};
