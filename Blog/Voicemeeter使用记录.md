---
title: Voicemeeter使用记录
date: 2024-08-05 17:05
updated: 2024-09-06 22:35
tags: ['#Voicemeeter']
---

#Voicemeeter

# 一、基础知识

## 输入与输出

- 硬件输入：就是现实的电脑上的麦克风、你头戴耳麦的麦克风等硬件录音设备。【硬件输入→（发出）→声音信号】（请注意这里的声音指的是电路中的声音信号，而不是你实际听到的声音。下同。）
- 硬件输出：就是现实的扬声器喇叭、你头戴耳麦的耳机等硬件发声设备。【声音信号→（被接收）→硬件输出】

- 虚拟输入：就是虚拟录音设备，专门监听系统中各种软件发出的声音信号。【声音信号→（被接收）→虚拟输入】

![virtual_input.jpg](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408281845604.png)

- 虚拟输出：就是虚拟发声设备，有一个虚拟的扬声器，负责向别的设备发出声音信号。【虚拟输出→（发出）→声音信号】

![virtual_output.jpg](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408281845439.png)

- 通道：用于接收和转发声音信号的中间人。

## 设置电脑的输入输出设备

自行百度，这里不再赘述

# 二、软件界面

![软件界面.jpg](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408281846233.png)

看下图硬件输入通道1下面框出来的按钮：A1、A2、A3、B1、B2 都是输出通道，你点亮了哪个，声音信号就会被接入到哪一个输出通道。

![硬件通道输入.jpg](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408281846495.png)

比如图中，点亮了A1和B1，那么硬件输入通道1的声音信号就会被发送到A1、B1两个输出通道中去。

# 三、使用

这里只讲解软件同时输出到多个蓝牙设备的使用方法：

- 打开Voicemeeter
- 配置输出设备

![1.jpg](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408281847030.png)

- 在虚拟输入栏中选择输出设备

![1.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408281847879.png)

- 调节音量

![3.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408281847699.png)

- run！

# Addition

如果想了解更多关于voicemeeter相关的知识，可到：
[http://vb-audio.cn/post/36.html](http://vb-audio.cn/post/36.html)
