```dataviewjs
let pages = dv.pages("#Blog and -#Blog/Done");
dv.table(
	["Name","genre"],
	pages.sort(b => b.file.mtime,"desc")
		.map(b => [b.file.link,b.genre]
)
```
