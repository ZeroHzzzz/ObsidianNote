# 主页

[AI Geeks (aigeeksgroup.github.io)](https://aigeeksgroup.github.io/)

# 算力服务器的使用

```bash
ssh -p 17638 zeyuv1@67.219.99.137
```

```bash
# 训练时使用nohup避免因为ssh断连而停止训练
nohup python train-balce.py  > /home/zeyuv1/Austin/logs/train_resnet50_totalsegemnetar_test_pretrain+balce_0.65.log 2>&1 &

nohup python train.py  > /code/timm_3d_classification/logs/train_Convnext_tiny_totalsegemnetar_test_pretrain.log 2>&1 &

nohup python train-balce-schedulefree.py  > /code/timm_3d_classification/logs/train_resnet50_totalsegemnetar_test_pretrain+balce+schedule.log 2>&1 &

nohup python train-resample-balce.py  > /code/timm_3d_classification/logs/train_resnet50_totalsegemnetar_test_pretrain+balce+resample.log 2>&1 &

nohup python train-balce-sam.py  > /logs/train_resnet50_totalsegemnetar_test_pretrain+balce+sam.log 2>&1 &
# 使用tail命令查看日志
tail -f /code/timm_3d_classification/logs/train_resnet50_totalsegemnetar_test_pretrain+balce_0.65.log

```

训练完记录完数据之后只留下最好的数据，其余删除

```bash
find . -type f ! -name 'epoch_48.ckpt' -delete
```

Austin使用的是[timm _3d](https://github.com/ZFTurbo/timm_3d)库

docker使用命令样例：

```bash
docker run -p 49450:22 -it --rm -d --ipc host --gpus 'device=0' --mount type=bind,source=/media/data-aug,target=/code --shm-size=16gb stevezeyuzhang/colab:1.7.1 &
```

# 请注意，请不要使用[[scp]]传输数据或者从vscode中下载数据。

**因为代理如果超出流量限制会停机，导致服务器无法访问从而瘫痪，请使用互联网传输数据，比如将本地的数据和代码传输到google drive或者github 配合 gdown wget使用**

# ClickUp 文档

分类网络效果实验数据文档：[Rregression | Experiment (clickup.com)](https://app.clickup.com/9016196105/v/dc/8cpgf09-36/8cpgf09-156)
