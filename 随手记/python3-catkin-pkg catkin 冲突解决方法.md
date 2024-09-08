```bash
Command 'catkin_make' not found, but can be installed with:
sudo apt install catkin
```

```bash
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Some packages could not be installed. This may mean that you have
requested an impossible situation or if you are using the unstable
distribution that some required packages have not yet been created
or been moved out of Incoming.
The following information may help to resolve the situation:

The following packages have unmet dependencies:
 python3-catkin-pkg : Conflicts: catkin but 0.8.10-7 is to be installed
 python3-catkin-pkg-modules : Conflicts: catkin but 0.8.10-7 is to be installed
E: Unable to correct problems, you have held broken packages.
```

```bash
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
You might want to run 'apt --fix-broken install' to correct these.
The following packages have unmet dependencies:
 python3-rospkg-modules : Depends: python3-catkin-pkg-modules but it is not going to be installed
 ros-humble-ament-cmake-core : Depends: python3-catkin-pkg-modules but it is not going to be installed
 ros-humble-qt-gui : Depends: python3-catkin-pkg-modules but it is not going to be installed
 ros-humble-ros2doctor : Depends: python3-catkin-pkg-modules but it is not going to be installed
                         Depends: python3-rosdistro-modules but it is not going to be installed
 ros-humble-ros2pkg : Depends: python3-catkin-pkg-modules but it is not going to be installed
 ros-humble-rqt-gui : Depends: python3-catkin-pkg-modules but it is not going to be installed
 ros-humble-rqt-msg : Depends: python3-catkin-pkg-modules but it is not going to be installed
 ros-humble-rqt-plot : Depends: python3-catkin-pkg-modules but it is not going to be installed
 ros-humble-rqt-publisher : Depends: python3-catkin-pkg-modules but it is not going to be installed
 ros-humble-rqt-shell : Depends: python3-catkin-pkg-modules but it is not going to be installed
E: Unmet dependencies. Try 'apt --fix-broken install' with no packages (or specify a solution).
```

这个错误信息表示在安装 `python3-catkin-pkg-modules` 软件包时出现了文件冲突，具体是 `/usr/lib/python3/dist-packages/catkin_pkg/__init__.py` 文件已经被另一个软件包 `python3-catkin-pkg` 占用了。

```bash
sudo dpkg -i --force-overwrite /var/cache/apt/archives/python3-catkin-pkg-modules_1.0.0-1_all.deb
```
