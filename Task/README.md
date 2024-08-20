# 班车预约 gateway

本项目旨在获取班车预约系统的信息，并将其转化为规范格式的 JSON 数据返回给客户端。系统采用模块化设计，便于扩展和维护。

## 返回格式

所有的 API 接口均返回标准化的 JSON 格式数据，格式如下：

```json
{
    "code": 200,
    "msg": "success",
    "data": "..."
}
```

## 文件结构

```tree

│  README.md
│
└─gateway/
    │  app.py
    │  config.yaml
    │
    ├─api/
    │  │  routes.py
    │  │  __init__.py
    │  │
    │  ├─bus/
    │  │      routes.py
    │  │      __init__.py
    │  │
    │  └─user/
    │          routes.py
    │          __init__.py
    │
    ├─logs/
    │      app.log
    │
    ├─service/
    │      bus.py
    │      login.py
    │      user.py
    │      __init__.py
    │
    └─utils/
            api.py
            msg.py
            utils.py
            __init__.py

```

## 配置文件

应用程序使用 `config.yaml` 文件来管理其设置。以下是配置文件的示例：

```yaml
DEBUG: false
TESTING: false
LOG_TO_FILE: true
LOG_FILE_PATH: 'app.log'
PORT: 5000
```

-   DEBUG: 启用或禁用 Flask 的调试模式。如果启用，应用程序会在代码变更时自动重载，适合开发阶段使用
-   TESTING: 启用或禁用测试模式。在测试模式下，Flask 提供一些特殊功能来帮助测试。
-   LOG_TO_FILE: 如果设置为 `true`，日志将写入到指定文件；如果为 `false`，日志将输出到控制台。
-   LOG_FILE_PATH: 日志文件的路径。如果 `LOG_TO_FILE` 为 `true`，日志将保存到该路径指定的文件中。
-   PORT: 应用程序运行的端口。

## 使用

### 环境依赖

在运行此项目之前，请确保已经安装了所有必要的依赖项。你可以通过以下命令安装所需的 Python 包：

```bash
pip install -r requirements.txt
```

### 启动应用程序

应用程序启动步骤如下：

1. 确保配置文件 `config.yaml` 已正确设置。
2. 运行以下命令启动应用程序：

```
python app.py
```

应用程序将根据 `config.yaml` 中的配置运行，并在配置的端口上监听请求。

### 日志记录

应用程序支持日志记录，具体取决于配置文件 `config.yaml` 中的设置。

-   如果 `LOG_TO_FILE` 设置为 `true`，日志将保存到 `LOG_FILE_PATH` 指定的文件中（如 `logs/app.log`）。
-   如果 `LOG_TO_FILE` 设置为 `false`，日志将只输出到控制台。

日志记录示例如下：

```bash
2024-08-09 12:00:01,123 - __main__ - INFO - method: GET | url: http://127.0.0.1:5000/api/user/login | status: 200 | duration: 0.05s | ip: 127.0.0.1
```

### 部署

对于生产环境，建议使用类似 Gunicorn 或 uWSGI 的生产服务器，并通过 Nginx 等反向代理服务器来处理请求。

使用 Gunicorn 部署的示例：

```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

该命令使用 4 个工作进程启动应用程序，监听 5000 端口。

### 测试

要启用测试模式，可以在 `config.yaml` 中将 `TESTING` 设置为 `true`。启用后，Flask 的测试工具和其他一些测试功能将生效。
