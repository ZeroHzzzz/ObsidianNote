#uncompleted

```logs
CMake Error at CMakeLists.txt:15 (find_package):
	By not providing "FindQt5.cmake" in CMAKE_MODULE_PATH this project has asked CMake to find a package configuration file provided by "Qt5", but

		CMake did not find one.

	Could not find a package configuration file provided by "Qt5" with any of the following names:
		Qt5Config.cmake
		qt5-config.cmake

	Add the installation prefix of "Qt5" to CMAKE_PREFIX_PATH or set "Qt5_DIR" to a directory containing one of the above files. If "Qt5" provides a separate development package or SDK, be sure it has been installed.
```

需要手动指定 `Qt5_DIR`。在 `CMakeLists.txt` 文件中添加以下行：

```cmake
set(Qt5_DIR "/path/to/Qt5/lib/cmake/Qt5")
```

另一种方式是通过 `CMAKE_PREFIX_PATH` 来指定 Qt5 的安装路径。

```cmake
set(CMAKE_PREFIX_PATH "/path/to/Qt5")
```
