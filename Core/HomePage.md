---
banner: "![[wallhaven-7pv11v.jpg]]"
banner_y: 0.57556
banner_x: 0.5
cssclasses:
    - weather
    - noprop
---

<div align="center">
    <h2>Writing Statistics Chart for 2024</h2>
</div>

```contributionGraph
title: ""
graphType: default
dateRangeValue: 12
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
  - id: Wine_a
    color: "#d8b0b3"
    min: 1
    max: 2
  - id: Wine_b
    color: "#c78089"
    min: 2
    max: 3
  - id: Wine_c
    color: "#ac4c61"
    min: 3
    max: 5
  - id: Wine_d
    color: "#830738"
    min: 5
    max: 9999
  - id: 1725607117516
    min: "0"
    max: "0"
    color: "#ffffffff"
    text: ""
cellStyle:
  minWidth: 6px
  minHeight: 6px
  borderRadius: ""
mainContainerStyle: {}

```

<div align="center">
    <h2>ZeroHzzzz's GitHub Contribution Chart</h2>
    <img src="https://ghchart.rshah.org/zerohzzzz" alt="ZeroHzzzz 's Github chart" />
</div>

<div align="center">
    <h2>Weather Today</h2>
	<div class="weather_current_1">weather</div>
</div>

<div align="center">
    <h2>常用导航</h2>
</div>

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
