hexo.extend.filter.register("before_post_render", function (data) {
    // 替换所有 "#<text>" 为 "\#<text>" 以避免被解析为标题
    data.content = data.content.replace(/#([^\s])/g, "\\#$1");
    return data;
});
