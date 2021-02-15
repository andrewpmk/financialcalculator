import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";
import typescript from '@rollup/plugin-typescript';

import pkg from "./package.json";

const input = ["src/index.ts"];

export default [
  {
    // UMD (minified)
    input,
    plugins: [
      typescript(),
      nodeResolve(),
      babel({
        babelHelpers: "bundled",
      }),
      terser(),
    ],
    output: {
      file: `dist/${pkg.name}.min.js`,
      format: "umd",
      name: "financialcalculator", // this is the name of the global object
      esModule: false,
      exports: "named",
      sourcemap: true,
    },
},
    {
        // UMD (non minified)
        input,
        plugins: [
          typescript(),
          nodeResolve(),
          babel({
            babelHelpers: "bundled",
          }),
        ],
        output: {
          file: `dist/${pkg.name}.js`,
          format: "umd",
          name: "myLibrary", // this is the name of the global object
          esModule: false,
          exports: "named",
          sourcemap: true,
        },
  },// ESM and CJS
  {
    input,
    plugins: [typescript(), nodeResolve()],
    output: [
      {
        dir: "dist/esm",
        format: "esm",
        exports: "named",
        sourcemap: true,
      },
      {
        dir: "dist/cjs",
        format: "cjs",
        exports: "named",
        sourcemap: true,
      },
    ],
  },
];