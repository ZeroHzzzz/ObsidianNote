精髓在于这两句命令：

```bash
adb shell am start -a android.intent.action.SENDTO -d sms:13428855060 --es sms_body "Test"

adb shell input swipe 973 2276 973 2276 100
```

下一个是模拟点击，这个需要自己测试得出点击的位置。简单的方式就是通过我们手机的开发者选项，打开“显示触摸操作”和“显示指针位置”之类的设置，然后我们手动进行测试得出触摸屏幕的xy坐标即可。

当然我们也可以使用这句命令来模拟某个点的点击：

```bash
adb shell input tap 973.5 2276.5
```
