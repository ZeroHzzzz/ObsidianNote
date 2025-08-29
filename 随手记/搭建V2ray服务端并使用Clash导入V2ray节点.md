为了方便，我们自己搭建v2ray服务端的时候常会使用[https://github.com/233boy/v2ray](https://github.com/233boy/v2ray)这个一键搭建脚本来简化我们搭建的流程，最后生成的订阅链接是vmess://的格式，这样并不能直接导入到clash中。此时，我们可以通过两种方式来解决这个问题：

## 使用订阅转换工具

订阅的转换可以使用这个工具：[subconverter](https://github.com/tindy2013/subconverter)，而这个工具可以将各种[[代理]]协议（如 V2Ray、Shadowsocks、Trojan 等）的订阅链接转换成 Clash、Quantumult、Shadowrocket 等客户端支持的格式。

网上也有一些可以直接使用的在线转化工具，但是一般来说我并不是很建议使用，因为这些东西随时会提桶跑路，导致我们订阅更新失败。

还有一个问题就是，当我们使用别人的subconverter服务的时候，我们需要提供自己的代理订阅链接，而这些链接通常包括了我们的服务器地址，端口号，加密方式等信息，而这些信息是可以被人利用来伪造订阅数据或是跟踪你的网络流量的。只要他在返回的节点中添加或替换恶意节点，当你连接这些节点时，你的流量可能会被监视或劫持。

因此，要不就自己搭建一个，要不就看下一个方法。

## 修改配置文件

其实我们仔细去看这个subconverter也就干了一件事情，就是返回一个链接，然后这个链接里面有我们代理节点的配置文件，比如我们需要使用的是clash，那么就需要 YAML 格式的代理节点配置。因此这个过程其实我们是可以自己来完成的。

我使用的Clash客户端是Clash-verge

我们直接新建一个类型为Local的订阅，然后直接写入我们的配置信息就行了。这里我们需要使用当时在搭建v2ray服务端的时候获取到的信息。例如：

```bash
使用协议: VMess-TCP
-------------- VMess-TCP-xxxx.json -------------
协议 (protocol)         = vmess
地址 (address)          = ...
端口 (port)             = ...
用户ID (id)             = ...
传输协议 (network)      = tcp
伪装类型 (type)         = none
------------- 链接 (URL) -------------
vmess://...
```

那么我们写成的配置文件的样例就像下面这样：

```yaml
# Clash configuration file

port: 7890
socks-port: 7891
allow-lan: true
mode: Rule
log-level: info
external-controller: 127.0.0.1:9090
secret: ""

# Proxy list
proxies:
  - name: "Name"
    type: vmess
    server: ...
    port: ...
    uuid: ...
    alterId: 0
    cipher: auto
    network: tcp
    udp: true
    tls: false

# Proxy Group
proxy-groups:
  - name: "Proxy"
    type: select
    proxies:
      - "Name"
      - "DIRECT"

# Rule section
rules:
  - GEOIP,CN,DIRECT
  - MATCH,Proxy
```
