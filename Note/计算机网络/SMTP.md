SMTP（Simple Mail Transfer Protocol，简单邮件传输协议）是用于在互联网上传输电子邮件的协议。它是电子邮件系统的核心，负责在邮件服务器之间传输邮件。

SMTP的主要功能是将电子邮件从发送者的邮件客户端传输到接收者的邮件服务器，再由接收者的邮件服务器将邮件递送到收件人的邮箱。它工作在应用层，使用[[TCP]]/IP协议栈进行通信，通常在端口25上进行通信。

## 工作流程

SMTP的工作流程通常分为以下几个步骤：

1. **建立连接**：

    - 发送者的邮件客户端（或邮件服务器）与接收者的邮件服务器建立TCP连接。

2. **发送邮件**：

    - 发送方的SMTP服务器使用一系列SMTP命令和数据将邮件发送到接收方的SMTP服务器。这些命令包括发件人、收件人、邮件内容等信息。

3. **邮件传输**：

    - 邮件传输完成后，接收方的SMTP服务器将邮件存储在其本地邮件系统中，等待接收者的邮件客户端来获取。

4. **断开连接**：

    - 传输完成后，发送方和接收方的SMTP服务器会断开TCP连接。

## 什么是 SMTP 信封？

SMTP “信封”是客户端发送给邮件服务器的一组信息，说明电子邮件来自何处和将前往何处。SMTP 信封不同于电子邮件头和正文，对电子邮件收件人不可见。

## SMTP命令

-   **HELO**：启动一个对话，会话的开始。
-   **MAIL FROM**：指定发件人的电子邮件地址。
-   **RCPT TO**：指定收件人的电子邮件地址。
-   **DATA**：指示即将发送的邮件正文内容，之后的文本数据会被视为邮件内容。
-   **QUIT**：终止邮件传输过程，关闭会话。

## SMTP使用的端口

在网络中，**端口**是接收网络数据的虚拟点；可将其比作邮件地址中的公寓号码。端口帮助计算机将网络数据分拣到正确的应用程序。网络安全措施（例如防火墙）可堵塞不必要的端口，以预防发送和接收恶意数据。

SMTP通常使用以下端口：

1. **端口25**：这是SMTP的默认端口，用于邮件服务器之间传输邮件（MTA到MTA的通信）。这个端口在很多地方已经被限制使用，以防止垃圾邮件发送。
2. **端口587**：这是现代SMTP客户端发送邮件时推荐使用的端口，用于邮件客户端（MUA）向邮件服务器发送邮件（也称为“提交”邮件）。这个端口通常支持STARTTLS加密，可以确保通信安全。
3. **端口465**：这是SMTP的一个历史遗留端口，用于加密传输（SMTPS）。虽然已经被端口587替代，但有些服务器和客户端仍然支持该端口。
4. **端口 2525** 与 SMTP 没有正式关联，但某些电子邮件服务在上述端口被堵塞的情况下，通过这个端口提供 SMTP 传输。

通常，邮件客户端发送邮件时会使用端口587或465，而邮件服务器之间传输邮件时仍会使用端口25。

## SMTP 服务器

SMTP服务器是通过 SMTP 协议发送和接收电子邮件的邮件服务器。电子邮件客户端直接与电子邮件提供商的 SMTP 服务器连接，以开始发送电子邮件。SMTP 服务器中运行几个不同的软件：

-   **邮件提交[[代理]]（MSA）：** MSA 接收来自电子邮件客户端的电子邮件。
-   **邮件传送代理（MTA）：** 将邮件传送到传递链中的下一个服务器。如上所述，如有需要，它可能查询 [[DNS]] 以找到收件人所属域的邮件交换（MX）DNS 记录。
-   **邮件传递代理（MDA）：** 从 MTA 接收电子邮件并存储在收件人的电子邮件收件箱中。
