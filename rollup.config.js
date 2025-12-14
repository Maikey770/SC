import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";

export default {
  input: "src/silverchariotapp.js",
  output: {
    file: "dist/silverchariotapp.js",
    format: "es",
    sourcemap: true
  },
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false,
      dedupe: ["lit"]
    }),
    commonjs(),
    copy({
      targets: [{ src: "index.html", dest: "dist" }]
    })
  ],
  // Force rollup to bundle these deps instead of leaving bare imports
  external: (id) => id.startsWith("@haxtheweb/") ? false : null
};
