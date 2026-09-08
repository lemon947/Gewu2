import { type CSSProperties, useMemo, useState } from 'react'
import { ArrowRight, CalendarDays, Download, Eye, Star } from 'lucide-react'
import { Link } from 'react-router'

type SortKey = 'latest' | 'views' | 'usage'

type CorpusItem = {
  id: string
  title: string
  organization: string
  domain: string
  type: string
  openness: string
  summary: string
  publishedAt: string
  views: number
  favorites: number
  downloads: number
  coverImage: string
}

type PartnerItem = {
  name: string
  logo: string
  group: string
  wordmark?: boolean
}

const tabDefinitions: Array<{ key: SortKey; label: string; description: string }> = [
  { key: 'latest', label: '最新数据', description: '按语料审核通过并正式发布的时间排列' },
  { key: 'views', label: '最多浏览', description: '按近30日有效浏览次数排序，同一用户12小时内重复访问计1次' },
  { key: 'usage', label: '最高使用', description: '按平台记录的有效下载次数排序' },
]

const corpusItems: CorpusItem[] = [
  {
    id: 'ds-10', title: '代谢小分子化合物语料', organization: '北京大学数学科学学院', domain: '生物', type: '知识语料', openness: '部分公开',
    summary: '整合小分子结构、理化属性、质谱裂解特征及来源元数据。',
    publishedAt: '2026-08-18', views: 120, favorites: 653, downloads: 231,
    coverImage: 'quality-latest-1.png',
  },
  {
    id: 'ds-16', title: '物理化学论文多模态解构图语料', organization: '北京大学图书馆', domain: '化学', type: '特征语料', openness: '部分公开',
    summary: '对科研图片及其上下文进行结构化提取，实现规范的图文绑定。',
    publishedAt: '2026-03-22', views: 1344, favorites: 12, downloads: 13,
    coverImage: 'quality-latest-2.png',
  },
  {
    id: 'ds-13', title: '中国典型城市高分辨率三通道影像语料', organization: '北京大学地球与空间科学学院', domain: '地理', type: '基础语料', openness: '部分公开',
    summary: '提供典型城市核心城区亚米级影像块，支持高分辨率重建与视觉训练。',
    publishedAt: '2026-05-18', views: 1544, favorites: 164, downloads: 42,
    coverImage: 'quality-latest-3.png',
  },
  {
    id: 'ds-14', title: '中国灾情历史数据语料', organization: '北京大学数学科学学院', domain: '生物', type: '基础语料', openness: '部分公开',
    summary: '融合近20年历史灾害事件资料，形成标准化灾害数值文本对。',
    publishedAt: '2026-08-18', views: 342, favorites: 88, downloads: 241,
    coverImage: 'quality-latest-4.png',
  },
  {
    id: 'ds-04', title: '环境化学通识问答语料', organization: '北京大学图书馆', domain: '化学', type: '知识语料', openness: '部分公开',
    summary: '统大气、水体、土壤及污染控制构建规范、简明的环境化学问答。',
    publishedAt: '2026-03-22', views: 4221, favorites: 421, downloads: 133,
    coverImage: 'quality-latest-5.png',
  },
  {
    id: 'ds-01', title: '聚合物太阳能电池知识语料聚', organization: '北京大学地球与空间科学学院', domain: '地理', type: '知识语料', openness: '部分公开',
    summary: '汇集聚合物太阳能电池材料、器件性能及关键光电指标，服务材料筛选与机理分析。',
    publishedAt: '2026-05-18', views: 1344, favorites: 12, downloads: 13,
    coverImage: 'quality-latest-6.png',
  },
]

const partnerRows: PartnerItem[][] = [
  [
    { name: '北京大学', logo: `${import.meta.env.BASE_URL}images/partners/pku-material.png`, group: '高校', wordmark: true },
    { name: '清华大学', logo: `${import.meta.env.BASE_URL}images/partners/tsinghua-material.png`, group: '高校', wordmark: true },
    { name: '厦门大学', logo: `${import.meta.env.BASE_URL}images/partners/xiamen-material.png`, group: '高校', wordmark: true },
    { name: '南京大学', logo: `${import.meta.env.BASE_URL}images/partners/nanjing-material.png`, group: '高校', wordmark: true },
    { name: '武汉大学', logo: `${import.meta.env.BASE_URL}images/partners/wuhan-material.png`, group: '高校', wordmark: true },
    { name: '复旦大学', logo: `${import.meta.env.BASE_URL}images/partners/fudan-material.png`, group: '高校', wordmark: true },
    { name: '上海交通大学', logo: `${import.meta.env.BASE_URL}images/partners/sjtu-material.png`, group: '高校', wordmark: true },
    { name: '鹏城实验室', logo: `${import.meta.env.BASE_URL}images/partners/pengcheng.jpeg`, group: '科研机构' },
  ],
  [
    { name: '华为', logo: `${import.meta.env.BASE_URL}images/partners/huawei.jpeg`, group: '企业' },
    { name: '万方数据', logo: `${import.meta.env.BASE_URL}images/partners/wanfang.jpeg`, group: '企业' },
    { name: '京能集团', logo: `${import.meta.env.BASE_URL}images/partners/jingneng.jpg`, group: '企业' },
    { name: '百度', logo: `${import.meta.env.BASE_URL}images/partners/baidu.jpeg`, group: '企业' },
    { name: '字节跳动', logo: `${import.meta.env.BASE_URL}images/partners/bytedance-material.png`, group: '企业', wordmark: true },
    { name: '中国联通', logo: `${import.meta.env.BASE_URL}images/partners/unicom.jpeg`, group: '企业' },
    { name: '蚂蚁集团', logo: `${import.meta.env.BASE_URL}images/partners/ant.jpg`, group: '企业' },
  ],
]

function sortCorpus(items: CorpusItem[], sortKey: SortKey) {
  const copied = [...items]
  if (sortKey === 'views') return copied.sort((a, b) => b.views - a.views)
  if (sortKey === 'usage') return copied.sort((a, b) => b.downloads - a.downloads)
  return copied.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export default function QualityCorpusDiscovery() {
  const [activeTab, setActiveTab] = useState<SortKey>('latest')
  const visibleCorpus = useMemo(() => sortCorpus(corpusItems, activeTab).slice(0, 6), [activeTab])

  return (
    <section className="quality-discovery-section" aria-labelledby="quality-discovery-title">
      <div className="quality-discovery-inner">
        <header className="quality-discovery-heading">
          <h2 id="quality-discovery-title">发现优质语料</h2>
        </header>

        <div className="discovery-toolbar">
          <div className="discovery-tabs" role="tablist" aria-label="优质语料排序方式">
            {tabDefinitions.map((tab) => (
              <button
                className={activeTab === tab.key ? 'is-active' : ''}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.key}
                aria-controls="quality-corpus-panel"
                id={`quality-tab-${tab.key}`}
                onClick={() => setActiveTab(tab.key)}
                key={tab.key}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <Link className="discovery-more-link" to={`/search/results?sort=${activeTab}`}>
            查看更多 <ArrowRight size={15} />
          </Link>
        </div>

        <div
          className="quality-corpus-grid"
          id="quality-corpus-panel"
          role="tabpanel"
          aria-labelledby={`quality-tab-${activeTab}`}
        >
          {visibleCorpus.map((item) => (
            <Link className="quality-corpus-card" to={`/search/datasets/${item.id}`} key={item.id}>
              <div
                className="quality-card-visual"
                style={{ '--corpus-cover': `url("${import.meta.env.BASE_URL}images/corpus-covers/${item.coverImage}")` } as CSSProperties}
                aria-hidden="true"
              >
                <span className={`card-status-overlay ${item.openness === '不公开' ? 'is-private' : 'is-partial'}`}>{item.openness}</span>
                <span className="visual-line visual-line-one" />
                <span className="visual-line visual-line-two" />
                <span className="visual-node node-one" />
                <span className="visual-node node-two" />
                <span className="visual-node node-three" />
                <span className="visual-node node-four" />
                <span className="visual-bar bar-one" />
                <span className="visual-bar bar-two" />
                <span className="visual-bar bar-three" />
                <span className="visual-bar bar-four" />
              </div>

              <div className="quality-card-meta-row">
                <div className="quality-card-tags">
                  <span className="domain-tag">{item.domain}</span>
                </div>
                <time dateTime={item.publishedAt}><CalendarDays size={13} />{item.publishedAt}</time>
              </div>

              <h3>{item.title}</h3>
              <p>{item.summary}</p>

              <footer>
                <span className="card-org-mark" aria-hidden="true">北</span>
                <strong className="card-organization-name">{item.organization}</strong>
                <span><Download size={15} />{item.downloads.toLocaleString()}</span>
                <span><Eye size={15} />{item.views.toLocaleString()}</span>
                <span><Star size={15} />{item.favorites.toLocaleString()}</span>
              </footer>
            </Link>
          ))}
        </div>

        <section className="quality-partners-section" aria-labelledby="quality-partners-title">
          <header className="quality-partners-heading">
            <h3 id="quality-partners-title">合作伙伴</h3>
          </header>
          <div className="quality-partner-grid" aria-label="合作伙伴列表">
            {partnerRows.map((row, rowIndex) => (
              <div className={`quality-partner-row ${rowIndex === 0 ? 'is-right' : 'is-left'}`} key={rowIndex}>
                <div className="quality-partner-track">
                  {[...row, ...row].map((partner, partnerIndex) => (
                    <div className={`quality-partner-card ${partner.wordmark ? 'is-wordmark' : 'has-label'}`} key={`${rowIndex}-${partner.name}-${partnerIndex}`} aria-hidden={partnerIndex >= row.length}>
                      <img src={partner.logo} alt="" />
                      <div>
                        <strong>{partner.name}</strong>
                        <span>{partner.group}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}
