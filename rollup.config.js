import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";

export default {
  input: "src/silverchariotapp.js",
  output: {
    file: "dist/silverchariotapp.js",
    format: "es",
    sourcemap: true,
    inlineDynamicImports: true
  },
  plugins: [
    resolve({
      browser: true,
      dedupe: ["lit"]
    }),
    commonjs(),
    copy({
      targets: [{ src: "index.html", dest: "dist" }]
    })
  ]
};
