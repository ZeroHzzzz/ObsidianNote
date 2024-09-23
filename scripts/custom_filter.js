hexo.extend.filter.register("before_post_render", function (data) {
    // 替换只有单个 # 后跟非空白字符的情况，而不影响 ## 或更多 #
    data.content = data.content.replace(/(^|\s)#([^\s#])/g, "$1\\#$2");
    return data;
});
