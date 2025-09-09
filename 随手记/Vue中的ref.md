Vue中的`ref`用来包装 **单个值**（数字、字符串、对象、DOM、组件实例等），访问时要 `.value`，模板里会自动解包，也就是不需要`.value`。

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

## 绑定到 DOM 元素

```vue
<template>
    <input ref="inputEl" placeholder="点按钮会聚焦我" />
    <button @click="focusInput">聚焦输入框</button>
</template>

<script setup>
import { ref } from 'vue'

const inputEl = ref(null)

function focusInput() {
    inputEl.value.focus()
}
</script>
```

## 绑定到子组件

```vue
<template>
    <ChildComponent ref="childRef" />
    <button @click="childRef.value.sayHello()">调用子组件方法</button>
</template>

<script setup>
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const childRef = ref(null)
</script>
```

如果 `ChildComponent` 里用 `defineExpose({ sayHello })` 暴露方法，那么父组件就可以通过 `childRef.value.sayHello()` 来调用。
