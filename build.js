#!/usr/bin/env node

const { build } = require("estrella");
const pkg = require("./package.json");

build({
  bundle: true,
  sourcemap: true,
  format: "cjs",
  entry: "src/index.ts",
  outfile: pkg.main,
});

build({
  bundle: true,
  sourcemap: true,
  format: "esm",
  entry: "src/index.ts",
  outfile: pkg.module,
});
