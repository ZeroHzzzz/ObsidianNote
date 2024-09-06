---
title: Ubuntu掉盘问题记录
date: 2024-08-05 17:05
updated: 2024-09-06 22:11
tags: #Ubuntu
---

#Ubuntu

最近属实是有点太压抑了，于是斥巨资买下了HOGWARTS，然后在下载的时候发现游戏盘掉了，表现为：

```
unable to access "xxx", an operation is pending
```

找了一下，原因是上一次拔硬盘的时候没有安全退出

【解决方法】

```bash
sudo fdisk -l
```

![image.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408281844254.png)

最后的设备/dev/sda1就是出问题的磁盘，于是我们需要修复挂载错误的相应分区

```bash
sudo ntfsfix /dev/sda1
```

然后再次插入硬盘就可以正常使用了，后续有空了可能会对挂载失败问题进行更深入的探究
