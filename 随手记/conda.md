```bash
conda env list
conda info --envs
conda create -n env_name python=...
conda activate env_name
conda deactivate
conda remove --name env_name --all  // 删除指定虚拟环境及其中所安装的包
conda remove --name env_name  package_name
conda env export --name myenv > myenv.yml
conda env create -f  myenv.yml
conda list pkgname*  //*号用于模糊查找
conda install package_name
conda uninstall package_name
```
