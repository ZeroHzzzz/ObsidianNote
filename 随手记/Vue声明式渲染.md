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
这里我们没写“DOM 怎么改”，只说了“我需要一个 p 标签，它的内容跟 message 绑定”。当 `message` 变化时，Vue 会自动更新 DOM。