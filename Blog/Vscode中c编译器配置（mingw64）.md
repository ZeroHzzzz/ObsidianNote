---
title: Vscode中c编译器配置（mingw64）
date: 2024-08-05 17:05
updated: 2024-09-06 22:34
tags: ['#VSCode', '#Cpp']
---

#VSCode #Cpp

## To Start

- 安装Vscode
- 请前往[https://code.visualstudio.com/](https://code.visualstudio.com/ 'Vscode 官网')下载你所需要的Vscode版本

下载完了之后，你就可以开始配置C++的运行环境了

## Install the extension

- 打开Vscode
- 选择拓展选项卡或者使用快捷键`Ctrl+Shift+X`
- 搜索C++
- 安装

![1.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408281840906.png)

## Set up for your C++ environment

### 下载Mingw64文件

- 打开浏览器
- 前往[Releases · niXman/mingw-builds-binaries (github.com)](https://github.com/niXman/mingw-builds-binaries/releases)下载MingW64文件
- 选择下列图片中标出的版本
- 解压，获得其中的Mingw64文件夹并放在你想放的位置

![2.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408281840477.png)

### 配置环境变量

- 直接`win + S`快捷键搜索环境变量，进入该选项卡
- 点击环境变量
- 在用户变量和系统变量中找到Path，进入编辑
- 新建，并将刚才下载的Mingw64中的bin文件夹的路径填入
- 完成！

![3.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408281840746.png)

![4.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408281840815.png)

![5.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408281841431.png)

![6.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408281841073.png)

![7.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408281841329.png)

![8.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408281841588.png)

![9.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408281841694.png)

点击确定，完成！

## Check

- 直接`win + R`，输入cmd并运行，打开终端
- 输入`gcc -v`，如果出现下列画面就说明配置成功了
- 完成！

![10.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408281842231.png)

![11.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408281842027.png)

## Create and Run a C++ file

![12.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408281842342.png)

create a new file called `helloworld.cpp`

复制，粘贴！

```
#include <iostream>

int main()
{
    std::cout << "Hello World" << std::endl;
}
```

![13.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408281843039.png)

![14.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408281843501.png)

仅在第一次运行 helloworld.cpp 时提示您选择编译器。该编译器将成为tasks.json 文件中设置的“默认”编译器

![15.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408281843703.png)

拿下！

**好好好，现在你就可以尽情的Coding了，可能还有一些其他的零碎配置**

**有空我再更新（**
