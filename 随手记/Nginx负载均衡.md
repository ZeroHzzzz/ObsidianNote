某大模型说：nginx负载均衡是一种通过将流量分配到多个服务器上来提高应用程序性能和可靠性的方法。
基本的写法如下：

```nginx
http {
    upstream backend {
        server backend1.example.com;
        server backend2.example.com;
        server backend3.example.com;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

这个配置定义了一个名为`backend`的upstream组，客户端请求到达nginx时，nginx会将请求转发到这些服务器中的一个。

## 负载均衡策略

-   **轮询（默认）**：nginx会依次将请求分发到每个服务器
-   **权重**：可以为每个服务器分配权重，权重越高，服务器接收的请求越多。如下：

```nginx
upstream backend {
    server backend1.example.com weight=3;
    server backend2.example.com weight=1;
    server backend3.example.com weight=2;
}
```

-   **IP哈希**：基于客户端IP地址分配服务器，使同一个IP地址的请求总是被分配到同一个服务器。如下：

```nginx
upstream backend {
    ip_hash;
    server backend1.example.com;
    server backend2.example.com;
    server backend3.example.com;
}
```

-   **最少连接数**：将请求分配到当前活动连接数最少的服务器

```nginx
upstream backend {
    least_conn;
    server backend1.example.com;
    server backend2.example.com;
    server backend3.example.com;
}
```
