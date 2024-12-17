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

这段代码的作用是查找一个连续的已排序区间（run），并在需要时对递减的部分进行反转，确保最终区间是递增的。如果原本的区间是递减的，它会将其反转成递增的。然后，返回这个已排序区间的长度。

```cpp
template <typename Compare, typename Projection>
void mergeCollapse(Compare comp, Projection proj) {
    while (pending_.size() > 1) {
        diff_t n = pending_.size() - 2;

        if ((n > 0 && pending_[n - 1].len <=
                          pending_[n].len + pending_[n + 1].len) ||
            (n > 1 && pending_[n - 2].len <=
                          pending_[n - 1].len + pending_[n].len)) {
            if (pending_[n - 1].len < pending_[n + 1].len) {
                --n;
            }
            mergeAt(n, comp, proj);
        } else if (pending_[n].len <= pending_[n + 1].len) {
            mergeAt(n, comp, proj);
        } else {
            break;
        }
    }
}
```

- 首先检查当前“run”是否满足合并的条件：
    - `(n > 0 && pending_[n - 1].len <= pending_[n].len + pending_[n + 1].len)`：如果倒数第二个“run”（`n-1`）的长度小于或等于当前“run”（`n`）和下一个“run”（`n+1`）的长度之和，那么就满足合并条件。
    - `(n > 1 && pending_[n - 2].len <= pending_[n - 1].len + pending_[n].len)`：如果倒数第三个“run”（`n-2`）的长度小于或等于倒数第二个“run”（`n-1`）和当前“run”（`n`）的长度之和，那么也满足合并条件。
- **`pending_[n - 1].len < pending_[n + 1].len`**: 如果倒数第二个“run”的长度小于下一个“run”的长度，调整 `n` 的值，让合并从 `n-1` 开始。
- **`mergeAt(n, comp, proj);`**: 如果满足合并条件，调用 `mergeAt` 函数进行合并操作。`mergeAt` 是执行实际合并的函数，合并 `pending_` 中的第 `n` 个和第 `n+1` 个“run”。
- **如果当前“run”的长度小于或等于下一个“run”的长度**，则直接合并当前“run”（`n`）和下一个“run”（`n+1`）。
- 如果没有满足任何合并条件，说明合并顺序已经是最优的，退出循环。

```cpp
template <typename Compare, typename Projection>
void mergeForceCollapse(Compare comp, Projection proj) {
    while (pending_.size() > 1) {
        diff_t n = pending_.size() - 2;

        if (n > 0 && pending_[n - 1].len < pending_[n + 1].len) {
            --n;
        }
        mergeAt(n, comp, proj);
    }
}
```

`mergeForceCollapse` 一般在以下情况下使用：

- **最后阶段的合并**：在合并的最后阶段（当合并过程已经完成大部分合并时），`mergeForceCollapse` 可以强制将剩下的“run”合并，确保排序完成。
- **避免停滞**：在某些情况下，`mergeForceCollapse` 可以避免由于不满足合并条件而造成的停滞，确保 TimSort 能继续进行合并，直到所有的“run”合并完。

```cpp
template <typename Compare, typename Projection>
void mergeConsecutiveRuns(iter_t base1,
                          diff_t len1,
                          iter_t base2,
                          diff_t len2,
                          Compare comp,
                          Projection proj) {
    GFX_TIMSORT_ASSERT(len1 > 0);
    GFX_TIMSORT_ASSERT(len2 > 0);
    GFX_TIMSORT_ASSERT(base1 + len1 == base2);

    auto k =
        gallopRight(std::invoke(proj, *base2), base1, len1, 0, comp, proj);
    GFX_TIMSORT_ASSERT(k >= 0);

    base1 += k;
    len1 -= k;

    if (len1 == 0) {
        return;
    }

    len2 = gallopLeft(std::invoke(proj, base1[len1 - 1]), base2, len2,
                      len2 - 1, comp, proj);
    GFX_TIMSORT_ASSERT(len2 >= 0);
    if (len2 == 0) {
        return;
    }

    if (len1 <= len2) {
        mergeLo(base1, len1, base2, len2, comp, proj);
    } else {
        mergeHi(base1, len1, base2, len2, comp, proj);
    }
}
```

它负责合并两个连续的已排序“run”（即两个已经排序的子序列）。函数通过优化的合并方式来减少不必要的比较和移动，从而提高排序效率。具体来说，它使用了 `gallop` 算法来更快地找到插入点，而不是一项一项地比较每个元素。

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

- 首先，函数检查输入的合法性，比如 `len > 0` 和 `hint` 在有效范围内。
- 然后，函数根据提示位置 `hint`，决定是向左还是向右进行查找，分别对应着：
    - 如果 `key` 比 `base[hint]` 大，搜索会向右扩展。
    - 如果 `key` 比 `base[hint]` 小，搜索会向左扩展。
- 在扩展过程中，`ofs` 变量会不断增加，采用指数级的增长（即每次翻倍），这种方法称为 **Galloping**，能够加速查找过程。
- 一旦找到合适的区间，就会用 `std::ranges::lower_bound` 进行最后的二分查找，确定 `key` 应插入的位置。

```cpp
static void rotateLeft(iter_t first, iter_t last) {
	std::iter_value_t<iter_t> tmp = std::ranges::iter_move(first);
	auto [_, last_1] = std::ranges::move(std::ranges::next(first), last, first);
	*last_1 = std::move(tmp);
}
```

一个用于将序列中的元素向左旋转的操作。具体来说，它将 `first` 位置的元素移动到 `last` 位置的前一个元素，并将中间的元素依次向左移动一位。

## MergeHi和MergeLo

`mergeLo` 和 `mergeHi` 是两个核心的合并函数，负责将两个已排序的子序列（称为“run”）合并成一个新的有序序列。它们的作用是针对不同的情况执行合并操作，并优化合并过程。

- **`mergeLo`**：适用于较小的第一个子序列（`base1`），即第一个子序列的长度较短，第二个子序列（`base2`）的元素将插入到第一个子序列的前端。
- **`mergeHi`**：适用于较大的第一个子序列（`base1`），即第一个子序列的长度较长，第二个子序列（`base2`）的元素将插入到第一个子序列的后端。

#### 1. `mergeLo`

`mergeLo` 的目标是将第二个子序列的元素插入到第一个子序列的前部。因此，`mergeLo` 会采用一种策略：从第一个子序列的开始位置开始，逐一插入第二个子序列的元素。

通常来说，`mergeLo` 会执行以下步骤：

1. **合并较小的子序列到较大的子序列前端**：由于第一个子序列长度较小，它会依次将第二个子序列中的元素插入到第一个子序列的正确位置（前端）。
2. **插入时进行比较**：`mergeLo` 会比较第一个子序列和第二个子序列当前元素的大小，决定哪个元素应该被插入到合并后的序列中。

这种方法可以通过 **双指针** 技术来实现，其中一个指针指向第一个子序列，另一个指针指向第二个子序列。

#### 2. `mergeHi`

与 `mergeLo` 相反，`mergeHi` 的目标是将第二个子序列的元素插入到第一个子序列的后部。由于第一个子序列长度较大，`mergeHi` 会从第一个子序列的末尾开始合并，向前进行操作。

`mergeHi` 的步骤通常是：

1. **合并较大的子序列到较小的子序列后端**：由于第一个子序列较大，`mergeHi` 会从末尾开始逐个插入第二个子序列中的元素。
2. **插入时进行比较**：与 `mergeLo` 类似，`mergeHi` 会比较两个子序列当前元素的大小，并选择较小的元素插入到最终合并序列的正确位置。

### 为什么要有 `mergeLo` 和 `mergeHi`？

在 TimSort 中，`mergeLo` 和 `mergeHi` 是对不同长度子序列的不同处理方式，它们旨在提高合并操作的效率：

- **`mergeLo`**：适用于较小的第一个子序列。当第一个子序列较小并且需要插入大量第二子序列的元素时，选择将第二个子序列的元素插入到第一个子序列的前端，这样可以减少不必要的移动和交换。
- **`mergeHi`**：适用于较大的第一个子序列。当第一个子序列较大时，`mergeHi` 会将第二个子序列的元素从末尾插入，避免移动较大的序列部分。

这种方法帮助 TimSort 在合并时避免冗余的比较和复制，提高了算法在处理大量已排序数据时的效率。

```cpp
template <typename Compare, typename Projection>
static void sort(iter_t const lo,
                 iter_t const hi,
                 Compare comp,
                 Projection proj) {
    GFX_TIMSORT_ASSERT(lo <= hi);

    auto nRemaining = hi - lo;
    if (nRemaining < 2) {
        return;  // nothing to do
    }

    if (nRemaining < MIN_MERGE) {
        auto initRunLen = countRunAndMakeAscending(lo, hi, comp, proj);
        GFX_TIMSORT_LOG("initRunLen: " << initRunLen);
        binarySort(lo, hi, lo + initRunLen, comp, proj);
        return;
    }

    TimSort ts;
    auto minRun = minRunLength(nRemaining);
    auto cur = lo;
    do {
        auto runLen = countRunAndMakeAscending(cur, hi, comp, proj);

        if (runLen < minRun) {
            auto force = (std::min)(nRemaining, minRun);
            binarySort(cur, cur + force, cur + runLen, comp, proj);
            runLen = force;
        }

        ts.pushRun(cur, runLen);
        ts.mergeCollapse(comp, proj);

        cur += runLen;
        nRemaining -= runLen;
    } while (nRemaining != 0);

    GFX_TIMSORT_ASSERT(cur == hi);
    ts.mergeForceCollapse(comp, proj);
    GFX_TIMSORT_ASSERT(ts.pending_.size() == 1);

    GFX_TIMSORT_LOG("size: " << (hi - lo)
                             << " tmp_.size(): " << ts.tmp_.size()
                             << " pending_.size(): " << ts.pending_.size());
}
```
