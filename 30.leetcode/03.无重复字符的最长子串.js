/**
 * 查找无重复字符的最长子串
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 * 
 */

function findLongestSubstring(s) {
    let maxLength = 0;
    let start = 0;
    let charIndexMap = new Map();

    for (let i = 0; i < s.length; i++) {
        if (charIndexMap.has(s[i]) && charIndexMap.get(s[i]) >= start) {
            start = charIndexMap.get(s[i]) + 1;
        }
        charIndexMap.set(s[i], i);
        maxLength = Math.max(maxLength, i - start + 1);
    }
    return maxLength;
}