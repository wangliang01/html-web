/**
 * 两数之和
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
 */
function twoSum(nums, target) {
    const map = new Map()
    for (let i = 0; i < nums.length; i++) {
        let temp = target - nums[i] 
        if (map.get(temp)) {
            return [temp, nums[i]]
        }
        map.set(nums[i], i)
    }
    return []
}

// 测试


