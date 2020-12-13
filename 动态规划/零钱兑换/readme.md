322. 零钱兑换
给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。

 

示例 1:

输入: coins = [1, 2, 5], amount = 11
输出: 3 
解释: 11 = 5 + 5 + 1
示例 2:

输入: coins = [2], amount = 3
输出: -1


动态规划伪代码

/// dp[amount] 输入一个目标金额 返回凑出目标金额的最少硬币数量
def coinChange(coins,amount)


def dp[n]
        dp[0] = 0;

    for coin in conis 
        res = min(res,1+dep[n-coin]);
    return res

return dp[amount]
