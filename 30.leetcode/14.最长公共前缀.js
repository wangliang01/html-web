/**
 * 最长公共前缀
 *编写一个函数来查找字符串数组中的最长公共前缀。
  如果不存在公共前缀，返回空字符串 ""。
 * 
 */

function findLongestCommonPrefix(strs) {
  if (strs.length === 0) return ''
  let prefix = strs[0]

  for (let i = 0; i < strs.length; i++) {
    if (!strs[i].includes(prefix)) {
      // 重新设置prefix,删除最后一位
      prefix = prefix.substr(0, prefix.length - 1);
      // 重置i=0
      i = 0
    }
  }
  return prefix
}