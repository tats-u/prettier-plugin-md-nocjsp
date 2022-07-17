import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
// import typescript from 'rollup-plugin-typescript';

const commonjs_plugin = commonjs({
  dynamicRequireTargets: [
    "node_modules/unicode-regex/lib/data.generated/*/*.json",
  ],
});

export default {
  input: "src/index.js",
  plugins: [resolve(), commonjs_plugin, json(), terser() /* , typescript() */],
  external: ["prettier"],
  output: {
    file: "dist/main.js",
    format: "cjs",
    sourcemap: true,
  },
  onwarn: (warning, warn) => {
    // Unresolved dependencies must be error
    if (warning.code === "UNRESOLVED_IMPORT") {
      throw Error(warning.message);
    }
    warn(warning);
  },
};
