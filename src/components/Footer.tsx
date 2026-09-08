import { Link } from 'react-router'
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <section className="footer-unit-column" aria-label="项目建设单位">
          <h2>建设单位</h2>
          <dl>
            <div><dt>主管单位</dt><dd>北京大学</dd></div>
            <div><dt>主建单位</dt><dd>北京大学计算中心</dd></div>
          </dl>
        </section>

        <section className="footer-contact-column" aria-label="运营与联系信息">
          <h2>运营与联系</h2>
          <p><strong>运营单位</strong><span>北京大学计算中心</span></p>
          <p><strong>地址</strong><span>北京市海淀区颐和园路5号</span></p>
        </section>

        <section className="footer-service-column" aria-label="服务支持">
          <h2>服务支持</h2>
          <a href="mailto:noah@pku.edu.cn?subject=问题反馈">问题反馈</a>
          <a href="mailto:noah@pku.edu.cn?subject=权益申诉">权益申诉</a>
        </section>
      </div>

      <div className="site-footer-bottom">
        <div>
          <span>© 2026 北京大学 版权所有</span>
          <i aria-hidden="true" />
          <Link to="/about">关于我们</Link>
          <span aria-hidden="true">·</span>
          <Link to="/about#site-statement">网站声明</Link>
          <span aria-hidden="true">·</span>
          <Link to="/about#privacy">隐私政策</Link>
        </div>
      </div>
    </footer>
  )
}
