我们通过qq邮箱的[[SMTP]]服务来实现邮件的发送

## From 和 To Header 格式规范

我们在使用qq邮箱发送邮件的时候出现了以下错误：

```bash
SMTPDataError: (550, b'The "From" header is missing or invalid. Please follow RFC5322, RFC2047, RFC822 standard protocol. https://service.mail.qq.com/detail/124/995.')
```

这是因为其From合法性检查

### From合法性检查

**一、根据RFC5322协议，邮件标头中需要包含'From'信息。**

**二、根据RFC2047, RFC822协议，邮件标头中的'From'形式为：**

1. 邮箱地址形式：prefix@domain, 如 'abc@qq.com'。

2. 昵称+空格+<邮箱地址>形式：nickname <prefix@domain>，其中，nickname为ASCII字符集中字符组合或编码文本:

（1）如果昵称全为ASCII字符，如'ABC'，邮箱地址为 'abc@qq.com'，则标头中的'From'为'ABC <abc@qq.com>'。注意'ABC'和'<abc@qq.com>'之间用空格隔开；

（2）如果昵称包含非ASCII字符，如中文，则请使用base64对昵称进行编码。nickname最终的形式为："=?" charset "?" encoding "?" encoded-text "?="。其中，charset为字符集；encoding为编码方式，'B'代表base64；encoded-text为编码后的文本。例如，昵称为'QQ邮箱昵称示例'，邮箱地址为 'abc@qq.com'，则对昵称进行base64编码，字符集使用UTF-8，则nickname为 '=?UTF-8?B?UVHpgq7nrrHmmLXnp7DnpLrkvos=?='，最终邮件标头中的'From'为'"=?utf-8?B?UVHpgq7nrrHmmLXnp7DnpLrkvos=?=" <abc@qq.com>'。注意编码文本和邮件地址间用空格隔开。

## 发送邮箱服务器端口

发送邮件服务器要用465端口，否则如下的报错：

```bash
SMTPServerDisconnected: Connection unexpectedly closed
```

## 授权码

login的密码不是邮箱登录密码，而是授权码，需要在QQ邮箱设置-账号里获取。否则会出现以下报错：

```bash
SSLError: [SSL: WRONG_VERSION_NUMBER] wrong version number (_ssl.c:1002)
```

## 代码

最终我们的代码如下（无附件）：

```python
import smtplib
from email.mime.text import MIMEText
from email.header import Header
from tqdm import tqdm

sender = '3190381602@qq.com'
receivers = ['zerohzzzz0108@gmail.com']
auth_code = "eiaegytnreorddee"
fails = []

Sendernickname = "=?UTF-8?B?5rWZ5rGf5bel5Lia5aSn5a2m57K+5byY572R57uc?="
text = "你好！"
message = MIMEText(text, 'plain', 'utf-8')
message['From'] = Header(f"{Sendernickname}<{sender}>")
subject = '报名成功通知'
message['Subject'] = Header(subject, 'utf-8')

print('Begin to send message...')
print(f'共 {len(receivers)} 名参赛者')

for receiver in tqdm(receivers):
    message['To'] = Header(f"Receiver<{receiver}>")
    try:
        server = smtplib.SMTP_SSL('smtp.qq.com', 465)
        server.login(sender, auth_code)
        server.sendmail(sender, receivers, message.as_string())
        server.close()
       
    except smtplib.SMTPException as e:
        fails.append(receiver)
        print(f"Error: 无法发送邮件，失败邮箱为：{receiver} ，失败原因为： {e}")

print('End to send message...')
print(f'发送失败 {len(fails)} 封, 为 {fails}')
```

如果需要附件，可尝试以下代码：

```python
import smtplib
import email.utils
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.header import Header


def send_email(filename):

    sender = 'xxxxx@qq.com'  # 发送邮箱
    receivers = ['xx@xx.com']  # 接收邮箱
    auth_code = "auth code"  # 授权码

    message = MIMEMultipart()
    message['From'] = email.utils.formataddr(('发送者', sender))  # 发送者
    message['To'] = email.utils.formataddr(('收件人', receivers[0]))  # 接收者

    message['Subject'] = Header(filename, 'utf-8')

    content = MIMEText(filename)
    message.attach(content)

    # 附件
    excel = MIMEApplication(open(filename, 'rb').read())  # 打开Excel,读取Excel文件
    excel["Content-Type"] = 'application/octet-stream'  # 设置内容类型
    excel.add_header('Content-Disposition', 'attachment', filename=filename)
    message.attach(excel)

    try:
        server = smtplib.SMTP_SSL('smtp.qq.com', 465)
        server.login(sender, auth_code)
        server.sendmail(sender, receivers, message.as_string())
        server.set_debuglevel(True)
        print("邮件发送成功")
        server.close()
    except smtplib.SMTPException:
        print("Error: 无法发送邮件")
```
