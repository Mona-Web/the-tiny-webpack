(function(graph){
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
      require('./src/index.js')
    })({"./src/index.js":{"dependencies":{"./test.js":"./src/test.js","./hello.js":"./src/hello.js"},"code":"\"use strict\";\n\nvar _test = _interopRequireDefault(require(\"./test.js\"));\n\nvar _hello = _interopRequireDefault(require(\"./hello.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n(0, _hello[\"default\"])();\n(0, _test[\"default\"])();\nconsole.log(\"from index.js\");"},"./src/test.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = test;\n\nfunction test() {\n  console.log(\"from test.js\");\n}"},"./src/hello.js":{"dependencies":{"./data.js":"./src/data.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = hello;\n\nvar _data = _interopRequireDefault(require(\"./data.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nfunction hello() {\n  console.log(\"from hello.js\");\n  (0, _data[\"default\"])();\n}"},"./src/data.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = data;\n\nfunction data() {\n  console.log(\"from data.js\");\n}"}})