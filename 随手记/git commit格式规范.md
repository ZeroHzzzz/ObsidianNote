格式：

```bash
<type>(<scope>): <subject>
```

#### type (必须)

用于说明 git commit 的类别，只允许使用下面的标识：

- `feat`：新功能（feature）。
- `fix/to`：修复 bug，可以是 QA 发现的 BUG，也可以是研发自己发现的 BUG。
    - `fix`：产生 diff 并自动修复此问题。适合于一次提交直接修复问题。
    - `to`：只产生 diff 不自动修复此问题。适合于多次提交。最终修复问题提交时使用 `fix`。
- `docs`：文档（documentation）。
- `style`：格式（不影响代码运行的变动）。
- `refactor`：重构（即不是新增功能，也不是修改 bug 的代码变动）。
- `perf`：优化相关，比如提升性能、体验。
- `test`：增加测试。
- `chore`：构建过程或辅助工具的变动。
- `revert`：回滚到上一个版本。
- `merge`：代码合并。
- `sync`：同步主线或分支的 Bug。

#### scope (可选)

scope 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

例如在 Angular，可以是 `location`，`browser`，`compile`，`rootScope`，`ngHref`，`ngClick`，`ngView` 等。如果你的修改影响了不止一个 scope，你可以使用 `*` 代替。

#### subject (必须)

subject 是 commit 目的的简短描述，不超过 50 个字符。

建议使用中文（感觉中国人用中文描述问题能更清楚一些）。

结尾不加句号或其他标点符号。

#### 示例

```bash
fix(DAO): 用户查询缺少 username 属性
feat(Controller): 用户查询接口开发
```
