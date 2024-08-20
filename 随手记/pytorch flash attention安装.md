我在使用pytorch（2.4.0+cu121）时出现了以下提示：

```bash
UserWarning: 1Torch was not compiled with flash attention. (Triggered internally at C:\actions-runner\_work\pytorch\pytorch\builder\windows\pytorch\aten\src\ATen\native\transformers\cuda\sdp_utils.cpp:555.)
```

Flash Attention是一种注意力算法，更有效地缩放基于transformer的模型，从而实现更快的训练和推理。

**Requirements:**

-   CUDA toolkit or ROCm toolkit
-   PyTorch 1.12 and above.
-   `packaging` Python package (`pip install packaging`)
-   `ninja` Python package (`pip install ninja`) \*
-   Linux. Might work for Windows starting v2.3.2 (we've seen a few positive [reports](https://github.com/Dao-AILab/flash-attention/issues/595)) but Windows compilation still requires more testing. If you have ideas on how to set up prebuilt CUDA wheels for Windows, please reach out via Github issue.

Make sure that `ninja` is installed and that it works correctly (e.g. `ninja --version` then `echo $?` should return exit code 0). If not (sometimes `ninja --version` then `echo $?` returns a nonzero exit code), uninstall then reinstall `ninja` (`pip uninstall -y ninja && pip install ninja`). Without `ninja`, compiling can take a very long time (2h) since it does not use multiple CPU cores. With `ninja` compiling takes 3-5 minutes on a 64-core machine using CUDA toolkit.

**To install:**

```shell
pip install flash-attn --no-build-isolation
```

> [!Note]
> --no-build-isolation
> 当你使用 `--no-build-isolation` 参数时，`pip` 将不会创建这个隔离的虚拟环境。相反，它会直接使用你当前环境中的依赖项来进行构建。
