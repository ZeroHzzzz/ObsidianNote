`BCEWithLogitsLoss` 将 `Sigmoid` 激活函数和二元交叉熵损失（`BCELoss`）结合在一起，直接使用 logits（未经过 `Sigmoid` 激活的模型输出）计算损失，避免了数值不稳定性问题。

但是这里需要注意，使用`BCEWithLogitsLoss`损失函数的时候，计算`Loss`的时候是不需要经过`Sigmoid`层的，但是输出结果的时候需要。同时，`BCELoss` 计算二元交叉熵损失要求输入值已经经过 `Sigmoid` 激活。

使用样例：

## 使用`BCEWithLogitsLoss`

```python
import torch
import torch.nn as nn

class SimpleNNWithLogits(nn.Module):
    def __init__(self):
        super(SimpleNNWithLogits, self).__init__()
        self.fc = nn.Linear(10, 1)  # 假设输入是10维，输出是1维

    def forward(self, x):
        return self.fc(x)  # 输出logits

# 创建模型和损失函数
model = SimpleNNWithLogits()
criterion = nn.BCEWithLogitsLoss()

# 假设一些输入和目标
inputs = torch.randn(5, 10)  # 5个样本，每个样本10维
targets = torch.tensor([1, 0, 1, 0, 1], dtype=torch.float32).unsqueeze(1)

# 前向传播
outputs = model(inputs)

# 计算损失
loss = criterion(outputs, targets)
print("Training loss with BCEWithLogitsLoss:", loss.item())

# 推理阶段
logits = model(inputs)
probabilities = torch.sigmoid(logits)
print("Predicted probabilities with BCEWithLogitsLoss:", probabilities)
```

## 使用`BCELoss`

```python
import torch
import torch.nn as nn

class SimpleNNWithSigmoid(nn.Module):
    def __init__(self):
        super(SimpleNNWithSigmoid, self).__init__()
        self.fc = nn.Linear(10, 1)  # 假设输入是10维，输出是1维
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        x = self.fc(x)
        return self.sigmoid(x)  # 输出概率

# 创建模型和损失函数
model = SimpleNNWithSigmoid()
criterion = nn.BCELoss()

# 假设一些输入和目标
inputs = torch.randn(5, 10)  # 5个样本，每个样本10维
targets = torch.tensor([1, 0, 1, 0, 1], dtype=torch.float32).unsqueeze(1)

# 前向传播
outputs = model(inputs)

# 计算损失
loss = criterion(outputs, targets)
print("Training loss with BCELoss:", loss.item())

# 推理阶段
probabilities = model(inputs)
print("Predicted probabilities with BCELoss:", probabilities)
```
