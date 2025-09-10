传统的渲染方法是命令式渲染，你要告诉浏览器“怎么干”。比如：
```js
const div = document.createElement('div')
div.textContent = 'Hello Vue'
document.body.appendChild(div)
```
而声明式渲染则是，你只需要声明“结果长什么样”，Vue 会帮你完成渲染。
```vue
<template>
  <p>{{ message }}</p>
</template>

<script setup>
import { ref } from 'vue'
const message = ref('Hello Vue')
</script>
```
这里我们没写“DOM 怎么改”，只说了“我需要一个 p 标签，它的内容跟 message 绑定”。当 `message` 变化时，Vue 会自动更新 DOM。其实就是我们只需要描述UI 的最终状态，不需要手动操作 DOM。Vue 自动帮你处理数据和视图的同步。

Vue 的声明式渲染依赖两点：
- **响应式数据**（ref、reactive）：数据变了 Vue 能知道。
- **模板语法**（{{ }} 插值、指令）：用声明的方式把数据和 DOM 绑定。