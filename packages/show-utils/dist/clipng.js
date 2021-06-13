"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const outdent_1 = __importDefault(require("outdent"));
exports.default = () => {
    const clipng = new commander_1.Command("clipng");
    clipng
        .arguments("<name>")
        .option("-u, --data-url", "use clipboard content as Image Data-URL");
    clipng.description("dump picture from clipboard on file", {
        name: outdent_1.default `
      the name for the file to dump (if not present '.png' extension is used)
    `,
    });
    return clipng;
};
//# sourceMappingURL=clipng.js.map