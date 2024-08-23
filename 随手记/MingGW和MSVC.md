## MinGW

**MinGW** 是一个开源的编译器工具集，基于 [[G++、GCC 和 GDB#GCC (GNU Compiler Collection)|GCC]]（GNU Compiler Collection），用于在 Windows 平台上编译 C、C++ 以及其他语言的代码。MinGW 提供了一套 Windows 兼容的头文件和库，使得开发者可以在 Windows 上使用 GCC 编译器。

**特点**：

-   **基于 GCC**：MinGW 使用 GCC 编译器，提供了 GCC 的所有特性和优化选项。
-   **开源**：MinGW 是一个开源项目，免费使用。
-   **兼容性**：MinGW 提供了一套 Windows API 头文件和库，可以在 Windows 上编译和链接使用 Windows API 的程序。
-   **跨平台开发**：由于 MinGW 使用 GCC 编译器，这使得从 Unix/Linux 移植代码到 Windows 更加容易。
-   **工具链**：除了 GCC 编译器之外，MinGW 还包括其他开发工具，如 GNU Binutils（链接器、汇编器等）和 Windows 特定的运行时库。它是一个完整的开发工具链，适合在 Windows 上进行开发。
-   **依赖库**：MinGW 使用的是 GNU 工具链，因此它通常使用与 GNU 标准库兼容的库文件格式。这些库文件具有以  `.a`  为扩展名的静态库和以 `.dll` 为扩展名的动态链接库。因为静态库是 .a 文件，所以会在编译时将静态库链接到 exe 文件里，故 MinGW 编译出的 exe 文件通常比较大

## MSVC (Microsoft Visual C++)

**MSVC** 是 Microsoft 提供的 C 和 C++ 编译器工具集，是 Visual Studio 开发环境的一部分。MSVC 专门为 Windows 开发优化，提供了对 Windows API 的广泛支持。和 GCC 没有直接关系

**特点**：

-   **高度优化**：MSVC 对 Windows 平台进行了高度优化，提供了许多特定于 Windows 的优化选项。
-   **集成开发环境（IDE）**：与 Visual Studio 集成，提供了丰富的开发工具，如调试器、代码分析工具等。
-   **依赖库**：MSVC 使用 Microsoft 的 C/C++ 标准库格式，这些库文件通常以  `.lib` 为扩展名，但也可以包含 `.dll` 动态链接库文件，这就让编译出的 exe 文件可以比较小
-   **官方支持**：MSVC 是 Microsoft 的官方编译器，提供了对最新 Windows API 和特性的支持。
-   **商业支持**：MSVC 提供了专业的技术支持和文档，适合商业应用。

MinGW 生成的库文件通常与 MSVC 生成的库文件不兼容。这意味着你不能将 MinGW 生成的对象文件与 MSVC 生成的库文件链接，反之亦然。
