---
title: Nginx代理转发请求方法改变问题
date: 2024-08-19 13:45
updated: 2024-09-06 22:35
tags: ['#Nginx重定向', '#HTTP状态码']
---

#Nginx重定向 #HTTP状态码

nginx的机制是所有转发默认是get，所以会导致post请求经过nginx转发后会被转化为get请求。

首先我们来了解一下几个[[HTTP#HTTP 状态码|http状态码]]的区别

### 301 Moved Permanently（永久重定向）

- **含义**：表示请求的资源已被永久移动到新的 URL 上，客户端应使用新的 URL 进行访问。
- **特点**：浏览器或搜索引擎通常会缓存 301 重定向，后续访问时会自动使用新的 URL。
- **请求方法**：请求方法（如 GET 或 POST）可能会被更改为 GET。

### 302 Found（临时重定向）

- **含义**：表示请求的资源临时被移动到新的 URL 上，但将来可能会返回到原来的 URL。
- **特点**：浏览器不会缓存 302 重定向，每次访问时都会重新请求原 URL。
- **请求方法**：请求方法可能会被更改为 GET，尤其是在表单提交时。

### 307 Temporary Redirect（临时重定向）

- **含义**：与 302 类似，表示请求的资源临时被移动，但它严格要求客户端使用原始的请求方法进行重定向。
- **特点**：浏览器不会缓存 307 重定向，且保证在重定向时不会更改请求方法（例如，POST 仍然会使用 POST）。
- **请求方法**：请求方法不会改变，客户端会以原始请求方法进行重定向。

### 308 Permanent Redirect（永久重定向）

- **含义**：与 301 类似，表示请求的资源已被永久移动到新的 URL。
- **特点**：浏览器或搜索引擎会缓存 308 重定向。
- **请求方法**：与 307 类似，308 要求请求方法不变，客户端会使用原始请求方法进行重定向。

### 总结

- **301** 和 **308** 都表示永久重定向，但 301 可能会更改请求方法，而 308 则不会。
- **302** 和 **307** 都表示临时重定向，但 302 可能会更改请求方法，而 307 则不会。

因此我们可以通过原样转发解决这个问题。也就是通过保留请求方法的重定向方式转发。

```nginx
server {
	listen 80;
	server_name test.123.com;
	location /test/api {
		return 307 http://192.168.1.133:8088/api;
		proxy_set_header Host $host;
	}
}
```

而当我们要根据请求类型来过滤按照请求类型转发到指定的地址时可以用以下方式来实现

```nginx
upstream test123 {
	server 192.168.1.133:8888 max_fails=3 fail_timeout=30s;
	server {
		listen 80;
		server_name test.123.com;
		location /api/bbb {
			if ($request_method = POST) {
				return 307 http://192.168.1.133:8088/aaa/bbb;
			}
			proxy_pass http://test123;
			proxy_set_header Host $host;
		}
	}
}
```

这样的话，当我们使用get请求`http://test.123.com/api/bbb`这个地址时请求不会被转发，而当我们使用post请求`http://test.123.com/api/bbb`这个地址时请求会被转发到`http://192.168.1.133:8088/aaa/bbb`这个地址
