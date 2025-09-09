## 基本概念

在 Vue 里，组件是“父子分明”的：

- **父组件 → 子组件**：用 `props` 传值。
- **子组件 → 父组件**：子组件不能直接改父组件的数据，就要用 **事件**，通过 `emit` 通知父组件。

可以理解成：子组件“喊一嗓子”（emit 事件），父组件“听到后做点事”。

```vue
<!-- 父组件 -->
<template>
    <Child @hello="handleHello" />
</template>

<script setup>
import Child from './Child.vue'

function handleHello(msg) {
    console.log('父组件收到了：', msg)
}
</script>

<!-- 子组件 -->
<template>
    <button @click="sayHello">点我</button>
</template>

<script setup>
const emit = defineEmits(['hello'])

function sayHello() {
    emit('hello', '你好，父组件！')
}
</script>
```

`emit` 可以传参数，事件可以携带数据，比如输入框的值、状态等。

```vue
emit('update-count', newCount)
```

父组件那边，`$event` 就是子组件传过来的参数。

```vue
<Child @update-count="count = $event" />
```

## v-model

Vue 3 里 `v-model` 本质上就是用 `prop` + `emit` 封装的。

```vue
<!-- 父组件 -->
<Child v-model="username" />

<!-- 子组件 -->
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

function updateValue(e) {
    emit('update:modelValue', e.target.value)
}
</script>

<template>
    <input :value="modelValue" @input="updateValue" />
</template>
```

当子组件输入时，触发 `emit('update:modelValue', xxx)`，父组件里的 `username` 就会更新。
