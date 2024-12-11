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
