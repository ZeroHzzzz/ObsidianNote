---
title: 使用ADB实现短信发送
date: 2024-09-13 13:41
updated: 2024-09-20 01:32
tags: ['#ADB', '#短信服务', '#安卓']
---

#ADB #短信服务 #安卓
最近社团工作需要使用短信发送面试通知，本来我们是想直接使用诸如阿里云一类的[短信服务](https://www.aliyun.com/product/sms)的，但由于短信模板审核一直无法通过，我不得不寻求其他替代方案。最终，我想到可以利用ADB（Android Debug Bridge）实现短信的自动发送。在这过程中遇到了一些挑战，特此记录下来，帮助后人少走弯路

## 核心命令

实现这个功能的核心在于两条ADB命令

```bash
// 打开系统默认的短信应用并填充内容
adb shell am start -a android.intent.action.SENDTO -d sms:<phone> --es sms_body "<text>"

// 模拟点击发送按键
adb shell input tap <x> <y>
```

第一条命令的含义是打开系统默认的短信引用并填充内容，但是并不会自动发送，因此我们需要第二条命令模拟点击发送按键。为了获取点击位置，一个简单的方式就是通过我们手机的开发者选项，打开“显示触摸操作”和“显示指针位置”之类的设置，然后我们手动进行测试得出触摸屏幕的xy坐标即可。

这个方式在shell使用的时候是正常的，然而当我将这些命令移植到Python脚本中时，发现它并不总是如预期般顺利，也就是会失效而导致无法正确获取焦点，导致后面的输入都会出现问题。想来可能是因为设备没有足够的时间去处理每个命令，因此我们可以尝试使用滑动的命令或者使用`time.sleep(0)`的方法延长操作时间，让设备有足够的时间处理命令。例如：

```bash
adb shell input swipe <from_x> <from_y> <to_x> <to_y>
```

接下来我们需要进入下一个问题的解决。对于面试短信而言，那当然包含面试人姓名、面试时间、面试地点等信息，那简单来说，其实我们正常做一个短信模板，然后把变量填充进去，然后直接通过上面的命令填充到短信应用发送就完了。但是显然这一切并没有这么简单。

## 处理多行短信内容

面试通知的短信模板通常会包含诸如面试者姓名、面试时间、地点等多个变量的信息。按理说，可以将这些变量填充进短信模板，然后使用上面的命令发送即可。然而，在实际操作中，使用`adb shell am start -a android.intent.action.SENDTO -d sms:<phone> --es sms_body "<text>"`命令发送多行文本时，只有第一行被填充，其他行被忽略。

既然这个不行，那我分成多行输入不就得了。但是这个时候又出现了一个问题，那就上面这个写法是覆写文本框而不是追加内容。因此这种方法并不可行。

## 逐步填充文本框

于是我只能尝试使用一个很呆的方法，那就是用上面这个命令打开短信应用但不填充内容，然后再通过点击文本框获取焦点，逐行填充内容。也就是：

```bash
# 打开默认短信应用
adb shell am start -a android.intent.action.SENDTO -d sms:<phone>

# 点击文本框获取焦点
adb shell input tap <x> <y>

# 填充内容
adb shell input text <text>
```

此时出现了一个新的问题：`adb shell input text`命令无法输入中文，导致报错：

```bash
Exception occurred while executing 'text':
java.lang.NullPointerException: Attempt to get length of null array
```

## ADBKeyBoard

上面的问题是因为`adb shell input text`命令不能输入中文，因为它并不是为此目的而设计的。但是幸运的是，有这个项目的存在：[ADBKeyboard]([senzhk/ADBKeyBoard: Android Virtual Keyboard Input via ADB (Useful for Test Automation) (github.com)](https://github.com/senzhk/ADBKeyBoard))，这使得后续的工作得以顺利进行。

因此我们只需要先[下载](https://github.com/senzhk/ADBKeyBoard/blob/master/ADBKeyboard.apk)并安装ADBKeyBoard，然后再命令行中启用ADBKeyBoard并将其设置为默认输入法即可。可以使用以下命令：

```bash
adb shell ime enable com.android.adbkeyboard/.AdbIME
adb shell ime set com.android.adbkeyboard/.AdbIME
```

当我们完成任务的时候，可以使用以下命令来将系统输入法服务重置为默认选项，省去手动切换的麻烦。

```bash
adb shell ime reset
```

## 脚本，启动！

知道了这些，后面就简单了。接下来就是编写实际的Python脚本，根据Excel表格中的数据逐条发送面试通知短信。

例如：

```python
import os
import pandas as pd
import time

def fill_template_from_excel(template_path, excel_path):
    try:
        df = pd.read_excel(excel_path)
        for index, row in df.iterrows():
            phone = row['Phone']
            variables = {
                "name": row['Name'],
                "time": row['Time']
            }

            output_lines = []
            with open(template_path, 'r',
						             encoding='utf-8') as file:
                for line in file:
                    for key, value in variables.items():
                    # 如果变量存在于当前行，则进行替换
                        if f"{{{key}}}" in line:
                            line = line.replace(f"{{{key}}}", value)
                    output_lines.append(line)

            print(f"生成的消息（第 {index + 1} 行）：")
            print(f"手机号：{phone}")
           
            os.system(f"adb shell am start -a android.intent.action.SENDTO -d sms:{phone}")
            time.sleep(0.5) # 这里不能太快，不然会出现焦点错误的问题
            os.system("adb shell input tap 389 2305")
           
            for line in output_lines:
                os.system(f"adb shell am broadcast -a ADB_INPUT_TEXT --es msg \"{line}\"")
                # 系统默认回车
                os.system("adb shell input keyevent 66")
 
            # 发送按键位置
            os.system("adb shell input swipe 985 2140 985 2140")
            print("-" * 50)

    except FileNotFoundError as e:
        print(f"文件未找到: {e}")

    except KeyError as e:
        print(f"Excel 文件中缺少所需的列: {e}")

    except Exception as e:
        print(f"读取文件或处理数据时发生错误: {e}")

if __name__ == "__main__":
    template_path = "text.txt"
    excel_path = "data.xlsx"
   
    fill_template_from_excel(template_path, excel_path)
```

## Addition

实际使用的时候，有可能会出现这个问题：

```bash
Broadcast completed: result=0
Broadcasting: Intent { act=ADB_INPUT_TEXT dat=8: flg=0x400000 (has extras) }
```

然后文本框输入时空的。这是因为输入的文本中有不应存在的空格....就是系统会将文本中的空格识别为命令分隔符，因此没有输入也算是正常。此时我们是使用
`%s`表示空格是没有用的，因此我们需要对空格进行转义...（也就我随便试试才知道这个逆天的操作的）

是的，你没有看错。我们需要对文本进行转义。例如：

```
\ \ \ \ 面试时间：9月21日{time}
```

说实话，这种写法，我也是头一回见到。

## Summary

通过上述方法，我们成功实现了利用ADB自动化发送面试通知短信的过程。虽然使用ADB的方式在稳定性上不如专业的短信服务，但在某些特定场景下，它依然可以作为一种临时解决方案。

其实正如冰冰学长提到，如果是他，他可能会选择使用KDE Connect这类工具来实现类似的功能。而KDE Connect是一种用于跨设备通信和共享的工具，可能提供更加灵活和便捷的方式来处理短信发送。不过由于时间关系，我还没来得及对这种方法进行实验和验证。希望后续有时间能探索更优的解决方案，尝试使用他所说的工具甚至是使用开发安卓应用等方式实现短信发送~~（看起来不会那么呆，安卓应用的话几行就写完了）~~
