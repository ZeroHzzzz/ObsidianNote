效果如下：
![image.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202409160301191.png)
![image.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202409160302998.png)

## 基本使用

```callout
> [!NOTE] Title
> Content
```

obsidian 共提供了 13 种 callout

1. note
2. abstract, summary, tldr
3. info
4. todo
5. tip, hint, important
6. success, check, done
7. question, help, faq
8. warning, caution, attention
9. failure, fail, missing
10. danger, error
11. bug
12. example
13. quote, cite

![image.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202409160304637.png)

- 他们是大小写不敏感的，例如> [!BUG],> [!bug] 和 > [!Bug] 的效果是一样的；
- 同一类型的 callout 可能有很多种别名，例如 > [!info] 和 > [!todo] 的样式是一样的

## 高级使用

### Callout 的展开与折叠

```callout
> [!NOTE]+ 左边多了个加号
> 代表 Callout 默认展开

> [!NOTE]- 左边多了个减号
> 代表 Callout 默认折叠
```

### Callout 的嵌套使用

```callout
> [!question] Can callouts be nested?
> > [!todo] Yes!, they can.
> > > [!example]  You can even use multiple layers of nesting.
```

### Callout 的换行

要换行的地方用 > 连接保证 Callout 不断即可，你也可以直接用 shift enter 换行，这样 obsidian 会自动补充开头的 >

```callout
> [!NOTE] Callout 的换行
> 第一行
>
> 第二行
```

### Callout 自定义

如果你觉得 obsidian 提供的 13 种 callout 都不适用于你当前需要的场景，你还可以用 obsidian 提供的两个 css 变量自定义 callout

```css
--callout-color
--callout-icon
```
