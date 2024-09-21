---
title: Vscode配置java环境
date: 2024-09-16 02:23
updated: 2024-09-21 19:26
tags: ['#java', '#VSCode']
---

#java #VSCode
由于上课的需要，我开始考虑使用vscode作为java的ide。在此作为一个记录

我到VsCode的官网翻了翻，发现他提供了一个Coding Pack，里面包含了VS Code、JDK以及一些必要的插件，因此如果嫌麻烦直接用下面的链接安装就好了。

[Windows - Coding Pack](https://aka.ms/vscode-java-installer-win)
[MacOS - Coding Pack](https://aka.ms/vscode-java-installer-mac)

但是很显然我并没有用这个，~~主要是因为刚开始我没看到~~

如果按照正常的安装流程，我们需要先有VsCode，这个自不必多言。然后就需要安装[Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)这个插件包，里面提供包含了一些可能需要的插件。但是我看了一眼发现这个插件包只有两个插件是必要的，也就是- [Language Support for Java™ by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java)和 [Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug)

接下来我们就需要安装JDK

## 安装JDK

### 什么是JDK？

JDK（Java Development Kit）是Java开发工具包，用于开发Java应用程序，它包含了编写、编译、调试Java代码的工具，最重要的工具是`javac`，用于将Java源代码编译成字节码。

而JRE是Java运行时环境，专门用于运行Java程序。JDK包含了JRE，所以它可以执行和开发Java程序。因此，JDK = JRE + 开发工具

因此我们需要用到的是JDK而不是JRE。因为我们需要编译并运行代码。

### 安装哪个JDK？

Java的特点是百花齐放，不像c#或者go只有一家主导。因此我们不止有JDK的发行版需要选择，还有JDK的版本需要选择。有以下发行版可供选择：

-   [Amazon Corretto](https://aws.amazon.com/corretto)
-   [Azul Zulu](https://www.azul.com/downloads/?package=jdk)
-   [Eclipse Adoptium's Temurin](https://adoptium.net/)
-   [IBM Semeru Runtimes](https://developer.ibm.com/languages/java/semeru-runtimes)
-   [Microsoft Build of OpenJDK](https://www.microsoft.com/openjdk)
-   [Oracle Java SE](https://www.oracle.com/java/technologies/javase-downloads.html)
-   [Red Hat build of OpenJDK](https://developers.redhat.com/products/openjdk/download)
-   [SapMachine](https://sapmachine.io/)

一般来说，我更推荐Eclipse Adoptium's Temurin，因为它的前身是著名的AdoptOpenJDK，更新到jdk16后就停止更新了，因为AdoptOpenJDK移交给Eclipse基金会后改名为：Adoptium Eclipse Temurin，后续维护工作就交给Eclipse基金会了。当然如果你公司不怕花钱，你可以选择用甲骨文Oracle官方的JDK，最后的甲骨文免费版是jdk8u202，想用后面的版本就得花钱了，甲骨文的JDK肯定是最稳定、最效率、最专业的，如果不想花钱那就推荐用Adoptium Eclipse Temurin这个OpenJDK发行版。它背后是Eclipse基金会，项目稳定，多家大厂支持，不受制于某一特定厂家。

现在是版本。一般来说常用的是JDK8、JDK11、JDK17和最新的JDK21这几个版本，除此之外还有一堆。我更推荐JDK17，他是当前热门的 LTS 版本，但是相对来说，JDK8和JDK11是最常用的长期支持版本。JDK11的生态不太行，参杂在JDK8与JDK17之间。

知乎大佬直呼：

一直以来，Java8 都是 Java 社区心头的痛。因为它代表着以稳定性为主的企业管理层，与拥抱变化为主的底层码农层之间的、爱的魔力拉锯战。

不升！成为各大厂心照不宣的选择。

现在，这种平衡或将打破。因为 Java 届的霸主框架 SpringBoot，选择了最小支持的 Java lts 版本，就是最新的 Java17。

看来看去，还是选择了JDK17。

## 你的第一份Java代码

创建一个新的java文件，然后输入

```java
public class Test {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```

![image.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202409160250810.png)

然后点击RUN即可。

> [!Note] 一点小提示
> 如果你在 VS Code 中打开一个 Java 文件但不打开其所在的文件夹，Java 语言服务器可能无法正常工作。
