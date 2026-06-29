export type Post = {
  slug: string
  title: string
  date: string
  category: string
  tags: string[]
  excerpt: string
  readTime: number
  content: string
}

export const categories = [
  "有限元分析",
  "CFD 仿真",
  "结构力学",
  "材料力学",
  "项目实践",
  "软件学习",
]

export const posts: Post[] = [
  {
    slug: "ansys-static-structural-basics",
    title: "ANSYS Static Structural 静力学分析入门",
    date: "2025-06-15",
    category: "有限元分析",
    tags: ["ANSYS", "静力学", "FEA", "网格划分"],
    excerpt:
      "从零开始学习 ANSYS Workbench 中的静力学分析流程，包括几何建模、材料定义、网格划分、边界条件设置与结果后处理的完整步骤。",
    readTime: 12,
    content: `
## 前言

有限元分析（FEA）是 CAE 工程师的核心技能之一。本文记录了我学习 ANSYS Static Structural 模块的过程，以一个简单悬臂梁为例，完整演示静力学分析流程。

## 问题描述

考虑一根长为 500mm、截面为 50×50mm 的铝合金悬臂梁，一端固定，另一端施加 1000N 向下的集中力。求梁的应力分布与最大位移。

## 材料属性

- 材料：铝合金 Al 6061-T6
- 弹性模量：E = 69 GPa
- 泊松比：ν = 0.33
- 密度：ρ = 2700 kg/m³

## 网格划分

网格质量对计算精度影响显著。本例采用六面体主导网格：

\`\`\`
单元类型：SOLID186（二十节点六面体）
全局网格尺寸：5mm
细化区域：固定端附近 2mm
节点总数：约 45,000
\`\`\`

## 边界条件

- 固定支撑（Fixed Support）：施加在梁的左端面
- 集中力（Force）：1000N，方向 -Y，施加在右端面

## 结果分析

| 指标 | 仿真值 | 理论值 | 误差 |
|------|--------|--------|------|
| 最大位移 (mm) | 4.21 | 4.23 | 0.5% |
| 最大应力 (MPa) | 240.3 | 240.0 | 0.1% |

仿真结果与材料力学理论解吻合良好，验证了模型的正确性。

## 总结

通过这个案例，掌握了 ANSYS Static Structural 的基本工作流程。后续将尝试更复杂的几何形状和载荷工况。
    `,
  },
  {
    slug: "cfd-pipe-flow-fluent",
    title: "ANSYS Fluent 管道内流场 CFD 仿真",
    date: "2025-06-02",
    category: "CFD 仿真",
    tags: ["Fluent", "CFD", "湍流", "k-epsilon"],
    excerpt:
      "使用 ANSYS Fluent 对圆管内层流与湍流流动进行数值模拟，对比 Hagen-Poiseuille 理论解，验证 k-ε 湍流模型精度。",
    readTime: 15,
    content: `
## 问题背景

管道内流动是 CFD 入门的经典案例。本文使用 ANSYS Fluent 求解圆管内的定常不可压流动。

## 几何与网格

- 管道直径：D = 50mm
- 管道长度：L = 2000mm（L/D = 40，保证充分发展）
- 网格：结构化六面体网格，近壁面加密，y+ ≈ 30

## 湍流模型选择

选用 Realizable k-ε 模型，配合 Standard Wall Functions：
- 适用于充分发展管流
- 计算效率高
- 对各向同性湍流精度较好

## 边界条件

- 入口：速度入口，U = 1 m/s，湍流强度 5%
- 出口：压力出口，P = 0 Pa（表压）
- 壁面：无滑移壁面

## 结果验证

Re = ρUL/μ ≈ 50,000（湍流区）

摩擦系数对比：
- Blasius 公式：f = 0.316 Re⁻⁰·²⁵ ≈ 0.0209
- Fluent 仿真：f ≈ 0.0214（误差 2.4%）

## 后处理可视化

提取轴线速度分布，与对数律速度剖面对比，吻合良好。

## 小结

掌握了 Fluent 的基本使用流程，了解了湍流模型的选择依据。
    `,
  },
  {
    slug: "beam-buckling-analysis",
    title: "细长压杆欧拉屈曲分析（线性特征值屈曲）",
    date: "2025-05-20",
    category: "结构力学",
    tags: ["屈曲", "ANSYS", "稳定性", "特征值"],
    excerpt:
      "利用 ANSYS Mechanical 对细长压杆进行线性特征值屈曲分析，与欧拉临界载荷公式对比，理解屈曲模态的物理含义。",
    readTime: 10,
    content: `
## 欧拉屈曲理论回顾

对于两端铰支的细长压杆，欧拉临界载荷为：

Pcr = π²EI / L²

本文通过 FEA 验证该公式，并研究不同边界条件对屈曲载荷的影响。

## 分析流程

1. 静力学预应力分析（施加单位压缩力）
2. 特征值屈曲分析（提取屈曲因子）
3. 临界载荷 = 屈曲因子 × 参考载荷

## 结果对比

| 边界条件 | FEA 结果 (kN) | 理论值 (kN) | 误差 |
|----------|---------------|-------------|------|
| 两端铰支 | 98.7 | 98.5 | 0.2% |
| 一端固定一端自由 | 24.8 | 24.6 | 0.8% |
| 两端固定 | 394.1 | 394.0 | 0.03% |

## 注意事项

线性屈曲分析假设完美构件，实际工程中需考虑初始缺陷（几何非线性）。
    `,
  },
  {
    slug: "abaqus-contact-analysis",
    title: "Abaqus 接触分析：赫兹接触应力仿真",
    date: "2025-05-08",
    category: "有限元分析",
    tags: ["Abaqus", "接触", "赫兹理论", "非线性"],
    excerpt:
      "使用 Abaqus 模拟两球体之间的赫兹接触，分析接触区域应力分布，与经典赫兹接触理论对比验证仿真精度。",
    readTime: 14,
    content: `
## 赫兹接触理论

两球体接触时，接触区半径和最大接触压力由赫兹公式决定，本文通过 Abaqus 非线性仿真验证。

## 模型建立

- 两个钢球，半径均为 R = 20mm
- 弹性模量 E = 210 GPa，泊松比 ν = 0.3
- 施加法向压力 P = 1000N
- 利用对称性建立 1/8 模型

## 接触属性设置

- 法向行为：Hard Contact（不允许穿透）
- 切向行为：无摩擦

## 结果验证

| 指标 | 仿真值 | 理论值 | 误差 |
|------|--------|--------|------|
| 接触半径 a (mm) | 0.627 | 0.621 | 1.0% |
| 最大压力 p₀ (MPa) | 1912 | 1897 | 0.8% |

## 心得体会

接触分析的网格密度对精度影响很大，接触区域需要足够细的网格。
    `,
  },
  {
    slug: "openfoam-cavity-flow",
    title: "OpenFOAM 入门：顶盖驱动流（Lid-Driven Cavity）",
    date: "2025-04-22",
    category: "CFD 仿真",
    tags: ["OpenFOAM", "开源", "层流", "验证"],
    excerpt:
      "使用开源 CFD 软件 OpenFOAM 求解经典顶盖驱动流问题，学习 OpenFOAM 的案例结构与命令行操作流程。",
    readTime: 18,
    content: `
## 为什么选择 OpenFOAM

OpenFOAM 是工业级开源 CFD 平台，学习它有助于深入理解 CFD 求解器原理，同时具备免费、可定制的优势。

## 案例结构

\`\`\`
cavity/
├── 0/          # 初始/边界条件
│   ├── U
│   └── p
├── constant/   # 网格与物理属性
│   ├── polyMesh/
│   └── transportProperties
└── system/     # 求解控制参数
    ├── controlDict
    ├── fvSchemes
    └── fvSolution
\`\`\`

## 求解流程

\`\`\`bash
blockMesh          # 生成结构化网格
icoFoam            # 不可压层流求解器
paraFoam           # ParaView 后处理
\`\`\`

## 结果分析

Re = 100 时，流场呈现典型的主涡结构，与 Ghia 等人的标准解对比良好。

## 学习收获

理解了 OpenFOAM 的 case 结构，掌握了基本的网格生成和后处理流程。
    `,
  },
  {
    slug: "material-fatigue-fem",
    title: "金属疲劳寿命预测：S-N 曲线与 FEA 结合",
    date: "2025-04-05",
    category: "材料力学",
    tags: ["疲劳", "S-N曲线", "寿命预测", "ANSYS"],
    excerpt:
      "结合 S-N 曲线与有限元应力分析，对承受循环载荷的结构件进行疲劳寿命预测，理解疲劳分析的基本流程。",
    readTime: 11,
    content: `
## 疲劳基础知识

金属疲劳是指在循环载荷作用下，远低于静强度极限时发生的破坏现象。Basquin 方程描述了应力幅与寿命的关系：

σa = σ'f (2Nf)^b

## 分析步骤

1. 静力学分析获取应力分布
2. 确定危险点（最大应力处）
3. 根据材料 S-N 曲线查找对应寿命
4. 考虑应力集中系数、表面粗糙度等修正

## 工程实例

对某连接板进行疲劳分析：
- 材料：Q345 钢
- 载荷：±50 MPa 对称循环
- 预测寿命：约 2.1×10⁶ 次循环

## 注意事项

疲劳分析结果分散性较大，工程应用中通常取安全系数 1.5~2.0。
    `,
  },
]

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getPostsByCategory(category: string): Post[] {
  return posts.filter((p) => p.category === category)
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>()
  posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)))
  return Array.from(tagSet)
}
