const people = [
  {
    name: '张三',
    age: 18,
    sex: '男'
  },
  {
    name: '李四',
    age: 19,
    sex: '女'
  },
  {
    name: '王五',
    age: 18,
    sex: '男'
  },
  {
    name: '赵六',
    age: 19,
    sex: '男'
  },
  {
    name: '田七',
    age: 20,
    sex: '女'
  },
  {
    name: '王八',
    age: 19,
    sex: '男'
  },
  {
    name: '王九',
    age: 18,
    sex: '男'
  },
  {
    name: '王十',
    age: 20,
    sex: '男'
  }
]

// 将上面的数组按照age进行分组
// let result = people.reduce((acc, cur) => {
//   if (!acc[cur.age]) {
//     acc[cur.age] = []
//   }
//   acc[cur.age].push(cur)
//   return acc
// }, {})

// console.log(result)


// 写一个通用的分组函数
// function groupBy(arr, key) {
//   return arr.reduce((acc, cur) => {
//     if (!acc[cur[key]]) {
//       acc[cur[key]] = []
//     }
//     acc[cur[key]].push(cur)
//     return acc
//   }, {})
// }

// // 测试
// console.log(groupBy(people, 'age'))
// console.log(groupBy(people, 'sex'));

// 再更加通用一点
function groupBy(arr, generateKey) {
  // 参数归一化
  if (typeof generateKey === 'string') {
    const propName = generateKey
    generateKey = item => item[propName]
    
  }
  return arr.reduce((acc, cur) => {
    let key = generateKey(cur)
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(cur)
    return acc
  }, {})
}


const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 测试
console.log(groupBy(people, 'age'));
console.log(groupBy(people, item => "性别" + item.sex));
console.log(groupBy(nums, item => item % 2 === 0 ? '偶数' : '奇数'));

