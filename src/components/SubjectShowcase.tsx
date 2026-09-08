import { type CSSProperties, useEffect, useMemo, useState } from 'react'
import {
  Atom,
  CalendarDays,
  Calculator,
  Database,
  Download,
  Dna,
  Earth,
  FlaskConical,
  HardDrive,
  Eye,
  Layers3,
  Sparkles,
  Star,
  Telescope,
} from 'lucide-react'

type FeatureSlide = {
  title: string
  detail: string
  organization: string
  openness: string
  publishedAt: string
  tags: string[]
}

const subjectCoverPrefix: Record<string, string> = {
  数学: 'math',
  物理: 'physics',
  化学: 'chem',
  天文: 'astro',
  地理: 'geo',
  生物: 'bio',
}

const mathFeatureSlides: FeatureSlide[] = [
  {
    title: '多模态教材库',
    detail: '多模态教材库，源自北京大学出版社、北京大学101计划、科学出版社、高等教育出版社；数学各二级学科教材，亮点：数学教材多模态底座，贯通章节、公式、例题和转写。',
    organization: '北京国际数学研究中心、北京大学国际机器学习研究中心',
    openness: '部分公开',
    publishedAt: '2026-08-18',
    tags: ['数学', '多模态教材'],
  },
  {
    title: '形式化定理陈述语料库',
    detail: '形式化定理陈述语料库，源自ReasBook教材/论文形式化陈述、Mathlib定理陈述、Stacks陈述语料，形成规范化定理陈述库，可直接用于定理检索、自动形式化和评测题生成。',
    organization: '北京国际数学研究中心',
    openness: '部分公开',
    publishedAt: '2026-08-18',
    tags: ['数学', '定理证明'],
  },
  {
    title: '形式化数学知识库',
    detail: '形式化数学知识库，源自Mathlib中的形式化叙述、北大私有的形式化数据集，形成覆盖29个子方向的Lean4/Mathlib形式化知识底座，沉淀定理、定义、依赖图谱与自然语言-形式化对齐样本，支撑自动形式化模型训练。',
    organization: '北京国际数学研究中心',
    openness: '部分公开',
    publishedAt: '2026-08-18',
    tags: ['数学', '知识语料'],
  },
  {
    title: '优化问题自然语言证明过程库',
    detail: '优化问题自然语言证明过程库，源自北大自研 ReasFlow 自动科研智能体、公开优化论文与 benchmark，亮点：沉淀“问题定义—建模—算法选择—理论推导—实验验证—失败诊断”全链路优化科研轨迹，支撑 ReasFlow 自动科研智能体训练、评测和优化领域科研探索。',
    organization: '北京大学国际机器学习研究中心',
    openness: '部分公开',
    publishedAt: '2026-08-18',
    tags: ['数学', '智能推理'],
  },
]

const subjectFeatureSlides: Record<string, FeatureSlide[]> = {
  数学: mathFeatureSlides,
  物理: [
    {
      title: 'PRBench-Theory:理论物理逻辑推理QA对数据集',
      detail: 'PRBench-Theory:理论物理逻辑推理QA对数据集，源自增量数据，arXiv.org、GitHub、PRBench-理论物理智能体在复现学术论文时针对论文内容提出的问题与对应回答。',
      organization: '北京大学物理学院',
      openness: '部分公开',
      publishedAt: '2026-08-18',
      tags: ['物理', '逻辑推理'],
    },
    {
      title: 'PHYBench-Pro增强版物理推理语料库',
      detail: 'PHYBench-Pro 增强版物理推理语料库，源自北大专有、竞赛题、专家编写。',
      organization: '北京大学物理学院',
      openness: '部分公开',
      publishedAt: '2026-08-18',
      tags: ['物理', '推理语料'],
    },
    {
      title: 'PRBench-Theory：理论物理论文复现',
      detail: 'PRBench-Theory:理论物理论文复现，源自增量数据，arXiv.org、GitHub、PRBench-理论物理智能体在复现学术论文时产生的工作记录。',
      organization: '北京大学物理学院',
      openness: '部分公开',
      publishedAt: '2026-08-18',
      tags: ['物理', '论文复现'],
    },
    {
      title: '量子力学与量子信息多模态教学语料库',
      detail: '量子力学与量子信息多模态教学语料库，源自蔻享自有量子课程/冬季学校/学术讲座；物理学“101计划”教材；量子网络、计算与精密测量授权资料，包含量子网络、离子阱计算、量子最速演化等高水平样例，保留态矢、算符、线路图与口头推演的跨模态对应。',
      organization: '北京大学物理学院',
      openness: '部分公开',
      publishedAt: '2026-08-18',
      tags: ['物理', '多模态教学'],
    },
  ],
  化学: [
    {
      title: 'HNO3-TBP萃取分离铀钚金属离子数据库',
      detail: 'HNO3-TBP萃取分离铀钚金属离子数据库，源自电子科技期刊论文以及纸质报告等，依托项目构建的形式化语料底座。',
      organization: '北京大学化学与分子工程学院',
      openness: '部分公开',
      publishedAt: '2026-08-18',
      tags: ['化学', '萃取分离'],
    },
    {
      title: '有机光伏分子结构—构象—量子化学性质语料库（CEPDB）',
      detail: '有机光伏分子结构—构象—量子化学性质语料库（CEPDB），源自Harvard Clean Energy Project Database。',
      organization: '北京大学材料科学与工程学院',
      openness: '部分公开',
      publishedAt: '2026-08-18',
      tags: ['化学', '量子化学'],
    },
    {
      title: '酶反应突变数据库',
      detail: '酶反应突变数据库，源自从BRENDA，RHEA数据库中提取整合；并从2021年以来超过10000篇报道生物合成酶发现的文章中，通过文献信息抽提智能体进行提取整合。',
      organization: '北京大学化学与分子工程学院',
      openness: '部分公开',
      publishedAt: '2026-08-18',
      tags: ['化学', '酶反应'],
    },
    {
      title: '原子级催化剂氧还原反应性能预测数据库',
      detail: '原子级催化剂氧还原反应性能预测数据库，源自计算模拟，面向原子级催化剂智能设计，构建大规模单原子和双原子催化剂计算模型数据，集成机器学习势场加速优化构型和DFT高精度计算结果，形成可检索、可训练、可追溯的原子结构与计算属性数据底座，支撑材料大模型预训练、结构表征学习和高通量催化剂筛选。',
      organization: '北京大学材料科学与工程学院',
      openness: '部分公开',
      publishedAt: '2026-08-18',
      tags: ['化学', '催化剂', '计算属性'],
    },
  ],
  天文: [
    {
      title: 'PS1大规模光学巡天深场和多历元数据',
      detail: 'PS1大规模光学巡天深场和多历元数据，源自Pan-STARRS1 3π Survey / Pan-STARRS Archive。',
      organization: '北京大学科维理天文与天体物理研究所',
      openness: '部分公开',
      publishedAt: '2026-08-18',
      tags: ['天文', '光学巡天'],
    },
    {
      title: '斯隆数字巡天（SDSS Legacy）成像数据',
      detail: 'SDSS 是国际上近 30 年里影响力最大的天文巡天项目，可广泛用于研究宇宙学、星系物理、银河系及恒星物理等。',
      organization: '北京大学物理学院天文学系',
      openness: '部分公开',
      publishedAt: '2026-08-18',
      tags: ['天文', 'SDSS', '巡天成像'],
    },
    {
      title: 'ZTF源表和光变数据',
      detail: 'ZTF 源表和光变数据，源自IPAC（红外处理与分析中心），包含差分测光、历史检测和图像切片，是暂现源实时分类的重要训练语料。',
      organization: '北京大学物理学院天文学系',
      openness: '部分公开',
      publishedAt: '2026-08-18',
      tags: ['天文', 'ZTF', '光变数据'],
    },
    {
      title: 'ALMA分子与原子谱线数据立方',
      detail: 'ALMA 分子与原子谱线数据立方，源自ALMA科学档案库（ESO, NAOJ, NRAO），提供空间-速度三维信息，可研究气体动力学、化学和质量分布。',
      organization: '北京大学科维理天文与天体物理研究所',
      openness: '部分公开',
      publishedAt: '2026-08-18',
      tags: ['天文', 'ALMA', '谱线数据'],
    },
  ],
  地理: [
    {
      title: '海洋沉积物元素与沉积生物地球化学数据集',
      detail: '海洋沉积物元素与沉积生物地球化学数据集，源自dbSEABED、MOSAIC、EarthChem Portal/Library、PetDB、GEOROC、G。',
      organization: '北京大学地球与空间科学学院',
      openness: '部分公开',
      publishedAt: '2026-08-18',
      tags: ['地理', '地球化学'],
    },
    {
      title: '遥感多模态指令微调语料库',
      detail: '遥感多模态指令微调语料库，源自商业高分辨率光学卫星年度DOM（0.5 m级，全国无云底图）。',
      organization: '北京大学地球与空间科学学院',
      openness: '部分公开',
      publishedAt: '2026-08-18',
      tags: ['地理', '遥感'],
    },
    {
      title: 'InSight火震波形数据库',
      detail: 'InSight火震波形数据库，源自NASA PDS InSight SEIS连续波形、Mars Quake Service（MQS）目录。',
      organization: '北京大学地球与空间科学学院',
      openness: '部分公开',
      publishedAt: '2026-08-18',
      tags: ['地理', '火震波形'],
    },
    {
      title: '全球M>5地震事件的目录和震源机制解',
      detail: '全球M>5地震事件的目录和震源机制解，源自地震目录和震源机制解都需要收集不同机构的 （USGS、ISC等）并评估。',
      organization: '北京大学能源研究院',
      openness: '部分公开',
      publishedAt: '2026-08-18',
      tags: ['地理', '地震事件'],
    },
  ],
  生物: [
    {
      title: 'RNA结构数据库',
      detail: 'RNA结构数据库，源自公开数据集整理及后处理，数据规模大覆盖范围广，系统性整合了目前的RNA二级结构，三级结构及结构标识符的详细信息。',
      organization: '北京大学核糖核酸北京研究中心',
      openness: '部分公开',
      publishedAt: '2026-08-18',
      tags: ['生物', 'RNA结构'],
    },
    {
      title: '人类单细胞染色质可及性语料',
      detail: '人类单细胞染色质可及性语料，源自2018年以来已发表文献的单细胞组学数据集，统一ATAC peak/cell矩阵、峰区注释和调控元件特征，支撑虚拟细胞模型构建与细胞定向编程治疗转化应用。',
      organization: '北京大学生物医学前沿创新中心',
      openness: '部分公开',
      publishedAt: '2026-08-18',
      tags: ['生物', '单细胞组学'],
    },
    {
      title: '中国癌症全基因组分析语料库',
      detail: '中国癌症全基因组分析语料库，源自中国肝细胞癌高深度全基因组测序VCF突变记录数据，基于494例患者配对WGS数据经比对和体细胞变异检测生成，记录变异位点、变异类型、测序深度和功能注释信息，基于中国肝细胞癌患者高深度（不低于 100X ）WGS数据生成标准化VCF突变记录，系统交付SNV和Indel变异及其测序深度和功能注释信息。',
      organization: '北京大学生物医学前沿创新中心',
      openness: '部分公开',
      publishedAt: '2026-08-18',
      tags: ['生物', '全基因组'],
    },
    {
      title: '多模态神经影像数据库',
      detail: '多模态神经影像数据库，源自NSD健康成年视觉刺激-脑功能磁共振成像数据库 ADHD-200儿童与青少年ADHD对照结构磁共振成像数据库，覆盖多中心、多疾病、多模态影像资源； 影像数据标准化整理、序列分类标注及元数据体系建设； 面向大规模AI模型训练的高质量神经影像数据资源体系； 支撑医学影像基础模型预训练及智能诊疗算法研发。',
      organization: '北京大学健康医疗大数据国家研究院',
      openness: '部分公开',
      publishedAt: '2026-08-18',
      tags: ['生物', '神经影像'],
    },
  ],
}

function featureMetrics(index: number) {
  return {
    downloads: [231, 468, 352, 586, 421, 319][index % 6],
    views: [120, 156, 94, 211, 137, 88][index % 6],
    favorites: [653, 428, 286, 714, 339, 196][index % 6],
  }
}

const subjectData = [
  {
    name: '数学',
    icon: Calculator,
    accent: 'blue',
    lead: '围绕数学知识、定理证明、形式化验证与智能推理，建设可检索、可验证、可训练的数学语料基础设施',
    scale: { sets: '170+个', size: '0.15+PB', items: '1.09+亿条' },
    corpora: [],
    services: ['AI4Math：数学研究赋能', 'Math4AI：反哺人工智能', '教育与应用', '跨学科应用（AI4S战略）'],
  },
  {
    name: '物理',
    icon: Atom,
    accent: 'violet',
    lead: '以重大物理问题为牵引，贯通文献、公式、实验数据、计算程序与科研工作流，支撑 AI for Physics',
    scale: { sets: '140+个', size: '0.29+PB', items: '0.52+亿条' },
    corpora: [],
    services: ['AI辅助科研', '科研自动化平台', '教育与人才培养', 'AI评测与基准', '跨学科应用'],
  },
  {
    name: '化学',
    icon: FlaskConical,
    accent: 'rose',
    lead: '面向分子、反应、材料与实验过程，建设连接结构、性质、谱图和实验记录的化学语料资源',
    scale: { sets: '170+个', size: '5.72+PB', items: '1.92+亿条' },
    corpora: [],
    services: ['科研研究与模型训练', '教学与人才培养', '科学模拟与实验验证支持', '产业研发与创新'],
  },
  {
    name: '天文',
    icon: Telescope,
    accent: 'amber',
    lead: '整合多波段观测、星表、巡天图像与天体物理模拟，服务天文智能发现',
    scale: { sets: '120+个', size: '27.48+PB', items: '57.05+亿条' },
    corpora: [],
    services: ['大模型训练与智能问答', '天文数据分析与AI辅助研究', '科学模拟与实验验证支持', '课堂与研究性教学', '平台化服务于科研写作'],
  },
  {
    name: '地理',
    icon: Earth,
    accent: 'teal',
    lead: '围绕空间数据、遥感影像、地理文本与城市运行信息，建设面向空间智能的语料体系',
    scale: { sets: '150+个', size: '2.68+PB', items: '8.38+亿条' },
    corpora: [],
    services: ['科学大模型训练', '灾害预测与应急响应', '气候变化与碳中和研究', '资源环境管理与生态保护', '人类活动监测与可持续发展'],
  },
  {
    name: '生物',
    icon: Dna,
    accent: 'cyan',
    lead: '连接生物分子、组学数据、实验记录与生态观测，支撑生命科学智能分析',
    scale: { sets: '120+个', size: '1.69+PB', items: '23.52+亿条' },
    corpora: [],
    services: ['AI辅助科研', '科研自动化平台', '教育与人才培养', 'AI评测与基准', '跨学科应用（AI4S战略）'],
  },
]

export default function SubjectShowcase() {
  const [activeSubject, setActiveSubject] = useState(subjectData[0].name)
  const [activeFeature, setActiveFeature] = useState(0)
  const subject = useMemo(
    () => subjectData.find((item) => item.name === activeSubject) ?? subjectData[0],
    [activeSubject],
  )
  const featureSlides = subjectFeatureSlides[subject.name] ?? mathFeatureSlides
  const Icon = subject.icon

  useEffect(() => {
    setActiveFeature(0)
    const timer = window.setInterval(() => {
      setActiveFeature((current) => (current + 1) % featureSlides.length)
    }, 3600)

    return () => window.clearInterval(timer)
  }, [featureSlides])

  return (
    <section className="subject-showcase-section" aria-labelledby="subject-showcase-title">
      <div className="subject-showcase-inner">
        <header className="subject-showcase-heading">
          <h2 id="subject-showcase-title"><span>六大学科</span>领域建设特色</h2>
        </header>

        <div className="subject-tabs" aria-label="学科切换">
          {subjectData.map((item) => {
            const TabIcon = item.icon
            return (
              <button
                className={`subject-tab subject-accent-${item.accent}${item.name === subject.name ? ' is-active' : ''}`}
                type="button"
                onClick={() => setActiveSubject(item.name)}
                aria-pressed={item.name === subject.name}
                key={item.name}
              >
                <TabIcon size={18} />
                <span>{item.name}</span>
              </button>
            )
          })}
        </div>

        <div className={`subject-feature-panel subject-accent-${subject.accent}`}>
          <div className="subject-feature-visual" aria-label={`${subject.name}领域配图`}>
            <div className="subject-corpus-carousel">
              {featureSlides.map((feature, index) => (
                <article className={index === activeFeature ? 'is-active' : ''} key={feature.title}>
                  <div
                    className="subject-carousel-art"
                    style={{ '--corpus-cover': `url("${import.meta.env.BASE_URL}images/corpus-covers/${subjectCoverPrefix[subject.name] ?? 'math'}-${index + 1}.png")` } as CSSProperties}
                    aria-hidden="true"
                  >
                    <span className="card-status-overlay is-partial">{feature.openness}</span>
                    <span className="subject-art-line line-one" />
                    <span className="subject-art-line line-two" />
                    <span className="subject-art-node node-one" />
                    <span className="subject-art-node node-two" />
                    <span className="subject-art-node node-three" />
                    <span className="subject-art-node node-four" />
                    <span className="subject-art-bar bar-one" />
                    <span className="subject-art-bar bar-two" />
                    <span className="subject-art-bar bar-three" />
                  </div>
                  <div className="subject-carousel-meta-row">
                    <div className="subject-carousel-tags">
                      {feature.tags.slice(0, 1).map((tag) => <small key={tag}>{tag}</small>)}
                    </div>
                    <time dateTime={feature.publishedAt}><CalendarDays size={14} />{feature.publishedAt}</time>
                  </div>
                  <h4>{feature.title}</h4>
                  <p>{feature.detail}</p>
                  <footer>
                    <span className="card-org-mark" aria-hidden="true">北</span>
                    <strong className="card-organization-name">{feature.organization}</strong>
                    <span><Download size={14} />{featureMetrics(index).downloads}</span>
                    <span><Eye size={14} />{featureMetrics(index).views}</span>
                    <span><Star size={14} />{featureMetrics(index).favorites}</span>
                  </footer>
                </article>
              ))}
            </div>
            <div className="subject-image-dots" aria-label={`${subject.name}特色语料轮播进度`}>
              {featureSlides.map((feature, index) => (
                <button
                  className={index === activeFeature ? 'is-active' : ''}
                  type="button"
                  onClick={() => setActiveFeature(index)}
                  aria-label={`查看${feature.title}`}
                  key={feature.title}
                />
              ))}
              </div>
          </div>

          <div className="subject-feature-copy">
            <div className="subject-feature-title">
              <span><Icon size={24} /></span>
              <div>
                <h3>{subject.name}</h3>
                <p>{subject.lead}</p>
              </div>
            </div>

            <div className="subject-info-card-grid">
              <article className="subject-info-card">
                <div>
                  <Layers3 size={18} />
                  <h4>建设规模</h4>
                </div>
                <dl className="subject-scale-list">
                  <div><dt><Database size={16} />语料集</dt><dd>{subject.scale.sets}</dd></div>
                  <div><dt><HardDrive size={16} />语料规模</dt><dd>{subject.scale.size}</dd></div>
                  <div><dt><Layers3 size={16} />语料条数</dt><dd>{subject.scale.items}</dd></div>
                </dl>
              </article>

              <article className="subject-info-card subject-service-card">
                <div>
                  <Sparkles size={18} />
                  <h4>服务场景</h4>
                </div>
                <ul>
                  {subject.services.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
