#uncompleted
VcXsrv、X410 和 Xming 都是用于在 Windows 系统上运行 X11 应用程序的开源 X 服务器，主要作用是在 Windows 系统上为 X11 应用程序提供显示支持。但是考虑到近几年的Xming在维护方面较为落后，而且听说虽然X410需要付费但是可以一直试用，因此我们选择了X410作为我们的X服务器

首先我们需要了解一下，什么是X11，以及这些东西到底是做什么的。

## X11 协议

**X11** 是一种网络透明的窗口系统协议，常用于 Unix/Linux 系统上。它允许图形用户界面的应用程序通过网络将其显示内容发送到 X 服务器。X 服务器负责显示窗口和处理用户输入（如鼠标点击、键盘输入等）。

在这种架构中，X 服务器负责屏幕输出和输入管理，**X 客户端**（应用程序）与 **X 服务器**通信来展示图形界面。而X 服务器是一个负责绘制图形和管理窗口的服务。在 Linux 系统上，X 服务器直接运行在本地，提供桌面显示。

当我们在 Windows 上运行 VcXsrv 或 Xming 时，它们就相当于一个虚拟的 X 服务器，模拟 Linux 系统的 X 服务器环境。Linux 应用程序通过 X11 协议将绘图请求发送给 VcXsrv/Xming，后者再把这些请求转化为 Windows 系统可以理解的图形指令，从而在 Windows 上显示。

在 WSL 中，X11 请求是通过 `localhost` 进行本地转发，因此性能非常高，并且通信延迟较低

## WSLg (WSL GUI 支持)

WSL其实是有自己的图形化界面的解决方法的。自 **WSL 2** 之后，微软推出了原生支持 GUI 应用的 **WSLg (Windows Subsystem for Linux GUI)** 功能。它无需手动安装 VcXsrv 或 Xming，直接通过 WSL 提供对 Linux GUI 应用程序的原生支持。WSLg 在后台自动管理 X 服务器，使 Linux 应用程序的图形界面可以无缝显示在 Windows 上。

但是这个方法我觉得页面相对比较简陋，示例如下：
![image.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202409102007318.png)

## 使用X服务器

其实我们只需要配置一个环境变量`DISPLAY`，让wsl中的应用知道将图形请求发送到哪里就行了。

为了简单，我们直接编辑 `.bashrc` 文件，设置 `DISPLAY` 环境变量就行了。

```bash
echo "export DISPLAY=localhost:0.0" >> ~/.bashrc
source ~/.bashrc
```

这将确保在每次启动 WSL 时，`DISPLAY` 变量都被正确设置。

但是这个东西我试过了，对于wsl1是有效的，但是wsl2的话，根据官网的说法，我们需要这样做：

```bash
export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2; exit;}'):0.0
```

整个命令的作用就是从`/etc/resolv.conf`这个文件中提取当前系统的 `nameserver` IP 地址，并将它与 `:0.0` 结合，设置为 `DISPLAY` 变量。这种方法也许是有效的，但是我的情况有点复杂，并没有成功。

经过了一番资料的查询之后我发现罪魁祸首还是wsl的网络模式。我的配置是mirror-mode，因此也就导致了一系列相关的问题....比如mirror-mode和tun模式的冲突。

因此，简单的话，我们直接在用户文件夹中的.wslconfig文件中的networkingMode改为NAT好了。后续我有空再去探究为什么mirror-mode会导致x server找不到我们的wsl主机（我现在初步怀疑是x410的问题）

```yaml
networkingMode=NAT
```

我们改完之后，基本上这个应该就没有什么大问题了。
