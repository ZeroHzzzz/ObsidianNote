---
title: Pytorch fbgemm.dll依赖问题
date: 2024-08-15 20:11
updated: 2024-09-06 21:55
tags: #PyTorch,#DLL,#fbegmm
---

#PyTorch #DLL #fbegmm

今天在安装pytorch的时候出现了以下报错：

```bash
[WinError 126] 找不到指定的模块。 Error loading "c:\Users\ZeroHzzzz\miniconda3\envs\test\lib\site-packages\torch\lib\fbgemm.dll" or one of its dependencies.

File "C:\Users\ZeroHzzzz\Desktop\Jarvis\Docbot\model.py", line 1, in <module> from transformers import AutoModelForSequenceClassification, AutoTokenizer, AutoModel File "C:\Users\ZeroHzzzz\Desktop\Jarvis\Docbot\create_index.py", line 3, in <module> from model import EmbeddingModel OSError: [WinError 126] 找不到指定的模块。 Error loading "c:\Users\ZeroHzzzz\miniconda3\envs\test\lib\site-packages\torch\lib\fbgemm.dll" or one of its dependencies.
```

但是我们到指定路径下检查后，发现这个`dll`实际上是存在的，那么根据报错信息，就是这个`dll`缺少了某个依赖。因此我们借助[依赖分析工具](https://github.com/lucasg/Dependencies/releases/tag/v1.11.1)来解决这个问题。

启动后，打开`fbegmm.dll`
![image.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408260016559.png)

我们发现，`libomp140`这个依赖是缺失的，那么我们就去下载这个`dll`

[libomp140.x86_64.dll : Free .DLL download. (dllme.com)](https://www.dllme.com/dll/files/libomp140_x86_64/037e19ea9ef9df624ddd817c6801014e/download)

将下载的`libomp140.dll`放入Pytorch的`lib`目录下。因为我们看到类似的`asmjit.dll`也在该目录下，因此将新的依赖文件放在同一目录下可以确保Pytorch能够找到并正确加载。

至此，问题得到了解决。
