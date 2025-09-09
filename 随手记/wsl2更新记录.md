## wsl网络模式

wsl提供了一种相对比较特殊的网络模式，也就是镜像。

在用户文件夹下的`.wslconfig`文件中加入以下配置：

```ini
networkingMode=mirrored # 默认为NAT，可选bridge，host-only
```

特性：

- IPv6 support
- Connect to Windows servers from within Linux using the localhost address `127.0.0.1`
- Connect to WSL directly from your local area network (LAN)
- Improved networking compatibility for VPNs
- Multicast support

## DNS隧道

WSL 无法连接到互联网的一个因素是 DNS 调用被阻止了。这是因为 WSL 虚拟机发送给 Windows 主机的 DNS 网络数据包被现有的网络配置阻止了。DNS 隧道通过使用一种虚拟化特性来直接与 Windows 通信解决了这个问题。这样我们就可以在不需要发送网络数据包的情况下解析 DNS 名称请求，即使你使用了 VPN、特定的防火墙设置或其他网络配置，也能让你获得更好的互联网连接。这个特性应该能提高网络兼容性，降低你在 WSL 内没有网络连接的可能性。

在用户文件夹下的`.wslconfig`文件中加入以下配置：

```ini
dnsTunneling=true
```

## Hyper-V 防火墙

Hyper-V 防火墙允许您指定适用于 WSL 的防火墙设置和规则。默认情况下，您在 Windows 上的所有现有防火墙设置和规则都会自动应用于您的 WSL 发行版。

这使得windows上的防火墙设置可以直接应用到wsl中，也可以用过以下命令进行配置

```powershell
New-NetFirewallHyperVRule
```

## 自动代理

目前，如果我们在Windows上使用HTTP代理，它不会直接应用到您的WSL发行版中。通常，如果我们希望在WSL中设置HTTP代理，需要以与在Linux机器上相同的方式进行设置，否则可能会遇到连接问题。此功能的目标是通过自动利用Windows上的HTTP代理信息来在Linux内部设置HTTP代理，从而解决这一问题。

```ini
autoProxy=true
```

## 自动回收内存

检测到CPU空闲使用率后自动释放缓存的内存。设置为逐步以缓慢释放，设置为丢弃缓存以立即释放缓存的内存。

此功能确实需要在WSL中禁用cgroups v1，这可能会导致在WSL中作为服务运行时docker守护进程出现问题。因此，在wsl中使用docker，需要将其设置为disable

在用户文件夹下的`.wslconfig`文件中加入以下配置：

```ini
autoMemoryReclaim=gradual # 可以在 gradual 、dropcache 、disabled 之间选择
```

## 自动释放虚拟硬盘空间

WSL 虚拟硬盘（VHD）在使用过程中会增大容量，-这个新设置会自动将所有新的 VHD 设置为稀疏 VHD，可以自动减少其占用的空间。

在用户文件夹下的`.wslconfig`文件中加入以下配置：

```ini
sparseVhd=true
```

然后运行：

```powershell
wsl --manage <distro> --set-sparse <true/false>
```

如果出现以下报错，请加入 Windows Insider 预览版计划，选择进入 Release Preview 或者 Beta 通道，然后更新系统

```powershell
wsl: Hyper-V 防火墙不受支持
wsl: 不支持镜像网络模式，正在回退到 NAT 网络
wsl: DNS 隧道不受支持
```

## 在wsl中使用docker

如果你在 WSL 里使用 docker，那需要将 `autoMemoryReclaim` 配置为 `dropcache` 或者 `disabled`，然后在 `/etc/docker/daemon.json` 里添加一句 `"iptables": false` ，否则你可能无法正常使用 docker。
