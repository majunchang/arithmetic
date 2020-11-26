/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  let dp = new Array(amount + 1).fill(Infinity)
  dp[0] = 0
  // dp[i]=x 表示 当目标金额为i时  至少需要x玫硬币
  for (let i = 0;i <= amount;i++) {
    for (let j = 0;j < coins.length;j++) {
      if (i - coins[j] >= 0) {
        dp[i] = Math.min(dp[i], 1 + dp[i - coins[j]])
      }
    }
  }
  return dp[amount]
}

console.log(coinChange([1, 2, 5], 11))
