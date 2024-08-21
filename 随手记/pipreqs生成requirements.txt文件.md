## 安装

```bash
pip install pipreqs
```

## 使用

```bash
pipreqs .
```

这个命令会扫描当前目录中的 Python 文件，识别出使用的库，并生成 `requirements.txt` 文件。使用`--force` 选项会覆盖现有的 `requirements.txt` 文件。
