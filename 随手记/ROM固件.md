#uncompleted
最近闲来无事，于是我开始对之前root的过程进行一个记录和总结。在玩机的过程中，一个重要的东西就是ROM。

在移动设备领域中，ROM 通常指的是操作系统的镜像文件，它实际上是设备操作系统的核心载体，包含了操作系统的所有组件，例如系统框架、内核、驱动程序、系统应用等。这些镜像文件被写入设备的存储分区中，在设备启动时被加载到内存中，从而启动并运行操作系统。ROM 的存在确保了设备能够正常工作，为用户提供界面和系统服务。

## ROM 的类型

### 1. **Stock ROM（官方 ROM）**

Stock ROM 是由设备制造商预装在设备上的操作系统版本，通常代表设备出厂时的默认系统。它包含了设备特定的优化、驱动程序和预装应用程序。这些组件经过制造商的测试和认证，确保了系统的稳定性和兼容性。使用 Stock ROM 的优势在于它提供了制造商的官方支持，用户可以通过 OTA（Over-The-Air）更新接收系统更新和安全补丁。此外，Stock ROM 通常具备最佳的设备硬件兼容性，因为它是为特定硬件配置而设计和优化的。

### 2. **Custom ROM（自定义 ROM）**

Custom ROM 是由第三方开发者基于安卓开源项目（AOSP）或其他操作系统基础开发的版本。自定义 ROM 提供了不同于官方 ROM 的用户界面、功能和优化，能够为用户提供更加个性化的体验。这些 ROM 通常去除了制造商预装的 bloatware（捆绑应用），并添加了一些高级功能，例如更多的界面定制选项、更好的性能调优和额外的隐私保护功能。

常见的自定义 ROM 项目包括：

- **LineageOS**：一个基于 AOSP 的流行开源项目，以其稳定性和广泛的设备支持而闻名。
- **Pixel Experience**：旨在为非 Pixel 设备带来类似 Google Pixel 手机的体验，包括 Pixel 专属的 UI 和功能。
- **Paranoid Android**：以其独特的用户界面和创新功能（如混合模式和 Pie 控件）著称。

自定义 ROM 适合那些希望深度定制设备、摆脱制造商限制或延长设备使用寿命的用户。

## ROM 的安装和刷机

### 1. **刷机（Flashing）**

刷机是指将新的 ROM 文件写入设备的存储器或分区的过程。通过刷机，用户可以更新操作系统版本、切换到不同的系统或实现定制功能。刷机可能包含以下步骤：

- **下载 ROM 文件**：从可靠的来源获取所需的 ROM 文件，确保其兼容设备型号。
- **备份数据**：刷机有可能会清除设备上的数据，因此备份是一个关键步骤，以防止数据丢失。

### 2. **恢复模式和 Fastboot 模式**

刷机通常通过设备的恢复模式（Recovery Mode）或 Fastboot 模式来进行：

- **恢复模式（Recovery Mode）**：是一种特殊的启动模式，允许用户执行系统维护任务，如恢复出厂设置、清除缓存、备份或刷入新的 ROM。常用的第三方恢复工具包括 TWRP（Team Win Recovery Project），它提供了一个用户友好的界面来管理刷机过程。
- **Fastboot 模式**：是一种底层的设备模式，允许用户通过电脑命令行接口与设备交互，用于解锁引导加载程序、刷入自定义恢复和 ROM。Fastboot 模式通常通过组合按键进入，并需要设备连接到计算机以执行命令。

### 3. **解锁引导加载程序**

大多数 Android 设备在默认情况下，其引导加载程序（Bootloader）是锁定的。这意味着设备只能启动官方的、经过签名的系统映像。为了安装自定义 ROM，用户通常需要首先解锁引导加载程序。这一过程因设备而异，但通常涉及以下步骤：

- **启用开发者选项和 USB 调试**：在设备设置中启用开发者选项，然后打开 USB 调试模式。
- **获取解锁码**：某些设备制造商（如华为和小米）可能需要用户向官方申请解锁码。
- **使用 Fastboot 命令解锁**：通过 Fastboot 模式连接设备，并使用特定命令解锁引导加载程序。解锁会清除设备上的所有数据，因此用户应提前备份重要数据。

## 使用 ROM 的风险和注意事项

尽管自定义 ROM 提供了广泛的功能和灵活性，但安装和使用它们也存在一定的风险和注意事项：

1. **稳定性问题**：自定义 ROM 可能不像官方 ROM 那样稳定，有时会有崩溃、功能失效或兼容性问题。
2. **安全性风险**：未经验证的自定义 ROM 可能包含恶意软件或安全漏洞。用户应选择信任的开发者和项目。
3. **保修失效**：许多制造商规定，解锁引导加载程序或安装自定义 ROM 会使设备失去保修。用户在进行此类操作之前应仔细考虑这一点。
4. **数据丢失**：刷机过程中可能导致数据丢失，因此备份数据是非常重要的。
