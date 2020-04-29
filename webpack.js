const Compiler = require("./lib/compiler");
const options = require("./webpack.config.js");

new Compiler(options).run();
