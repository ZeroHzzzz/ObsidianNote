用来把 **reactive 对象的属性** 单独“解构”出来，保持响应性。常用于解构 props。

```js
import { reactive, toRefs } from 'vue'

const state = reactive({ count: 0, name: 'Vue' })
const { count, name } = toRefs(state)

count.value++ // 会同步更新 state.count
```
