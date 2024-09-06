由于qqbot的需要，我不得不使用多个后端并搭配负载均衡来应对信息的高并发情况。由于我将整个项目组织成了docker-compose的形式，因此我使用replicas的参数来运行多个ws服务的副本以满足需求。

下面是一个包含 `replicas` 参数的示例 `docker-compose.yml` 文件：

```yaml
  ws:
    image: python:3.12-slim
    command: >
      bash -c "pip install --upgrade pip &&
               pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt &&
               python server.py"
    working_dir: /app
    volumes:
      - ./ws:/app
    networks:
      - my_network
    deploy:
      replicas: 3
```

指得一提的是，运行的服务副本命名方式为：<projectname><server_name>\_num
其中，project_name可以在运行时指定，默认为项目文件夹名称

```bash
sudo docker-compose -p <project_name> up
```
