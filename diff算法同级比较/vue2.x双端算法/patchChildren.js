function patchChildren(prevChildFlags, nextChildFlags, prevChildren, nextChildren) {
    let oldStartIdx = 0;
    let oldEndIdx = prevChildren.length - 1;
    let newStartIdx = 0;
    let newEndIdx = nextChildren.length - 1;
    let oldStartVNode = prevChildren[oldStartIdx];
    let oldEndVNode = prevChildren[oldEndIdx];
    let newStartVNode = nextChildren[newStartIdx];
    let newEndVNode = nextChildren[newEndIdx];
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVNode.key === newStartVNode.key) {
            // 调用 patch 函数更新
            patch(oldStartVNode, newStartVNode, container);
            // 更新索引，指向下一个位置
            oldStartVNode = prevChildren[++oldStartIdx];
            newStartVNode = nextChildren[++newStartIdx];
        } else if (oldEndVNode.key === newEndVNode.key) {
            // 调用 patch 函数更新
            patch(oldEndVNode, newEndVNode, container);
            // 更新索引，指向下一个位置
            oldEndVNode = prevChildren[--oldEndIdx];
            newEndVNode = nextChildren[--newEndIdx];
        } else if (oldStartIdx.key === newEndVNode.key) {
            // 调用 patch 函数更新
            patch(oldStartVNode, newEndVNode, container);
            // 将 oldStartVNode.el 移动到 oldEndVNode.el 的后面，也就是 oldEndVNode.el.nextSibling 的前面
            container.insertBefore(oldStartVNode.el, oldEndVNode.el.nextSibling);
            // 更新索引，指向下一个位置
            oldStartVNode = prevChildren[++oldStartIdx];
            newEndVNode = nextChildren[--newEndIdx];
        } else if (oldEndVNode.key === newStartVNode.key) {
            // 先调用 patch 函数完成更新
            patch(oldEndVNode, newStartVNode, container);
            // 更新完成后，将容器中最后一个子节点移动到最前面，使其成为第一个子节点
            container.insertBefore(oldEndVNode.el, oldStartVNode.el);
            // 更新索引，指向下一个位置
            oldEndVNode = prevChildren[--oldEndIdx];
            newStartVNode = nextChildren[++newStartIdx];
        } else {
            const idxInOld = prevChildren.findIndex((node) => node.key === newStartVNode.key);
            if (idxInOld >= 0) {
                const vnodeToMove = prevChildren[idxInOld];
                patch(vnodeToMove, newStartVNode, container);
                prevChildren[idxInOld] = undefined;
                container.insertBefore(vnodeToMove.el, oldStartVNode.el);
            } else {
                // 使用 mount 函数挂载新节点
                mount(newStartVNode, container, false, oldStartVNode.el);
            }
            newStartVNode = nextChildren[++newStartIdx];
        }
    }
    if (oldEndIdx < oldStartIdx) {
        // 添加新节点
        for (let i = newStartIdx; i <= newEndIdx; i++) {
            mount(nextChildren[i], container, false, oldStartVNode.el);
        }
    } else if (newEndIdx < newStartIdx) {
        // 移除操作
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
            container.removeChild(prevChildren[i].el);
        }
    }
}
