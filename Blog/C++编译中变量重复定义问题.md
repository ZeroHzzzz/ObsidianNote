---
title: C++编译中变量重复定义问题
date: 2024-09-04 21:31
updated: 2024-09-06 22:36
tags: ['#重复定义', '#Cpp', '#extern关键字']
---

#重复定义 #Cpp #extern关键字

C++编译过程中出现变量重复定义问题非常常见，通常表现为以下报错：

```bash
[build] CMakeFiles\NewPlayer.dir/objects.a(imagehandler.cpp.obj):C:/Users/ZeroHzzzz/Desktop/QT_new/src/NewPlayer/imagehandler.h:197: multiple definition of `speedlineLeft'
[build] CMakeFiles\NewPlayer.dir/objects.a(datahandler.cpp.obj):C:/Users/ZeroHzzzz/Desktop/QT_new/src/NewPlayer/imagehandler.h:197: first defined here
```

出现这种报错通常分为以下几种情况：

### 全局变量重复定义

在多个源文件中定义了相同的全局变量，而没有使用`extern`关键字声明。这会导致链接器在合并目标文件时发现多个相同的符号定义。

### 头文件中的直接定义变量

在C或C++中，**不要直接在头文件（.h 文件）中定义全局变量**，因为这样做会导致在多个文件中包含同一个头文件时出现多次定义的问题（即“重复定义”错误）

在头文件中直接定义了变量或函数，这些头文件被多个源文件包含。每次包含都会生成该变量或函数的一个定义，最终在链接时产生冲突。我们通常的做法是在头文件中声明一个变量但是不去定义他，然后再cpp文件中定义变量。

错误案例：

```cpp
// myheader.h
#ifndef MYHEADER_H
#define MYHEADER_H

int myVar;

#endif // MYHEADER_H

// mysource.cpp
#include "myheader.h"

extern int myVar = 42;  // 定义变量
```

正确做法：

```cpp
// myheader.h
#ifndef MYHEADER_H
#define MYHEADER_H

extern int myVar;  // 仅声明，不定义

#endif // MYHEADER_H

// mysource.cpp
#include "myheader.h"

int myVar = 42;  // 定义变量

// othersource.cpp
#include "myheader.h"

void printVar() {
    std::cout << "myVar: " << myVar << std::endl;  // 使用变量
}

```

### 静态变量

在头文件中定义了非静态的局部变量，如果这个头文件被多个源文件包含，也会导致重复定义问题。

## 解决方法：

### 使用`extern`声明全局变量

如果需要在多个文件中使用相同的全局变量，可以在一个源文件中定义变量，在其他源文件中使用`extern`关键字来声明。例如：

```cpp
// 变量声明在header.h中
extern int globalVar;

// 变量定义在main.cpp中
int globalVar = 0;
```

### 头文件中使用`inline`或`static`关键字

如果头文件中有函数定义，可以使用`inline`关键字来避免重复定义。例如：

```cpp
// header.h
inline void func() {
    // 函数实现
}
```

对于需要在头文件中定义的局部变量，可以使用`static`关键字：

```cpp
// header.h
static int localVar = 0;
```

### 使用包含保护

确保头文件有包含保护，防止同一个头文件被多次包含。可以通过`#ifndef`，`#define`，`#endif`来实现

[[C++编译中头文件重复包含问题]]

“包含保护”只是防止头文件被多次包含到**同一个**源文件中，它无法防止多个源文件中出现同样的变量定义

假设你在头文件中定义了一个全局变量：

```cpp
// myheader.h
#ifndef MYHEADER_H
#define MYHEADER_H

int myVar = 42;  // 在头文件中定义变量

#endif // MYHEADER_H
```

然后有两个源文件`a.cpp`和`b.cpp`都包含了这个头文件，当你编译时，`a.cpp`和`b.cpp`都会各自包含并定义`myVar`，这意味着编译器会看到两个不同的文件中都有一个全局变量`myVar`的定义，从而导致**重复定义**错误。正确的做法是**在头文件中声明变量**，而**在某个源文件中定义变量**。

### 使用命名空间

将全局变量放入命名空间内，可以减少不同文件中相同变量名的冲突：

```cpp
// header.h
namespace MyNamespace {
    extern int globalVar;
}

// main.cpp
int MyNamespace::globalVar = 0;
```
