# 启用数据并行运算

```python
import torch.nn as nn
model = nn.DataParallel(model)
```

# CUDNN benchmark

CUDNN benchmark 会在运行时尝试多个可用的卷积算法，并根据实际运行时间选择最快的算法。这种动态选择使得模型可以在不同的硬件和数据条件下获得最佳性能

```python
import torch
torch.backends.cudnn.benchmark = True
```
