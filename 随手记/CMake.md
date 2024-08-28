**CMake** 是一个开源的跨平台构建系统生成工具，用于简化和自动化软件项目的编译过程。它帮助开发者管理项目的构建配置，使得项目可以在不同的操作系统和编译器上顺利构建。CMake 的名称来源于 “Cross-platform Make”，体现了其跨平台的特性。

## CMake 的主要功能

1. **跨平台支持**：

    - CMake 允许开发者在不同的平台（如 Windows、Linux、macOS）上使用相同的构建配置文件来构建项目。这减少了为每个平台编写不同构建脚本的需求。

2. **生成构建系统文件**：

    - CMake 通过读取项目的配置文件（通常是 `CMakeLists.txt`），生成适合目标平台的构建系统文件。例如，它可以生成 Unix 系统上的 Makefile，或者 Windows 上的 Visual Studio 项目文件。

3. **依赖管理**：

    - CMake 可以自动处理项目中的依赖关系，例如库的依赖、头文件路径等。这可以确保在构建时，所有需要的文件都能正确找到和使用。

4. **模块化和可扩展性**：

    - CMake 提供了许多内置模块来检测编译器、库和其他工具的存在与版本。此外，开发者可以编写自己的模块来扩展 CMake 的功能。

5. **支持复杂构建需求**：

    - CMake 可以处理大型项目的复杂构建需求，如多个目录、不同的构建配置（Debug、Release）、多个语言代码（C、C++、Fortran 等）的编译等。

## CMake 的工作流程

1. **编写 CMakeLists.txt 文件**：

    - 项目的根目录通常包含一个或多个 `CMakeLists.txt` 文件。这些文件定义了项目的基本信息（如项目名称、版本）、源文件列表、编译选项、库依赖等。

2. **运行 CMake 命令**：

    - 开发者在构建目录中运行 CMake 命令，指定源目录和构建目录。CMake 会读取 `CMakeLists.txt` 文件，并生成适合当前环境的构建系统文件。

    示例命令：

```bash
cmake -S . -B build
```

    这表示在当前目录（`-S .`）查找 `CMakeLists.txt` 文件，并在 `build` 目录（`-B build`）中生成构建文件。

3. **构建项目**：

-   CMake 生成的构建文件可以用于实际编译和链接代码。例如，在 Unix 系统上，可以使用 `make` 命令编译项目；在 Windows 上，可以使用 Visual Studio 打开生成的项目文件进行编译。

## CMake示例

```cmake
cmake_minimum_required(VERSION 3.10)  # 指定所需的最低 CMake 版本
project(MyProject)                   # 定义项目名称

set(CMAKE_CXX_STANDARD 11)           # 设置 C++ 标准为 C++11
set(SOURCES main.cpp other.cpp)      # 定义源文件列表

add_executable(MyApp ${SOURCES})     # 指定生成可执行文件及其源文件
```

## 安装

[Download CMake](https://cmake.org/download/)下载对应版本即可
