今天在安装pytorch的时候出现了以下报错：

```bash
[WinError 126] 找不到指定的模块。 Error loading "c:\Users\ZeroHzzzz\miniconda3\envs\test\lib\site-packages\torch\lib\fbgemm.dll" or one of its dependencies.

File "C:\Users\ZeroHzzzz\Desktop\Jarvis\Docbot\model.py", line 1, in <module> from transformers import AutoModelForSequenceClassification, AutoTokenizer, AutoModel File "C:\Users\ZeroHzzzz\Desktop\Jarvis\Docbot\create_index.py", line 3, in <module> from model import EmbeddingModel OSError: [WinError 126] 找不到指定的模块。 Error loading "c:\Users\ZeroHzzzz\miniconda3\envs\test\lib\site-packages\torch\lib\fbgemm.dll" or one of its dependencies.
```

但是我们到指定路径下检查后，发现这个`dll`实际上是存在的，那么根据报错信息，就是这个`dll`缺少了某个依赖。因此我们借助[依赖分析工具](https://github.com/lucasg/Dependencies/releases/tag/v1.11.1)来解决这个问题。

启动后，打开`fbegmm.dll`
![Pytorch fbgemm.dll依赖问题](Pasted image 20240815201540.png)
我们发现，`libomp140`这个依赖是缺失的，那么我们就去下载这个`dll`

[libomp140.x86_64.dll : Free .DLL download. (dllme.com)](https://www.dllme.com/dll/files/libomp140_x86_64/037e19ea9ef9df624ddd817c6801014e/download)

由于我们看到这个`asmjit.dll`在torch的lib目录下，因此我们将下载好的依赖也放到这里。

至此，问题得到了解决。
