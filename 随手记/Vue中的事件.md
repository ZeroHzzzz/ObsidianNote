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

### .stop 阻止冒泡

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

### .self 只有点到元素本身时才触发

`.self` 修饰符的意思是：**只有事件的触发目标（target）是当前这个元素本身时，才会触发监听器**。

换句话说：如果你点到了它的子元素，事件冒泡传到父元素时，父元素的监听器不会触发。

```vue
<template>
    <div @click.self="onDivClick" style="padding:20px; background:lightblue">
        这是外层 div
        <button>点我</button>
    </div>
</template>

<script setup>
function onDivClick() {
    console.log('点到 div 本身了！')
}
</script>
```

在这个例子里，如果你点 **div 空白处**：事件目标是 `div` 本身 → 会触发 `onDivClick`；如果你点 **按钮**：事件目标是 `button` → div 上的事件监听器不会触发。

他和`.stop`的区别就是，`.stop`无论事件目标是谁，都会先执行，然后阻止往外传播；`.self`则是根本不会触发监听器，除非点到的是元素本身。`.self` 就是用来 **过滤掉子元素触发的冒泡**，只保留元素自己被点到的情况。

其实就是说`.stop`用于处理子组件向父组件的事件，用在子组件上；而`.self`用于让父组件不要处理子组件的事件，用在父组件上。

- **`.stop` 更像是“子组件说：别把我的事件传给父组件了”。**
- **`.self` 更像是“父组件说：我只认自己被点，子组件的事我不管”。**

### .capture 使用捕获模式监听

在 Vue 里写 `@事件名.capture`，就表示：**在捕获阶段触发事件监听，而不是默认的冒泡阶段**。

```vue
<template>
    <div @click.capture="onParentClick">
        父元素
        <button @click="onChildClick">子按钮</button>
    </div>
</template>

<script setup>
function onParentClick() {
    console.log('父元素捕获到 click')
}
function onChildClick() {
    console.log('子按钮 click')
}
</script>
```

点击按钮时会输出：

```log
父元素捕获到 click
子按钮 click
```

如果 没有 `.capture`，顺序是：

```log
子按钮 click
父元素捕获到 click
```

也就是说，默认的冒泡行为是目标元素先触发，再逐层往外，而加上`.capture`之后，外层会在捕获阶段先触发，再到目标元素。

### .prevent 阻止默认行为

在浏览器里，很多元素的事件本身就会带“自带的动作”，这就是 **默认行为**。以下是几个常见的例子：

- **表单提交**：点击 `<button type="submit">` 时，会刷新页面。
- **链接跳转**：点击 `<a href="...">` 时，会跳到新的地址。
- **输入框**：在 `<input type="checkbox">` 点一下，会自动勾选或取消。
- **文本选择**：在网页上拖动鼠标，会自动选中文字。
- **右键点击**：会弹出浏览器的右键菜单。

在 Vue 里加 `.prevent` 就相当于在事件回调里写了`event.preventDefault()`，它会阻止 **这个事件的默认行为**。但他不能挑选阻止事件的什么默认行为，`preventDefault()` 要么执行（阻止这个事件的默认行为），要么不执行。它阻止的是 **该事件唯一对应的默认行为**，不能选择性阻止某一部分默认行为。

```vue
<form @submit.prevent="onSubmit">
  <button type="submit">提交</button>
</form>
```

如上所示，使用了`.prevent`之后，提交表单将不会刷新页面。

### .once 只触发一次

`.once`的作用是只执行一次监听器，影响的是 **当前监听器的执行次数**。

```vue
<button @click.stop.once="onClick">点我</button>
```

一次点击时只触发按钮事件，且不冒泡；之后就什么都不会发生了。

## 按键修饰符

在键盘事件里，可以直接指定按键：

```vue
<input @keyup.enter="onEnter" />
```

## 组件自定义事件

组件间可以用 [[Vue中的emit|emit]] 来触发事件，让父组件接收。

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
