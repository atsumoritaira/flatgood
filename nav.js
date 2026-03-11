// nav.js - 共通ナビゲーション生成 & アクティブタブ制御 & HubSpotトラッキング

(function () {

  // ========== HubSpot トラッキングコード（全ページ共通） ==========
  var hsScript = document.createElement('script');
  hsScript.type = 'text/javascript';
  hsScript.id = 'hs-script-loader';
  hsScript.async = true;
  hsScript.defer = true;
  hsScript.src = '//js.hs-scripts.com/YOUR_PORTAL_ID.js'; // ← ポータルIDに置き換える
  document.head.appendChild(hsScript);

  // ========== ナビゲーション定義 ==========
  const NAV_ITEMS = [
    { label: 'ホーム',             icon: '🏠', href: 'index.html',    root: true },
    { label: 'サービス',           icon: '⚙️', href: 'services.html' },
    { label: 'HubSpot導入',        icon: '🚀', href: 'hubspot.html' },
    { label: 'CRM設計',            icon: '🗂️', href: 'crm.html' },
    { label: 'カスタマーサクセス',  icon: '🤝', href: 'cs.html' },
    { label: '導入の流れ',          icon: '📋', href: 'flow.html' },
    { label: '料金',               icon: '💴', href: 'pricing.html' },
    { label: '実績',               icon: '📊', href: 'results.html' },
    { label: 'FAQ',                icon: '❓', href: 'faq.html' },
    { label: 'プロフィール',        icon: '👤', href: 'profile.html' },
    { label: 'お問い合わせ',        icon: '✉️', href: 'contact.html' },
  ];

  // ========== ナビゲーション生成 ==========
  function buildHeader() {
    // index.html（ルート）か pages/ 配下かを判定
    const isRoot = !location.pathname.includes('/pages/');
    const basePath = isRoot ? 'pages/' : '';
    const logoHref = isRoot ? 'index.html' : '../index.html';

    // 現在のファイル名を取得
    const currentFile = location.pathname.split('/').pop() || 'index.html';

    const navLinks = NAV_ITEMS.map(item => {
      // ホームリンクのhrefをルート/pages配下で切り替え
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

    document.getElementById('hamburger').addEventListener('click', function () {
      this.classList.toggle('open');
      document.getElementById('mobileNav').classList.toggle('open');
    });
  }

  document.addEventListener('DOMContentLoaded', buildHeader);

})();
