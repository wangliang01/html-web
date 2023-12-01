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
  input: path.resolve(__dirname, 'src/index.ts'),
  // 输出
  output: [
    {
      // commonjs
      file: pkg.main,
      format: 'cjs',
    },
    {
      // esmodule
      file: pkg.module,
      format: 'es',
    },
    {
      // umd
      file: pkg.umd,
      format: 'umd',
      name: 'myUtils',
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