最近社团工作需要使用短信发送面试通知，本来我们是想直接使用诸如阿里云一类的[短信服务](https://www.aliyun.com/product/sms)的，但是我们面试短信模板一直不能够通过，因此我想到了使用ADB的方法来发送短信，在这其中也遇到了一些问题，于是写下这篇文章作为记录，帮助后人少走弯路

精髓在于这两句命令：

```bash
// 打开系统默认的短信应用并填充内容
adb shell am start -a android.intent.action.SENDTO -d sms:<phone> --es sms_body "<text>"

// 模拟点击发送按键
adb shell input tap <x> <y>
```

第一条命令的含义是打开系统默认的短信引用并填充内容，但是并不会自动发送，因此我们需要的是模拟点击发送按键。这个需要自己测试得出点击的位置。简单的方式就是通过我们手机的开发者选项，打开“显示触摸操作”和“显示指针位置”之类的设置，然后我们手动进行测试得出触摸屏幕的xy坐标即可。

但是这个方式在shell是正常的，我在写python脚本的时候发觉这个可能会失效，想来可能是因为设备没有足够的时间去处理每个命令，因此我们可以尝试使用滑动的命令或者使用`time.sleep(0)`的方法延长操作时间，让设备有足够的时间处理命令。例如：

```bash
adb shell input swipe <from_x> <from_y> <to_x> <to_y>
```

接下来我们需要进入下一个问题的解决。对于面试短信而言，那当然包含面试人姓名、面试时间、面试地点等信息，那简单来说，其实我们正常做一个短信模板，然后把变量填充进去，然后直接通过上面的命令填充到短信应用发送就完了。但是显然这一切并没有这么简单。

有以下几个问题需要解决：

-   `adb shell am start -a android.intent.action.SENDTO -d sms:<phone> --es sms_body "<text>"`不能发送长文本
-   `adb shell am start -a android.intent.action.SENDTO -d sms:<phone> --es sms_body "<text>"`是覆写文本框而不是追加内容
