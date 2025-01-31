[ROS2+nav2+激光雷达导航(上)-CSDN博客](https://blog.csdn.net/scarecrow_sun/article/details/128992820)

## launch文件

launch文件在这个过程中是为了说明节点之间的依赖关系和启动节点而诞生的。说白了就是懒。编写launch文件可以有三种方式，python、yaml、xml这三种方式，但是官方推荐的是使用python格式，因此我们使用python来编写这个文件

一般来说命名为\*.launch.py
**launch文件嵌套**

假设已经存在很多的单独的launch文件用于启动不同的功能，如果需要同时启动这些launch文件，可以使用IncludeLaunchDescription在launch文件中嵌套启动launch文件，这样可以提高复用率。

需要添加以下两个头文件

```python
from launch.actions import IncludeLaunchDescription
from launch.launch_description_sources import PythonLaunchDescriptionSource
```

使用IncludeLaunchDescription嵌套launch文件，其中同样可以使用上文所述的传递参数。

将以下代码放入到generate_launch_description函数当中，并在return的时候填入下文件中的another-launch

```python
another-launch = IncludeLaunchDescription(
PythonLaunchDescriptionSource(
os.path.join(launch_file_dir, 'launch-file-name.launch.py')
),
launch_arguments={'arg-name': example-arg}.items()
)
```

### 运行launch文件

**使用python运行launch**

在setup文件中编写

```python
from setuptools import setup
from glob import glob
import os

setup(
    name=package_name,
    version='0.0.0',
    packages=[package_name],
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
        (os.path.join('share', package_name, 'launch'), glob('launch/*.launch.py')),
    ],
    },
)

```

**使用c++运行**

```CmakeList
install(DIRECTORY
	launch
 	DESTINATION share/${PROJECT_NAME}
 )
```

### 启动

```bash
ros2 launch file_name file_name.launch.py
```

## NAV2架构

### BT Navigator Server（导航行为树服务器）

- **功能**：BT Navigator Server是Nav2中的行为树（Behavior Tree）管理器。行为树是一种组织和调度不同导航任务的方法。BT Navigator Server负责调用和管理下面的三个小服务（Planner Server、Controller Server、Recovery Server），以实现机器人导航任务的高层逻辑控制。
- **行为树的作用**：它允许在任务中使用逻辑控制，例如顺序、选择、并行执行等，这使得导航任务可以变得更加灵活和可扩展。比如，可以定义在某个条件下切换到特定的恢复行为。

### Planner Server（规划服务器）

- **功能**：Planner Server负责全局路径规划，即计算从机器人当前位置到目标位置的最佳路径。这通常涉及到在一个已知的地图上计算出避免障碍物的路径。使用的算法通常包括A\*、Dijkstra等。
- **配置**：开发者可以选择不同的全局路径规划器插件（例如NavFn、SmacPlanner等）来适应不同的导航需求。配置这些插件的参数可以影响路径的规划质量和效率。

### Controller Server（控制服务）

- **功能**：控制服务器（或局部规划器）负责根据全局规划的路径，实时控制机器人沿着这条路径行进。它需要处理实际的传感器输入和可能的动态障碍物，做出调整以保持在路径上。常用的方法包括DWA（动态窗口法）、TEB（时间弹性带）等。
- **配置**：类似于规划服务器，控制服务器也可以使用不同的控制器插件。每个插件有不同的特点，例如对速度、路径跟随精度、避障能力的要求等。

### Recovery Server（恢复服务器）

- **功能**：Recovery Server在机器人遇到异常情况（如遇到无法避开的障碍物、导航失败等）时被调用。恢复器的目标是采取措施使机器人回到正常的导航状态。例如，如果机器人卡在某个地方，可以尝试后退、旋转或选择新的路径。
- **配置**：Nav2提供了几种默认的恢复行为（如旋转恢复、清除路径等），但开发者也可以定义自己的恢复行为以满足特定需求。

## NAV2工具

nav2提供了以下工具：

### 1. **地图服务器 (Map Server)**

- **功能**：地图服务器负责加载、提供和存储环境的地图。地图通常是以网格格式存储的，占据空间的区域被标记为障碍物。导航系统利用这些地图进行路径规划和定位。
- **用途**：当机器人启动时，地图服务器会加载预定义的地图（通常是2D平面图），并将其提供给其他组件，如路径规划器和AMCL，以便这些组件可以知道环境的布局和障碍物位置。

### 2. **自适应蒙特卡洛定位 (AMCL, Adaptive Monte Carlo Localization)**

- **功能**：AMCL是一个定位算法，用于估计机器人在已知地图中的位置。它通过粒子滤波器结合传感器数据（如激光雷达）来进行定位。
- **用途**：AMCL帮助机器人确定其在地图中的精确位置，这对于路径规划和避障非常重要。AMCL通过不断地更新位置估计，使机器人能够在动态环境中自我定位。

### 3. **路径规划工具 (Nav2 Planner)**

- **功能**：Nav2 Planner负责计算从起点到目标点的最优路径。这涉及使用全局路径规划算法，如A\*或Dijkstra算法，找到避开障碍物的最短路径。
- **用途**：在给定地图和机器人位置的情况下，规划器生成一条路径，这条路径是导航系统用来引导机器人的蓝图。全局规划器生成的路径是基于地图上所有已知的障碍物。

### 4. **路径控制工具 (Nav2 Controller)**

- **功能**：Nav2 Controller负责沿着规划的路径控制机器人的运动。它接收路径规划器生成的路径，并确保机器人准确且平滑地沿着该路径移动，同时动态避开移动的障碍物。
- **用途**：Controller是实现路径跟随的核心组件。它使用局部路径规划算法，如DWA（动态窗口法）来实时调整机器人的运动，确保机器人保持在路径上，并根据传感器反馈避开突然出现的障碍物。

### 5. **成本地图 (Nav2 Costmap 2D)**

- **功能**：成本地图是将传感器数据转换为地图上各个区域的成本值。成本越高的区域代表障碍物或不安全的区域。成本地图2D模块生成和更新这些地图，使机器人能够理解环境中的危险区域。
- **用途**：在路径规划和路径跟随过程中，成本地图帮助规划器和控制器确定哪些区域是安全的，哪些区域应该避开。这是实现实时避障和路径调整的基础。

### 6. **行为树和BT Navigator (Nav2 Behavior Trees and BT Navigator)**

- **功能**：行为树是一种用于实现复杂机器人行为的工具。BT Navigator使用行为树来调度和管理导航任务，如路径规划、控制、恢复等。
- **用途**：行为树的模块化和可视化特点使得它们非常适合处理复杂的任务序列和逻辑。通过行为树，开发者可以定义在不同情况下应该采取的行动，如在导航失败时启动恢复行为。

### 7. **恢复工具 (Nav2 Recoveries)**

- **功能**：恢复工具用于在导航失败或遇到不可预测的情况时执行恢复行为。这些行为可能包括原地旋转、重新计算路径或清除障碍物。
- **用途**：恢复机制是容错系统的一部分，确保机器人在遇到问题时能够恢复到可导航状态。它们帮助机器人应对如路径阻塞、定位失败等情况。

### 8. **导航点跟随工具 (Nav2 Waypoint Follower)**

- **功能**：Waypoint Follower使机器人能够按照预先定义的导航点序列进行导航。这些导航点是一些特定的路径点，机器人会依次到达每一个。
- **用途**：这种方式对于需要沿特定路线或执行巡逻任务的应用非常有用。导航点跟随工具可以帮助机器人在多个目标点之间移动。

### 9. **生命周期管理工具和看门狗 (Nav2 Lifecycle Manager)**

- **功能**：生命周期管理工具用于管理各个Nav2节点的状态。它可以启动、暂停和停止各个组件，确保系统以一致的状态运行。
- **用途**：生命周期管理通过管理节点的生命周期来优化资源使用，确保系统在需要时能够可靠地启动和关闭。看门狗功能监控各个组件的运行状态，并在检测到故障时进行响应。

### 10. **Nav2 核心插件 (Nav2 Core)**

- **功能**：Nav2 Core定义了插件的接口，使开发者能够创建自己的路径规划器、控制器或恢复行为插件。
- **用途**：通过插件化接口，Nav2系统可以根据具体应用需求进行扩展。开发者可以实现自定义的导航算法或行为，插入到现有的Nav2框架中.

因此我们可以知道：需要启动nav2需要以下几个部分

- map：地图，用来了解环境
- Sensor Data：传感器数据传入到规划服务器(Planner Server)，用来找路
- 状态估计(TF变换)：告知不同坐标系的变换规则，建立map到机器人的关系,并确定机器人位于什么位置(nav2默认使用了AMCL(自适应蒙特卡洛定位)算法)
- BT：机器人的行为决策

因此，我们如果要使用nav2，其实就是启动一个个nav2中的这些小组件，然后让nav2能够依据这些信息来导航。

## map

我们在这个东西需要建立起坐标系之间的关系：`map -> odom -> base_link -> [sensor frames]`

小车需要实现对自己位置的感知，就需要建立起base_link到map这两个坐标系之间的变换，而这个变换，是通过里程计来实现的，比如说：你的里程计说：你向北走了10cm，那么如果你知道你在地图上初始位置，你就知道你在地图上的位置应该到哪了。

里程计(里程计可以来自许多数据源，包括激光雷达、车轮编码器和IMU)可以计算出机器人到底移动了多少的距离，即机器人的实际移动距离。

但是里程计会存在一个问题，也就是漂移问题，无论是IMU还是激光雷达还是车轮编码器，虽然在短暂时间上的位置定位精准的，但是随着时间的增长，这些传感器是会存在累计误差的，比如IMU的漂移问题，车轮的打滑、空转问题等等。因此我们认为的里程计获得的位置，是在odom坐标系中的位置，而不是在map中的位置。也可以理解为map坐标系和base_link坐标系之间是存在一个偏移量的。

对于ROS系统，有提供一些功能包来减少偏移量，官网给出了的一个就是robot_localization，可以将N个传感器融合，尽量解决掉偏移的问题。

最终想要获取小车在map中的位置，就需要amcl之类的方法得到odom坐标系与map坐标系的误差，然后由base_link在odom中的位置，计算出base_link在map中的位置

### base_link -> sensor frames

`base_link`坐标系和机器人的底盘直接连接。其具体位置和方向都是任意的。对于不同的机器人平台，底盘上会有不同的参考点。不过ROS也给了推荐的坐标系取法。

x 轴指向机器人前方  
y 轴指向机器人左方  
z 轴指向机器人上方

通过建立**urdf**文件解决。
https://blog.csdn.net/qq_43551910/article/details/121773348

### odom -> base_link

odom是一个固定在环境中的坐标系也就是world-fixed。它的原点和方向不会随着机器人运动而改变。但是odom的位置可以随着机器人的运动漂移。漂移导致odom不是一个很有用的长期的全局坐标。然而机器人的odom坐标必须保证是连续变化的。也就是在odom坐标系下机器人的位置必须是连续变化的，不能有突变和跳跃。
在一般使用中odom坐标系是通过里程计信息计算出来的。比如轮子的编码器或者视觉里程计算法或者陀螺仪和加速度计。odom是一个短期的局域的精确坐标系。但是却是一个比较差的长期大范围坐标。

通过使用将激光雷达数据转化为odom的ROS2包
[AlexKaravaev/ros2_laser_scan_matcher: Laser scan matcher ported to ROS2 (github.com)](https://github.com/AlexKaravaev/ros2_laser_scan_matcher)

使用这个包的时候需要使用依赖：csm功能包
[AlexKaravaev/csm: The C(canonical) Scan Matcher (github.com)](https://github.com/AlexKaravaev/csm)

直接clone下来，`并放入到工作区/src`中，使用`colcon build`编译

**该功能包需要订阅的话题为**：
`/scan (sensor_msgs/LaserScan)`  
`/tf (tf2_msgs/TFMessage)`

**该功能包发布的话题为**：
`/tf (tf2_msgs/TFMessage)` 发布odom->base_link转换关系
`/odom (nav_msgs/Odometry)` 可选项，功能包中有一个参数(Parameter)publish_odom，设置名字即为发布odom的topic，如果该参数为空，则不会发布odom坐标
即代码laser_scan_matcher.cpp的68行：add_parameter(“publish_odom”, rclcpp::ParameterValue(std::string(“odom”))

然后运行：

```bash
ros2 run ros2_laser_scan_matcher laser_scan_matcher
```

无论使用什么传感器，最后只要能建立起`odom`坐标系即可。

### map -> odom

map和odom一样是一个固定在环境中的世界坐标系。map的z轴是向上的。机器人在map坐标系下的坐标不应该随着时间漂移。但是map坐标系下的坐标并不需要保证连续性。也就是说在map坐标系下机器人的坐标可以在任何时间发生跳跃变化。
一般来说map坐标系的坐标是通过传感器的信息不断的计算更新而来。比如激光雷达，视觉定位等等。因此能够有效的减少累积误差，但是也导致每次坐标更新可能会产生跳跃。
map坐标系是一个很有用的长期全局坐标系。但是由于坐标会跳跃改变，这是一个比较差的局部坐标系（不适合用于避障和局部操作）。

而在开放环境中，我们需要定义一个全球坐标系

默认的方向要采用 x轴向东，y轴向北，z轴向上
如果没有特殊说明的话z轴为零的地方应该在WGS84椭球上(WGS84椭球是一个全球定位坐标。大致上也就是z代表水平面高度)
如果在开发中这个约定不能完全保证，也要求尽量满足。比如对于没有GPS，指南针等传感器的机器人，仍然可以保证坐标系z轴向上的约定。如果有指南针传感器，这样就能保证x和y轴的初始化方向。

现在我们已经建立了`odom`坐标系，下一步就是需要知道机器人在地图中的哪一个位置了，而这一步的实现，就需要使用到一些算法了，`nav2`中使用的是`AMCL`算法
[ROS2极简总结-Nav2-地图和自适应蒙特卡洛定位\_ros2 grid map-CSDN博客](https://zhangrelay.blog.csdn.net/article/details/120040572)

AMCL需要订阅以下的topic，因此，这些topic一定要存在的

激光扫描：/scan (sensor_msgs/LaserScan) (由激光雷达发布)
TF: 将 odom -> base_link
初始姿势：/initialpose (geometry_msgs/PoseWithCovarianceStamped)
地图：/map（nav_msgs/OccupancyGrid）

算法经过计算之后，就会建立起`map`和`odom`之间的关系，这时候，用`rviz2`就可以看到机器人的经过算法计算之后的效果啦。

**AMCL参数配置文件amcl_config.yaml**

```yaml
amcl:
    ros__parameters:
        use_sim_time: False
        alpha1: 0.2
        alpha2: 0.2
        alpha3: 0.2
        alpha4: 0.2
        alpha5: 0.2
        base_frame_id: 'base_link'
        beam_skip_distance: 0.5
        beam_skip_error_threshold: 0.9
        beam_skip_threshold: 0.3
        do_beamskip: false
        global_frame_id: 'map'
        lambda_short: 0.1
        laser_likelihood_max_dist: 2.0
        laser_max_range: 100.0
        laser_min_range: -1.0
        laser_model_type: 'likelihood_field'
        max_beams: 60
        max_particles: 8000
        min_particles: 200
        odom_frame_id: 'odom'
        pf_err: 0.05
        pf_z: 0.99
        recovery_alpha_fast: 0.0
        recovery_alpha_slow: 0.0
        resample_interval: 1
        #robot_model_type: "differential"
        save_pose_rate: 0.5
        sigma_hit: 0.2
        tf_broadcast: true
        transform_tolerance: 1.0
        update_min_a: 0.2
        update_min_d: 0.25
        z_hit: 0.5
        z_max: 0.05
        z_rand: 0.5
        z_short: 0.05
        set_initial_pose: true
        initial_pose:
            x: -0.0119032
            y: -0.00386167
            yaw: -0.0354927
```

有三类ROS参数可用于配置AMCL节点

1. 总滤波器参数
2. 激光模型参数
3. 里程计模型参数。
