系统管理员经常需要SSH 或者telent 远程登录到Linux 服务器，经常运行一些需要很长时间才能完成的任务，比如系统备份、ftp 传输等等。通常情况下我们都是为每一个这样的任务开一个远程终端窗口，因为它们执行的时间太长了。必须等待它们执行完毕，在此期间不能关掉窗口或者断开连接，否则这个任务就会被杀掉，一切半途而废了。

## 语法

```bash
screen [-AmRvx -ls -wipe][-d <作业名称>][-h <行数>][-r <作业名称>][-s ][-S <作业名称>]
```

**参数说明**

-A 　将所有的视窗都调整为目前终端机的大小。  
-d <作业名称> 　将指定的screen作业离线。  
-h <行数> 　指定视窗的缓冲区行数。  
-m 　即使目前已在作业中的screen作业，仍强制建立新的screen作业。  
-r <作业名称> 　恢复离线的screen作业。  
-R 　先试图恢复离线的作业。若找不到离线的作业，即建立新的screen作业。  
-s 　指定建立新视窗时，所要执行的shell。  
-S <作业名称> 　指定screen作业的名称。  
-v 　显示版本信息。  
-x 　恢复之前离线的screen作业。  
-ls或--list 　显示目前所有的screen作业。  
-wipe 　检查目前所有的screen作业，并删除已经无法使用的screen作业。

### 常用命令

**新建会话**

```bash
screen -S <name>
```

**显示所有screen会话**

```bash
screen -ls
```

**恢复会话：**

```bash
screen -r <name|id>
```

**清除dead 会话**

```bash
screen -wipe
```

**关闭或杀死窗口**

使用`Ctrl+A+D`退出会话

`Ctrl+A+K` 杀死当前窗口会话

`Ctrl+A` 输入quit，杀死所有窗口并退出其中运行的所有程序

**会话共享或会话恢复**

```bash
screen -x
```

**会话锁定与解锁**

`Ctrl+A+S` 锁定会话
`Ctrl+A+Q` 解锁会话
`Ctrl+A+X` 锁定会话（带密码）

**发送命令到screen会话**

```bash
screen -S sandy -X screen ping www.baidu.com
```

这个命令在一个叫做sandy的screen会话中创建一个新窗口，并在其中运行ping命令。
