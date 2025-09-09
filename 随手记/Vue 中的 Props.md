在 Vue 的组件化开发中，组件之间经常需要传递数据。`props` 就是父组件向子组件传值的方式。在日常开发中，你可以把组件类比为函数：
- **函数的参数**：外部传进来 → 内部使用。
- **组件的 props**：父组件传进来 → 子组件使用。
也就是说，`props` 就是**子组件的入口参数**。其特点在于他的单向数据流，只能由父组件传给子组件，子组件不能直接修改 `props`。


## 基础用法

```vue
<!-- 父组件 -->
<template>
  <ChildComp :msg="parentMsg" :count="5" />
</template>

<script setup>
import ChildComp from './ChildComp.vue'
const parentMsg = "来自父组件的数据"
</script>

<!-- 子组件 -->
<template>
  <p>{{ msg }} - {{ count }}</p>
</template>

<script setup>
const props = defineProps({
  msg: String,
  count: Number
})
</script>
```

`:msg="parentMsg"`指的是动态绑定，即`v-bind:msg="parentMsg"`

同时子组件可以对 `props` 的类型、默认值、必填做约束：
```js
defineProps({
  title: {
    type: String,
    default: '默认标题'
  },
  count: {
    type: Number,
    required: true
  }
})
```

## 透传

Props能一次性传进去一整个对象。

```vue
<!-- 父组件 -->
<UserCard v-bind="user" />

<script setup>
const user = { name: 'Tom', age: 22 }
</script>

<!-- 子组件 -->
<script setup>
const props = defineProps({ name: String, age: Number })
</script>
```

## 动态 Props

正常情况下，我们写的是这样：
```vue
<ChildComp title="固定标题" />
```
此时这里 `title` 是写死的字符串。如果要传一个变量，就写：
```vue
<ChildComp :title="parentTitle" />
```
此时这里的 `title` 是固定的 **属性名**，值是变量，相当于`v-bind:title="parentTitle"`

有时候，我们连 **属性名** 都想动态决定，因此我们写成：
```vue
<ChildComp :[propName]="value" />
```
这里的 `propName` 是一个变量，表示 **属性名**。本质上，`[ ]` 里写的是 **JS 表达式**，结果会当作属性名。

```vue
<!-- 父组件 -->
<template>
  <ChildComp :[currentProp]="propValue" />
  <button @click="toggleProp">切换 Prop 名</button>
</template>

<script setup>
import { ref } from 'vue'
import ChildComp from './ChildComp.vue'

const currentProp = ref("title")
const propValue = ref("Hello Vue!")

function toggleProp() {
  currentProp.value = currentProp.value === "title" ? "msg" : "title"
}
</script>

<!-- 子组件 -->
<script setup>
const props = defineProps({
  title: String,
  msg: String
})
</script>

<template>
  <p>title: {{ title }}</p>
  <p>msg: {{ msg }}</p>
</template>
```