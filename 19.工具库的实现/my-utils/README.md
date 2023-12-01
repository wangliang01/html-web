## 创建项目 my-utils
```bash
mkdir my-utils
```

## npm init 生成package.json
```bash
npm init -y
```

## 规划目录结构
> |--src: 源代码目录
> |--test: 测试代码
> |--rollup.config.js:  rollup配置文件 
> |--tsconfig.json : ts配置文件（可通过tsc --init生成）
> |--.gitignore  

## 安装依赖
### 1.Rollup相关
> rollup
> @rollup/plugin-node-resolve ：解析第三方库依赖（即 node_module 内的依赖）
> @rollup/plugin-commonjs：识别 commonjs 格式依赖
> rollup-plugin-terser：（可选）代码压缩

```bash
pnpm i --save-dev @rollup/plugin-node-resolve @rollup/plugin-commonjs rollup rollup-plugin-terser
```

### 2.TypeScript相关
> typescript
> rollup-plugin-typescript2：编译 TypeScript

```bash
pnpm i --save-dev typescript rollup-plugin-typescript2

```

### 3.Babel相关
> @babel/core
> @rollup/plugin-babel：rollup babel 插件
> @babel/preset-env：babel 预设
> @babel/plugin-transform-runtime：转义代码

```bash
pnpm i --save-dev @babel/core @rollup/plugin-babel @babel/preset-env @babel/plugin-transform-runtime

```

## 编译配置

### 1.rollup配置文件 

```js
// rollup.config.js
import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import rollTypeScript from 'rollup-plugin-typescript2'
import {DEFAULT_EXTENSIONS} from '@babel/core'
import {terser} from 'rollup-plugin-terser'
import pkg from './package.json'
const env = process.env.NODE_ENV

const config = {
  // 入口
  input: 'src/index.ts',
  // 输出
  output: [
    {
      // commonjs
      file: pkg.main,
      format: 'cjs',
      sourcemap: env !== 'production'
    },
    {
      // esmodule
      file: pkg.module,
      format: 'es',
      sourcemap: env !== 'production'
    },
    {
      // umd
      file: pkg.umd,
      format: 'umd',
      name: 'myUtils',
      sourcemap: env !== 'production'
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    rollTypeScript({
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    }),
    babel({
      // 编译库使用 
      babelHelpers: 'runtime', 
      // 只转换源代码，不转换外部依赖 
      exclude: 'node_modules/**', 
      // babel 默认不支持 ts 需要手动添加 
      extensions: [ 
          ...DEFAULT_EXTENSIONS, 
          '.ts', 
      ], 
    }),
  ]
}

if (env === 'production') {
  config.plugins.push(terser({
    compress: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      warnings: false
    }
  }))
}

export default config
```

### 2.tsconfig.json编译配置
```json
{
  "compilerOptions": {
    /* 基础选项 */
    "target": "esnext", /* 指定 ECMAScript 目标版本：'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */
    "module": "esnext", /* 输出的代码使用什么方式进行模块化： 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
    "lib": [ /* 指定引用的标准库 */
      "esnext",
      "dom",
      "dom.iterable",
    ],
    "allowJs": true, /* 允许编译 js 文件 */
    "removeComments": true, /* 输出不包含注释 */
    /* 严格类型检查选项 */
    "strict": true, /* 启用所有严格类型检查选项 */
    "noImplicitAny": true, /* 检查隐含 any 类型的表达式和声明 */
    "strictNullChecks": false, /* 严格空检查. */
    /* 额外检查 */
    "noUnusedLocals": true, /* 检查无用的变量. */
    /* Module Resolution Options */
    "moduleResolution": "node", /* 指定模块查找策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6) */
    "baseUrl": "./", /* 查找模块的基础目录 */
    "paths": {
      "@/*": [
        "src/*"
      ]
    }, /* 记录 baseUrl 的模块路径查找别名 */
    "types": [], /* 类型声明文件 */
  },
  "include": [
    /* 指定编译处理的文件列表 */
    "src/*.ts",
    "src/types.ts"
  ],
  "exclude": []
}
```

这里我们将 TypeScript 配置分为两个配置文件：tsconfig.json（通用配置，rollup typescript 插件使用）和 tsconfig.types.json（编译 typescript 类型声明文件使用），关于如何编译类型声明文件


### 3.tsconfig.types.json

```json
// tsconfig.types.json 
{ 
    // 继承 tsconfig.json 中的通用配置 
    "extends": "./tsconfig.json", 
    "compilerOptions": { 
        "declaration": true, /* 生成相应的 '.d.ts' file. */ 
        "declarationDir": "./dist/types", /* 类型声明文件输出目录 */
        "emitDeclarationOnly": true, /* 只生成声明文件，不生成 js 文件*/ 
        "rootDir": "./src", /* 指定输出文件目录（用于输出），用于控制输出目录结构 */ 
    } 
}

```

### babel.config.js babel配置

```js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        /* Babel 会在 Rollup 有机会做处理之前，将我们的模块转成 CommonJS，导致 Rollup 的一些处理失败 */
        modules: false,
      },
    ],
  ],
  plugins: [
    [
      // 与 babelHelpers: 'runtime' 配合使用
      "@babel/plugin-transform-runtime",
    ],
  ],
};


```

### package.json 配置

```json
{
  "name": "my-utils",
  "version": "1.0.0",
  "description": "",
  "main": "./dist/index.js",
  "module": "./dist/index.es.js",
  "umd": "./dist/index.umd.js",
  "types": "./dist/types/index.d.ts",
  "scripts": {
    "clean:dist": "rimraf dist",
    "build:types": "npm run clean:dist && tsc -b ./tsconfig.types.json",
    "build": "npm run build:types && rollup -c",
    "test": "vitest",
    "pretest": "npm run build"
  },
  "keywords": [
    "my-utils",
    "utils"
  ],
  "author": "wangliang",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.23.5",
    "@babel/plugin-transform-runtime": "^7.17.0",
    "@babel/preset-env": "^7.16.11",
    "@rollup/plugin-babel": "^5.3.1",
    "@rollup/plugin-commonjs": "^21.0.3",
    "@rollup/plugin-node-resolve": "^13.1.3",
    "rimraf": "^3.0.2",
    "rollup": "^2.70.1",
    "rollup-plugin-terser": "^7.0.2",
    "rollup-plugin-typescript2": "^0.31.2",
    "typescript": "^4.6.3",
    "vitest": "^0.34.6"
  },
  "files": [
    "dist"
  ]
}

```