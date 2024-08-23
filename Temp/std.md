## I 地铁

### 题目大意

nn个车站，给定 mm条信息，每条信息给定 (l,d,k,c,a,b)(l,d,k,c,a,b)，表示从第ll时刻开始，每隔 dd时刻会发一辆车，一共会发 kk辆车，每辆车从车站 a→ba→b，耗时 cc时刻。

问从每一个车站出发，能到达第nn个车站的最晚出发时刻。忽略换乘时间。

### 解题思路

直接考虑从第ii个车站出发的话，会发现比较难做，题问最晚时刻，那我自然是搭乘越晚的班车越好，但是晚的话可能就错过了下一个站点的班车，导致最终不可达，即早到的话可以选择的余地多点，但晚到的话就很少选择，甚至没有。即我当前做决策的可行性难以判断。并且如果考虑每一个站点，时间上也不够。

题意问的是`多起点单终点`的情况，不妨反过来考虑，将边反向，从终点第 nn个车站考虑，这样就是`单起点多终点`的情况，跟最短路考虑的情况是一致的。

既然是反过来考虑，时间也是倒流的，我们从最晚的时刻，从第nn个车站出发，搭班车。

题目求最晚时刻，那我肯定是搭的班车越晚越好（正向考虑的），而这个`越晚越好`相对于现在考虑的`时光倒流`来说，就是`越早越好`。

所以就从第nn个车站开始，搭乘当前可搭乘的最晚的一个班车（一个数学公式就可以得到，也可以二分），到达下一个车站。维护dis[i]dis[i]表示到达第 ii个车站的最晚时刻，为保证正确性和复杂度的正确性（道理和dijkstradijkstra一样），接着考虑`最晚到达时刻的车站`，依次搭乘班车即可，就像dijkstradijkstra一样，用一个优先队列维护出队顺序即可。

### std

```cpp
#include <bits/stdc++.h>
using namespace std;
using LL = long long;

int main(void) {
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    int n, m;
    cin >> n >> m;
    vector<vector<array<int, 5>>> edge(n);
    for (int i = 0; i < m; ++i) {
        int l, d, k, c, a, b;
        cin >> l >> d >> k >> c >> a >> b;
        --a, --b;
        edge[b].push_back({a, l, d, k, c});
    }
    vector<LL> dis(n, -1);
    priority_queue<pair<LL, int>> q;
    dis[n - 1] = 3e18;
    q.push({3e18, n - 1});
    while (!q.empty()) {
        auto [d, u] = q.top();
        q.pop();
        if (dis[u] != d)
            continue;
        for (auto [v, l, dd, k, c] : edge[u]) {
            LL t = dis[u] - c;
            t = (t - l) / dd;
            if (t >= k)
                t = k - 1;
            if (t < 0)
                continue;
            t = l + t * dd;
            if (dis[v] < t) {
                q.push({dis[v] = t, v});
            }
        }
    }
    for (int i = 0; i < n - 1; ++i) {
        if (dis[i] == -1)
            cout << "Unreachable" << endl;
        else
            cout << dis[i] << endl;
    }
    return 0;
}
```

## j

### 解题思路

网格大小只有60×6060×60，两人所处位置的状态数只有 604=107<5e8604=107<5e8，此即为朴素搜索的复杂度上限，因此直接BFS即可。

本题是求两点重合的最小操作数，不能重合则输出 -1 。  
设两点坐标分别为 ( i1 , j1 ) 、( i2 , j2 )，将这两个坐标用四个维度的 ( i1 , j1 , i2 , j2 ) 坐标来表示，当 i1 = i2 , j1 = j2 时，才是答案所要求的情况，初始时两点错开，只有利用好棋子遇到障碍物和边界无法继续移动的特性，才能达成目的，用 BFS 搜索最短路径，并且枚举出遇到边界和障碍物的情况下坐标的变化，最早遇到重合的情况就是答案，如果遍历了整个过程下来依然没有获取到答案，则输出 -1 。

### std

```cpp
#include <bits/stdc++.h>
using namespace std;
using LL = long long;

const int inf = 1e9 + 7;

int main(void) {
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    int n;
    cin >> n;
    vector<string> tu(n);
    for (auto& i : tu)
        cin >> i;
    array<int, 4> dx = {0, 0, 1, -1};
    array<int, 4> dy = {1, -1, 0, 0};
    typedef array<int, 4> s;
    queue<s> q;
    vector<int> dis(n * n * n * n, inf);
    s st;
    int cnt = 0;
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < n; ++j) {
            if (tu[i][j] == 'P') {
                st[0 + cnt * 2] = i;
                st[1 + cnt * 2] = j;
                tu[i][j] = '.';
                ++cnt;
            }
        }
    q.push(st);
    auto tr = [&](s x) {
        return x[0] * n * n * n + x[1] * n * n + x[2] * n + x[3];
    };
    dis[tr(st)] = 0;
    int ans = -1;
    auto ok = [&](int x, int y) {
        return x >= 0 && x < n && y >= 0 && y < n && tu[x][y] != '#';
    };
    while (!q.empty()) {
        auto u = q.front();
        int w = dis[tr(u)];
        auto [x1, y1, x2, y2] = u;
        q.pop();
        for (int i = 0; i < 4; ++i) {
            int nx1 = x1 + dx[i];
            int ny1 = y1 + dy[i];
            int nx2 = x2 + dx[i];
            int ny2 = y2 + dy[i];
            if (!ok(nx1, ny1)) {
                nx1 = x1;
                ny1 = y1;
            }
            if (!ok(nx2, ny2)) {
                nx2 = x2;
                ny2 = y2;
            }
            int v = tr({nx1, ny1, nx2, ny2});
            if (dis[v] > w + 1) {
                dis[v] = w + 1;
                q.push({nx1, ny1, nx2, ny2});
            }
            if (nx1 == nx2 && ny1 == ny2) {
                ans = dis[v];
                break;
            }
        }
        if (ans != -1)
            break;
    }
    cout << ans << '\n';

    return 0;
}
```

## k

### 题目大意

给定数字\(n\)，依次给定\(q\)个条件 \((a_i,b_i,d_i)\)。

对于一个条件集合\(s\)，如果存在一个长度为\(n\)数组 \(x\)，对于这个集合里的所有条件，都满足\(x*{a_i} - x*{b_i} = d_i\)，那么这个集合是好的。

初始集合为空，依次对每个条件，如果加入到集合后，集合是好的，则加入到集合中。

问最后集合的元素。

### 解题思路

条件相当于是规定了数组\(x\)元素之间的差的关系。

对于一个条件\((a,b,d)\)，我们可以连一条 \(a\to b\)的边，边权为 \(d\)，反向边的边权为 \(-d\)。

考虑一个集合不是好时，此时形成的图是怎样的。

当加入一个条件\((a,b,d)\)，集合可能还是好的，但也可能变得不好，

如果还是好的，有两种情况：

-   一是\(a,b\)原先没有什么联系，即不连通，加了条边之后连通了，仅此而已。
-   二是\(a,b\)是连通的，加了 \(a\to b\)这条边后会形成一个环，环的边权和为 \(0\)，或者说 \(a\to b\)存在两条路径，其边权和相等。

在第二种情况下，这个条件就是多余的，我们可以不管这个条件，即不加这条边。此时图就没有环，即是一棵树（或森林）。

树是一个非常好的图，有着树上路径唯一的性质，因此情况二下， 我们可以很容易求出 \(a\to b\)的路径和，然后与 \(d\)比较，相等则说明加入这个条件后，集合还是好的。

而如果不相等，则说明不能加入这个条件，即有条件冲突了，说明 \(a\to b\)存在**两条边权和不一样的路径**。

所以问题就剩下，如何在动态加边的情况下，求出\(a\to b\)的长度。

如果是一棵静止的树，一个常用的方法就是预处理每个点到根节点的距离\(dis[i]\)，那么 \(a \to b\)距离就是 \(dis[a] - dis[b]\)，注意到反向边的边权是负值，所以\(lca\)到根的距离恰好抵销了。

而当两棵树合并时，有一棵树的 \(dis\)就要全部更新，为降低时间复杂度，可以采用**启发式合并**的策略，即节点树少的树合并到节点树多的树上，这样每次只用更新**节点数少**的树的 \(dis\)。更新就是从合并点开始\(DFS\)，更新\(dis\)数组。

为计算启发式合并的时间复杂度，可以考虑每个节点的\(dis\)的更新次数——每更新一次，其节点所在的连通块大小至少**翻倍**，那么每个节点最多更新 \(\log n\)次，其所在的连通块就包含了所有的节点，也就不会再更新了，因此启发式合并的复杂度是 \(O(n\log n)\)

用并查集维护连通性，然后树合并时采用启发式合并的策略更新\(dis\)数组 ，时间复杂度是 \(O(q + n\log n)\)。

```cpp
#include <bits/stdc++.h>

using namespace std;
using LL = long long;

class dsu {
   public:
    vector<int> p;
    vector<int> sz;
    vector<LL> dis;
    vector<vector<array<int, 2>>> edge;
    int n;
    dsu(int _n) : n(_n) {
        p.resize(n);
        sz.resize(n);
        dis.resize(n);
        edge.resize(n);
        iota(p.begin(), p.end(), 0);
        fill(sz.begin(), sz.end(), 1);
        fill(dis.begin(), dis.end(), 0);
    }
    inline int get(int x) { return (x == p[x] ? x : (p[x] = get(p[x]))); }
    inline void dfs(int u, int fa) {
        for (auto& [v, w] : edge[u]) {
            if (v == fa)
                continue;
            dis[v] = dis[u] - w;
            dfs(v, u);
        }
    }
    inline bool unite(int x, int y, int w) {
        int fx = get(x);
        int fy = get(y);
        if (fx != fy) {
            if (sz[fx] > sz[fy]) {
                swap(x, y);
                swap(fx, fy);
                w = -w;
            }
            edge[x].push_back({y, w});
            edge[y].push_back({x, -w});
            dis[x] = dis[y] + w;
            dfs(x, y);
            p[fx] = fy;
            sz[fy] += sz[fx];
            return true;
        } else {
            return dis[x] == dis[y] + w;
        }
    }
};

int main(void) {
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    int n, q;
    cin >> n >> q;
    dsu ji(n);
    for (int i = 1; i <= q; ++i) {
        int a, b, d;
        cin >> a >> b >> d;
        --a, --b;
        if (ji.unite(a, b, d))
            cout << i << ' ';
    }
    cout << '\n';
    return 0;

}
```
