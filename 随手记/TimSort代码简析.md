```cpp
template <typename Compare, typename Projection>
static diff_t countRunAndMakeAscending(iter_t const lo,
                                       iter_t const hi,
                                       Compare comp,
                                       Projection proj) {
    GFX_TIMSORT_ASSERT(lo < hi);

    auto runHi = std::ranges::next(lo);
    if (runHi == hi) {
        return 1;
    }

    if (std::invoke(comp, std::invoke(proj, *runHi),
                    std::invoke(proj, *lo))) {  // decreasing
        do {
            ++runHi;
        } while (runHi < hi &&
                 std::invoke(comp, std::invoke(proj, *runHi),
                             std::invoke(proj, *std::ranges::prev(runHi))));
        std::ranges::reverse(lo, runHi);
    } else {  // non-decreasing
        do {
            ++runHi;
        } while (
            runHi < hi &&
            !std::invoke(comp, std::invoke(proj, *runHi),
                         std::invoke(proj, *std::ranges::prev(runHi))));
    }

    return runHi - lo;
}

```

```cpp
    template <typename T, typename Iter, typename Compare, typename Projection>
    static diff_t gallopLeft(T const& key, Iter const base, diff_t const len, diff_t const hint,
                             Compare comp, Projection proj) {
        GFX_TIMSORT_ASSERT(len > 0);
        GFX_TIMSORT_ASSERT(hint >= 0);
        GFX_TIMSORT_ASSERT(hint < len);

        diff_t lastOfs = 0;
        diff_t ofs = 1;

        if (std::invoke(comp, std::invoke(proj, base[hint]), key)) {
            auto maxOfs = len - hint;
            while (ofs < maxOfs && std::invoke(comp, std::invoke(proj, base[hint + ofs]), key)) {
                lastOfs = ofs;
                ofs = (ofs << 1) + 1;

                if (ofs <= 0) { // int overflow
                    ofs = maxOfs;
                }
            }
            if (ofs > maxOfs) {
                ofs = maxOfs;
            }

            lastOfs += hint;
            ofs += hint;
        } else {
            diff_t const maxOfs = hint + 1;
            while (ofs < maxOfs && !std::invoke(comp, std::invoke(proj, base[hint - ofs]), key)) {
                lastOfs = ofs;
                ofs = (ofs << 1) + 1;

                if (ofs <= 0) {
                    ofs = maxOfs;
                }
            }
            if (ofs > maxOfs) {
                ofs = maxOfs;
            }

            diff_t const tmp = lastOfs;
            lastOfs = hint - ofs;
            ofs = hint - tmp;
        }
        GFX_TIMSORT_ASSERT(-1 <= lastOfs);
        GFX_TIMSORT_ASSERT(lastOfs < ofs);
        GFX_TIMSORT_ASSERT(ofs <= len);

        return std::ranges::lower_bound(base + (lastOfs + 1), base + ofs, key, comp, proj) - base;
    }
```

Timsort 采用了 Galloping 搜索来优化查找过程，而不是简单的线性查找或传统的二分查找。Galloping 搜索通过指数增长的步长来加速查找，尤其是在数据已经部分有序时，比传统的二分查找效率更高。

在 Timsort 中，多个有序的子序列会被合并成一个更大的有序序列。`gallopLeft` 可以帮助确定某个元素应该插入哪个子序列，从而在合并过程中进行高效的插入操作。
**工作原理**：

-   首先，函数检查输入的合法性，比如 `len > 0` 和 `hint` 在有效范围内。
-   然后，函数根据提示位置 `hint`，决定是向左还是向右进行查找，分别对应着：
    -   如果 `key` 比 `base[hint]` 大，搜索会向右扩展。
    -   如果 `key` 比 `base[hint]` 小，搜索会向左扩展。
-   在扩展过程中，`ofs` 变量会不断增加，采用指数级的增长（即每次翻倍），这种方法称为 **Galloping**，能够加速查找过程。
-   一旦找到合适的区间，就会用 `std::ranges::lower_bound` 进行最后的二分查找，确定 `key` 应插入的位置。
