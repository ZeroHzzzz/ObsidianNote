在 C++ 中，`#include` 头文件有两种使用方式，分别是使用尖括号 (`<>`) 和双引号 (`""`)。这两者的区别主要体现在头文件的搜索路径上

举个例子，假设我们有如下的项目结构：

```tree
project/
│
├── main.cpp
├── struct.h
└── lib/
    └── struct.h
```

在这个项目中，`project/` 目录下有一个 `struct.h` 文件，同时 `project/lib/` 目录下也有一个 `struct.h` 文件。假设 `lib/struct.h` 是某个系统库或第三方库中的头文件，`project/struct.h` 是你自己编写的头文件。

假设我们是这样引入头文件的：

```cpp
#include "struct.h"
```

这个时候，编译器选择的是我们自己编写的头文件。为什么？

而如果我们是这样引入头文件的：

```cpp
#include<struct.h>
```

那么编译器会选择`project/lib/` 目录下的 `struct.h` 文件。

这是因为，`#include "struct.h"` 会优先从当前工作目录（即 `project/`）中查找 `struct.h`，而`#include <struct.h>` 则会忽略当前目录，直接从库文件路径（如 `lib/` 目录）中查找 `struct.h`

那么，我们使用`#include <struct.h>`引入头文件的时候，如果在库文件目录中找不到这个文件，会不会回到当前目录查找？

答案是不会的。

当使用 **`#include <struct.h>`** 时，编译器只会在系统的标准库路径或指定的库路径中查找头文件，而**不会**回到当前工作目录查找。如果在库文件目录中找不到指定的头文件，编译器会报错，提示找不到文件，但它**不会尝试从当前工作目录**中查找文件。
