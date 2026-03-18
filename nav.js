// nav.js - 共通ナビゲーション生成 & HubSpot統合版

(function () {
  const NAV_ITEMS = [
    { label: 'ホーム', icon: '🏠', href: 'index.html', root: true },
    { label: 'サービス', icon: '⚙️', href: 'services.html' },
    { label: 'HubSpot導入', icon: '🚀', href: 'hubspot.html' },
    { label: 'CRM設計', icon: '🗂️', href: 'crm.html' },
    { label: 'カスタマーサクセス', icon: '🤝', href: 'cs.html' },
    { label: '導入の流れ', icon: '📋', href: 'flow.html' },
    { label: '料金', icon: '💴', href: 'pricing.html' },
    { label: '実績', icon: '📊', href: 'results.html' },
    { label: 'FAQ', icon: '❓', href: 'faq.html' },
    { label: 'プロフィール', icon: '👤', href: 'profile.html' },
    { label: 'お問い合わせ', icon: '✉️', href: 'contact.html' },
  ];

  function initAll() {
    // 1. ヘッダー生成
    buildHeader();
    // 2. HubSpot読み込み
    loadHubSpot();
  }

  function buildHeader() {
    const isRoot = !location.pathname.includes('/pages/');
    const basePath = isRoot ? 'pages/' : '';
    const logoHref = isRoot ? 'index.html' : '../index.html';
    const currentFile = location.pathname.split('/').pop() || 'index.html';

    const navLinks = NAV_ITEMS.map(item => {
      const href = item.root ? logoHref : basePath + item.href;
      const isActive = currentFile === item.href;
      return `<a href="${href}" class="${isActive ? 'active' : ''}"><span class="nav-icon">${item.icon}</span>${item.label}</a>`;
    }).join('');

    const mobileLinks = NAV_ITEMS.map(item => {
      const href = item.root ? logoHref : basePath + item.href;
      return `<a href="${href}">${item.icon} ${item.label}</a>`;
    }).join('');

    const header = document.querySelector('.header');
    if (!header) return;

    header.innerHTML = `
      <div class="header-inner">
        <a href="${logoHref}" class="logo">flatgood</a>
        <nav class="nav">${navLinks}</nav>
        <button class="hamburger" id="hamburger" aria-label="メニュー">
          <span></span><span></span><span></span>
        </button>
      </div>
      <nav class="mobile-nav" id="mobileNav">${mobileLinks}</nav>
    `;

    const btn = document.getElementById('hamburger');
    if (btn) {
      btn.addEventListener('click', function () {
        this.classList.toggle('open');
        document.getElementById('mobileNav').classList.toggle('open');
      });
    }
  }

  function loadHubSpot() {
    if (document.getElementById('hs-script-loader')) return;
    const hs = document.createElement('script');
    hs.id = 'hs-script-loader';
    hs.async = true;
    hs.defer = true;
    hs.src = '//js.hs-scripts.com/51009495.js';
    // 安全にheadまたはbodyに追加
    (document.head || document.body).appendChild(hs);
  }

  // DOMContentLoadedを待つが、すでに読み込み済みなら即実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
