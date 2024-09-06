const recentNotes = dv
    .pages()
    .sort((page) => page.file.mtime, "desc")
    .slice(0, 10);

dv.el("h2", "最近修改的笔记");

recentNotes.forEach((page) => {
    dv.el(
        "div",
        `
        <div style="display: flex; align-items: center; margin-bottom: 15px; padding: 10px; border: 1px solid #eee; border-radius: 8px; background-color: #f9f9f9;">
            <div style="flex: 1;">
                <h3 style="margin: 0;">${page.file.name}</h3>
                <p style="margin: 5px 0;">最后修改时间: ${page.file.mtime.toLocaleString()}</p>
            </div>
        </div>
    `
    );
});
