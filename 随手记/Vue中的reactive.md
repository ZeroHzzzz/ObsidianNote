Vue中的`reactive`用来包装 **对象或数组**，让它们整体变成响应式。和[[Vue中的ref|ref]]不同，他不需要 `.value`，能直接改属性。

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
state.count++ // 不用 .value
```

相比之下，ref更适合单个值，而reactive更适合对象。
