---
title: CV-PIL-Read-Photos
date: 2024-08-05 17:05
updated: 2024-09-06 22:14
tags: #OpenCV,#pillow,#python
---

#OpenCV #pillow #python

Python 中，常用的图像处理库包括 OpenCV 和 PIL（Python Imaging Library）。但是两者读取图片有些区别，因而产生一些坑点。

首先我们来看一个代码，使用 OpenCV 和 PIL 读取图像，并将其转换为 PyTorch 的 Tensor 格式。

```python
import cv2
import torch
from torchvision import transforms
from PIL import Image

# 图像路径
path = './archive/imagesTr/CHNCXR_0640_1.png'

# 定义数据转换
data_transforms = {
    "train": transforms.Compose([
        transforms.ToTensor()
    ]),
    "test": transforms.Compose([
        transforms.ToTensor()
    ])
}

# 使用 OpenCV 读取图像
img = cv2.imread(path, cv2.IMREAD_GRAYSCALE)
print(img.shape)
img = data_transforms["test"](img)
print(img.shape)

# 使用 PIL 读取图像
label = Image.open(path).convert("L")
label = data_transforms["test"](label)
print(label.shape)
```

上面这个代码干了一下几件事：

**OpenCV 读取图像**
在上述代码中，`cv2.imread()` 用于读取图像。我们指定了 `cv2.IMREAD_GRAYSCALE` 参数，这意味着图像将被读取为灰度图像。读取的图像将以 NumPy 数组的形式返回，数组的形状可以通过 `img.shape` 获取。

**PIL 读取图像**
使用 `Image.open()` 函数可以通过 PIL 读取图像。为了与 OpenCV 的灰度读取保持一致，我们使用 `convert("L")` 将图像转换为灰度模式。PIL 读取的图像以 PIL Image 对象的形式返回。

**转换为 PyTorch Tensor**
无论是使用 OpenCV 还是 PIL 读取图像，我们最终都希望将图像转换为 PyTorch 的 Tensor 格式，以便输入到神经网络中。为此，我们使用了 torchvision 提供的 `transforms.ToTensor()` 转换。

## 坑点

### OpenCV 和 PIL 读取图像的格式差异

一个显而易见的差异是 OpenCV 和 PIL 在读取图像时使用的默认格式不同。OpenCV 默认读取图像为 BGR 格式，而 PIL 默认使用 RGB 格式。这在处理彩色图像时尤为重要，因为如果不注意这一点，可能会导致颜色通道的错误匹配。虽然在本示例中，我们读取的是灰度图像，因此这一点并不会引发问题，但在彩色图像处理中需要格外小心。

### 数据类型和范围的差异

OpenCV 读取的图像是以 NumPy 数组的形式存在，数据类型通常为 `uint8`，值范围是 [0, 255]。而使用 `transforms.ToTensor()` 进行转换时，NumPy 数组会被转换为一个浮点数 Tensor，值的范围是 [0, 1]。

相比之下，PIL 读取图像后使用 `transforms.ToTensor()` 转换时，PIL Image 对象中的每个像素值同样会被归一化到 [0, 1] 范围内。

这种差异在处理和显示图像时可能会产生问题。例如，如果你在使用 OpenCV 读取图像并进行某些操作后，再用 PIL 显示图像，可能会看到意想不到的结果，因为数值范围的差异可能导致图像亮度和对比度异常。

### 数据形状的差异

当使用 OpenCV 读取灰度图像时，返回的 NumPy 数组是一个二维数组，形状为 `(height, width)`。而使用 PIL 读取灰度图像并进行 Tensor 转换后，返回的是一个三维 Tensor，形状为 `(1, height, width)`，即多了一个颜色通道维度。这是因为 PyTorch 中的 Tensor 通常期望有一个明确的通道维度，无论图像是彩色还是灰度。

这意味着在使用 OpenCV 读取灰度图像并转换为 Tensor 时，我们可能需要手动添加一个通道维度，以使其与 PIL 的输出保持一致。可以使用以下代码进行转换：

```python
img = img[..., None]  # 增加一个维度
img = data_transforms["test"](img)
```
