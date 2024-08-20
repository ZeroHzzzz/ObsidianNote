假设我们有一个docker-compose.yml的内容如下

```yaml
version: '3'
services:
    web:
        build: ./web
        expose:
            - 80
        deploy:
            replicas: 3

    haproxy:
        image: haproxy:latest
        volumes:
            - ./haproxy:/haproxy-override
            - ./haproxy/haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg:ro
        external_links:
            - compose-haproxy-web_web_1
            - compose-haproxy-web_web_2
            - compose-haproxy-web_web_3
        ports:
            - '80:80'
            - '70:70'
        expose:
            - '80'
            - '70'
```

然后启动：

```bash
sudo docker-compose up
```

然后就会发现：

```
WARNING: Some services (web) use the 'deploy' key, which will be ignored. Compose does not support 'deploy' configuration - use `docker stack deploy` to deploy to a swarm. compose-haproxy-web_web_1 is up-to-date compose-haproxy-web_haproxy_1 is up-to-date
```

上面提示deploy不被支持，然后web也只启动了一个。这是为什么呢？

因为deploy在使用的时候，有一些限制，但你的compose文件中出现如下配置项时，deploy就无法使用：

-   build
-   cgroup_parent
-   container_name
-   devices
-   tmpfs
-   external_links
-   links
-   network_mode
-   restart
-   security_opt
-   stop_signal
-   sysctls
-   userns_mode
