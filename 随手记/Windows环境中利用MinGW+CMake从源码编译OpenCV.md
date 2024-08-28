## 安装前准备

-   检查 `MinGW` 的安装版本是否为 `posix` 线程标准，目前 `OpenCV` 只支持 `posix` 标准，不支持 `win32` 标准
-   安装Windows版本的 `Cmake`，官网链接为[https://cmake.org/download/](https://cmake.org/download/ 'https://cmake.org/download/')
-   编译之前记得使用`gcc -v`查看自己的编译器版本，别到时候出现一些不必要的`error` ~~（我不说是谁）~~

## 下载OpenCV源码

[Releases - OpenCV](https://opencv.org/releases/)

## 生成makefile

选择解压后的opencv源码路径与编译二进制文件的路径，一般就选择源码路径下的build文件夹（Cmake会提醒创建，也可以自己提前创建），点击`Configure`
![image.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408290036458.png)

选择MinGW Makefiles，如果对应的GNU编译器（包括gcc、g++、gfortran）已经在当前的环境变量PATH中，则可以选择默认的编译器，如下图所示；如果未添加进环境变量，可以选择`Specify native compilers`手动选择（不推荐，建议添加环境变量）

![image.png|700](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408290036926.png)

等待Configure完成后，出现需要更新的红色的配置值，可以根据自己的需要进行适当调整。常用的调整项目有：

**CMAKE_INSTALL_PREFIX**：修改默认安装路径，默认安装路径为`build/install`
**BUILD_opencv_world**：将所有编译后的库文件整合为一个
**OPENCV_GENERATE_PKGCONFIG**：生成一个pkg-config的路径使得pkgconfig能够自动传递库路径给g++进行编译
**CMAKE_BUILD_TYPE**：填入Release会编译发行版本的opencv包，从而去除debug信息和符号表，这可以提高性能；填入Debug则会编译debug版本的opencv（这是给需要深度开发opencv修改源码的人用的），而一般我们不需要深入opencv的源代码进行debug。
**OPENCV_EXTRA_MODULES_PATH**：contrib包中的附加模组的路径

再次configure。如果无报错之后选择generate生成makefile

## 编译

在build文件夹中打开cmd或者终端或者其他类shell工具，输入：

```bash
mingw32-make
```

可以传入`-jx`使用多线程编译以加快编译速度，其中x为线程数。

编译完成后，输入：

```bash
mingw32-make install
```

![image.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202408290045293.png)

成功安装动态库到对应路径(若没有修改则是默认路径)。

## 添加环境变量

