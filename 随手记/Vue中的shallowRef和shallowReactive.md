顾名思义，“浅层”响应式，只追踪最外层的变化。

```js
import { shallowRef } from 'vue'

const obj = shallowRef({ a: 1 })
obj.value.a = 2 // 不会触发更新
obj.value = { a: 3 } // 会触发更新
```
