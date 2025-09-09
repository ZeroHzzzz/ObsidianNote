`ref` 有两个主要的用法，一个在JS中，一个在模板里。

## 创建响应式数据
```vue
<template>
  <div>
    <p>{{ count }}</p>
    <button @click="count++">加一</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>
```

这里`ref(0)` 创建了一个响应式数字。在模板里用 `{{ count }}`，Vue 会自动帮你解开 `.value`。 JS 里如果你要修改，就要写 `count.value++`。