---
title: Linux环境下从源码编译OpenCV
date: 2024-11-13 15:03
updated: 2024-11-13 15:21
tags: ['#Ubuntu', '#OpenCV']
---

#Ubuntu #OpenCV
最近我需要用到OpenCV来过正方图片验证码，而我们使用apt源中的OpenCV版本是`4.5.0`，过于古老，由于我在这个场景下只需要用到核心的模块，不用去搞opencv_contrib的部分。因此我选择从源码进行编译，在此做一个记录。

## 安装必要依赖

```bash
sudo apt update && sudo apt install -y cmake g++ wget unzip
```

## 下载源码

```bash
wget -O opencv.zip https://github.com/opencv/opencv/archive/4.x.zip

unzip opencv.zip

mkdir -p build && cd build
```

## 其他问题

然后我们使用cmake去生成makefile，这里也就不再赘述了，仅记录几个坑点：

### pkg-config安装

`pkg-config` 是一个工具，用于在编译和链接程序时查找和设置依赖库的编译参数。在使用 OpenCV 等库时，`pkg-config` 可以帮助我们获取这些库所需的编译和链接标志，解放双手，丢掉大脑

```bash
wget https://pkg-config.freedesktop.org/releases/pkg-config-0.29.2.tar.gz

tar -zxvf pkg-config-0.29.2.tar.gz

cd pkg-config-0.29.2/
./configure
make
make check
sudo make install

pkg-config --version
```

### 无 opencv.pc 文件，编译依赖 OpenCV 的项目时需要手动指定库的路径

这个文件会包含 OpenCV 的编译和链接信息，以便通过 `pkg-config` 命令获取这些参数。没有这个玩意后面会有点麻烦。因此我建议还是在cmake中启用`OPENCV_GENERATE_PKGCONFIG`选项

### 可执行文件运行时找不到共享库

由于我们Linux默认是动态链接的，即有些共享库是在可执行文件运行时才链接进来的。因此我们正确地链接生成可执行文件之后并不能保证正确地运行，可能会找不到共享库报错，但是实际上我们是有这个共享库的。

这时，我们就应该通过指定环境变量`LD_LIBRARY_PATH`来告诉系统我们想要搜索的共享库目录。即通过以下命令将`/usr/local/lib`添加到共享库搜索目录的环境变量中：

```bash
export LD_LIBRARY_PATH=/usr/local/lib:$LD_LIBRARY_PATH
```
