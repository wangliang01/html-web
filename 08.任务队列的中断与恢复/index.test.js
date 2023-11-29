import {test, expect} from 'vitest'

import {processTasks} from './index'

// 测试vitest是否能够正常工作
test('init', () => {
  expect(1).toBe(1)
})

// 测试异步任务
test('processTasks', async () => {
  const tasks = [
    () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(1)
        }, 1000)
      })
    },
    () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(2)
        }, 100)
      })
    },
    () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(2)
        }, 100)
      })
    },
    () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(2)
        }, 100)
      })
    }
  ]

  const {start, pause} = processTasks(...tasks)


  const result = await start()


  expect(result).toEqual([1, 2, 2, 2])
})