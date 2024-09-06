---
title: OMP Error 15问题解决
date: 2024-08-15 21:53
updated: 2024-09-06 21:59
tags: #OpenMP多线程
---

#OpenMP多线程

OMP 是 "OpenMP" 的缩写，全称为 "Open Multi-Processing"。它是一种用于多线程并行编程的 API，主要用于 C、C++ 和 Fortran 语言。OpenMP 提供了一组编译指令、函数和环境变量，使开发者能够更容易地在多核处理器上编写并行代码。通过在代码中插入 OpenMP 指令，开发者可以控制如何在多个线程之间分配工作负载，从而加速计算任务。OpenMP 常用于科学计算、工程模拟等需要高性能计算的领域。

目前遇到以下报错

```log
OMP: Error #15: Initializing libomp140.x86_64.dll, but found libiomp5md.dll already initialized.
OMP: Hint This means that multiple copies of the OpenMP runtime have been linked into the program. That is dangerous, since it can degrade performance or cause incorrect results. The best thing to do is to ensure that only a single OpenMP runtime is linked into the process, e.g. by avoiding static linking of the OpenMP runtime in any library. As an unsafe, unsupported, undocumented workaround you can set the environment variable KMP_DUPLICATE_LIB_OK=TRUE to allow the program to continue to execute, but that may cause crashes or silently produce incorrect results. For more information, please see http://openmp.llvm.org/
```

以及：

```log
OMP: Error #15: Initializing libomp140.x86_64.dll, but found libomp140.x86_64.dll already initialized.
OMP: Hint This means that multiple copies of the OpenMP runtime have been linked into the program. That is dangerous, since it can degrade performance or cause incorrect results. The best thing to do is to ensure that only a single OpenMP runtime is linked into the process, e.g. by avoiding static linking of the OpenMP runtime in any library. As an unsafe, unsupported, undocumented workaround you can set the environment variable KMP_DUPLICATE_LIB_OK=TRUE to allow the program to continue to execute, but that may cause crashes or silently produce incorrect results. For more information, please see http://openmp.llvm.org/
```

目前解决方法为：
在代码中加入：

```python
import os
os.environ["KMP_DUPLICATE_LIB_OK"]="TRUE"
```
