---
title: WSL：”NAT 模式下的 WSL 不支持 localhost 代理“提示以及mirrored网络模式与TUN模式的冲突
date: 2024-09-11 02:37
updated: 2024-09-11 02:54
tags: ['#wsl', '#nat', '#网络']
---

#wsl #nat #网络
我们在启动wsl的时候经常看到这样的提示，这样我很是不爽

```bash
wsl: 检测到 localhost 代理配置，但未镜像到 WSL。NAT 模式下的 WSL 不支持 localhost 代理。
```

这个问题其实是因为我使用了TUN模式进行代理，它会将系统的所有流量通过代理，包括 `localhost` 流量。~~但是这个问题对我来说其实问题不大毕竟我用TUN~~

这个要说的话其实是WSL2更新了一种新的网络模式。首先我们就需要说一下这个wsl和wsl2的区别了。

WSL 1 与 Windows 系统共享同一个 IP 地址。因此，网络请求的处理比较简单，Linux 子系统内的应用程序可以直接通过 Windows 的 IP 地址进行访问。而WSL 2 使用了 Hyper-V 虚拟化技术，在运行时有一个独立的虚拟机。因此，WSL 2 的 Linux 子系统有自己的虚拟机 IP 地址，不再与 Windows 系统共享同一个 IP。

由于 WSL 2 使用独立的 IP，默认情况下服务无法通过 `localhost` 访问，需要获取 WSL 2 的 IP 地址才能访问。因此Windows 增加了一个机制，通过一些额外的配置，使得 WSL 2 内的服务可以通过 `localhost` 访问。这个也就是后面我们要说的网络的mirror模式。

如果我们需要使用这个镜像模式，只需要在用户文件夹下将`.wslconfig`文件中，添加网络模式相关配置就行了。即：

```yaml
[experimental]
networkingMode=NAT
```

这样一来就和wsl有点像了，主机中的localhost和WSL2中的成为同一个，也就是将`localhost`镜像到WSL中了。

但是这个模式虽然方便，但是还是会给我们带来一些问题。例如我们使用tun模式进行代理的时候，WSL2内部会出现一个断网的现象。这是由于WSL2网络接口的mtu为1500，而tun模式虚拟出来的网卡接口mtu为9000，因此数据传输的过程中会出现一些问题。因此我们在WSL2中将这个tun模式的虚拟接口mtu改为1500即可。

```bash
sudo ip link set dev <Ethernet interface> mtu 1500
```
