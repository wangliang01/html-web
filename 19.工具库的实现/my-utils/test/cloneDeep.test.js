import {test, expect} from 'vitest'

import cloneDeep from '../src/lib/cloneDeep'

test('cloneDeep测试原始值', () => {
  expect(cloneDeep(null)).toEqual(null)
  expect(cloneDeep(undefined)).toEqual(undefined)
  expect(cloneDeep(0)).toEqual(0)
  expect(cloneDeep(1)).toEqual(1)
  expect(cloneDeep(-1)).toEqual(-1)
  expect(cloneDeep(NaN)).toEqual(NaN)
  expect(cloneDeep(Infinity)).toEqual(Infinity)
  expect(cloneDeep(-Infinity)).toEqual(-Infinity)
  expect(cloneDeep('')).toEqual('')
  expect(cloneDeep('1')).toEqual('1')
  expect(cloneDeep(true)).toEqual(true)
  expect(cloneDeep(false)).toEqual(false)
})

test('cloneDeep测试函数', () => {
  const fn = () => {}
  expect(cloneDeep(fn)).toEqual(fn)
})

test('cloneDeep测试数组', () => {
  const arr = [1, 2, 3]
  expect(cloneDeep(arr)).toEqual(arr)
})

test('cloneDeep测试对象', () => {
  const obj = {a: 1, b: 2, c: 3}
  expect(cloneDeep(obj)).toEqual(obj)
})

test('cloneDeep测试嵌套对象', () => {
  const obj = {a: 1, b: 2, c: 3, d: {e: 4, f: 5, g: 6}}
  expect(cloneDeep(obj)).toEqual(obj)
})

test('cloneDeep测试嵌套数组', () => {
  const obj = {a: 1, b: 2, c: 3, d: [1, 2, 3]}
  expect(cloneDeep(obj)).toEqual(obj)
})

test('cloneDeep测试循环引用', () => {
  const obj = {a: 1, b: 2, c: 3}
  obj.d = obj
  expect(cloneDeep(obj)).toEqual(obj)
})


test('cloneDeep测试缓存', () => {
  const obj = {a: 1, b: 2, c: 3}
  expect(cloneDeep(obj)).toEqual(obj)
  expect(cloneDeep(obj)).toEqual(obj)
})

test('cloneDeep测试深度克隆', () => {
  let a = {name: 'mary'}
  let b = cloneDeep(a)
  b.name = 'lucy'
  expect(a).toEqual({name: 'mary'})
  expect(b).toEqual({name: 'lucy'})

})