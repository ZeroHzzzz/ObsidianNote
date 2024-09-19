最近社团工作需要使用短信发送面试通知，本来我们是想直接使用诸如阿里云一类的[短信服务](https://www.aliyun.com/product/sms)的，但是我们面试短信模板一直不能够通过，因此我想到了使用ADB的方法来发送短信，在这其中也遇到了一些问题
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

基本的代码如下：

```python
import os

number = 123
text = ""

send_cmd = "adb shell input tap 973.5 2276.5"
txt_cmd = f"adb shell am start -a android.intent.action.SENDTO -d sms:{number} --es sms_body \"{text}\""

os.system(send_cmd)
os.system(txt_cmd)
```
