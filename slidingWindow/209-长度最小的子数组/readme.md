给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的连续子数组，并返回其长度。如果不存在符合条件的连续子数组，返回 0。

示例: 

输入: s = 7, nums = [2,3,1,2,4,3]
输出: 2
解释: 子数组 [4,3] 是该条件下的长度最小的连续子数组。
进阶:

如果你已经完成了O(n) 时间复杂度的解法, 请尝试 O(n log n) 时间复杂度的解法。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/minimum-size-subarray-sum


题解01

![](https://pic.leetcode-cn.com/31fcc38eeeb41d57161563629b6fc6e05589a23261955c97148c30c631717be8-1.jpg)


题解02

用滑动窗口来记录序列， 每当滑动窗口中的 sum 超过 s，就去删掉头部的值，并根据先进先出的原则更新滑动窗口，直至 sum 刚好小于 s

![](https://pic.leetcode-cn.com/44a234b3825b5e5c79205eb3cd6b56721807670ba7d6e07c5818ee8478ace2b9.jpg)

