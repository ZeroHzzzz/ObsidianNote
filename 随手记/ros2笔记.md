## 键盘遥控

安装

```bash
sudo apt install ros-$ROS_DISTRO-teleop-twist-keyboard
```

启动键盘遥控

```bash
ros2 run teleop_twist_keyboard teleop_twist_keyboard
```

## 查看tf树

安装

```bash
sudo apt-get install ros-$ROS_DISTRO-rqt-tf-tree
```

启动tf树

```bash
 ros2 run rqt_tf_tree rqt_tf_tree --force-discover
```

### `--force-discover` 的作用

默认情况下，`rqt_tf_tree` 可能使用已有的缓存来显示 TF 变换，而不是重新请求整个系统中所有可能的 TF 数据。这个缓存可以帮助节省时间和资源，尤其是在频繁运行 TF 树查看工具时。

但是，使用 `--force-discover` 参数会强制工具忽略缓存，主动从系统中请求并重新发现所有 TF 坐标变换，确保显示的是当前最新的坐标变换信息。
