import os
import glob

# 设定目录路径
directory = '.'

# 图片文件扩展名
extensions = ('*.jpg', '*.jpeg', '*.png', '*.gif', '*.bmp')

# 遍历目录下所有匹配的图片文件并删除
for root, dirs, files in os.walk(directory):
    for ext in extensions:
        for file in glob.glob(os.path.join(root, ext)):
            os.remove(file)
            print(f"Deleted {file}")