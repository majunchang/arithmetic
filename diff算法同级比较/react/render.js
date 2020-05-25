export default function render (vnode, container) {
  const prevVNode = container.vnode
  if (prevVNode == null) {
    if (vnode) {
      // 没有旧的 VNode，使用 `mount` 函数挂载全新的 VNode
      mount(vnode, container)
      // 将新的 VNode 添加到 container.vnode 属性下，这样下一次渲染时旧的 VNode 就存在了
      container.vnode = vnode
    }
  } else {
    if (vnode) {
      // 有旧的 VNode，则调用 `patch` 函数打补丁
      patch(prevVNode, vnode, container)
      // 更新 container.vnode
      container.vnode = vnode
    } else {
      // 有旧的 VNode 但是没有新的 VNode，这说明应该移除 DOM，在浏览器中可以使用 removeChild 函数。
      container.removeChild(prevVNode.el)
      container.vnode = null
    }
  }
}

function patch (prevVNode, nextVNode, container) {
  /*
      patch中 经过一系列的比较和判断 
      对于同层级别的对比  调用
      patchElement(prevVNode, nextVNode, container)
      进而调用
      patchChildren(
  prevVNode.childFlags, // 旧的 VNode 子节点的类型
  nextVNode.childFlags, // 新的 VNode 子节点的类型
  prevVNode.children, // 旧的 VNode 子节点
  nextVNode.children, // 新的 VNode 子节点
  el // 当前标签元素，即这些子节点的父节点
  )
  */
  patchChildren(
    prevVNode.childFlags, // 旧的 VNode 子节点的类型
    nextVNode.childFlags, // 新的 VNode 子节点的类型
    prevVNode.children, // 旧的 VNode 子节点
    nextVNode.children, // 新的 VNode 子节点
    el // 当前标签元素，即这些子节点的父节点
  )
}

function patchChildren (
  prevChildFlags,
  nextChildFlags,
  prevChildren,
  nextChildren,
  container
) {
  // ....
  /*
    算法1
    这段代码中有两层嵌套的 for 循环语句，外层循环用于遍历新 children，内层循环用于遍历旧 children，其目的是尝试寻找具有相同 key 值的两个节点，如果找到了，则认为新 children 中的节点可以复用旧 children 中已存在的节点，这时我们仍然需要调用 patch 函数对节点进行更新，如果新节点相对于旧节点的 VNodeData 和子节点都没有变化，则 patch 函数什么都不会做(这是优化的关键所在)，如果新节点相对于旧节点的 VNodeData 或子节点有变化，则 patch 函数保证了更新的正确性。
  */
  /*
    算法2
    寻找过程中在旧 children 中所遇到的最大索引值。如果在后续寻找的过程中发现存在索引值比最大索引值小的节点，意味着该节点需要被移动。
  */
  /*
  插入新节点
      我们可以找到 li-a 节点所对应真实 DOM 的下一个节点，然后将 li-d 节点插入到该节点之前即可，
  */
  let lastIndex = 0
  let find
  for (let i = 0;i < nextChildren.length;i++) {
    let nextNode = nextChildren[i]
    find = false
    for (let j = 0;j < prevChildren.length;j++) {
      let prevVNode = prevChildren[j]
      if (nextNode.key = prevVNode.key) {
        find = true
        patch(prevVNode, nextNode, container)
        if (j < lastIndex) {
          // 需要移动
          // refNode 是为了下面调用 insertBefore 函数准备的
          const refNode = nextChildren[i - 1].el.nextSibling
          // 调用 insertBefore 函数移动 DOM
          container.insertBefore(prevVNode.el, refNode)
        }else {
          lastIndex = j
        }
      }
    }
    if (!find) {
      // 挂载新节点
      // 找到 refNode
      const refNode =
      i - 1 < 0
        ? prevChildren[0].el
        : nextChildren[i - 1].el.nextSibling
      mount(nextVNode, container, false, refNode)
    }
  }

  // 移除已经不存在的节点
  // 遍历旧的节点
  for (let i = 0; i < prevChildren.length; i++) {
    const prevVNode = prevChildren[i]
    // 拿着旧 VNode 去新 children 中寻找相同的节点
    const has = nextChildren.find(
      nextVNode => nextVNode.key === prevVNode.key
    )
    if (!has) {
      // 如果没有找到相同的节点，则移除
      container.removeChild(prevVNode.el)
    }
  }
}
