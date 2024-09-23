hexo.extend.filter.register("before_post_render", function (data) {
    // 替换所有 "#<text>" 为 "\#<text>"
    data.content = data.content.replace(/#([^\s])/g, "\\#$1");
    return data;
});
