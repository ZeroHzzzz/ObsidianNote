报错为：

```bash
E: Sub-process /usr/bin/dpkg returned an error code (1)
```

“sub-process /usr/bin/dpkg returned an error code (1)” 是在使用 `apt` 或 `dpkg` 安装、升级、或删除软件包时，出现错误的常见提示。这通常意味着在软件包安装或配置过程中发生了某种问题。可能的原因包括：

1. **软件包安装或配置错误**：安装的某个软件包在配置过程中遇到了错误，导致 `dpkg` 失败。
2. **软件包损坏**：下载的软件包文件可能损坏，导致无法正确解压或安装。
3. **依赖关系问题**：某些软件包可能缺少依赖包，或者不同版本的软件包之间存在冲突。
4. **文件权限问题**：一些系统文件或目录的权限可能不足，导致无法执行某些操作。
5. **磁盘空间不足**：系统磁盘空间不足，无法完成安装。

可以尝试以下操作来修复这个问题：

**修复损坏的包**：

```bash
sudo apt --fix-broken install
```

**重新配置软件包**：

```bash
sudo dpkg --configure -a
```

**清理缓存**： 清理本地的包缓存，重新下载软件包：

```bash
sudo apt clean
sudo apt update
```

**手动移除有问题的软件包**： 如果你知道是哪一个软件包导致的问题，可以尝试手动移除：

```
sudo dpkg --remove --force-remove-reinstreq [软件包名称]
```

实在不行，手动用dpkg强制安装：

```bash
sudo dpkg -i --force-overwrite [软件包名称]
```
