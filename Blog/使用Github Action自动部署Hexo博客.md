---
title: 使用Github Action自动部署Hexo博客
date: 2024-09-08 15:37
updated: 2024-09-11 05:47
tags: ['#github', '#GitHubPages', '#hexo']
---

#github #GitHubPages #hexo

因为懒所以懒

之前不是用Obsidian的git插件实现了自动同步，我转念一想，干脆搞个GitHub Aciton自动发布到博客好了，免得我自己再手动输一行命令去发布~~多累啊~~

我使用的架构是这样的，由于先前我们Obsidian使用用来备份的仓库和我们的GitHub Page仓库不是同一个，而且我们也是直接把文章的源文件放到了main分支中，因此我决定将Hexo相关配置放到ObsidanNote仓库的Hexo分支，然后让GitHub Action去调用就行了。

首先我们需要搞一个Token

因为我们需要在 **Hexo 项目仓库** 执行 **Github Actions** 向 **username.github.io 仓库**推送代码，由于 Github 权限限制，我们需要在 GitHub 账户中创建一个具有足够权限的**个人访问令牌（Personal Access Token，简称 PAT）**。这个令牌需要有足够的权限来修改仓库。

点击右上角头像 -> 打开 **Settings** -> 左边栏滚到最后找到 **Develop Setting** 打开，如图

![image.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202409110537234.png)

找到 **Personal Access Token** 点击 **Tokens（classic）** -> 选择 **Generate new token (classic)** ，如图

![image.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202409110538977.png)

然后随便新建一个好了，只要有读写仓库的权限就行。

将生成的 **PAT** 添加到你的博客源代码仓库的 **Secrets**，也就是我们部署GitHub Action的仓库，名字填入 **PERSONAL_TOKEN** ，后面会用到这个变量名。

![image.png](https://cloud.intro-iu.top:738/d/ThreeBody/ZeroHzzzzPic/202409110540172.png)

然后在我们存放Hexo配置的分支里面创建一个 .github/workflows 文件夹（如果尚未存在），然后新建一个yaml文件用于定义Github Action工作流。以下是我的yaml文件。

```yaml
run-name: Deploy Hexo to GitHub Pages
on:
    push:
        branches:
            - main

jobs:
    deploy:
        runs-on: ubuntu-latest
        steps:
            - name: Checkout hexo branch (Hexo environment)
              uses: actions/checkout@v3
              with:
                  ref: hexo
                  path: blog

            - name: Checkout articles from main branch (Blog folder)
              uses: actions/checkout@v3
              with:
                  ref: main
                  path: main-temp

            - name: Check if Blog folder exists
              run: ls main-temp/Blog

            - name: Move articles to _posts
              run: mv main-temp/Blog/* blog/source/_posts/

            - name: Set up Node.js
              uses: actions/setup-node@v3
              with:
                  node-version: '16'

            - name: Cache dependencies
              uses: actions/cache@v3
              with:
                  path: blog/node_modules
                  key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
                  restore-keys: |
                      ${{ runner.os }}-node-

            - name: Install dependencies
              run: npm install
              working-directory: ./blog

            - name: Install Hexo CLI
              run: npm install -g hexo-cli
              working-directory: ./blog

            - name: Generate static pages
              run: hexo generate
              working-directory: ./blog

            - name: List generated files
              run: ls -R ./blog/public

            - name: Deploy to GitHub Pages
              uses: peaceiris/actions-gh-pages@v3
              with:
                  personal_token: ${{ secrets.PERSONAL_TOKEN }}
                  publish_dir: ./blog/public
                  external_repository: <your repo>
                  publish_branch: main
```

这里我的配置比较特殊，因为我对笔记文件进行了分类，然后只有Blog目录下的文件会进行发布，因此我们只需要看Blog目录是否发生改变。这个可以根据自己的需要进行修改。

然后我们将这些文件提交至GitHub上，触发特定条件就可以触发GitHub Action工作流实现自动部署
