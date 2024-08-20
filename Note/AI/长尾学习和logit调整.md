# 长尾分布是什么

长尾分布是指大多数类别只有少量样本，而少数类别有大量样本的分布形式。因为稀有类别样本少，模型难以泛化，并且容易偏向常见类别，从而忽略稀有类别的学习。

而分类问题中，类别的分布是长尾分布的时候，我们就称这个训练的过程为**长尾学习**

在这种情况下，类别的分布 $\mathbb{P}(y)$ 高度偏斜，因此许多稀有类别（“尾部”标签）的出现概率非常低。在这种情况下，分类错误率（misclassification error）并不是一个合适的性能度量，因为一个简单的预测器如果将所有实例都分类为多数类标签，将会获得很低的分类错误率。

为了应对这个问题，一种更合适的替代方法是平衡错误率（Balanced Error Rate, BER），其计算方法是对每个类别的错误率取平均值。公式如下： $$\text{BER}(f) \approx \frac{1}{L} \sum_{y \in [L]} \mathbb{P}_{x|y} \left( y \notin \arg\max_{y' \in y} f_{y'}(x) \right)$$
其中，$L$ 是类别的数量，$\mathbb{P}_{x|y}$ 表示给定类别 $y$ 时样本 $x$ 的概率， $f_{y'}(x)$ 表示分类器 $f$ 对样本 $x$ 预测为类别 $y'$ 的分数。我们可以将他看作是隐含地使用了一个平衡的类别概率函数 $\mathbb{P}^{\text{bal}}(y \mid x) \propto \frac{1}{L} \cdot \mathbb{P}(x \mid y)$，而不是在分类错误率中使用的原生 $\mathbb{P}(y \mid x) \propto \mathbb{P}(y) \cdot \mathbb{P}(x \mid y)$

为了应对类别不平衡问题，现有的方法可以分为以下几类：

-   **数据修改**：通过过采样或欠采样来平衡类别分布。
-   **输出修改**：通过后处理方法，如调整决策阈值或权重归一化。
-   **内部修改**：通过修改损失函数来调整类别权重。

# 数据修改

## 重采样（Resampling）

### 过采样（Oversampling）

通过增加长尾类别的数据样本来平衡数据集。

#### 常见过采样方法

##### 随机过采样（Random Oversampling）

随机复制少数类的样本，直到各类别的样本数量达到平衡。例如，如果有1000个多数类样本和100个少数类样本，通过复制少数类样本的方式增加到1000个少数类样本。

##### SMOTE（Synthetic Minority Over-sampling Technique）

通过生成新的合成样本来增加少数类样本。SMOTE算法通过选择少数类样本的k个最近邻，然后在样本与其最近邻之间插值生成新的样本。例如，如果样本A和样本B是最近邻，SMOTE会在A和B之间随机选择一个点作为新样本

##### ADASYN（Adaptive Synthetic Sampling Approach for Imbalanced Learning）

ADASYN是SMOTE的改进版本，根据样本分布自适应地生成新的样本。ADASYN会根据样本分布的密度来生成新的样本，即在分布稀疏的区域生成更多的新样本，以更好地平衡数据集

#### 实现

过采样可以通过`imblearn`库实现，例如

```python
from imblearn.over_sampling import SMOTE
from sklearn.datasets import make_classification
from collections import Counter

# 创建一个不平衡数据集
X, y = make_classification(
		n_classes=2, class_sep=2, weights=[0.1, 0.9],
        n_informative=3, n_redundant=1, flip_y=0,
        n_features=20, n_clusters_per_class=1,
        n_samples=1000, random_state=10)

print(f"原始数据集类别分布: {Counter(y)}")

# 使用SMOTE进行过采样
smote = SMOTE(random_state=42)
X_res, y_res = smote.fit_resample(X, y)

print(f"过采样后数据集类别分布: {Counter(y_res)}")
```

#### 缺点

-   **过拟合风险**：如果只是简单地复制样本，可能会导致模型对训练数据的过拟合，因为模型可能会记住复制的样本。
-   **计算开销增加**：生成大量的合成样本可能会增加训练时间和计算资源的需求。

### 欠采样（Undersampling）

通过减少主流类别的数据样本来平衡数据集。这可以通过随机删除一些主流类别样本实现。

#### 常见欠采样方法

##### 随机欠采样（Random Undersampling）

随机移除多数类的样本，直到各类别的样本数量达到平衡。例如，如果有1000个多数类样本和100个少数类样本，通过随机删除多数类样本的方式减少到100个多数类样本

##### 近邻清除（NearMiss）

选择距离最近的少数类样本的多数类样本，并将这些多数类样本删除。NearMiss有三种变体：

-   **NearMiss-1**：选择那些距离最近的少数类样本的多数类样本。
-   **NearMiss-2**：选择那些距离最远的少数类样本的多数类样本。
-   **NearMiss-3**：选择那些多数类样本，它们的k个最近邻样本中有多数属于少数类

##### 集成欠采样（Cluster Centroids）

使用聚类算法（如K-means）对多数类样本进行聚类，然后用每个聚类的质心代替这些样本。这种方法通过减少多数类样本的数量，同时保留其分布信息

##### 平衡级联（Balanced Cascade）

使用一种迭代的方法进行欠采样，每次迭代都删除多数类样本，并用前一轮的分类器来过滤掉那些容易分类的样本，直到数据集达到平衡

#### 实现

```python
from imblearn.under_sampling import RandomUnderSampler, NearMiss
from sklearn.datasets import make_classification
from collections import Counter

# 创建一个不平衡数据集
X, y = make_classification(
			n_classes=2, class_sep=2, weights=[0.1, 0.9],
            n_informative=3, n_redundant=1, flip_y=0,
            n_features=20, n_clusters_per_class=1,
	        n_samples=1000, random_state=10)

print(f"原始数据集类别分布: {Counter(y)}")

# 使用随机欠采样
rus = RandomUnderSampler(random_state=42)
X_res_rus, y_res_rus = rus.fit_resample(X, y)
print(f"随机欠采样后数据集类别分布: {Counter(y_res_rus)}")

# 使用NearMiss欠采样
nearmiss = NearMiss(version=1)
X_res_nm, y_res_nm = nearmiss.fit_resample(X, y)
print(f"NearMiss欠采样后数据集类别分布: {Counter(y_res_nm)}")

```

#### 缺点

-   **信息丢失**：通过删除多数类样本，可能会丢失一些重要的信息，影响模型的整体性能。
-   **代表性不足**：欠采样后的数据集可能无法全面代表原始数据集的分布，可能导致模型性能下降。

## 数据增强（Data Augmentation）

## 合成数据（Synthetic Data Generation）

就是使用GAN生成一些样本数据

# 输出修改（Post-hoc Modification）

## 决策阈值调整（Threshold Adjustment）

-   **方法**：根据类别的先验概率或其他统计信息来调整分类器的决策阈值，使得模型在稀有类别上的预测概率提高。
-   **实例**：如果某个类别的样本在训练数据中很少见，可以降低该类别的决策阈值，使得模型更容易预测该类别。
-   **优点**：简单直接，易于实现。
-   **缺点**：需要对每个类别的阈值进行单独调整，可能在多类别问题中变得复杂。

## 权重归一化（Weight Normalization）

-   **方法**：在模型训练完成后，对每个类别的权重进行归一化处理，以平衡各类别的影响。
-   **实例**：在训练一个神经网络模型后，可以将每个类别的权重除以该类别在训练集中的样本数，从而使得稀有类别的权重得到提升。
-   **优点**：能够在不重新训练模型的情况下，改善对稀有类别的预测。
-   **缺点**：效果依赖于权重归一化的具体策略，可能需要大量调试。

# 内部修改（Internal Modification）

内部修改是指在模型训练过程中，通过修改损失函数或模型结构来应对类别不平衡问题。

## **损失函数加权（Loss Weighting）**：

-   **方法**：在计算损失函数时，根据类别的先验概率对损失进行加权，使得稀有类别在损失计算中占据更大权重。
-   **实例**：在交叉熵损失中，可以将每个样本的损失乘以其对应类别的权重，从而增加稀有类别对总体损失的贡献。
-   **优点**：能够在训练过程中直接平衡类别影响，改善模型对稀有类别的学习效果。
-   **缺点**：需要对每个类别的权重进行合理设置，可能需要大量试验。

# **边际调整（Margin Adjustment）**：

-   **方法**：在损失函数中引入类别间的边际调整，使得稀有类别与其他类别之间的决策边界更大。
-   **实例**：在softmax交叉熵损失中，可以增加一个边际项，使得稀有类别的logit值相对提高。
-   **优点**：通过调整边际能够有效地改善对稀有类别的分类效果。
-   **缺点**：需要设计合适的边际调整策略，可能增加损失函数的复杂度。

# Logit调整的统计视角

论文提出的logit调整技术有两种实现方式：

1. **后处理logit调整**：在训练完成的模型上进行调整。
2. **logit调整的softmax交叉熵**：在训练过程中直接修改损失函数。

这两种方法的核心思想是通过对logit进行基于类别频率的调整来优化平衡错误率。这种调整方法具备坚实的统计基础，因为通过这种调整得到的最优解与平衡错误率的贝叶斯最优解一致。

## 后处理logit调整

在训练完成的模型上进行logit调整的具体步骤如下：

1. **学习模型**：训练一个神经网络模型，其logit为 $f_y(x) = w_y^T \Phi(x)$。
2. **预测时调整logit**：调整公式如下： $$\text{argmax}\_{y \in [L]} \left(f_y(x) - \tau \cdot \log \pi_y\right)$$
   其中，$\pi_y$ 是类别 $y$ 的先验概率，$\tau$ 是一个标度参数。 这种方法的直观解释是给每个logit加上一个标签相关的偏移量，从而调整类别间的相对边际，使得稀有类别在预测中获得更大的相对权重。

这种方法简单且有效，能够在训练后直接应用，优势在于不需要重新训练模型，适用于已有模型的改进

## Logit调整的softmax交叉熵

另一种方法是在训练过程中直接修改softmax交叉熵损失函数。具体形式为： $$ \ell(y, f(x)) = - \log \frac{\exp(f*y(x) + \tau \cdot \log \pi_y)}{\sum*{y' \in [L]} \exp(f*{y'}(x) + \tau \cdot \log \pi*{y'})} $$这种方法在训练过程中直接对每个logit施加一个偏移，从而在训练过程中就对类别不平衡进行调整。

通过这种方式，模型在训练过程中能够更加均衡地对待不同频率的类别，该方法在训练过程中就进行了调整，能够更好地引导模型学习。理论上能够实现Fisher一致性，即模型在平衡误差下的最优解

# logit 代码实现

```python
def compute_adjustment(train_loader, tro, device):
    """compute the base probabilities"""
    label_freq = {}
    for i, (inputs, target) in enumerate(train_loader):
        target = target.to(device)
        for j in target:
            key = int(j.item())
            label_freq[key] = label_freq.get(key, 0) + 1
    label_freq = dict(sorted(label_freq.items()))
    label_freq_array = np.array(list(label_freq.values()))
    label_freq_array = label_freq_array / label_freq_array.sum()
    adjustments = np.log(label_freq_array ** tro + 1e-12)
    adjustments = torch.from_numpy(adjustments)
    adjustments = adjustments.to(device)
    return adjustments
```

在`train`中：

```python
logit_adjustments = compute_adjustment(train_loader, args.tro_train, device)
if args.logit_adj_train:
	output = output + logit_adjustments

loss = criterion(output, target_var)
```

在`validate`中：

```python
logit_adjustments = compute_adjustment(train_loader, args.tro_train, device)
if args.logit_adj_post:
	output = output - logit_adjustments
elif args.logit_adj_train:
	output = output + logit_adjustments

loss = criterion(output, target_var)
```
