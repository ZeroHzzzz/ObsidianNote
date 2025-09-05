`nslookup` 是一个命令行工具，主要用于查询[[域名]]系统（[[DNS]]）信息。它的名字是 "name server lookup"（域名服务器查询）的缩写，非常直观地概括了它的作用。

`nslookup` 的核心功能是帮助你**诊断 DNS 相关的问题**。具体来说，你可以用它做以下几件事：

- **将域名解析为 IP 地址（正向解析）**：这是最基本的功能。你可以输入一个域名，`nslookup` 就会返回它对应的 IP 地址。

```bash
nslookup www.google.com
```

- **将 IP 地址反向解析为域名（反向解析）**：如果你想知道某个 IP 地址对应哪个域名，可以使用它进行反向查询。不过，这需要该 IP 地址设置了 [[PTR 记录]]。

```bash
nslookup 0.0.0.0
```

- **查询特定类型的 DNS 记录**：除了 A 记录（IP 地址）和 PTR 记录外，`nslookup` 还可以查询其他类型的记录，比如MX 记录（查询域名的邮件服务器），NS 记录（查询负责该域名的 DNS 服务器），TXT 记录（查询与域名相关的文本信息，常用于验证域名所有权和反垃圾邮件，如 SPF）；

```
# 查询 Google 的邮件服务器
nslookup -type=mx google.com

# 查询 Baidu 的 DNS 服务器
nslookup -type=ns baidu.com
```

- **指定 DNS 服务器进行查询**：你可以告诉 `nslookup` 使用特定的 DNS 服务器来执行查询，这对于诊断本地 DNS 解析器或特定的 DNS 服务器问题非常有用。

```bash
# 使用 Google 的公共 DNS 服务器 (8.8.8.8) 查询
nslookup www.apple.com 8.8.8.8
```

- **调试模式**：如果你想查看 DNS 查询的完整过程，包括所有中间步骤和服务器返回的详细信息，可以使用调试模式。这对于排查复杂的 DNS 问题（如[[缓存]]问题、解析路径问题）特别有用。

```bash
nslookup -debug www.google.com
```

- **检查 DNS 区域传输**：DNS 区域传输是主 DNS 服务器向备用 DNS 服务器同步所有记录的过程。尽管大多数服务器出于安全考虑会禁用区域传输，但你可以用 `nslookup` 来尝试。这在测试服务器配置或诊断同步问题时很有用。

```
nslookup
> set type=any
> ls -d example.com   # 尝试列出 example.com 的所有记录
```
