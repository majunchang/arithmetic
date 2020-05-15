const { cache, keys } = this
/* 获取组件的key */
const key = vnode.key == null
  ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
  : vnode.key

// 如果命中缓存 则直接从缓寸中拿vnode的组件实例
if (cache[key]) {
  vnode.componentInstance = cache[key].componentInstance
  remove(keys, key)
  keys.push(key)
}

// 没有命中缓存 则将其设置进缓存
else {
  cache[key] = vnode
  keys.push(key)
  if (this.max && keys.length > parseInt(this.max)) {
    pruneCacheEntry(cache, keys[0], keys, this._vnode)
  }
}

vnode.data.keepAlive = true
