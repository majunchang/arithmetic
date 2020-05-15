leetcode
给定一个链表，判断链表中是否有环。

为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。

示例 1：

```
输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。
```

![image](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist.png)

示例  2：

输入：head = [1,2], pos = 0
输出：true
解释：链表中有一个环，其尾部连接到第一个节点。

示例 3：

输入：head = [1], pos = -1
输出：false
解释：链表中没有环。

进阶：

你能用 O(1)（即，常量）内存解决此问题吗？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/linked-list-cycle
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
地址：https://leetcode.com/problems/linked-list-cycle

剑指 offer 相似问题
题目描述
给一个链表，若其中包含环，请找出该链表的环的入口结点，否则，输出 null。

地址： https://www.nowcoder.com/practice/253d2c59ec3e4bc68da16833f79a38e4?tpId=13&tqId=11208&tPage=3&rp=1&ru=%2Fta%2Fcoding-interviews&qru=%2Fta%2Fcoding-interviews%2Fquestion-ranking

判断链表中是否有环：
https://zhuanlan.zhihu.com/p/31401474

### 推导公式

![](https://tva1.sinaimg.cn/large/007S8ZIlly1ges7ot7pe0j30ir06aa9y.jpg)
假设 x 为环前面的路程（黑色路程），a 为环入口到相遇点的路程（蓝色路程，假设顺时针走）， c 为环的长度（蓝色+橙色路程）

```

slow = x+m*c+a
fast = x+n*c+a

2slow = fast

2x+2(m*c)+2a = x+n*c+a

x = (n-2m)*c-a = (n-2m-1)*c+c-a

```
