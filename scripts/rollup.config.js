const path = require("path");
const fs = require("fs");
const babel = require("rollup-plugin-babel");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const { uglify } = require("rollup-plugin-uglify");
const directoriesLib = require("../package.json").directories.lib;
const origin = require("../package.json").directories.origin;

import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-import-css";
import cleanup from "rollup-plugin-cleanup";

import React from "react";
import ReactDOM from "react-dom";

function mkdirsSync(dirname) {
  //console.log(dirname);
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}
function delDir(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

const directoriesLibPath = path.join(process.cwd(), directoriesLib);

delDir(directoriesLibPath);

function generatorFileTree(parentPath, targetPath) {
  const complatePath = path.join(parentPath, targetPath);
  const stat = fs.statSync(complatePath);
  const isDirectory = stat.isDirectory();
  if (isDirectory) {
    const fileList = fs.readdirSync(complatePath);
    return {
      isDirectory,
      relative: path.relative(process.cwd(), complatePath),
      path: complatePath,
      fileName: targetPath,
      children: fileList.map((file) => generatorFileTree(complatePath, file)),
    };
  } else {
    return {
      isDirectory,
      relative: path.relative(process.cwd(), complatePath),
      path: complatePath,
      fileName: targetPath,
      children: null,
    };
  }
}

function loadFileTree(tree) {
  const { isDirectory, relative, path, fileName, children } = tree;

  if (!isDirectory && !children) {
    return [
      {
        isDirectory,
        relative,
        path,
        fileName,
      },
    ];
  }

  return children.reduce(
    (pre, next) => {
      let unitRes = loadFileTree(next);
      return [...pre, ...unitRes];
    },
    [
      {
        isDirectory,
        relative,
        path,
        fileName,
      },
    ]
  );
}

const fileTree = generatorFileTree(process.cwd(), origin);

const fileArray = loadFileTree(fileTree);

const needToBeCompiled = (file) => {
  return (
    !/bin/g.test(file.relative) && /\.(js|jsx|node|mjs)$/.test(file.fileName)
  );
};

const entrys = fileArray.filter(
  (entry) => !entry.isDirectory && needToBeCompiled(entry)
);

const copyList = fileArray.filter(
  (entry) => !entry.isDirectory && !needToBeCompiled(entry)
);

console.log("copyList", copyList);

const baseInputs = entrys.map(({ relative, fileName }) => {
  let extname = path.extname(fileName);
  const fileNameWithOutPostfix = fileName.replace(extname, "");
  const dir = path.join(
    process.cwd(),
    directoriesLib,
    path.relative(origin, relative),
    ".."
  );
  // const isUmd = extname === '.mjs' || dir.indexOf('env') >= 0;
  const external = (id) => {
    return id.indexOf(relative) < 0;
  };

  return {
    input: {
      [fileNameWithOutPostfix]: relative,
    },
    external: external,
    output: {
      entryFileNames: `[name].js`,
      dir: dir,
      format: "umd",
      // format: isUmd ? 'umd' : 'es',
      sourcemap: false,
      name: fileNameWithOutPostfix + "-[name]",
    },
    plugins: [
      cleanup(),
      babel({
        // 添加babel插件
        exclude: "node_modules/**", // 排除node_modules下的文件
        runtimeHelpers: true,
        presets: [
          [
            "@babel/preset-react",
            {
              "preset-env": {},
              "styled-jsx": {},
              "class-properties": {},
            },
          ],
        ],
        plugins: ["@babel/plugin-syntax-dynamic-import"],
      }),
      nodeResolve({
        extensions: [".js", ".jsx", ".json", ".node", ".mjs"],
      }),
      commonjs({
        include: /node_modules/,
        namedExports: {
          react: Object.keys(React),
          "react-dom": Object.keys(ReactDOM),
          "styled-components": ["styled", "css", "ThemeProvider"],
          "@emotion/styled": ["styled"],
        },
      }),
      css(),
      terser(),
      uglify(),
    ],
  };
});

try {
  if (!fs.existsSync(directoriesLibPath)) {
    // console.log(fs.existsSync(directoriesLibPath))
    // console.log(fs.existsSync(directoriesLibPath))
    fs.mkdirSync(directoriesLibPath);
  }
} catch (e) {
  console.log(e);
}

copyList.forEach((item) => {
  const { path: filePath, relative, fileName } = item;
  const dir = path.join(
    process.cwd(),
    directoriesLib,
    path.relative(origin, relative),
    ".."
  );
  const distPath = path.join(dir, fileName);
  console.log({
    filePath,
    distPath,
    dir,
    origin,
    directoriesLib,
    relative,
    test: path.relative(origin, relative),
  });
  try {
    mkdirsSync(dir);
  } catch (e) {
    console.log("1", item);
  }
  fs.copyFileSync(filePath, distPath);
});

module.exports = baseInputs;
