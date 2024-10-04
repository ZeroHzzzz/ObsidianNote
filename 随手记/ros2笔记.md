## 键盘遥控

安装

```bash
sudo apt install ros-$ROS_DISTRO-teleop-twist-keyboard
```

启动键盘遥控

```bash
ros2 run teleop_twist_keyboard teleop_twist_keyboard
```

### 键盘控制说明：

1. **方向控制键**（移动机器人）：

    - `w`: 向前移动
    - `s`: 向后移动
    - `a`: 向左旋转（绕Z轴左转）
    - `d`: 向右旋转（绕Z轴右转）
    - `x`: 停止机器人（将线速度和角速度设置为 0）

2. **速度控制键**（调整机器人速度）：

    - `i`: 增加线速度
    - `,`: 减少线速度
    - `o`: 增加角速度
    - `.`: 减少角速度

3. **帮助信息键**：

    - `q`: 退出控制程序
    - `h`: 显示帮助信息

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

## 编译指定包

```bash
colcon build --packages-select map_build
```

## 自动探索


```bash
ros2 launch explore_lite explore.launch.py
ros2 launch map_build direct.py slam:=True
```

## 启动nav2

在不使用nav2_amcl和nav2_map_server的情况下启动Navigation2。这里假设SLAM节点会在/map话题上进行地图发布并提供map->odom坐标变换。

```bash
ros2 launch nav2_bringup navigation_launch.py
```

## 保存地图

```bash
ros2 run nav2_map_server map_saver_cli -f /path/to/your/map
```
