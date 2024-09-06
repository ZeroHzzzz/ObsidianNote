---
title: Nginx踩坑记录——location 路径匹配和 proxy_pass 转发行为的差异
date: 2024-09-06 03:10
updated: 2024-09-06 22:42
tags: ['#Nginx']
---

#Nginx

文章的开始我们先来看几种写法：

```nginx
location /b/ {
	proxy_pass http://localhost:2017/;
}
location /b/ {
	proxy_pass http://localhost:2017;
}
location /b {
	proxy_pass http://localhost:2017;
}
location /b {
	proxy_pass http://localhost:2017/;
}
```

请你告诉我，这几种写法有什么区别

## `location /b/` 和 `location /b`

这两个东西看起来很像，但是其实区别有点大。

我们先来看`location /b/`。这个配置匹配的是以`/b/`开头的路径。例如，`/b/something` 或 `/b/subdir/file` 等等。重要的是，这种匹配要求路径紧跟在`/b/`后面，后面必须有`/`，而且**不包括**`/b`。

而`location /b`这个配置匹配的是以`/b`开头的路径，既可以匹配`/b`本身，也可以匹配以`/b`开头的其他路径。例如，`/b`, `/b/something`, `/b/subdir/file` 都会被匹配。

## proxy_pass路径末尾有无/

这两个是不一样的。

如果你在 `proxy_pass` 后面使用的是 `http://localhost:2017`，即没有带“/”，那么Nginx 会将客户端请求的 URI 直接转发到目标服务器，保持原始 URI 不变。例如：

```nginx
location /test/ {
    proxy_pass http://localhost:2017;
}
```

在这种情况下，由于 `proxy_pass` 没有加斜杠，Nginx 不会去掉匹配的 `/test/` 前缀部分，而是直接将原始请求完整地转发给目标服务器。所以，假设客户端请求 `example.com/test/abc`，那么 Nginx 会将请求转发为 `http://localhost:2017/test/abc`。

如果你在 `proxy_pass` 后面加上了斜杠 `http://localhost:2017/`，在 `proxy_pass` 后面加上斜杠时，Nginx 会去掉客户端请求的 URI 中和**匹配位置**相关的部分，并替换为目标服务器的根路径。这里的**前缀部分**是指在 Nginx 配置中与 `location` 指令匹配的那部分 URL。例如：

```nginx
location /test/ {
    proxy_pass http://localhost:2017/;
}
```

在这个例子中，客户端请求的 URI `/test/abc` 中，`/test/` 是匹配的前缀部分，而 Nginx 会将这一部分去掉，并把剩余的 `/abc` 转发给目标服务器。这时，Nginx 会将请求转发为 `http://localhost:2017/abc`，即**去掉了匹配的前缀 `/test/`，并将剩余的部分加到目标服务器的根路径后**。

## 解答

```nginx
location /b/ {
	proxy_pass http://localhost:2017/;
}
```

-   **客户端请求**: `http://example.com/b/abc`
-   **Nginx 匹配的部分**: `/b/`
-   **剩余部分**: `abc`
-   **实际被转发的请求**: `http://localhost:2017/abc`

```nginx
location /b/ {
	proxy_pass http://localhost:2017;
}
```

-   **客户端请求**: `http://example.com/b/abc`
-   **Nginx 匹配的部分**: `/b/`
-   **剩余部分**: `abc`
-   **实际被转发的请求**: `http://localhost:2017/b/abc`

```nginx
location /b {
	proxy_pass http://localhost:2017;
}
```

-   **客户端请求**: `http://example.com/b/abc`
-   **Nginx 匹配的部分**: `/b`
-   **剩余部分**: `/abc`
-   **实际被转发的请求**: `http://localhost:2017/b/abc`

```nginx
location /b {
	proxy_pass http://localhost:2017/;
}
```

-   **客户端请求**: `http://example.com/b/abc`
-   **Nginx 匹配的部分**: `/b`
-   **剩余部分**: `/abc`
-   **实际被转发的请求**: `http://localhost:2017/abc`
