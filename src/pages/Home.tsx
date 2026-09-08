import {
  ArrowRight,
  BarChart3,
  Box,
  BriefcaseBusiness,
  CloudUpload,
  Compass,
  FileSearch,
  FilePlus2,
  HeartHandshake,
  MessageSquare,
  Orbit,
  ThumbsUp,
  UploadCloud,
  UsersRound,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { useApp } from '../context/app-context'
import CorpusCommunity from '../components/CorpusCommunity'
import SubjectShowcase from '../components/SubjectShowcase'
import QualityCorpusDiscovery from '../components/QualityCorpusDiscovery'

const metrics = [
  { key: 'layers', value: '92', unit: '亿条', label: '语料条数' },
  { key: 'folder', value: '900', unit: '个', label: '语料库' },
  { key: 'server', value: '38', unit: 'PB', label: '语料规模' },
  { key: 'users', value: '400', unit: '万', label: '服务用户' },
]

const platformCapabilities = [
  {
    key: 'search',
    title: '语料检索',
    description: '精准发现科学语料',
    icon: Box,
    to: '/search',
  },
  {
    key: 'discover',
    title: '语料发现',
    description: '最新优质成果内容',
    icon: Compass,
    to: '/search/results',
  },
  {
    key: 'upload',
    title: '语料上传',
    description: '开放汇交 · 持续共建',
    icon: CloudUpload,
    to: '/upload',
  },
  {
    key: 'demand',
    title: '需求广场',
    description: '发布语料需求',
    icon: Orbit,
    to: '/demands',
  },
  {
    key: 'tool',
    title: '工具市场',
    description: '专业加工工具',
    icon: BriefcaseBusiness,
    to: '/tools',
  },
]

const coEvolutionItems = [
  { key: 'talent', title: '人才', detail: '多学科专业力量', icon: UsersRound },
  { key: 'model', title: '模型', detail: '智能模型', icon: Box },
  { key: 'data', title: '数据', detail: '高质量科学语料', icon: BarChart3 },
  { key: 'tool', title: '工具', detail: '智能化生产工具链', icon: BriefcaseBusiness },
]

const demandFlowSteps = [
  { title: '发起需求', icon: FilePlus2 },
  { title: '寻找伙伴', icon: UsersRound },
  { title: '协作共建', icon: HeartHandshake },
]

const demandCards = [
  {
    title: '分子-工艺-性能构效关系预测与逆向设计',
    status: '招募中',
    tags: ['科学数据', '知识语料'],
    summary: '需要分子的组成、理化性质与合成工艺数据，包含CAS号、分子结构、SMILESInChI及T参数',
    tone: 'blue',
    replies: 24,
    likes: 24,
    saves: 234,
  },
  {
    title: 'CMIP6 全球气候模型数据',
    status: '招募中',
    tags: ['CMIP6', 'NetCDF'],
    summary: '全量气候模型输出数据，覆盖大气、海洋与陆地变量，遵循 CF 元数据规范',
    tone: 'cyan',
    replies: 533,
    likes: 678,
    saves: 98,
  },
  {
    title: '组合数学、数论的形式化知识',
    status: '共建中',
    tags: ['数学定理证明', '知识语料'],
    summary: '包含问题自然语言描述、Lean形式化描述、Lean header与证明',
    tone: 'purple',
    replies: 231,
    likes: 120,
    saves: 653,
  },
]

export default function Home() {
  const navigate = useNavigate()
  const { user, openAuth } = useApp()

  const handleUpload = () => {
    navigate('/upload')
    if (!user) openAuth()
  }

  return (
    <div className="home-page">
      <section className="hero-section" aria-labelledby="home-hero-title">
        <div className="home-hero-shell">
          <div className="hero-copy">
            <h1 id="home-hero-title">
              高质量科学语料
              <strong>共建共享平台</strong>
            </h1>
            <p>
              汇聚高校、企业、新型研发机构与个人建设成果，连接语料贡献者与使用者，
              服务科研创新、教育教学与模型训练。
            </p>
            <div className="hero-actions">
              <button className="primary-action hero-button" type="button" onClick={handleUpload}>
                <UploadCloud size={18} />语料上传
              </button>
              <Link className="secondary-action" to="/search/results">
                查看语料库 <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="hero-visual" aria-label="科学语料共建共享示意图">
            <div className="visual-cross-line line-x" />
            <div className="visual-cross-line line-y" />
            <div className="visual-orbit visual-orbit-one" />
            <div className="visual-orbit visual-orbit-two" />
            <div className="visual-orbit visual-orbit-three" />
            <div className="visual-core">
              <strong>科学语料</strong>
              <b>共进化</b>
              <span />
            </div>
            <div className="visual-node-orbit">
              {coEvolutionItems.map((item) => {
                const Icon = item.icon
                return (
                  <div className={`visual-node visual-node-${item.key}`} key={item.title}>
                    <div className="visual-node-content">
                      <div>
                        <strong>{item.title}</strong>
                        <small>{item.detail}</small>
                      </div>
                      <span><Icon size={30} /></span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="hero-metrics" aria-label="平台数据概览">
          {metrics.map((item) => (
            <div key={item.label}>
              <span className={`metric-icon metric-icon-${item.key}`} />
              <p>
                <strong>{item.value}</strong>
                <em>{item.unit}</em>
                <span>{item.label}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-demand-section" aria-labelledby="home-demand-title">
        <div className="home-demand-inner">
          <div className="home-demand-copy">
            <h2 id="home-demand-title">
              让每一个语料需求
              <strong>被看见，被响应</strong>
            </h2>
            <p>发布语料库建设需求，通过回复、点赞与评论，让好想法汇聚成可落地的共建项目。</p>
            <div className="home-demand-flow" aria-label="需求广场流程">
              {demandFlowSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div className="home-demand-flow-item" key={step.title}>
                    <span><Icon size={34} /></span>
                    <strong>{step.title}</strong>
                    {index < demandFlowSteps.length - 1 && <i><ArrowRight size={28} /></i>}
                  </div>
                )
              })}
            </div>
            <Link className="home-demand-link" to="/demands">去需求广场 <ArrowRight size={18} /></Link>
          </div>

          <div className="home-demand-stage" aria-label="需求广场示例">
            {demandCards.map((card, index) => (
              <article className={`home-demand-card demand-card-${index + 1} tone-${card.tone}`} key={card.title}>
                <div className="demand-card-icon" aria-hidden="true" />
                <div>
                  <header>
                    <h3>{card.title}</h3>
                    <span>{card.status}</span>
                  </header>
                  <div className="demand-card-tags">
                    {card.tags.map((tag) => <small key={tag}>{tag}</small>)}
                  </div>
                  <p>{card.summary}</p>
                  <footer>
                    <span><MessageSquare size={18} />{card.replies} 回复</span>
                    <span><ThumbsUp size={18} />{card.likes} 点赞</span>
                    <span><FileSearch size={18} />{card.saves} 收藏</span>
                  </footer>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="platform-capabilities-section" aria-labelledby="platform-capabilities-title">
        <div className="platform-capabilities-container">
          <header className="platform-capabilities-heading">
            <h2 id="platform-capabilities-title">连接科学语料的<span>每一步</span></h2>
          </header>

          <div className="platform-flow-card-row" aria-label="平台能力列表">
            {platformCapabilities.map((capability) => {
              const Icon = capability.icon
              return (
                <Link className={`platform-flow-card capability-${capability.key}`} to={capability.to} key={capability.title}>
                  <span className="platform-card-icon"><Icon size={26} /></span>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <SubjectShowcase />
      <CorpusCommunity />
      <QualityCorpusDiscovery />

      <section className="home-closing-cta" aria-labelledby="home-closing-title">
        <div>
          <h2 id="home-closing-title">共建可信、可用、可持续的科学语料生态</h2>
          <p>面向科研、教育和产业智能化应用，开放语料汇交、需求协作和工具服务入口。</p>
        </div>
        <button type="button" onClick={handleUpload}>参与共建</button>
      </section>
    </div>
  )
}
