import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";

export default {
  input: "src/silverchariotapp.js",   
  output: {
    dir: "dist",
    format: "es",
    sourcemap: true
  },
  plugins: [
    resolve(),
    json()
  ]
};
