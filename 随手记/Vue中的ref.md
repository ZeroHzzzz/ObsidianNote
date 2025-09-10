## 为什么要使用 ref

为什么我们需要使用带有 `.value` 的 ref，而不是普通的变量？

首先我们需要明确一点，ref 他是干什么的。我们拿 ref 来是为了实现响应式，也就是当一个数据更改的时候，能触发页面重新渲染。在标准的 JavaScript 中，检测普通变量的访问或修改是行不通的。然而，我们可以通过 getter 和 setter 方法来拦截对象属性的 get 和 set 操作。你可以将 ref 理解为一个封装了getter和setter的对象，这样当我们修改ref类型变量的数据的时候，就可以拦截到我们的读写操作，知道他何时被访问和更改。

另一个 ref 的好处是，与普通变量不同，你可以将 ref 传递给函数，同时保留对最新值和响应式连接的访问。当将复杂的逻辑重构为可重用的代码时，这将非常有用。

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

但是这里有一些需要注意的东西，就是在模板渲染上下文中，只有顶级的 ref 属性才会被解包。顶层就是你直接在 `setup()` 或 `<script setup>` 里声明并返回的那个变量，如果 `ref` 被包在一个普通对象里，就不是顶层了。在下面的例子中，`count` 和 `object` 是顶级属性，但 `object.id` 不是：
```js
const count = ref(0)
const object = { id: ref(1) }
```
因此，这个表达式按预期工作：
```js
{{ count + 1 }}
```
但这个**不会**，因为 `object.id` 在模板里不会自动解包，相当于 `ref(1)` 这个对象，所以 `ref(1) + 1` 没法算。
```js
{{ object.id + 1 }}
```
因此这种情况下我们应该这么写：
```js
{{ object.id.value + 1 }}
```
或者是让`object` 本身是响应式的，这样 `object.id` 就是普通响应式属性，不需要 `.value`。
```js
import { reactive } from 'vue'

const object = reactive({ id: 1 })
```
还有一种办法是用 `toRefs`，如果你一定要用 `ref` 包在对象里，可以用 `toRefs` 解开，这样 `id` 就是顶层的 ref 了，模板里 `{{ id + 1 }}` 没问题。
```js
import { reactive, toRefs } from 'vue'

const object = reactive({ id: 1 })
const { id } = toRefs(object)
```

但是！在 **文本插值** 的场景下（就是 `{{ ... }}` 里面，直接渲染到页面上的文字），Vue 给我们加了一个特性，就是如果最终值是一个 `ref`，Vue 会自动帮你 `.value`。
```js
const object = { id: ref(1) }

{{ object.id }}
```
这种情况下，**虽然 `object.id` 不是顶层 ref**，但因为它是插值的最终结果，Vue 会解包，等价于`{{ object.id.value }}`。

也就是说，**纯插值**`{{ object.id }}` 的时候，Vue 自动帮你解包；而参与运算`{{ object.id + 1 }}`的时候，Vue不会自动解包，你得自己处理。

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
