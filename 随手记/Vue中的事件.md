Vue 里的 **事件**（events）其实就是你在模板里监听用户的交互，比如点击、输入、提交等。

## 绑定事件

Vue 用 `v-on` 指令（缩写是 `@`）来监听事件：

```vue
<template>
    <button @click="handleClick">点我</button>
</template>

<script setup>
function handleClick() {
    console.log('按钮被点了')
}
</script>
```

这里 `@click` 就是监听 `click` 事件，即`v-on:click`

## 事件对象

默认 Vue 会把原生事件对象传给你：

```vue
<template>
    <input @input="onInput" />
</template>

<script setup>
function onInput(event) {
    console.log(event.target.value) // 获取输入框的值
}
</script>
```

## 事件修饰符

常见的有：

- `.stop` —— 阻止冒泡
- `.prevent` —— 阻止默认行为
- `.once` —— 只触发一次
- `.self` —— 只有点到元素本身时才触发
- `.capture` —— 使用捕获模式监听

### 阻止冒泡

在浏览器里，事件是有“传播过程”的，分三步：
1. **捕获阶段**：从最外层往目标元素走。
2. **目标阶段**：事件到达目标元素（比如按钮）。
3. **冒泡阶段**：从目标元素再往外层一层层冒上去。

默认情况下，我们监听事件时是在 **冒泡阶段** 触发的。
所以当你点按钮时，按钮的 `click` 先执行，然后事件继续往外层 div 传，外层 div 的 `click` 也会被触发。

因此加上`.stop`之后，点击按钮时，事件冒泡会被截断，也就是只会执行内层的事件。
```vue
<template>
  <div @click="onDivClick">
    外层 div
    <button @click.stop="onBtnClick">点我</button>
  </div>
</template>

<script setup>
function onDivClick() {
  console.log('div 被点了')
}
function onBtnClick() {
  console.log('按钮被点了')
}
</script>
```
这里点击按钮时，只有 `onBtnClick` 执行，**外层的 div 不会再触发 click**。

## 按键修饰符

在键盘事件里，可以直接指定按键：

```vue
<input @keyup.enter="onEnter" />
```

## 组件自定义事件

组件间可以用 `emit` 来触发事件，让父组件接收。
```vue
<!-- 父组件 -->
<Child @say-hello="handleHello" />

<script setup>
function handleHello(msg) {
    console.log(msg) // "Hello from child!"
}
</script>

<!-- 子组件 -->
<script setup>
const emit = defineEmits(['say-hello'])

function sayHello() {
    emit('say-hello', 'Hello from child!')
}
</script>
```
