[Crystal Dew World [en] - (crystalmark.info)](https://crystalmark.info/en/)

CrystalDiskInfo是一款免费专业的硬盘健康状态信息检测工具，支持检测机械硬盘及固态硬盘信息，采用S.M.A.R.T.技术检测分析读取磁盘的详细信息，可以全面详细直观地了解硬盘的健康状态及各种参数，包含硬盘温度，固件、序列号、驱动器接口、通电时间及通电次数等。

-   CrystalDiskInfo：官方版本，提供详细的磁盘信息，如磁盘状态、容量、温度等。适用于各种操作系统。
-   CrystalDiskInfo Aoi：与官方版本类似，但包含了一些额外功能，如实时监控磁盘状态、自动关闭硬盘等。同样适用于各种操作系统。
-   CrystalDiskInfo Shizuku：这是一个付费版本，提供了比免费版本更多的高级功能，如更详细的磁盘健康报告、更快的扫描速度等。仅适用于Windows操作系统。
-   CrystalDiskMark：这是一个磁盘性能测试工具，可以测试硬盘的读写速度、随机访问速度等指标。适用于各种操作系统。
-   CrystalDiskMark Shizuku：与官方版本类似，但包含了一些额外功能，如支持更大的测试数据量、更详细的测试结果等。仅适用于Windows操作系统。

但是这个软件是用于检测硬盘而不是U盘，U盘检测不出来。

可能的原因：xps15 9560默认的磁盘控制器模式是RAID，不是AHCI。CDM这软件无法在RAID模式下读取硬盘的S.M.A.R.T.信息。
