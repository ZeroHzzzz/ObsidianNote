# 什么是 DNS CNAME 记录

一个"冠名" （CNAME）记录从一个别名域指向一个"冠名" 域。当一个[[域名|域]]或子域是另一个域的别名时，CNAME记录被用来代替 [[A记录]] 。 所有CNAME记录都必须指向一个域名，而不是指向一个IP地址。 CNAME记录允许你把一个域名（别名）指向另一个域名（规范名）。这样，当用户访问别名时，实际上会被重定向到规范名。

例如，假设 blog.example.com 的 CNAME 记录的值为“example.com”（没有“blog”）。这意味着当 DNS 服务器点击 blog.example.com 的 DNS 记录时，它实际上会触发另一个对 example.com 的 DNS 查找，并通过其 A 记录返回 example.com 的 IP 地址。在这种情况下，我们会说 example.com 是 blog.example.com 的规范名称（或真实名称）。

这样也就带来了一个优势。通过CNAME记录，你可以简化域名的管理。如果你的主域名的IP地址更改了，只需更新主域名的A记录，而不需要逐个更新每个子域名的记录

人们常常误以为CNAME记录必须解析为它指向的域名所在的网站。也就是说，他们认为如果 `blog.example.com` 的CNAME记录指向 `example.com`，访问 `blog.example.com` 时看到的内容一定和 `example.com` 一样。但是，CNAME记录实际上只是将客户端（即用户的浏览器）指向与根域名相同的IP地址。换句话说，CNAME记录让 `blog.example.com` 和 `example.com` 指向同一个IP地址。当客户端连接到这个IP地址时，Web服务器会根据客户端请求的URL来决定返回什么内容。例如，当用户访问 `blog.example.com` 时，尽管这个域名通过CNAME记录指向 `example.com` 的IP地址，Web服务器会识别出请求的URL是 `blog.example.com`，然后返回博客页面而不是`example.com` 的主页。

也就是说，CNAME记录并不改变用户访问的URL，而是将用户导向同一个IP地址。之后，具体返回什么内容由Web服务器根据请求的URL来决定。CNAME记录实现的是域名之间的指向关系，而实际内容的返回取决于Web服务器对请求的处理。

| blog.example.com | record type: | value:                     | TTL   |
| ---------------- | ------------ | -------------------------- | ----- |
| @                | CNAME        | is an alias of example.com | 32600 |

注意，MX 和 NS 记录不能指向 CNAME 记录，它们必须指向 A 记录（对于 IPv4）或 AAAA 记录。MX 记录是邮件交换记录，将电子邮件指向一个邮件服务器。NS 记录是“名称服务器”记录，表明哪个 DNS 服务器是该域的权威。

# 给GitHub Pages配置CNAME记录

我们这里主要讲述如何配置子域名。官方的文档[在这](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain)
其实不用很麻烦

首先需要建立一个名为CNAME的文件。文件中的内容也只需要一行，也就是自定义域名的空子域名，例如`blog.zerohzzzz.top`（请注意不是`https://blog.zerohzzzz.top`）。注意，在 *CNAME* 文件中只允许有**一个域名**。这个文件以后放在你博客中的sources文件夹中，以后`deloy`的时候会一起提交上去并出现在储存分支的根目录

进入你的`github.io`储存库，并进入设置（`setting`），在侧边栏中的`Code and automation`中选择`Pages`

在`Custom domain`条目下，输入你的域名，然后选择保存，注意这个域名和你*CNAME*文件中的域名要保持一致。

最后去你的DNS提供商（你域名在哪买就去哪，或者可以选择托管到cloudfare，但是国内的话速度堪忧）新增一个CNAME记录，将你的二级域名指向你的GitHub Pages，如`<user>.github.io`至此工作就全部完成了。
