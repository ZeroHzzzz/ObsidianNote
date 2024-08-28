## 安装前准备

-   检查 `MinGW` 的安装版本是否为 `posix` 线程标准，目前 `OpenCV` 只支持 `posix` 标准，不支持 `win32` 标准
-   安装Windows版本的 `Cmake`，官网链接为[https://cmake.org/download/](https://cmake.org/download/ 'https://cmake.org/download/')
-   编译之前记得使用`gcc -v`查看自己的编译器版本，别到时候出现一些不必要的`error` ~~（我不说是谁）~~

```logs
In file included from C:/Users/ZeroHzzzz/Downloads/opencv-4.10.0/opencv-4.10.0/3rdparty/protobuf/src/google/protobuf/message_lite.h:51,
                 from C:/Users/ZeroHzzzz/Downloads/opencv-4.10.0/opencv-4.10.0/3rdparty/protobuf/src/google/protobuf/any.h:38,
                 from C:\Users\ZeroHzzzz\Downloads\opencv-4.10.0\opencv-4.10.0\3rdparty\protobuf\src\google\protobuf\any_lite.cc:31:
C:/Users/ZeroHzzzz/Downloads/opencv-4.10.0/opencv-4.10.0/3rdparty/protobuf/src/google/protobuf/stubs/once.h:43:24: error: 'once_flag' in namespace 'std' does not name a type
 using once_flag = std::once_flag;
                        ^~~~~~~~~
C:/Users/ZeroHzzzz/Downloads/opencv-4.10.0/opencv-4.10.0/3rdparty/protobuf/src/google/protobuf/stubs/once.h:43:19: note:
 'std::once_flag' is defined in header '<mutex>'; did you forget to '#include <mutex>'?
C:/Users/ZeroHzzzz/Downloads/opencv-4.10.0/opencv-4.10.0/3rdparty/protobuf/src/google/protobuf/stubs/once.h:38:1:
+#include <mutex>

C:/Users/ZeroHzzzz/Downloads/opencv-4.10.0/opencv-4.10.0/3rdparty/protobuf/src/google/protobuf/stubs/once.h:43:19:
 using once_flag = std::once_flag;
                   ^~~
C:/Users/ZeroHzzzz/Downloads/opencv-4.10.0/opencv-4.10.0/3rdparty/protobuf/src/google/protobuf/stubs/once.h: In function 'void google::protobuf::internal::call_once(Args&& ...)':
C:/Users/ZeroHzzzz/Downloads/opencv-4.10.0/opencv-4.10.0/3rdparty/protobuf/src/google/protobuf/stubs/once.h:46:8: error:
 'call_once' is not a member of 'std'
   std::call_once(std::forward<Args>(args)...);
        ^~~~~~~~~
C:/Users/ZeroHzzzz/Downloads/opencv-4.10.0/opencv-4.10.0/3rdparty/protobuf/src/google/protobuf/stubs/once.h:46:8: note: suggested alternative: 'all_of'
   std::call_once(std::forward<Args>(args)...);
        ^~~~~~~~~
        all_of
mingw32-make[2]: *** [3rdparty\protobuf\CMakeFiles\libprotobuf.dir\build.make:76: 3rdparty/protobuf/CMakeFiles/libprotobuf.dir/src/google/protobuf/any_lite.cc.obj] Error 1
mingw32-make[1]: *** [CMakeFiles\Makefile2:1541: 3rdparty/protobuf/CMakeFiles/libprotobuf.dir/all] Error 2
mingw32-make: *** [Makefile:165: all] Error 2
```
