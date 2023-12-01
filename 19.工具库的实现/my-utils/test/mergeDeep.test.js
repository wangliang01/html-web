import {test, expect} from 'vitest';

import mergeDeep from '../src/lib/mergeDeep';


test('mergeDeep检验对象的合并', () => {
  const x = {
    foo: { bar: 3 },
    array: [{
      does: 'work',
      too: [ 1, 2, 3 ]
    }]
  }
  
  const y = {
    foo: { baz: 4 },
    quux: 5,
    array: [{
      does: 'work',
      too: [ 4, 5, 6 ]
    }, {
      really: 'yes'
    }]
  }

  const output = {
    foo: {
      bar: 3,
      baz: 4
    },
    array: [{
      does: 'work',
      too: [ 1, 2, 3 ]
    }, {
      does: 'work',
      too: [ 4, 5, 6 ]
    }, {
      really: 'yes'
    }],
    quux: 5
  }

  console.log(JSON.stringify(mergeDeep(x, y), null, 2))

  expect({...output}).toEqual(output)


})

test('mergeDeep检验数组的合并', () => {
  let a = {
    info: {
      name: 'mary'
    }
  }
  
  let b = {
    info: {
      age: '22'
    }
  }

  let c = {
    info: {
      age: '22',
      name: 'mary'
    }
  }

  expect(mergeDeep(a, b)).toEqual(c)
})

