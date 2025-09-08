## 问题描述

从官网下载下来deb包，然后安装后无法正常打开，表现为闪退

## 问题解决

根据网上的说法应该是权限问题，需要我们在打开QQ音乐的时候使用`--no-sandbox`选项。因此我们需要修改打开QQ的快捷方式
即：
我们打开`/usr/share/applications/qqmusic.desktop`后看到的是这样的：

```desktop
[Desktop Entry]
Name=qqmusic
Exec=/opt/qqmusic/qqmusic %U
Terminal=false
Type=Application
Icon=qqmusic
StartupWMClass=qqmusic
Comment=Tencent QQMusic
Categories=AudioVideo;
```

我们需要将其修改为：

```desktop
[Desktop Entry]
Name=qqmusic
Exec=/opt/qqmusic/qqmusic %U --no-sandbox
Terminal=false
Type=Application
Icon=qqmusic
StartupWMClass=qqmusic
Comment=Tencent QQMusic
Categories=AudioVideo;
```

## `--no-sandbox` 参数

- **沙盒模式**：是浏览器或 Electron 应用程序中用于隔离进程和资源的一种安全机制。通过启用沙盒，应用程序的不同组件可以相互隔离，防止恶意代码或错误代码影响到整个系统的安全性。
- **`--no-sandbox`**：禁用了这个沙盒机制。禁用沙盒模式可能会使应用程序的启动更加顺畅，特别是在某些系统权限受限的情况下，但也会降低应用程序的安全性。

通常，只有在沙盒导致问题时（如权限不足）才会使用 `--no-sandbox`。
