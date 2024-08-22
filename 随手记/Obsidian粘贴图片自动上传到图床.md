Obsidian作为笔记软件来说还是不错的，但是...就是折腾了点

Obsidian中粘贴图片会默认保存到文件的同一目录下，这样会导致整个文件目录非常不美观，这对于一个强迫症来说，是不能接受的。因此，我设想能否将其统一转移到同一个文件夹中，使用类似于资源文件夹的方式，粘贴图片的时候自动保存到与当前文件名相同的目录中。但是这个办法也很不美观。出于以后方便将笔记发布到博客的考虑，我决定将Obsidian图片自动上传到图床上，并返回一个链接替换原来的图片。

我使用的是PicList + Obsidian插件的形式，这样会相对比较简单。Obsidian插件为 `auto upload image`，然后我们在本地安装PicList，并开放server服务即可。而图床我们使用的是自己搭建的Alist，这里不再赘述。

我们需要做的是将之前已经写成依托的笔记全部进行一个替换。由于obsidian笔记中，图片的格式为![[]]，和标准markdown的语法不同，因此为了后续方便发布我们也需要进行替换。

项目地址：[ZeroHzzzz/MarkdownImageProcessor (github.com)](https://github.com/ZeroHzzzz/MarkdownImageProcessor)
