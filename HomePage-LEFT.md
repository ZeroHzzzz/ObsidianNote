---
banner: "![[wallhaven-7pv11v.jpg]]"
banner_y: 0.55334
banner_x: 0.5
---

```contributionGraph
title: Writings in the last few months
graphType: default
dateRangeValue: 6
dateRangeType: LATEST_MONTH
startOfWeek: 1
showCellRuleIndicators: true
titleStyle:
  textAlign: center
  fontSize: 20px
  fontWeight: normal
dataSource:
  type: PAGE
  value: ""
  dateField:
    type: FILE_MTIME
  filters: []
  countField:
    type: DEFAULT
fillTheScreen: true
enableMainContainerShadow: false
cellStyleRules:
  - id: default_b
    color: "#9be9a8"
    min: 1
    max: 2
  - id: default_c
    color: "#40c463"
    min: 2
    max: 5
  - id: default_d
    color: "#30a14e"
    min: 5
    max: 10
  - id: default_e
    color: "#216e39"
    min: 10
    max: 999
cellStyle:
  minWidth: 15px
  minHeight: 15px
mainContainerStyle:
  boxShadow: rgba(0, 0, 0, 0.16) 0px 1px 4px

```

--- start-multi-column: ID_47k0

```column-settings
Number of Columns: 2
Largest Column: standard
border:off
Shadow:on
```

### 最近修改

```dataviewjs
// 获取并排序最近修改的笔记
let pages = dv.pages().sort(p => p.file.mtime, 'desc');

// 显示前10个最近修改的笔记标题并居中
dv.list(
    pages.slice(0, 10).map(p => dv.span(`**${p.file.name}**`, { style: "display: block; text-align: center;" }))
);

```

--- column-break ---

### 未完成

```dataviewjs
// 获取带有 #uncompleted 标签的笔记
let pages = dv.pages("#uncompleted");

// 创建一个居中的列表
dv.list(
    pages.map(p => dv.span(`**${p.file.name}**`, { style: "display: block; text-align: center;" }))
);
```

--- end-multi-column
