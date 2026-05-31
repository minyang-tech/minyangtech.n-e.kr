const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = path.resolve(__dirname, "..");
const localeOrder = ["ja-jp", "en-us", "zh-cn", "ru-ru", "de-de"];
const localeMeta = {
  "ja-jp": {
    htmlLang: "ja",
    label: "日本語",
    button: "翻訳",
    brand: "MinyangTech",
    dir: "ltr",
    nav: {
      docs: "ドキュメント",
      news: "ニュース",
      apps: "アプリ",
      portfolio: "ポートフォリオ",
      issues: "課題",
      contributing: "Contributing",
      eula: "EULA"
    },
    common: {
      connect: "お問い合わせ",
      copyright: "Copyright 2026. MinyangTech. All rights reserved.",
      search: "名前または説明を検索...",
      newest: "新しい順",
      oldest: "古い順",
      noResults: "該当する結果がありません。",
      loadError: "データを読み込めませんでした。",
      back: "一覧に戻る",
      open: "開く",
      download: "ダウンロード",
      source: "ソースコード",
      releaseDate: "リリース日",
      platform: "プラットフォーム",
      minSpec: "最小要件",
      recSpec: "推奨要件",
      openSource: "オープンソース",
      screenshots: "スクリーンショット",
      copied: "リンクをコピーしました。"
    }
  },
  "en-us": {
    htmlLang: "en",
    label: "English",
    button: "Translate",
    brand: "MinyangTech",
    dir: "ltr",
    nav: {
      docs: "Docs",
      news: "News",
      apps: "Apps",
      portfolio: "Portfolio",
      issues: "Issues",
      contributing: "Contributing",
      eula: "EULA"
    },
    common: {
      connect: "Connect with Us",
      copyright: "Copyright 2026. MinyangTech. All rights reserved.",
      search: "Search by name or description...",
      newest: "Newest",
      oldest: "Oldest",
      noResults: "No matching results.",
      loadError: "Unable to load data.",
      back: "Back to list",
      open: "Open",
      download: "Download",
      source: "Source Code",
      releaseDate: "Release Date",
      platform: "Platform",
      minSpec: "Minimum Specs",
      recSpec: "Recommended Specs",
      openSource: "Open Source",
      screenshots: "Screenshots",
      copied: "Link copied."
    }
  },
  "zh-cn": {
    htmlLang: "zh-CN",
    label: "中文",
    button: "翻译",
    brand: "MinyangTech",
    dir: "ltr",
    nav: {
      docs: "文档",
      news: "新闻",
      apps: "应用",
      portfolio: "作品集",
      issues: "问题",
      contributing: "Contributing",
      eula: "EULA"
    },
    common: {
      connect: "联系我们",
      copyright: "Copyright 2026. MinyangTech. All rights reserved.",
      search: "搜索名称或说明...",
      newest: "最新",
      oldest: "最旧",
      noResults: "没有匹配的结果。",
      loadError: "无法加载数据。",
      back: "返回列表",
      open: "打开",
      download: "下载",
      source: "源代码",
      releaseDate: "发布日期",
      platform: "平台",
      minSpec: "最低配置",
      recSpec: "推荐配置",
      openSource: "开源",
      screenshots: "截图",
      copied: "链接已复制。"
    }
  },
  "ru-ru": {
    htmlLang: "ru",
    label: "Русский",
    button: "Перевести",
    brand: "MinyangTech",
    dir: "ltr",
    nav: {
      docs: "Документы",
      news: "Новости",
      apps: "Приложения",
      portfolio: "Портфолио",
      issues: "Задачи",
      contributing: "Contributing",
      eula: "EULA"
    },
    common: {
      connect: "Связаться с нами",
      copyright: "Copyright 2026. MinyangTech. All rights reserved.",
      search: "Поиск по названию или описанию...",
      newest: "Сначала новые",
      oldest: "Сначала старые",
      noResults: "Подходящих результатов нет.",
      loadError: "Не удалось загрузить данные.",
      back: "Назад к списку",
      open: "Открыть",
      download: "Скачать",
      source: "Исходный код",
      releaseDate: "Дата выпуска",
      platform: "Платформа",
      minSpec: "Минимальные требования",
      recSpec: "Рекомендуемые требования",
      openSource: "Открытый код",
      screenshots: "Скриншоты",
      copied: "Ссылка скопирована."
    }
  },
  "de-de": {
    htmlLang: "de",
    label: "Deutsch",
    button: "Übersetzen",
    brand: "MinyangTech",
    dir: "ltr",
    nav: {
      docs: "Dokumente",
      news: "News",
      apps: "Apps",
      portfolio: "Portfolio",
      issues: "Issues",
      contributing: "Contributing",
      eula: "EULA"
    },
    common: {
      connect: "Kontakt",
      copyright: "Copyright 2026. MinyangTech. All rights reserved.",
      search: "Nach Name oder Beschreibung suchen...",
      newest: "Neueste",
      oldest: "Älteste",
      noResults: "Keine passenden Ergebnisse.",
      loadError: "Daten konnten nicht geladen werden.",
      back: "Zurück zur Liste",
      open: "Öffnen",
      download: "Download",
      source: "Quellcode",
      releaseDate: "Veröffentlichung",
      platform: "Plattform",
      minSpec: "Mindestanforderungen",
      recSpec: "Empfohlene Anforderungen",
      openSource: "Open Source",
      screenshots: "Screenshots",
      copied: "Link wurde kopiert."
    }
  }
};

const defaultImage = "https://github.com/minyang-tech/minyangtech.github.io/blob/main/image/MINYANG%20TECH.png?raw=true";
const bannerImage = "https://github.com/minyangtech/minyangtech.github.io/blob/main/image/%EB%AF%BC%EC%96%91%ED%85%8C%ED%81%AC%20%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.png?raw=true";
const profileImage = "https://github.com/minyang-tech/minyangtech.github.io/blob/main/image/b395c85a9f3fdfad3721eb1c29180e11.png?raw=true";

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function write(filePath, content) {
  const normalized = content.replace(/\r\n/g, "\n");
  ensureDir(filePath);
  fs.writeFileSync(filePath, normalized, "utf8");
}

function sha256(content) {
  return crypto.createHash("sha256").update(content.replace(/\r\n/g, "\n"), "utf8").digest("hex");
}

function writeJson(filePath, data) {
  const content = `${JSON.stringify(data, null, 2)}\n`;
  write(filePath, content);
  return sha256(content);
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[char]));
}

function p(locale, basePath) {
  return `/${locale}${basePath}`;
}

function nav(locale, active) {
  const meta = localeMeta[locale];
  const items = [
    ["docs", "/docs/index.html"],
    ["news", "/news/index.html"],
    ["apps", "/apps.html"],
    ["portfolio", "/portfolio.html"],
    ["issues", "/issues.html"],
    ["contributing", "/Contributing.html"],
    ["eula", "/eula.html"]
  ];
  return items.map(([key, href]) => `<li><a href="${p(locale, href)}"${active === key ? " class=\"active\"" : ""}>${esc(meta.nav[key])}</a></li>`).join("\n");
}

function baseCss() {
  return `
    :root { --accent:#007bff; --txt:#30343b; --bg:#ffffff; --brd:#e6e9ef; --card-bg:#ffffff; --muted:#667085; --soft:#f5f8ff; }
    body.dark-mode { --txt:#f5f7fb; --bg:#121212; --brd:#333844; --card-bg:#1c1f26; --muted:#a9b0bd; --soft:#171f2a; }
    * { box-sizing:border-box; }
    body { margin:0; font-family:Pretendard, "Noto Sans", "Noto Sans JP", "Noto Sans SC", system-ui, sans-serif; background:var(--bg); color:var(--txt); line-height:1.72; transition:background-color .25s, color .25s; }
    header { width:100%; min-height:80px; display:flex; justify-content:space-between; align-items:center; gap:18px; padding:0 5%; border-bottom:1px solid var(--brd); background:color-mix(in srgb, var(--bg) 92%, transparent); backdrop-filter:blur(14px); position:sticky; top:0; z-index:1000; }
    .header-left { display:flex; align-items:center; gap:36px; min-width:0; }
    .logo-link img { height:40px !important; width:auto !important; display:block; }
    .nav-links { display:flex; list-style:none; gap:20px; margin:0; padding:0; flex-wrap:wrap; }
    .nav-links a { color:var(--txt); text-decoration:none; font-weight:750; opacity:.68; }
    .nav-links a:hover, .nav-links a.active { color:var(--accent); opacity:1; }
    .controls { display:flex; align-items:center; gap:12px; }
    .switch { width:44px; height:22px; position:relative; display:inline-block; flex:0 0 auto; }
    .switch input { opacity:0; width:0; height:0; }
    .slider { position:absolute; cursor:pointer; inset:0; border-radius:999px; background:#c9ced8; transition:.25s; }
    .slider:before { content:""; position:absolute; width:16px; height:16px; left:3px; bottom:3px; background:#fff; border-radius:50%; transition:.25s; }
    input:checked + .slider { background:var(--accent); }
    input:checked + .slider:before { transform:translateX(22px); }
    main.page { width:min(1120px, calc(100% - 32px)); margin:46px auto 80px; }
    .hero { padding:clamp(28px, 5vw, 54px); border:1px solid var(--brd); border-radius:30px; background:linear-gradient(135deg, color-mix(in srgb, var(--accent) 14%, transparent), var(--card-bg)); box-shadow:0 18px 48px rgba(0,0,0,.07); margin-bottom:28px; }
    .hero h1 { margin:0 0 12px; font-size:clamp(2.3rem, 5vw, 4.6rem); line-height:1.02; letter-spacing:-.05em; }
    .hero p { max-width:820px; margin:0; color:var(--muted); font-size:1.06rem; }
    .grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:18px; }
    .card { border:1px solid var(--brd); border-radius:24px; background:var(--card-bg); padding:22px; box-shadow:0 12px 34px rgba(0,0,0,.06); }
    .card h2, .card h3 { margin-top:0; }
    .muted { color:var(--muted); }
    .button, button.primary { display:inline-flex; align-items:center; justify-content:center; gap:8px; min-height:42px; padding:0 16px; border:0; border-radius:999px; background:var(--accent); color:#fff; font-weight:850; text-decoration:none; cursor:pointer; }
    .filter-container { display:flex; justify-content:space-between; gap:14px; flex-wrap:wrap; margin:0 0 24px; }
    .search-box { position:relative; flex:1; min-width:240px; }
    .search-box input, .sort-select { width:100%; min-height:44px; padding:0 14px; border:1px solid var(--brd); border-radius:14px; background:var(--card-bg); color:var(--txt); outline:none; }
    .sort-select { width:auto; min-width:150px; font-weight:750; }
    .list-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:20px; }
    .item-card { overflow:hidden; border:1px solid var(--brd); border-radius:22px; background:var(--card-bg); cursor:pointer; transition:.22s; }
    .item-card:hover { transform:translateY(-5px); border-color:var(--accent); box-shadow:0 15px 40px rgba(0,0,0,.1); }
    .item-card img, .thumb { width:100%; height:180px; object-fit:cover; background:var(--soft); display:block; }
    .item-card .body { padding:20px; }
    .tag { display:inline-flex; padding:4px 10px; border-radius:999px; background:color-mix(in srgb, var(--accent) 14%, transparent); color:var(--accent); font-size:.78rem; font-weight:850; }
    .detail { display:none; }
    .markdown h1 { font-size:2rem; }
    .markdown table { width:100%; border-collapse:collapse; margin:18px 0; }
    .markdown th, .markdown td { padding:10px 12px; border-bottom:1px solid var(--brd); text-align:left; vertical-align:top; }
    .spec-table { width:100%; border-collapse:collapse; margin:18px 0; }
    .spec-table th, .spec-table td { padding:11px 0; border-bottom:1px solid var(--brd); text-align:left; vertical-align:top; }
    .spec-table th { width:150px; color:var(--muted); }
    .docs-layout { display:grid; grid-template-columns:260px minmax(0, 1fr); gap:28px; }
    .docs-sidebar { position:sticky; top:104px; height:max-content; border:1px solid var(--brd); border-radius:22px; padding:18px; background:var(--card-bg); }
    .docs-sidebar ul { list-style:none; padding:0; margin:0; display:grid; gap:8px; }
    .docs-sidebar a { display:block; padding:8px 10px; border-radius:10px; color:var(--txt); text-decoration:none; opacity:.72; font-weight:750; }
    .docs-sidebar a:hover, .docs-sidebar a.active { opacity:1; color:var(--accent); background:color-mix(in srgb, var(--accent) 10%, transparent); }
    footer { padding:52px 20px 38px; border-top:1px solid var(--brd); text-align:center; color:var(--muted); }
    .footer-sns { display:flex; justify-content:center; gap:28px; align-items:center; margin-bottom:16px; }
    .x-logo-img { height:24px !important; filter:invert(1); }
    body.dark-mode .x-logo-img { filter:invert(0); }
    @media (max-width:900px) { header { align-items:flex-start; flex-direction:column; padding:18px; } .header-left { align-items:flex-start; flex-direction:column; gap:16px; } .docs-layout { grid-template-columns:1fr; } .docs-sidebar { position:static; } }
  `;
}

function pageHtml(locale, { title, active = "docs", main, scripts = "", extraHead = "" }) {
  const meta = localeMeta[locale];
  return `<!DOCTYPE html>
<html lang="${meta.htmlLang}" dir="${meta.dir}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)} | MinyangTech</title>
  <link rel="icon" href="https://github.com/minyangtech/minyangtech.github.io/blob/main/image/%EB%AF%BC%EC%96%91%20%ED%85%8C%ED%81%AC.png?raw=true" type="image/x-icon">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha384-iw3OoTErCYJJB9mCa8LNS2hbsQ7M3C0EpIsO/H5+EGAkPGc6rk+V8i04oW/K5xq0" crossorigin="anonymous">
  <link rel="stylesheet" href="/common.css">
  <link rel="stylesheet" href="/assets/css/header-unified.css">
  <style>${baseCss()}</style>
  ${extraHead}
</head>
<body>
  <header>
    <div class="header-left">
      <a href="/" class="logo-link"><img src="https://raw.githubusercontent.com/minyangtech/minyangtech.github.io/main/image/%EB%AF%BC%EC%96%91%20%ED%85%8C%ED%81%AC.png" alt="MinyangTech"></a>
      <nav aria-label="Main navigation"><ul class="nav-links">${nav(locale, active)}</ul></nav>
    </div>
    <div class="controls">
      <label class="switch"><input type="checkbox" id="dark-mode-toggle"><span class="slider"></span></label>
    </div>
  </header>
  ${main}
  <footer>
    <h3>${esc(meta.common.connect)}</h3>
    <div class="footer-sns">
      <a href="https://x.com/minyangtech" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/minyangtech/minyangtech.github.io/main/image/logo-white.png" class="x-logo-img" alt="X"></a>
      <a href="https://www.youtube.com/@minyangtech" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-youtube" style="font-size:32px;color:#ff0000;"></i></a>
    </div>
    <a href="mailto:support@minyangtech.n-e.kr" style="color:inherit;text-decoration:none;">support@minyangtech.n-e.kr</a>
    <p>${esc(meta.common.copyright)}</p>
  </footer>
  <script>
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    darkModeToggle?.addEventListener("change", () => {
      const isDark = document.body.classList.toggle("dark-mode");
      localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
    });
    if (localStorage.getItem("darkMode") === "enabled") {
      document.body.classList.add("dark-mode");
      if (darkModeToggle) darkModeToggle.checked = true;
    }
  </script>
  ${scripts}
  <script src="/assets/js/translation-menu.js" defer></script>
</body>
</html>
`;
}

function markdownScripts() {
  return `
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js" integrity="sha384-948ahk4ZmxYVYOc+rxN1H2gM1EJ2Duhp7uHtZ4WSLkV4Vtx5MUqnV+l7u9B+jFv+" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/dompurify@3.3.1/dist/purify.min.js" integrity="sha384-80VlBZnyAwkkqtSfg5NhPyZff6nU4K/qniLBL8Jnm4KDv6jZhLiYtJbhglg/i9ww" crossorigin="anonymous"></script>
  <script src="/assets/js/security.js"></script>`;
}

function appsData(locale) {
  const data = {
    "en-us": [
      {
        id: 1,
        name: "Nawo Bot",
        category: "BOT",
        short_desc: "A Discord bot for server statistics, status checks, polls, and mini games.",
        description: "# Nawo Bot\nInvite the bot directly from the download button. It provides lightweight server utilities such as statistics, status checks, polls, and mini games.",
        platform: "Discord",
        min_spec: "No local system requirements.",
        rec_spec: "No local system requirements.",
        release_date: "2026-04-05"
      },
      {
        id: 2,
        name: "MarkQuote",
        category: "Apps",
        short_desc: "Turns Markdown into copyable HTML and creates quote-style cards.",
        description: "# MarkQuote\nA small Windows app inspired by quote-card tools. It converts Markdown into HTML and helps create clean quote cards.",
        platform: "Windows",
        min_spec: "Intel i3-class CPU, 4GB RAM, 200MB storage.",
        rec_spec: "Intel i5-class CPU or better, 8GB RAM, SSD.",
        release_date: "2026-04-12"
      },
      {
        id: 3,
        name: "IXO Engine",
        category: "Apps",
        short_desc: "Build apps with visual nodes instead of writing code by hand.",
        description: "# IXO Engine\nIXO Engine is a visual node-based app builder inspired by block coding workflows. It includes Canvas Builder, UI Viewer, scene tools, asset management, export polish, and safer network-node controls.\n\nmacOS desktop builds are not currently supported. Windows and Linux are the primary supported platforms.",
        platform: "Windows / Linux",
        min_spec: "Windows 10 64-bit or Ubuntu 20.04-class Linux, 4GB RAM, dual-core CPU, 500MB free storage.",
        rec_spec: "Windows 11 or Ubuntu 22.04/24.04, 8GB RAM, quad-core CPU, 1GB free storage.",
        release_date: "2026-05-20"
      }
    ],
    "ja-jp": [
      {
        id: 1,
        name: "Nawo Bot",
        category: "BOT",
        short_desc: "サーバー統計、状態確認、投票、ミニゲームを提供する Discord ボットです。",
        description: "# Nawo Bot\nダウンロードボタンから Discord に直接招待できます。サーバー統計、状態確認、投票、ミニゲームなどの軽量なユーティリティを提供します。",
        platform: "Discord",
        min_spec: "ローカル環境の要件はありません。",
        rec_spec: "ローカル環境の要件はありません。",
        release_date: "2026-04-05"
      },
      {
        id: 2,
        name: "MarkQuote",
        category: "Apps",
        short_desc: "Markdown をコピーしやすい HTML に変換し、引用カードを作成します。",
        description: "# MarkQuote\n引用カード系ツールから着想を得た小さな Windows アプリです。Markdown を HTML に変換し、整った引用カードを作成できます。",
        platform: "Windows",
        min_spec: "Intel i3 相当 CPU、4GB RAM、200MB ストレージ。",
        rec_spec: "Intel i5 相当以上、8GB RAM、SSD。",
        release_date: "2026-04-12"
      },
      {
        id: 3,
        name: "IXO Engine",
        category: "Apps",
        short_desc: "手書きコードではなく、ビジュアルノードでアプリを作成します。",
        description: "# IXO Engine\nIXO Engine は、ブロックコーディングの流れに近いビジュアルノード型アプリビルダーです。Canvas Builder、UI Viewer、Scene、Asset Manager、Export 設定、ネットワークノードの安全制御を備えています。\n\nmacOS デスクトップ版は現在サポート対象外です。Windows と Linux を中心に検証しています。",
        platform: "Windows / Linux",
        min_spec: "Windows 10 64-bit または Ubuntu 20.04 相当 Linux、4GB RAM、デュアルコア CPU、空き容量 500MB。",
        rec_spec: "Windows 11 または Ubuntu 22.04/24.04、8GB RAM、クアッドコア CPU、空き容量 1GB。",
        release_date: "2026-05-20"
      }
    ],
    "zh-cn": [
      {
        id: 1,
        name: "Nawo Bot",
        category: "BOT",
        short_desc: "提供服务器统计、状态检查、投票和小游戏的 Discord 机器人。",
        description: "# Nawo Bot\n可通过下载按钮直接邀请到 Discord。它提供服务器统计、状态检查、投票、小游戏等轻量工具。",
        platform: "Discord",
        min_spec: "无本地系统要求。",
        rec_spec: "无本地系统要求。",
        release_date: "2026-04-05"
      },
      {
        id: 2,
        name: "MarkQuote",
        category: "Apps",
        short_desc: "将 Markdown 转换为可复制的 HTML，并生成引用卡片。",
        description: "# MarkQuote\n一款受引用卡片工具启发的 Windows 小应用，可将 Markdown 转换为 HTML，并帮助创建整洁的引用卡片。",
        platform: "Windows",
        min_spec: "Intel i3 级 CPU、4GB RAM、200MB 存储空间。",
        rec_spec: "Intel i5 级或更高、8GB RAM、SSD。",
        release_date: "2026-04-12"
      },
      {
        id: 3,
        name: "IXO Engine",
        category: "Apps",
        short_desc: "不用手写代码，通过可视化节点构建应用。",
        description: "# IXO Engine\nIXO Engine 是一款可视化节点式应用构建器，工作方式接近积木式编程。它包含 Canvas Builder、UI Viewer、场景工具、资源管理、导出设置以及更安全的网络节点控制。\n\n目前不支持 macOS 桌面应用。Windows 与 Linux 是主要支持平台。",
        platform: "Windows / Linux",
        min_spec: "Windows 10 64-bit 或 Ubuntu 20.04 级 Linux、4GB RAM、双核 CPU、500MB 可用空间。",
        rec_spec: "Windows 11 或 Ubuntu 22.04/24.04、8GB RAM、四核 CPU、1GB 可用空间。",
        release_date: "2026-05-20"
      }
    ],
    "ru-ru": [
      {
        id: 1,
        name: "Nawo Bot",
        category: "BOT",
        short_desc: "Discord-бот для статистики сервера, проверки статуса, опросов и мини-игр.",
        description: "# Nawo Bot\nБота можно пригласить через кнопку загрузки. Он предоставляет легкие утилиты для статистики сервера, проверки статуса, опросов и мини-игр.",
        platform: "Discord",
        min_spec: "Локальные системные требования отсутствуют.",
        rec_spec: "Локальные системные требования отсутствуют.",
        release_date: "2026-04-05"
      },
      {
        id: 2,
        name: "MarkQuote",
        category: "Apps",
        short_desc: "Преобразует Markdown в HTML и создает карточки цитат.",
        description: "# MarkQuote\nНебольшое Windows-приложение, вдохновленное инструментами для карточек цитат. Оно преобразует Markdown в HTML и помогает оформлять цитаты.",
        platform: "Windows",
        min_spec: "CPU уровня Intel i3, 4GB RAM, 200MB памяти.",
        rec_spec: "CPU уровня Intel i5 или выше, 8GB RAM, SSD.",
        release_date: "2026-04-12"
      },
      {
        id: 3,
        name: "IXO Engine",
        category: "Apps",
        short_desc: "Создавайте приложения визуальными узлами без ручного написания кода.",
        description: "# IXO Engine\nIXO Engine — визуальный конструктор приложений на основе узлов, близкий к блочному программированию. В него входят Canvas Builder, UI Viewer, сцены, менеджер ресурсов, настройки экспорта и безопасные сетевые узлы.\n\nНастольная версия для macOS сейчас не поддерживается. Основные платформы проверки — Windows и Linux.",
        platform: "Windows / Linux",
        min_spec: "Windows 10 64-bit или Linux уровня Ubuntu 20.04, 4GB RAM, двухъядерный CPU, 500MB свободного места.",
        rec_spec: "Windows 11 или Ubuntu 22.04/24.04, 8GB RAM, четырехъядерный CPU, 1GB свободного места.",
        release_date: "2026-05-20"
      }
    ],
    "de-de": [
      {
        id: 1,
        name: "Nawo Bot",
        category: "BOT",
        short_desc: "Ein Discord-Bot für Serverstatistiken, Statusprüfungen, Umfragen und Mini-Games.",
        description: "# Nawo Bot\nDer Bot kann direkt über den Download-Button eingeladen werden. Er bietet leichte Werkzeuge für Serverstatistiken, Statusprüfungen, Umfragen und Mini-Games.",
        platform: "Discord",
        min_spec: "Keine lokalen Systemanforderungen.",
        rec_spec: "Keine lokalen Systemanforderungen.",
        release_date: "2026-04-05"
      },
      {
        id: 2,
        name: "MarkQuote",
        category: "Apps",
        short_desc: "Wandelt Markdown in kopierbares HTML um und erstellt Quote-Karten.",
        description: "# MarkQuote\nEine kleine Windows-App, inspiriert von Quote-Card-Werkzeugen. Sie wandelt Markdown in HTML um und hilft beim Erstellen sauberer Zitatkarten.",
        platform: "Windows",
        min_spec: "Intel-i3-Klasse, 4GB RAM, 200MB Speicher.",
        rec_spec: "Intel-i5-Klasse oder besser, 8GB RAM, SSD.",
        release_date: "2026-04-12"
      },
      {
        id: 3,
        name: "IXO Engine",
        category: "Apps",
        short_desc: "Apps mit visuellen Nodes bauen, ohne Code von Hand zu schreiben.",
        description: "# IXO Engine\nIXO Engine ist ein visueller, nodebasierter App-Builder, der an Block-Coding-Workflows erinnert. Enthalten sind Canvas Builder, UI Viewer, Szenenwerkzeuge, Asset Manager, Export-Polish und sicherere Netzwerk-Node-Kontrollen.\n\nmacOS-Desktop-Builds werden derzeit nicht unterstützt. Windows und Linux sind die primär geprüften Plattformen.",
        platform: "Windows / Linux",
        min_spec: "Windows 10 64-bit oder Ubuntu-20.04-ähnliches Linux, 4GB RAM, Dual-Core-CPU, 500MB freier Speicher.",
        rec_spec: "Windows 11 oder Ubuntu 22.04/24.04, 8GB RAM, Quad-Core-CPU, 1GB freier Speicher.",
        release_date: "2026-05-20"
      }
    ]
  }[locale].map((item) => ({
    image: item.id === 3 ? "/image/ixo-engine/export.png" : defaultImage,
    source_url: item.id === 1 ? "https://minyangtech.n-e.kr/404" : item.id === 2 ? "https://github.com/minyang-tech/quote-markdown" : "https://github.com/minyang-tech/IXO-Engine/",
    download_url: item.id === 1 ? "https://minyangtech.n-e.kr/g/invite1" : item.id === 2 ? "https://github.com/minyang-tech/quote-markdown/releases/download/release/MarkQuote.Setup.1.0.0.exe" : "https://github.com/minyang-tech/IXO-Engine/releases/tag/V1.1.3",
    is_opensource: item.id !== 1,
    is_ai: true,
    screenshots: item.id === 3 ? ["/image/ixo-engine/export.png", "/image/ixo-engine/coming-soon.png"] : [],
    ...item
  }));
  return data;
}

function newsData(locale) {
  const n = {
    "en-us": [
      ["Website opened", "The MinyangTech website opened as a lightweight hub for documentation and news."],
      ["Website update", "Docs and News were reorganized, and project information is now easier to follow."],
      ["Some projects paused", "Several older projects were paused so development could focus on more realistic priorities."],
      ["Camera project notice", "The Camera project page now summarizes its concept, license, and development direction."],
      ["Camera update", "A small Camera update fixed core behavior and added basic improvements."],
      ["Temporary development break", "Regular feature work was paused for a limited period, while urgent fixes could still be handled."],
      ["Nawo Discord bot introduced", "MinyangTech introduced a Discord bot for statistics, status checks, polls, and mini games."],
      ["Update schedule notice", "After the exam period, existing projects were scheduled to receive additional updates."],
      ["Standard EULA introduced", "A common EULA was introduced for MinyangTech projects to clarify usage and copyright terms."],
      ["Roblox game service notice", "Older Roblox-related services were retired due to policy and maintenance limitations."],
      ["EULA revision notice", "The standard EULA was updated with clearer copyright and usage terms."],
      ["IXO Engine released", "IXO Engine officially launched on May 20, 2026. Please try the visual node-based app builder."],
      ["IXO Engine 1.1.0 update", "Version 1.1.0 added permissions, HTTPS hardening, Canvas features, Asset Manager, Action System, and export polish."],
      ["IXO Engine V1.1.1 Fix released", "This fix release focused on UI fixes, scene handling, asset dragging, vector drawing, and packaging cleanup."],
      ["IXO Engine V1.1.3 release notice", "This small release adds instant update application, F5 preview, simplified properties, connector-size settings, an improved network consent UI, and a simplified interface mode."]
    ],
    "ja-jp": [
      ["サイト公開", "MinyangTech のサイトを、ドキュメントとニュースのための軽量なハブとして公開しました。"],
      ["サイト更新", "Docs と News を整理し、プロジェクト情報を追いやすくしました。"],
      ["一部プロジェクトの停止", "より現実的な優先順位に集中するため、いくつかの旧プロジェクトを一時停止しました。"],
      ["Camera プロジェクト案内", "Camera プロジェクトの概要、ライセンス、開発方針を整理しました。"],
      ["Camera 更新", "Camera の基本動作を修正し、小さな改善を追加しました。"],
      ["開発一時休止のお知らせ", "通常の機能開発を一時的に停止し、緊急修正のみ対応できる体制にしました。"],
      ["Nawo Discord ボット紹介", "統計、状態確認、投票、ミニゲーム用の Discord ボットを紹介しました。"],
      ["更新予定のお知らせ", "試験期間後に既存プロジェクトを順次更新する予定です。"],
      ["標準 EULA 導入", "著作権と利用条件を明確にするため、共通 EULA を導入しました。"],
      ["Roblox ゲームサービス案内", "ポリシーと保守上の制約により、古い Roblox 関連サービスを終了しました。"],
      ["EULA 改定案内", "標準 EULA をより明確な著作権・利用条件に更新しました。"],
      ["IXO Engine リリース", "IXO Engine が 2026年5月20日に正式リリースされました。ぜひご利用ください。"],
      ["IXO Engine 1.1.0 更新", "1.1.0 では権限分離、HTTPS 強化、Canvas、Asset Manager、Action System、Export 改善を追加しました。"],
      ["IXO Engine V1.1.1 Fix リリース", "UI 修正、Scene 処理、Asset ドラッグ、Vector 描画、パッケージ整理に集中した修正版です。"],
      ["IXO Engine V1.1.3 配布案内", "即時更新、F5 プレビュー、属性パネル簡略化、接続点サイズ設定、詳細なネットワーク同意 UI、簡易 UI モードを追加しました。"]
    ],
    "zh-cn": [
      ["网站上线", "MinyangTech 网站作为文档与新闻的轻量中心正式上线。"],
      ["网站更新", "Docs 与 News 已重新整理，项目信息更容易查看。"],
      ["部分项目暂停", "为集中精力处理更现实的优先事项，部分旧项目被暂停。"],
      ["Camera 项目说明", "Camera 项目页面整理了概念、许可证与开发方向。"],
      ["Camera 更新", "Camera 进行了小型更新，修复基本行为并加入改进。"],
      ["开发暂时休息", "常规功能开发暂时暂停，但仍可处理紧急修复。"],
      ["Nawo Discord 机器人介绍", "介绍了用于统计、状态检查、投票和小游戏的 Discord 机器人。"],
      ["更新日程说明", "考试期结束后，现有项目将继续更新。"],
      ["标准 EULA 引入", "为明确使用与版权条款，MinyangTech 项目引入通用 EULA。"],
      ["Roblox 游戏服务说明", "由于政策和维护限制，旧的 Roblox 相关服务已结束。"],
      ["EULA 修订说明", "标准 EULA 已更新，版权和使用条款更加清晰。"],
      ["IXO Engine 发布", "IXO Engine 于 2026年5月20日正式发布。欢迎使用这款可视化节点应用构建器。"],
      ["IXO Engine 1.1.0 更新", "1.1.0 增加了权限分离、HTTPS 加固、Canvas、资源管理器、动作系统和导出优化。"],
      ["IXO Engine V1.1.1 Fix 发布", "该修复版本聚焦 UI 修复、场景处理、资源拖拽、矢量绘制和打包整理。"],
      ["IXO Engine V1.1.3 发布说明", "本小版本加入即时更新、F5 预览、属性面板简化、连接点大小设置、网络同意 UI 以及简化界面模式。"]
    ],
    "ru-ru": [
      ["Сайт открыт", "Сайт MinyangTech запущен как легкий центр документации и новостей."],
      ["Обновление сайта", "Разделы Docs и News были упорядочены, чтобы информацию о проектах было проще отслеживать."],
      ["Некоторые проекты приостановлены", "Несколько старых проектов приостановлены, чтобы сосредоточиться на более реалистичных приоритетах."],
      ["Заметка о Camera", "Страница Camera теперь описывает концепцию, лицензию и направление разработки."],
      ["Обновление Camera", "Небольшое обновление Camera исправило базовое поведение и добавило улучшения."],
      ["Временная пауза разработки", "Регулярная работа над функциями была временно остановлена, но срочные исправления возможны."],
      ["Представлен Nawo Discord bot", "Представлен Discord-бот для статистики, статусов, опросов и мини-игр."],
      ["План обновлений", "После экзаменационного периода существующие проекты должны получить обновления."],
      ["Введена стандартная EULA", "Для проектов MinyangTech введена общая EULA, уточняющая условия использования и авторские права."],
      ["Уведомление о Roblox-сервисах", "Старые сервисы Roblox закрыты из-за ограничений политики и поддержки."],
      ["Обновление EULA", "Стандартная EULA обновлена более понятными условиями авторских прав и использования."],
      ["IXO Engine выпущен", "IXO Engine официально вышел 20 мая 2026 года. Попробуйте визуальный node-based builder."],
      ["Обновление IXO Engine 1.1.0", "Версия 1.1.0 добавила разделение прав, усиление HTTPS, Canvas, Asset Manager, Action System и улучшения экспорта."],
      ["Выпущен IXO Engine V1.1.1 Fix", "Исправление сосредоточено на UI, сценах, перетаскивании ресурсов, векторном рисовании и упаковке."],
      ["Релиз IXO Engine V1.1.3", "Небольшой релиз добавляет мгновенное обновление, F5 preview, упрощенные свойства, размер точек соединения, улучшенное согласие сети и простой режим UI."]
    ],
    "de-de": [
      ["Website eröffnet", "Die MinyangTech-Website wurde als leichtes Zentrum für Dokumentation und News eröffnet."],
      ["Website-Update", "Docs und News wurden neu geordnet, damit Projektinformationen leichter zu verfolgen sind."],
      ["Einige Projekte pausiert", "Mehrere ältere Projekte wurden pausiert, um realistischere Prioritäten zu verfolgen."],
      ["Camera-Projekt Hinweis", "Die Camera-Projektseite fasst Konzept, Lizenz und Entwicklungsrichtung zusammen."],
      ["Camera-Update", "Ein kleines Camera-Update korrigierte Kernverhalten und fügte Verbesserungen hinzu."],
      ["Vorübergehende Entwicklungspause", "Reguläre Feature-Arbeit wurde vorübergehend pausiert, dringende Fixes bleiben möglich."],
      ["Nawo Discord Bot vorgestellt", "Ein Discord-Bot für Statistiken, Statusprüfungen, Umfragen und Mini-Games wurde vorgestellt."],
      ["Update-Zeitplan", "Nach der Prüfungszeit sollen bestehende Projekte weiter aktualisiert werden."],
      ["Standard-EULA eingeführt", "Für MinyangTech-Projekte wurde eine gemeinsame EULA eingeführt, um Nutzung und Urheberrecht zu klären."],
      ["Roblox-Service-Hinweis", "Ältere Roblox-bezogene Dienste wurden wegen Richtlinien- und Wartungsgrenzen eingestellt."],
      ["EULA-Revision", "Die Standard-EULA wurde mit klareren Urheberrechts- und Nutzungsbedingungen aktualisiert."],
      ["IXO Engine veröffentlicht", "IXO Engine wurde am 20. Mai 2026 offiziell veröffentlicht. Bitte probiere den visuellen Node-App-Builder aus."],
      ["IXO Engine 1.1.0 Update", "Version 1.1.0 brachte Rechte-Trennung, HTTPS-Härtung, Canvas, Asset Manager, Action System und Export-Polish."],
      ["IXO Engine V1.1.1 Fix veröffentlicht", "Diese Fix-Version konzentriert sich auf UI-Fixes, Szenen, Asset-Dragging, Vector Drawing und Packaging-Aufräumen."],
      ["IXO Engine V1.1.3 Release-Hinweis", "Dieses kleine Release ergänzt sofortige Updates, F5 Preview, vereinfachte Eigenschaften, Connector-Größe, Network Consent UI und einen vereinfachten UI-Modus."]
    ]
  }[locale];
  const localUi = uiText(locale);
  return n.map(([title, content], index) => ({
    id: index + 1,
    date: index < 2 ? "2026-03-14" : index === 2 ? "2026-03-15" : index < 5 ? "2026-03-26" : index < 8 ? "2026-04-19" : index < 11 ? "2026-04-26" : index === 11 ? "2026-05-20" : index === 12 ? "2026-05-22" : index === 13 ? "2026-05-23" : "2026-05-28",
    title,
    content: `# ${title}\n\n${content}\n\n${localUi.thanks}\n\n${localUi.contact}: <support@minyangtech.n-e.kr>`,
    author_name: index >= 12 ? "@whoasked" : "@Whoasked",
    author_img: index === 11 ? "https://github.com/minyangtech/minyangtech.github.io/blob/main/image/%EB%AF%BC%EC%96%91%20%ED%85%8C%ED%81%AC.png?raw=true" : profileImage,
    author_link: "../@whoasked",
    image: index >= 11 ? "/image/ixo-engine/export.png" : bannerImage
  }));
}

function issuesData(locale) {
  const rows = {
    "en-us": [
      ["CMR-0001: Camera object placement issue", "A saved object could still be detected as being on the board after being moved through the camera workflow."],
      ["CMR-0002: Camera object reload issue", "Some objects saved through Camera could not be opened or restored reliably."],
      ["IXO-0001: Canvas Builder editing issue", "UI elements built in Canvas Builder sometimes could not be selected or edited after generation."]
    ],
    "ja-jp": [
      ["CMR-0001: Camera オブジェクト配置問題", "Camera の保存処理後、移動したオブジェクトがまだボード上にあると検出される場合がありました。"],
      ["CMR-0002: Camera オブジェクト再読込問題", "Camera で保存した一部オブジェクトが安定して開けない、または復元できない場合がありました。"],
      ["IXO-0001: Canvas Builder 編集問題", "Canvas Builder で作成した UI が選択または編集できない場合がありました。"]
    ],
    "zh-cn": [
      ["CMR-0001: Camera 对象位置问题", "通过 Camera 流程保存并移动对象后，系统仍可能判断它位于板面上。"],
      ["CMR-0002: Camera 对象重新加载问题", "通过 Camera 保存的部分对象无法稳定打开或恢复。"],
      ["IXO-0001: Canvas Builder 编辑问题", "Canvas Builder 生成的 UI 元素有时无法选择或编辑。"]
    ],
    "ru-ru": [
      ["CMR-0001: проблема размещения объекта Camera", "После сохранения объект мог по-прежнему определяться как находящийся на доске."],
      ["CMR-0002: проблема повторной загрузки Camera", "Некоторые объекты, сохраненные через Camera, не открывались или не восстанавливались стабильно."],
      ["IXO-0001: проблема редактирования Canvas Builder", "UI-элементы, созданные в Canvas Builder, иногда нельзя было выбрать или изменить."]
    ],
    "de-de": [
      ["CMR-0001: Camera-Objektplatzierung", "Nach dem Speichern konnte ein verschobenes Objekt weiterhin als auf dem Board erkannt werden."],
      ["CMR-0002: Camera-Objekt-Reload", "Einige über Camera gespeicherte Objekte konnten nicht zuverlässig geöffnet oder wiederhergestellt werden."],
      ["IXO-0001: Canvas-Builder-Editierproblem", "In Canvas Builder erzeugte UI-Elemente konnten teilweise nicht ausgewählt oder bearbeitet werden."]
    ]
  }[locale];
  return rows.map(([title, content], index) => ({
    id: index + 1,
    date: index < 2 ? "2026-04-19" : "2026-05-10",
    title,
    content: `# ${title}\n\n${content}\n\nStatus: ${index === 2 ? "Fixed" : "Tracked"}`,
    author_name: "@Whoasked",
    author_img: profileImage,
    author_link: "../@whoasked",
    image: bannerImage
  }));
}

function portfolioData(locale) {
  const text = {
    "en-us": [
      ["IXO Engine", "A visual node-based app builder for creating practical desktop apps without writing every line of code by hand. The work includes network security policy, Canvas Builder, scenes, asset management, export polish, and documentation."],
      ["MinyangTech Website", "A GitHub Pages based website that gathers docs, news, apps, portfolio entries, policies, and project information for MinyangTech."]
    ],
    "ja-jp": [
      ["IXO Engine", "すべてのコードを手書きしなくても実用的なデスクトップアプリを作れる、ビジュアルノード型アプリビルダーです。ネットワーク安全ポリシー、Canvas Builder、Scene、Asset 管理、Export 改善、文書化を含みます。"],
      ["MinyangTech Website", "MinyangTech の Docs、News、Apps、Portfolio、Policy、プロジェクト情報を集約する GitHub Pages ベースのサイトです。"]
    ],
    "zh-cn": [
      ["IXO Engine", "一款可视化节点式应用构建器，让用户无需逐行手写代码即可创建实用桌面应用。工作内容包含网络安全策略、Canvas Builder、场景、资源管理、导出优化和文档。"],
      ["MinyangTech Website", "基于 GitHub Pages 的网站，用于集中展示 MinyangTech 的文档、新闻、应用、作品集、政策和项目信息。"]
    ],
    "ru-ru": [
      ["IXO Engine", "Визуальный node-based builder для практических desktop-приложений без ручного написания каждой строки кода. Включает сетевую безопасность, Canvas Builder, сцены, ресурсы, экспорт и документацию."],
      ["MinyangTech Website", "Сайт на GitHub Pages, объединяющий документы, новости, приложения, портфолио, политики и информацию о проектах MinyangTech."]
    ],
    "de-de": [
      ["IXO Engine", "Ein visueller Node-App-Builder für praktische Desktop-Apps, ohne jede Codezeile von Hand zu schreiben. Enthalten sind Netzwerksicherheit, Canvas Builder, Szenen, Asset Management, Export-Polish und Dokumentation."],
      ["MinyangTech Website", "Eine GitHub-Pages-Website, die Dokumente, News, Apps, Portfolio, Richtlinien und Projektinformationen von MinyangTech bündelt."]
    ]
  }[locale];
  return text.map(([title, content], index) => ({
    id: index + 1,
    date: index === 0 ? "2026-05-22" : "2026-05-15",
    title,
    author_name: index === 0 ? "@whoasked" : "whoasked",
    author_img: profileImage,
    author_link: "../@whoasked",
    cover: index === 0 ? "https://github.com/minyang-tech/IXO-Engine/blob/main/screenshot/export.png?raw=true" : bannerImage,
    content,
    assets: index === 0 ? [
      { type: "image", src: "https://github.com/minyang-tech/IXO-Engine/blob/main/screenshot/export.png?raw=true" },
      { type: "file", src: "https://github.com/minyang-tech/IXO-Engine", title: "IXO Engine GitHub", description: "Repository and release management." }
    ] : []
  }));
}

function docsMarkdown(locale) {
  const docs = {
    "en-us": {
      main: `# IXO Engine\n\nIXO Engine is a visual node-based app builder for creating desktop apps with nodes, scenes, assets, actions, and UI panels.\n\n## What it does\n\n- Build flows with visual nodes.\n- Design UI with Canvas Builder and UI Viewer.\n- Use scenes, variables, assets, and actions to make practical apps.\n- Export Windows and Linux builds with a cleaner runtime surface.\n\n## Safety model\n\nNetwork-family nodes require creator consent. HTTPS is enforced, local/private network access is blocked by policy, URLs are masked in logs, and risky actions are routed through the same approval model.\n\n## Platform support\n\nWindows and Linux are supported for app usage and export verification. macOS desktop app support is currently not provided.\n`,
      nodes: `# Node Library\n\nThis page summarizes IXO Engine nodes and their current purpose.\n\n| Category | Examples | Status |\n|---|---|---|\n| Core | Start, If/Else, Join Data, Script | Stable / Preview |\n| Control | Delay, Repeat, Message Send/Receive, Scene Start | Preview |\n| Visual | Text, Image, Input Field, Button, UI Text, UI Image | Stable / Preview |\n| Data | Global Variable, Local Variable, Constant | Stable / Preview |\n| Network | HTTPS Request, Browser Open | Stable with security policy |\n| System | System Info, Audio, File Watcher | Stable / Permission-gated |\n| Logic | Math, Comparison, AND/OR/NOT | Stable / Preview |\n| Utility | Random, Timer, Date, Text Length, RGB to HEX | Stable |\n\n## Notes\n\nRuntime behavior is kept compatible unless a severe bug or security issue requires a change. Newly added nodes should be documented with permission behavior, inputs, outputs, and export impact.\n`,
      grammar: `# Template Grammar\n\nIXO templates insert values from previous nodes into text.\n\n## Basic form\n\nUse double braces:\n\n\`Hello, {{username}}\`\n\nIf the context has \`username = "Alex"\`, the result is \`Hello, Alex\`.\n\n## Conditions\n\nConditions support \`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`, \`AND\`, and \`OR\`.\n\nExample:\n\n\`{{score}} >= 60 AND {{name}} != ""\`\n\n## Safety\n\nTemplate values are treated as data. Do not paste secrets, tokens, or passwords into untrusted scripts or network actions.\n`,
      privacy: `# Network Node Privacy Policy\n\nIXO Engine provides network-family nodes such as HTTPS Request and Browser Open. These nodes are disabled until the project creator consents.\n\n## What can be processed\n\nA project may contain URLs, request settings, labels, and node metadata entered by the creator. MinyangTech does not operate the external servers contacted by a user's project.\n\n## User responsibility\n\nDo not send passwords, tokens, personal information, or sensitive data to untrusted endpoints. Check the destination before running or exporting network-enabled projects.\n\n## Safety controls\n\nIXO Engine enforces HTTPS, blocks localhost/private network targets, applies timeouts, masks URLs in logs, and records a non-visible safety signal in exported builds when network consent was granted.\n`
    },
    "ja-jp": {
      main: `# IXO Engine\n\nIXO Engine は、ノード、Scene、Asset、Action、UI パネルを使ってデスクトップアプリを作成するビジュアルノード型アプリビルダーです。\n\n## できること\n\n- ビジュアルノードで処理フローを作成します。\n- Canvas Builder と UI Viewer で UI を設計します。\n- Scene、変数、Asset、Action を使って実用的なアプリを作れます。\n- Windows と Linux 向けに、編集画面の痕跡を減らしたランタイムを export できます。\n\n## 安全モデル\n\nネットワーク系ノードは制作者の同意が必要です。HTTPS を強制し、localhost / プライベートネットワークをブロックし、ログでは URL をマスクします。危険な Action も同じ承認ポリシーを通ります。\n\n## 対応プラットフォーム\n\nアプリ利用と export 検証は Windows / Linux 中心です。macOS デスクトップアプリは現在サポートしていません。\n`,
      nodes: `# Node Library\n\nこのページは IXO Engine のノードと現在の役割をまとめたものです。\n\n| カテゴリ | 例 | 状態 |\n|---|---|---|\n| Core | Start, If/Else, Join Data, Script | Stable / Preview |\n| Control | Delay, Repeat, Message Send/Receive, Scene Start | Preview |\n| Visual | Text, Image, Input Field, Button, UI Text, UI Image | Stable / Preview |\n| Data | Global Variable, Local Variable, Constant | Stable / Preview |\n| Network | HTTPS Request, Browser Open | セキュリティポリシー付き Stable |\n| System | System Info, Audio, File Watcher | Stable / Permission-gated |\n| Logic | Math, Comparison, AND/OR/NOT | Stable / Preview |\n| Utility | Random, Timer, Date, Text Length, RGB to HEX | Stable |\n\n## 注意\n\n重大なバグまたはセキュリティ問題がない限り、ランタイム互換性を維持します。新しいノードは権限、入力、出力、export への影響を文書化してください。\n`,
      grammar: `# Template Grammar\n\nIXO のテンプレートは、前のノードの値をテキストへ挿入します。\n\n## 基本形\n\n二重波括弧を使います。\n\n\`Hello, {{username}}\`\n\ncontext に \`username = "Alex"\` があれば、結果は \`Hello, Alex\` になります。\n\n## 条件式\n\n\`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`, \`AND\`, \`OR\` をサポートします。\n\n例:\n\n\`{{score}} >= 60 AND {{name}} != ""\`\n\n## 安全性\n\nテンプレート値はデータとして扱われます。秘密情報、トークン、パスワードを信頼できない Script や Network Action に入れないでください。\n`,
      privacy: `# ネットワークノードのプライバシーポリシー\n\nIXO Engine は HTTPS Request や Browser Open などのネットワーク系ノードを提供します。これらはプロジェクト制作者が同意するまで無効です。\n\n## 処理される可能性がある情報\n\nプロジェクトには、制作者が入力した URL、リクエスト設定、ラベル、ノードメタデータが含まれる場合があります。MinyangTech はユーザーのプロジェクトが接続する外部サーバーを運営していません。\n\n## 利用者の責任\n\nパスワード、トークン、個人情報、機密情報を信頼できない宛先に送信しないでください。ネットワーク機能付きプロジェクトを実行または export する前に送信先を確認してください。\n\n## 安全制御\n\nIXO Engine は HTTPS を強制し、localhost / プライベートネットワークを遮断し、timeout を適用し、ログの URL をマスクします。ネットワーク同意済みの export には、見えない安全信号を記録します。\n`
    },
    "zh-cn": {
      main: `# IXO Engine\n\nIXO Engine 是一款可视化节点式应用构建器，可用节点、场景、资源、动作和 UI 面板创建桌面应用。\n\n## 功能\n\n- 用可视化节点构建流程。\n- 通过 Canvas Builder 和 UI Viewer 设计界面。\n- 使用场景、变量、资源和动作制作实用应用。\n- 导出 Windows 与 Linux 构建，并尽量移除编辑器痕迹。\n\n## 安全模型\n\n网络类节点需要创作者同意。系统强制 HTTPS，阻止 localhost / 私有网络访问，在日志中遮蔽 URL，危险动作也会经过同一审批策略。\n\n## 平台支持\n\n应用使用与导出验证以 Windows / Linux 为主。目前不提供 macOS 桌面应用支持。\n`,
      nodes: `# Node Library\n\n本页总结 IXO Engine 节点及其当前用途。\n\n| 分类 | 示例 | 状态 |\n|---|---|---|\n| Core | Start, If/Else, Join Data, Script | Stable / Preview |\n| Control | Delay, Repeat, Message Send/Receive, Scene Start | Preview |\n| Visual | Text, Image, Input Field, Button, UI Text, UI Image | Stable / Preview |\n| Data | Global Variable, Local Variable, Constant | Stable / Preview |\n| Network | HTTPS Request, Browser Open | 带安全策略的 Stable |\n| System | System Info, Audio, File Watcher | Stable / Permission-gated |\n| Logic | Math, Comparison, AND/OR/NOT | Stable / Preview |\n| Utility | Random, Timer, Date, Text Length, RGB to HEX | Stable |\n\n## 说明\n\n除非出现严重错误或安全问题，否则运行时兼容性会尽量保持。新增节点应记录权限行为、输入、输出以及对 export 的影响。\n`,
      grammar: `# Template Grammar\n\nIXO 模板可将前序节点的值插入文本。\n\n## 基本形式\n\n使用双大括号：\n\n\`Hello, {{username}}\`\n\n如果 context 中有 \`username = "Alex"\`，结果就是 \`Hello, Alex\`。\n\n## 条件\n\n支持 \`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`, \`AND\`, \`OR\`。\n\n示例：\n\n\`{{score}} >= 60 AND {{name}} != ""\`\n\n## 安全\n\n模板值会作为数据处理。不要把密码、令牌或个人信息放入不可信脚本或网络动作中。\n`,
      privacy: `# 网络节点隐私政策\n\nIXO Engine 提供 HTTPS Request、Browser Open 等网络类节点。项目创作者同意前，这些节点保持禁用。\n\n## 可能处理的信息\n\n项目可能包含创作者输入的 URL、请求设置、标签和节点元数据。MinyangTech 不运营用户项目访问的外部服务器。\n\n## 用户责任\n\n不要向不可信端点发送密码、令牌、个人信息或敏感数据。运行或导出含网络功能的项目之前，请检查目标地址。\n\n## 安全控制\n\nIXO Engine 强制 HTTPS，阻止 localhost / 私有网络目标，应用超时，遮蔽日志中的 URL，并在已同意网络功能的导出构建中记录不可见的安全信号。\n`
    },
    "ru-ru": {
      main: `# IXO Engine\n\nIXO Engine — визуальный node-based builder для создания desktop-приложений с узлами, сценами, ресурсами, действиями и UI-панелями.\n\n## Возможности\n\n- Сборка логики визуальными узлами.\n- Проектирование UI через Canvas Builder и UI Viewer.\n- Сцены, переменные, ресурсы и действия для практических приложений.\n- Экспорт Windows и Linux сборок с более чистым runtime-интерфейсом.\n\n## Модель безопасности\n\nСетевые узлы требуют согласия создателя проекта. HTTPS обязателен, localhost и приватные сети блокируются политикой, URL маскируются в логах, а рискованные действия проходят тот же механизм разрешений.\n\n## Поддержка платформ\n\nИспользование и export проверяются в основном на Windows и Linux. Desktop-поддержка macOS сейчас не предоставляется.\n`,
      nodes: `# Node Library\n\nЭта страница описывает узлы IXO Engine и их текущую роль.\n\n| Категория | Примеры | Статус |\n|---|---|---|\n| Core | Start, If/Else, Join Data, Script | Stable / Preview |\n| Control | Delay, Repeat, Message Send/Receive, Scene Start | Preview |\n| Visual | Text, Image, Input Field, Button, UI Text, UI Image | Stable / Preview |\n| Data | Global Variable, Local Variable, Constant | Stable / Preview |\n| Network | HTTPS Request, Browser Open | Stable с политикой безопасности |\n| System | System Info, Audio, File Watcher | Stable / Permission-gated |\n| Logic | Math, Comparison, AND/OR/NOT | Stable / Preview |\n| Utility | Random, Timer, Date, Text Length, RGB to HEX | Stable |\n\n## Примечания\n\nRuntime-совместимость сохраняется, если нет критической ошибки или уязвимости. Новые узлы должны документировать права, входы, выходы и влияние на export.\n`,
      grammar: `# Template Grammar\n\nШаблоны IXO вставляют значения предыдущих узлов в текст.\n\n## Базовая форма\n\nИспользуйте двойные фигурные скобки:\n\n\`Hello, {{username}}\`\n\nЕсли в context есть \`username = "Alex"\`, результат будет \`Hello, Alex\`.\n\n## Условия\n\nПоддерживаются \`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`, \`AND\`, \`OR\`.\n\nПример:\n\n\`{{score}} >= 60 AND {{name}} != ""\`\n\n## Безопасность\n\nЗначения шаблонов считаются данными. Не вставляйте секреты, токены или пароли в недоверенные скрипты или сетевые действия.\n`,
      privacy: `# Политика приватности сетевых узлов\n\nIXO Engine предоставляет сетевые узлы, например HTTPS Request и Browser Open. Они отключены, пока создатель проекта не даст согласие.\n\n## Что может обрабатываться\n\nПроект может содержать URL, настройки запросов, подписи и метаданные узлов, введенные создателем. MinyangTech не управляет внешними серверами, к которым обращается проект пользователя.\n\n## Ответственность пользователя\n\nНе отправляйте пароли, токены, персональные или чувствительные данные на недоверенные endpoints. Проверяйте адрес перед запуском или export проекта с сетевыми функциями.\n\n## Защитные меры\n\nIXO Engine требует HTTPS, блокирует localhost и приватные сети, применяет timeouts, маскирует URL в логах и записывает невидимый safety signal в export-сборках, если согласие на сеть было дано.\n`
    },
    "de-de": {
      main: `# IXO Engine\n\nIXO Engine ist ein visueller Node-App-Builder zum Erstellen von Desktop-Apps mit Nodes, Szenen, Assets, Actions und UI-Panels.\n\n## Funktionen\n\n- Abläufe mit visuellen Nodes bauen.\n- UI mit Canvas Builder und UI Viewer entwerfen.\n- Szenen, Variablen, Assets und Actions für praktische Apps nutzen.\n- Windows- und Linux-Builds mit saubererer Runtime-Oberfläche exportieren.\n\n## Sicherheitsmodell\n\nNetzwerk-Nodes benötigen die Zustimmung des Erstellers. HTTPS wird erzwungen, localhost/private Netzwerke werden blockiert, URLs in Logs maskiert und riskante Actions laufen durch dieselbe Berechtigungslogik.\n\n## Plattformunterstützung\n\nApp-Nutzung und Export werden primär auf Windows und Linux geprüft. macOS-Desktop-App-Support wird derzeit nicht angeboten.\n`,
      nodes: `# Node Library\n\nDiese Seite fasst IXO-Engine-Nodes und ihren aktuellen Zweck zusammen.\n\n| Kategorie | Beispiele | Status |\n|---|---|---|\n| Core | Start, If/Else, Join Data, Script | Stable / Preview |\n| Control | Delay, Repeat, Message Send/Receive, Scene Start | Preview |\n| Visual | Text, Image, Input Field, Button, UI Text, UI Image | Stable / Preview |\n| Data | Global Variable, Local Variable, Constant | Stable / Preview |\n| Network | HTTPS Request, Browser Open | Stable mit Sicherheitsrichtlinie |\n| System | System Info, Audio, File Watcher | Stable / Permission-gated |\n| Logic | Math, Comparison, AND/OR/NOT | Stable / Preview |\n| Utility | Random, Timer, Date, Text Length, RGB to HEX | Stable |\n\n## Hinweise\n\nRuntime-Verhalten bleibt kompatibel, außer ein schwerer Bug oder eine Sicherheitslücke erfordert eine Änderung. Neue Nodes sollten Berechtigungen, Eingaben, Ausgaben und Export-Auswirkungen dokumentieren.\n`,
      grammar: `# Template Grammar\n\nIXO-Templates fügen Werte vorheriger Nodes in Text ein.\n\n## Grundform\n\nNutze doppelte geschweifte Klammern:\n\n\`Hello, {{username}}\`\n\nWenn context \`username = "Alex"\` enthält, wird daraus \`Hello, Alex\`.\n\n## Bedingungen\n\nUnterstützt werden \`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`, \`AND\`, \`OR\`.\n\nBeispiel:\n\n\`{{score}} >= 60 AND {{name}} != ""\`\n\n## Sicherheit\n\nTemplate-Werte sind Daten. Füge keine Secrets, Tokens oder Passwörter in nicht vertrauenswürdige Scripts oder Netzwerk-Actions ein.\n`,
      privacy: `# Datenschutzrichtlinie für Netzwerk-Nodes\n\nIXO Engine bietet Netzwerk-Nodes wie HTTPS Request und Browser Open. Diese bleiben deaktiviert, bis der Projektersteller zustimmt.\n\n## Mögliche Daten\n\nEin Projekt kann URLs, Request-Einstellungen, Labels und Node-Metadaten enthalten, die der Ersteller eingibt. MinyangTech betreibt nicht die externen Server, die ein Nutzerprojekt kontaktiert.\n\n## Verantwortung des Nutzers\n\nSende keine Passwörter, Tokens, personenbezogenen oder sensiblen Daten an nicht vertrauenswürdige Endpunkte. Prüfe das Ziel, bevor du netzwerkfähige Projekte ausführst oder exportierst.\n\n## Schutzmaßnahmen\n\nIXO Engine erzwingt HTTPS, blockiert localhost/private Netzwerkziele, setzt Timeouts, maskiert URLs in Logs und speichert ein unsichtbares Safety Signal in exportierten Builds, wenn Netzwerkzustimmung gegeben wurde.\n`
    }
  };
  return docs[locale];
}

function docsNav(locale) {
  const text = {
    "en-us": ["Overview", "Node Library", "Template Grammar", "Network Privacy", "IXO File Inspector"],
    "ja-jp": ["概要", "Node Library", "Template Grammar", "ネットワークプライバシー", "IXO ファイル検査"],
    "zh-cn": ["概览", "Node Library", "Template Grammar", "网络隐私", "IXO 文件检查"],
    "ru-ru": ["Обзор", "Node Library", "Template Grammar", "Сетевая приватность", "Проверка IXO-файла"],
    "de-de": ["Überblick", "Node Library", "Template Grammar", "Netzwerk-Datenschutz", "IXO-Datei prüfen"]
  }[locale];
  return `<ul>
  <li><a href="${p(locale, "/docs/ixo/index.html")}">${text[0]}</a></li>
  <li><a href="${p(locale, "/docs/ixo/nodes.html")}">${text[1]}</a></li>
  <li><a href="${p(locale, "/docs/ixo/grammar.html")}">${text[2]}</a></li>
  <li><a href="${p(locale, "/docs/ixo/privacy.html")}">${text[3]}</a></li>
  <li><a href="${p(locale, "/ixo.html")}">${text[4]}</a></li>
</ul>
`;
}

function translationMenuJs() {
  return `(function () {
  "use strict";

  const localeOrder = ["ko", "ja-jp", "en-us", "zh-cn", "ru-ru", "de-de"];
  const localeMeta = {
    ko: { label: "한국어", button: "번역", htmlLang: "ko" },
    "ja-jp": { label: "日本語", button: "翻訳", htmlLang: "ja" },
    "en-us": { label: "English", button: "Translate", htmlLang: "en" },
    "zh-cn": { label: "中文", button: "翻译", htmlLang: "zh-CN" },
    "ru-ru": { label: "Русский", button: "Перевести", htmlLang: "ru" },
    "de-de": { label: "Deutsch", button: "Übersetzen", htmlLang: "de" }
  };
  const prefixedLocales = localeOrder.filter((locale) => locale !== "ko");

  function getRouteInfo() {
    const rawPath = window.location.pathname || "/";
    const parts = rawPath.split("/").filter(Boolean);
    const activeLocale = prefixedLocales.includes(parts[0]) ? parts[0] : "ko";
    const baseParts = activeLocale === "ko" ? parts : parts.slice(1);
    let basePath = "/" + baseParts.join("/");
    if (basePath === "/") basePath = "/index.html";
    return { activeLocale, basePath };
  }

  function isExcludedPath(basePath) {
    const normalized = basePath.toLowerCase();
    return normalized === "/index.html" || normalized.startsWith("/g/");
  }

  function buildLocalizedHref(locale, basePath) {
    return locale === "ko" ? basePath : "/" + locale + basePath;
  }

  function ensureStyle() {
    if (document.getElementById("site-translation-menu-style")) return;
    const style = document.createElement("style");
    style.id = "site-translation-menu-style";
    style.textContent = \`
      .language-menu { position: relative; display: inline-flex; z-index: 1200; }
      .language-menu-button {
        min-height: 34px;
        padding: 0 12px;
        border: 1px solid var(--brd, rgba(255,255,255,0.2));
        border-radius: 999px;
        background: var(--card-bg, var(--bg, #fff));
        color: var(--txt, currentColor);
        font-weight: 800;
        cursor: pointer;
      }
      .language-menu-list {
        position: absolute;
        top: calc(100% + 8px);
        right: 0;
        min-width: 180px;
        display: none;
        padding: 8px;
        border: 1px solid var(--brd, rgba(255,255,255,0.2));
        border-radius: 16px;
        background: var(--card-bg, var(--bg, #fff));
        box-shadow: 0 18px 45px rgba(0,0,0,0.2);
      }
      .language-menu:hover .language-menu-list,
      .language-menu:focus-within .language-menu-list { display: grid; gap: 4px; }
      .language-menu-list a {
        padding: 8px 10px;
        border-radius: 10px;
        color: var(--txt, currentColor);
        text-decoration: none;
        font-weight: 800;
        white-space: nowrap;
      }
      .language-menu-list a:hover,
      .language-menu-list a.active {
        background: color-mix(in srgb, var(--accent, #007bff) 14%, transparent);
        color: var(--accent, #007bff);
      }
    \`;
    document.head.appendChild(style);
  }

  function ensureControls(header) {
    const existing = header.querySelector(".controls");
    if (existing) return existing;
    const controls = document.createElement("div");
    controls.className = "controls";
    header.appendChild(controls);
    return controls;
  }

  function localizeCommonNavigation(activeLocale) {
    const labels = {
      ko: { docs: "Docs", news: "News", apps: "Apps", eula: "EULA", issues: "Issues", portfolio: "Portfolio", policy: "Policy", contributing: "Contributing" },
      "ja-jp": { docs: "ドキュメント", news: "ニュース", apps: "アプリ", eula: "EULA", issues: "課題", portfolio: "ポートフォリオ", policy: "ポリシー", contributing: "Contributing" },
      "en-us": { docs: "Docs", news: "News", apps: "Apps", eula: "EULA", issues: "Issues", portfolio: "Portfolio", policy: "Policy", contributing: "Contributing" },
      "zh-cn": { docs: "文档", news: "新闻", apps: "应用", eula: "EULA", issues: "问题", portfolio: "作品集", policy: "政策", contributing: "Contributing" },
      "ru-ru": { docs: "Документы", news: "Новости", apps: "Приложения", eula: "EULA", issues: "Задачи", portfolio: "Портфолио", policy: "Политика", contributing: "Contributing" },
      "de-de": { docs: "Dokumente", news: "News", apps: "Apps", eula: "EULA", issues: "Issues", portfolio: "Portfolio", policy: "Richtlinie", contributing: "Contributing" }
    }[activeLocale] || {};
    document.querySelectorAll(".nav-links a, header nav a").forEach((link) => {
      const href = (link.getAttribute("href") || "").toLowerCase();
      if (href.includes("/docs")) link.textContent = labels.docs || link.textContent;
      if (href.includes("/news")) link.textContent = labels.news || link.textContent;
      if (href.includes("/apps")) link.textContent = labels.apps || link.textContent;
      if (href.includes("/eula")) link.textContent = labels.eula || link.textContent;
      if (href.includes("/issues")) link.textContent = labels.issues || link.textContent;
      if (href.includes("/portfolio")) link.textContent = labels.portfolio || link.textContent;
      if (href.includes("/policy")) link.textContent = labels.policy || link.textContent;
      if (href.includes("/contributing")) link.textContent = labels.contributing || link.textContent;
    });
  }

  function mountMenu() {
    const { activeLocale, basePath } = getRouteInfo();
    if (isExcludedPath(basePath)) return;
    document.documentElement.lang = localeMeta[activeLocale]?.htmlLang || "ko";
    localizeCommonNavigation(activeLocale);
    const header = document.querySelector("header");
    if (!header || header.querySelector(".language-menu")) return;
    ensureStyle();
    const menu = document.createElement("div");
    menu.className = "language-menu";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "language-menu-button";
    button.textContent = localeMeta[activeLocale]?.button || "번역";
    button.setAttribute("aria-haspopup", "true");
    const list = document.createElement("div");
    list.className = "language-menu-list";
    localeOrder.forEach((locale) => {
      const link = document.createElement("a");
      link.href = buildLocalizedHref(locale, basePath);
      link.textContent = localeMeta[locale].label;
      link.lang = localeMeta[locale].htmlLang;
      if (locale === activeLocale) {
        link.className = "active";
        link.setAttribute("aria-current", "page");
      }
      list.appendChild(link);
    });
    menu.append(button, list);
    ensureControls(header).appendChild(menu);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountMenu);
  } else {
    mountMenu();
  }
})();
`;
}

function writeListPage(locale, kind, filePath, opts) {
  const meta = localeMeta[locale];
  const localUi = uiText(locale);
  const hash = opts.hash;
  const labels = meta.common;
  const detailLabels = {
    app: { heading: opts.heading, subheading: opts.subheading },
    news: { heading: opts.heading, subheading: opts.subheading },
    issues: { heading: opts.heading, subheading: opts.subheading },
    portfolio: { heading: opts.heading, subheading: opts.subheading }
  }[kind];
  const scripts = `${markdownScripts()}
  <script>
    const labels = ${JSON.stringify(labels)};
    const kind = ${JSON.stringify(kind)};
    const dataUrl = ${JSON.stringify(opts.dataUrl)};
    const expectedHash = ${JSON.stringify(hash)};
    let records = [];
    const listUi = document.getElementById("list-ui");
    const detailUi = document.getElementById("detail-ui");
    const feed = document.getElementById("feed");
    const detailBody = document.getElementById("detail-body");
    const search = document.getElementById("search");
    const sort = document.getElementById("sort");
    async function loadData() {
      try {
        records = await SiteSecurity.secureFetchJson(dataUrl, expectedHash);
        const params = new URLSearchParams(location.search);
        const id = params.get("id");
        if (id) showDetail(id); else renderList();
      } catch (error) {
        console.error(error);
        SiteSecurity.appendTextMessage(feed, labels.loadError);
      }
    }
    function renderList() {
      listUi.style.display = "block";
      detailUi.style.display = "none";
      const query = (search.value || "").toLowerCase();
      const ordered = [...records].filter((item) => [item.name, item.title, item.short_desc, item.content, item.category].filter(Boolean).join(" ").toLowerCase().includes(query));
      ordered.sort((a, b) => sort.value === "oldest" ? a.id - b.id : b.id - a.id);
      feed.replaceChildren();
      if (!ordered.length) {
        SiteSecurity.appendTextMessage(feed, labels.noResults);
        return;
      }
      ordered.forEach((item) => {
        const card = document.createElement("article");
        card.className = "item-card";
        card.addEventListener("click", () => showDetail(item.id));
        const img = document.createElement("img");
        img.src = SiteSecurity.safeUrl(item.image || item.cover || "${defaultImage}");
        img.alt = item.name || item.title || "";
        const body = document.createElement("div");
        body.className = "body";
        const tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = item.category || item.date || "MinyangTech";
        const title = document.createElement("h2");
        title.textContent = item.name || item.title || "";
        const desc = document.createElement("p");
        desc.className = "muted";
        desc.textContent = item.short_desc || String(item.content || "").replace(/[#*_>]/g, "").slice(0, 140);
        body.append(tag, title, desc);
        card.append(img, body);
        feed.appendChild(card);
      });
    }
    function showDetail(id) {
      const item = records.find((entry) => String(entry.id) === String(id));
      if (!item) return;
      listUi.style.display = "none";
      detailUi.style.display = "block";
      detailBody.replaceChildren();
      const title = document.createElement("h1");
      title.textContent = item.name || item.title || "";
      const layout = document.createElement("div");
      layout.className = "grid";
      const left = document.createElement("div");
      left.className = "card";
      const image = document.createElement("img");
      image.className = "thumb";
      image.style.height = "260px";
      image.src = SiteSecurity.safeUrl(item.image || item.cover || "${defaultImage}");
      image.alt = item.name || item.title || "";
      const content = document.createElement("div");
      content.className = "markdown";
      SiteSecurity.setMarkdown(content, item.description || item.content || "");
      left.append(image, content);
      if (Array.isArray(item.screenshots) && item.screenshots.length) {
        const gallery = document.createElement("div");
        gallery.className = "grid";
        const heading = document.createElement("h2");
        heading.textContent = labels.screenshots;
        left.appendChild(heading);
        item.screenshots.forEach((src) => {
          const shot = document.createElement("img");
          shot.className = "thumb";
          shot.src = SiteSecurity.safeUrl(src);
          shot.alt = labels.screenshots;
          gallery.appendChild(shot);
        });
        left.appendChild(gallery);
      }
      const right = document.createElement("aside");
      right.className = "card";
      const table = document.createElement("table");
      table.className = "spec-table";
      const rows = kind === "app"
        ? [[labels.releaseDate, item.release_date], [labels.platform, item.platform], [labels.minSpec, item.min_spec], [labels.recSpec, item.rec_spec], [labels.openSource, item.is_opensource ? ${JSON.stringify(localUi.yes)} : ${JSON.stringify(localUi.no)}]]
        : [[${JSON.stringify(localUi.date)}, item.date], [${JSON.stringify(localUi.author)}, item.author_name || "MinyangTech"]];
      rows.forEach(([name, value]) => {
        const row = table.insertRow();
        const th = document.createElement("th");
        th.textContent = name;
        const td = document.createElement("td");
        td.textContent = value || "";
        row.append(th, td);
      });
      right.appendChild(table);
      if (item.source_url) {
        const source = document.createElement("a");
        source.className = "button";
        source.href = SiteSecurity.safeUrl(item.source_url);
        source.target = "_blank";
        source.rel = "noopener";
        source.textContent = labels.source;
        right.appendChild(source);
      }
      if (item.download_url) {
        const dl = document.createElement("a");
        dl.className = "button";
        dl.style.marginLeft = "8px";
        dl.href = SiteSecurity.safeUrl(item.download_url);
        dl.target = "_blank";
        dl.rel = "noopener";
        dl.textContent = labels.download;
        right.appendChild(dl);
      }
      layout.append(left, right);
      detailBody.append(title, layout);
      if (!location.search.includes("id=" + id)) history.pushState(null, "", "?id=" + id);
      scrollTo(0, 0);
    }
    function closeDetail() {
      history.pushState(null, "", location.pathname);
      renderList();
    }
    window.closeDetail = closeDetail;
    window.onpopstate = () => {
      const id = new URLSearchParams(location.search).get("id");
      if (id) showDetail(id); else renderList();
    };
    search.addEventListener("input", renderList);
    sort.addEventListener("change", renderList);
    loadData();
  </script>`;
  write(path.join(root, locale, filePath), pageHtml(locale, {
    title: detailLabels.heading,
    active: opts.active,
    extraHead: markdownScripts(),
    main: `<main class="page">
  <section class="hero">
    <h1>${esc(detailLabels.heading)}</h1>
    <p>${esc(detailLabels.subheading)}</p>
  </section>
  <section id="list-ui">
    <div class="filter-container">
      <div class="search-box"><input id="search" type="text" placeholder="${esc(meta.common.search)}"></div>
      <select id="sort" class="sort-select">
        <option value="newest">${esc(meta.common.newest)}</option>
        <option value="oldest">${esc(meta.common.oldest)}</option>
      </select>
    </div>
    <div id="feed" class="list-grid"></div>
  </section>
  <section id="detail-ui" class="detail">
    <button class="primary" type="button" onclick="closeDetail()"><i class="fa-solid fa-arrow-left"></i> ${esc(meta.common.back)}</button>
    <div id="detail-body" style="margin-top:24px;"></div>
  </section>
</main>`,
    scripts
  }));
}

function staticText(locale) {
  return {
    "en-us": {
      docsTitle: "MinyangTech Docs",
      docsSubtitle: "Official documentation hub for MinyangTech projects.",
      inspectorTitle: "Inspect IXO files",
      inspectorDesc: "Inspect safety signals embedded in .ixo projects or exported IXO apps locally in your browser.",
      intro: "This page gathers official documents for MinyangTech products and projects.",
      mainDocs: "Main documents",
      updatePolicy: "Update policy",
      updatePolicyValue: "Updated gradually based on each project source and release state.",
      contact: "Contact",
      cTitle: "C Project Docs",
      cDesc: "Reference page for C-language experiments and notes maintained by MinyangTech.",
      macTitle: "MAC Project Docs",
      macDesc: "Game/project documentation archive. The app is not a macOS support notice.",
      vovTitle: "VOV Project Docs",
      vovDesc: "Documentation area for VOV project planning, usage notes, and release notes.",
      contributing: "Contribution Policy",
      eula: "End User License Agreement",
      policy: "Nawo Bot Privacy Policy",
      artist: "Recruiting artists for a non-profit Stellive fan-game project",
      findLead: "We are looking for artists who want to help build a small fan-game with care and enthusiasm.",
      author: "Organizer",
      apply: "Contact and apply",
      ixoInspector: "IXO Safety Signal Inspector"
    },
    "ja-jp": {
      docsTitle: "MinyangTech ドキュメント",
      docsSubtitle: "MinyangTech プロジェクトの公式ドキュメントハブです。",
      inspectorTitle: "IXO ファイルを検査",
      inspectorDesc: ".ixo プロジェクトまたは export された IXO アプリの安全信号を、ブラウザ内でローカルに確認できます。",
      intro: "このページは MinyangTech の製品とプロジェクトに関する公式ドキュメントをまとめています。",
      mainDocs: "主要ドキュメント",
      updatePolicy: "更新方針",
      updatePolicyValue: "各プロジェクトのソースとリリース状況に合わせて順次更新します。",
      contact: "問い合わせ",
      cTitle: "C プロジェクト Docs",
      cDesc: "MinyangTech が管理する C 言語実験とメモの参照ページです。",
      macTitle: "MAC プロジェクト Docs",
      macDesc: "ゲーム/プロジェクトのドキュメントアーカイブです。macOS 対応案内ではありません。",
      vovTitle: "VOV プロジェクト Docs",
      vovDesc: "VOV プロジェクトの計画、利用メモ、リリースノートを整理するページです。",
      contributing: "コントリビューション方針",
      eula: "エンドユーザーライセンス契約",
      policy: "Nawo Bot プライバシーポリシー",
      artist: "非営利 Stellive ファンゲームのアーティスト募集",
      findLead: "愛情を込めた小さなファンゲーム制作を手伝ってくれるアーティストを募集しています。",
      author: "進行者",
      apply: "問い合わせ・応募",
      ixoInspector: "IXO 安全信号検査"
    },
    "zh-cn": {
      docsTitle: "MinyangTech 文档",
      docsSubtitle: "MinyangTech 项目的官方文档中心。",
      inspectorTitle: "检查 IXO 文件",
      inspectorDesc: "在浏览器本地检查 .ixo 项目或导出的 IXO 应用中嵌入的安全信号。",
      intro: "本页汇总 MinyangTech 产品与项目的官方文档。",
      mainDocs: "主要文档",
      updatePolicy: "更新方式",
      updatePolicyValue: "根据各项目源码与发布状态逐步更新。",
      contact: "联系",
      cTitle: "C 项目文档",
      cDesc: "MinyangTech 维护的 C 语言实验与笔记参考页。",
      macTitle: "MAC 项目文档",
      macDesc: "游戏/项目文档归档。本页不是 macOS 支持说明。",
      vovTitle: "VOV 项目文档",
      vovDesc: "用于整理 VOV 项目计划、使用说明与发布记录的页面。",
      contributing: "贡献方针",
      eula: "最终用户许可协议",
      policy: "Nawo Bot 隐私政策",
      artist: "招募非营利 Stellive 粉丝游戏美术协作者",
      findLead: "我们正在寻找愿意一起制作小型粉丝游戏的美术协作者。",
      author: "负责人",
      apply: "咨询与申请",
      ixoInspector: "IXO 安全信号检查"
    },
    "ru-ru": {
      docsTitle: "Документы MinyangTech",
      docsSubtitle: "Официальный центр документации проектов MinyangTech.",
      inspectorTitle: "Проверить IXO-файл",
      inspectorDesc: "Локально в браузере проверить safety signals внутри .ixo проектов или экспортированных IXO-приложений.",
      intro: "Эта страница объединяет официальные документы продуктов и проектов MinyangTech.",
      mainDocs: "Основные документы",
      updatePolicy: "Политика обновлений",
      updatePolicyValue: "Обновляется постепенно на основе исходников и релизов каждого проекта.",
      contact: "Контакт",
      cTitle: "Документы C-проекта",
      cDesc: "Справочная страница для C-экспериментов и заметок MinyangTech.",
      macTitle: "Документы MAC-проекта",
      macDesc: "Архив документации игры/проекта. Это не страница поддержки macOS.",
      vovTitle: "Документы VOV-проекта",
      vovDesc: "Раздел для планов, заметок и релизов VOV.",
      contributing: "Правила участия",
      eula: "Лицензионное соглашение",
      policy: "Политика приватности Nawo Bot",
      artist: "Набор художников для некоммерческой фан-игры Stellive",
      findLead: "Мы ищем художников, которые хотят вместе сделать небольшую фан-игру с вниманием и энтузиазмом.",
      author: "Организатор",
      apply: "Связь и заявка",
      ixoInspector: "Проверка safety signal IXO"
    },
    "de-de": {
      docsTitle: "MinyangTech Dokumente",
      docsSubtitle: "Offizieller Dokumentationshub für MinyangTech-Projekte.",
      inspectorTitle: "IXO-Dateien prüfen",
      inspectorDesc: "Safety Signals in .ixo-Projekten oder exportierten IXO-Apps lokal im Browser prüfen.",
      intro: "Diese Seite bündelt offizielle Dokumente zu MinyangTech-Produkten und Projekten.",
      mainDocs: "Wichtige Dokumente",
      updatePolicy: "Update-Prinzip",
      updatePolicyValue: "Wird schrittweise anhand von Projektquellen und Releases aktualisiert.",
      contact: "Kontakt",
      cTitle: "C-Projekt Docs",
      cDesc: "Referenzseite für C-Sprach-Experimente und Notizen von MinyangTech.",
      macTitle: "MAC-Projekt Docs",
      macDesc: "Dokumentationsarchiv für ein Spiel/Projekt. Dies ist kein macOS-Supporthinweis.",
      vovTitle: "VOV-Projekt Docs",
      vovDesc: "Bereich für VOV-Planung, Hinweise und Release Notes.",
      contributing: "Beitragsrichtlinie",
      eula: "Endbenutzer-Lizenzvertrag",
      policy: "Nawo Bot Datenschutzrichtlinie",
      artist: "Artists für ein gemeinnütziges Stellive-Fangame gesucht",
      findLead: "Wir suchen Artists, die mit Freude an einem kleinen Fangame mitarbeiten möchten.",
      author: "Organisator",
      apply: "Kontakt und Bewerbung",
      ixoInspector: "IXO Safety Signal Inspector"
    }
  }[locale];
}

function uiText(locale) {
  return {
    "en-us": {
      date: "Date",
      author: "Author",
      yes: "Yes",
      no: "No",
      overview: "Overview",
      status: "Status",
      menuError: "Unable to load menu.",
      docError: "Unable to load document.",
      thanks: "Thank you for using MinyangTech.",
      contact: "Contact",
      safetyBullets: ["Local-only inspection", "No upload", "No execution", "Secret values are intentionally not displayed"]
    },
    "ja-jp": {
      date: "日付",
      author: "作成者",
      yes: "はい",
      no: "いいえ",
      overview: "概要",
      status: "状態",
      menuError: "メニューを読み込めませんでした。",
      docError: "ドキュメントを読み込めませんでした。",
      thanks: "MinyangTech をご利用いただきありがとうございます。",
      contact: "問い合わせ",
      safetyBullets: ["ローカル検査のみ", "アップロードなし", "実行なし", "秘密情報は意図的に表示しません"]
    },
    "zh-cn": {
      date: "日期",
      author: "作者",
      yes: "是",
      no: "否",
      overview: "概览",
      status: "状态",
      menuError: "无法加载菜单。",
      docError: "无法加载文档。",
      thanks: "感谢使用 MinyangTech。",
      contact: "联系",
      safetyBullets: ["仅本地检查", "不会上传", "不会执行", "不会显示敏感值"]
    },
    "ru-ru": {
      date: "Дата",
      author: "Автор",
      yes: "Да",
      no: "Нет",
      overview: "Обзор",
      status: "Статус",
      menuError: "Не удалось загрузить меню.",
      docError: "Не удалось загрузить документ.",
      thanks: "Спасибо за использование MinyangTech.",
      contact: "Контакт",
      safetyBullets: ["Только локальная проверка", "Без загрузки на сервер", "Без выполнения файла", "Секретные значения намеренно не отображаются"]
    },
    "de-de": {
      date: "Datum",
      author: "Autor",
      yes: "Ja",
      no: "Nein",
      overview: "Überblick",
      status: "Status",
      menuError: "Menü konnte nicht geladen werden.",
      docError: "Dokument konnte nicht geladen werden.",
      thanks: "Vielen Dank für die Nutzung von MinyangTech.",
      contact: "Kontakt",
      safetyBullets: ["Nur lokale Prüfung", "Kein Upload", "Keine Ausführung", "Geheime Werte werden bewusst nicht angezeigt"]
    }
  }[locale];
}

function translatedPolicies(locale) {
  return {
    "en-us": {
      contributingLead: "This standard policy applies to MinyangTech open-source projects.",
      contributing: [
        ["Allowed contributions", `<p>Pull Requests are welcome for bug fixes, documentation, UI/UX improvements, performance work, and new nodes that match the project direction.</p>`],
        ["Rejected contributions", `<ul><li>Malicious or obfuscated code</li><li>Features unrelated to the project direction</li><li>Excessive dependencies</li><li>Code with license conflicts</li></ul>`],
        ["How to contribute", `<pre><code>npm install\nnpm run dev</code></pre><ol><li>Fork the repository.</li><li>Create a branch.</li><li>Commit your changes.</li><li>Open a Pull Request.</li></ol>`],
        ["Documentation", `<p>Documentation contributions should be sent to the MinyangTech website repository under the Docs area.</p>`]
      ],
      eulaLead: "This document explains the common usage terms for MinyangTech software and games.",
      eula: [
        ["Scope", `<p>The EULA applies to MinyangTech software, games, documentation, and related downloadable materials unless a separate license is provided.</p>`],
        ["Usage", `<p>You may use the software within the permitted scope. Do not redistribute modified builds in a way that misleads users or violates copyright.</p>`],
        ["Fan works and content", `<p>Respect the rights of original creators, third-party IP owners, and platform policies when using or modifying project outputs.</p>`],
        ["Disclaimer", `<p>The software is provided as-is to the maximum extent permitted by applicable law. Use experimental builds carefully and keep backups of important data.</p>`],
        ["Contact", `<p>support@minyangtech.n-e.kr</p>`]
      ],
      policyLead: "This policy explains how the Nawo Discord bot handles basic service data.",
      policy: [
        ["Collected data", `<p>The bot may process Discord IDs, server IDs, command input, and temporary interaction data needed to provide requested features.</p>`],
        ["Purpose", `<p>Data is used only to provide bot functions such as statistics, polls, status checks, and mini games.</p>`],
        ["Retention", `<p>Temporary data is minimized where possible. Contact support for removal requests related to bot usage.</p>`],
        ["Contact", `<p>support@minyangtech.n-e.kr</p>`]
      ],
      find: [
        ["Project", `<p>This is a non-profit fan-game project inspired by Stellive. It is planned for distribution through the Stellive Naver fan cafe. The target play style is a 2D side-scrolling game similar to classic platformers, with an estimated play time of 10 to 15 minutes.</p>`],
        ["Organizer", `<p><a href="https://minyangtech.n-e.kr/@whoasked">@Whoasked</a></p>`],
        ["Recruiting", `<p>We are looking for help with 2D graphics, illustration, UI, and other art tasks. Because this is a student-led fan project, monetary compensation is not currently available.</p>`],
        ["Contact and apply", `<p>If interested, please email <a href="mailto:support@minyangtech.n-e.kr?subject=%5BFan%20Game%20Artist%20Application%5D">support@minyangtech.n-e.kr</a>. Please include your Discord nickname, available art fields, sample work or portfolio, and available contact time.</p>`]
      ]
    },
    "ja-jp": {
      contributingLead: "この標準方針は MinyangTech のオープンソースプロジェクトに適用されます。",
      contributing: [
        ["貢献できる内容", `<p>バグ修正、ドキュメント、UI/UX 改善、性能改善、プロジェクト方針に合う新規ノードの Pull Request を歓迎します。</p>`],
        ["Merge が拒否される内容", `<ul><li>悪意あるコードまたは難読化コード</li><li>プロジェクト方針と無関係な機能</li><li>過度な依存関係の追加</li><li>ライセンス衝突の可能性があるコード</li></ul>`],
        ["貢献方法", `<pre><code>npm install\nnpm run dev</code></pre><ol><li>リポジトリを Fork します。</li><li>ブランチを作成します。</li><li>変更を Commit します。</li><li>Pull Request を作成します。</li></ol>`],
        ["ドキュメント", `<p>ドキュメントへの貢献は、MinyangTech ウェブサイトのリポジトリで Docs 領域を修正して Pull Request を送ってください。</p>`]
      ],
      eulaLead: "この文書は MinyangTech のソフトウェアおよびゲームに共通して適用される利用条件を説明します。",
      eula: [
        ["適用範囲", `<p>別途ライセンスが提示されない限り、MinyangTech のソフトウェア、ゲーム、ドキュメント、関連ダウンロード物に適用されます。</p>`],
        ["利用条件", `<p>許可された範囲で利用できます。ユーザーを誤認させる改変版の再配布や、著作権を侵害する利用は禁止されます。</p>`],
        ["ファン作品とコンテンツ", `<p>プロジェクト出力物を利用または改変する場合、原作者、第三者 IP 保有者、各プラットフォームの規約を尊重してください。</p>`],
        ["免責", `<p>法令で許される最大範囲で、ソフトウェアは現状有姿で提供されます。実験的ビルドの利用時は重要データを必ずバックアップしてください。</p>`],
        ["問い合わせ", `<p>support@minyangtech.n-e.kr</p>`]
      ],
      policyLead: "このポリシーは Nawo Discord Bot が基本的なサービスデータを扱う方法を説明します。",
      policy: [
        ["収集されるデータ", `<p>Bot は Discord ID、サーバー ID、コマンド入力、機能提供に必要な一時的な対話データを処理する場合があります。</p>`],
        ["目的", `<p>データは統計、投票、状態確認、ミニゲームなど Bot 機能の提供にのみ利用されます。</p>`],
        ["保存期間", `<p>一時データは可能な限り最小化します。削除要請はサポートへご連絡ください。</p>`],
        ["問い合わせ", `<p>support@minyangtech.n-e.kr</p>`]
      ],
      find: [
        ["プロジェクト", `<p>Stellive へのファン心から進めている非営利ファンゲームです。Stellive の Naver ファンカフェを通じた配布を予定しています。プレイスタイルはクラシックな 2D 横スクロールアクションに近く、想定プレイ時間は 10〜15 分です。</p>`],
        ["進行者", `<p><a href="https://minyangtech.n-e.kr/@whoasked">@Whoasked</a></p>`],
        ["募集分野", `<p>2D グラフィック、イラスト、UI などのアート作業を手伝ってくださる方を探しています。学生個人開発のファンプロジェクトのため、金銭的報酬は現在用意できません。</p>`],
        ["問い合わせ・応募", `<p>興味がある方は <a href="mailto:support@minyangtech.n-e.kr?subject=%5BFan%20Game%20Artist%20Application%5D">support@minyangtech.n-e.kr</a> へご連絡ください。Discord ニックネーム、可能な作業分野、ポートフォリオまたはサンプル、連絡可能な時間を必ず記載してください。</p>`]
      ]
    },
    "zh-cn": {
      contributingLead: "本标准方针适用于 MinyangTech 的开源项目。",
      contributing: [
        ["可贡献内容", `<p>欢迎提交修复错误、完善文档、改进 UI/UX、优化性能，以及符合项目方向的新节点 Pull Request。</p>`],
        ["可能被拒绝的内容", `<ul><li>恶意代码或混淆代码</li><li>与项目方向无关的功能</li><li>过度增加依赖</li><li>可能产生许可证冲突的代码</li></ul>`],
        ["贡献方法", `<pre><code>npm install\nnpm run dev</code></pre><ol><li>Fork 仓库。</li><li>创建分支。</li><li>提交修改。</li><li>创建 Pull Request。</li></ol>`],
        ["文档", `<p>如需贡献文档，请在 MinyangTech 网站仓库的 Docs 区域进行修改并提交 Pull Request。</p>`]
      ],
      eulaLead: "本文说明 MinyangTech 软件与游戏通用的使用条款。",
      eula: [
        ["适用范围", `<p>除非另有单独许可证，本 EULA 适用于 MinyangTech 软件、游戏、文档及相关下载材料。</p>`],
        ["使用", `<p>你可以在允许范围内使用软件。不得以误导用户或侵犯版权的方式重新分发修改版本。</p>`],
        ["粉丝作品与内容", `<p>使用或修改项目产物时，请尊重原作者、第三方 IP 权利人以及平台政策。</p>`],
        ["免责声明", `<p>在适用法律允许的最大范围内，软件按现状提供。使用实验性构建时请谨慎，并备份重要数据。</p>`],
        ["联系", `<p>support@minyangtech.n-e.kr</p>`]
      ],
      policyLead: "本政策说明 Nawo Discord Bot 如何处理基础服务数据。",
      policy: [
        ["收集的数据", `<p>Bot 可能处理 Discord ID、服务器 ID、命令输入以及提供功能所需的临时交互数据。</p>`],
        ["用途", `<p>数据仅用于提供统计、投票、状态检查和小游戏等 Bot 功能。</p>`],
        ["保留", `<p>临时数据会尽量最小化。若需删除与 Bot 使用相关的数据，请联系支持邮箱。</p>`],
        ["联系", `<p>support@minyangtech.n-e.kr</p>`]
      ],
      find: [
        ["项目", `<p>这是一个以 Stellive 粉丝心意为基础的非营利粉丝游戏项目，计划通过 Stellive Naver 粉丝咖啡发布。玩法目标接近经典 2D 横版平台游戏，预计游玩时间为 10 到 15 分钟。</p>`],
        ["负责人", `<p><a href="https://minyangtech.n-e.kr/@whoasked">@Whoasked</a></p>`],
        ["招募内容", `<p>我们正在寻找可参与 2D 图形、插画、UI 等美术工作的协作者。由于这是学生个人开发的粉丝项目，目前无法提供金钱报酬。</p>`],
        ["咨询与申请", `<p>有兴趣请发送邮件至 <a href="mailto:support@minyangtech.n-e.kr?subject=%5BFan%20Game%20Artist%20Application%5D">support@minyangtech.n-e.kr</a>。请务必附上 Discord 昵称、可参与领域、作品集或示例图，以及方便联系的时间。</p>`]
      ]
    },
    "ru-ru": {
      contributingLead: "Эта стандартная политика применяется к open-source проектам MinyangTech.",
      contributing: [
        ["Что можно вносить", `<p>Приветствуются Pull Request с исправлениями, документацией, улучшениями UI/UX, оптимизацией производительности и новыми узлами, соответствующими направлению проекта.</p>`],
        ["Что может быть отклонено", `<ul><li>Вредоносный или обфусцированный код</li><li>Функции вне направления проекта</li><li>Чрезмерные зависимости</li><li>Код с возможным конфликтом лицензий</li></ul>`],
        ["Как внести вклад", `<pre><code>npm install\nnpm run dev</code></pre><ol><li>Сделайте Fork репозитория.</li><li>Создайте ветку.</li><li>Закоммитьте изменения.</li><li>Откройте Pull Request.</li></ol>`],
        ["Документация", `<p>Изменения документации отправляйте Pull Request в репозиторий сайта MinyangTech в раздел Docs.</p>`]
      ],
      eulaLead: "Документ объясняет общие условия использования ПО и игр MinyangTech.",
      eula: [
        ["Область действия", `<p>Если не указана отдельная лицензия, EULA применяется к ПО, играм, документации и связанным загружаемым материалам MinyangTech.</p>`],
        ["Использование", `<p>ПО можно использовать в разрешенных пределах. Нельзя распространять измененные сборки так, чтобы вводить пользователей в заблуждение или нарушать авторские права.</p>`],
        ["Фан-работы и контент", `<p>При использовании или изменении результатов проекта уважайте права оригинальных авторов, владельцев сторонних IP и правила платформ.</p>`],
        ["Отказ от гарантий", `<p>В максимально разрешенной законом степени ПО предоставляется как есть. Используйте экспериментальные сборки осторожно и храните резервные копии важных данных.</p>`],
        ["Контакт", `<p>support@minyangtech.n-e.kr</p>`]
      ],
      policyLead: "Политика объясняет, как Nawo Discord Bot обрабатывает базовые сервисные данные.",
      policy: [
        ["Собираемые данные", `<p>Bot может обрабатывать Discord ID, ID сервера, ввод команд и временные данные взаимодействий, необходимые для функций.</p>`],
        ["Цель", `<p>Данные используются только для функций Bot: статистика, опросы, проверки статуса и мини-игры.</p>`],
        ["Хранение", `<p>Временные данные минимизируются, насколько возможно. Для запросов на удаление обратитесь в поддержку.</p>`],
        ["Контакт", `<p>support@minyangtech.n-e.kr</p>`]
      ],
      find: [
        ["Проект", `<p>Это некоммерческая фан-игра, вдохновленная Stellive. Планируется распространение через Naver fan cafe Stellive. Стиль игры — 2D-платформер в духе классических side-scrolling игр, ожидаемое время прохождения 10–15 минут.</p>`],
        ["Организатор", `<p><a href="https://minyangtech.n-e.kr/@whoasked">@Whoasked</a></p>`],
        ["Кого ищем", `<p>Нужна помощь с 2D-графикой, иллюстрациями, UI и другими art-задачами. Это студенческий фан-проект, поэтому денежное вознаграждение сейчас недоступно.</p>`],
        ["Связь и заявка", `<p>Если интересно, напишите на <a href="mailto:support@minyangtech.n-e.kr?subject=%5BFan%20Game%20Artist%20Application%5D">support@minyangtech.n-e.kr</a>. Обязательно укажите Discord nickname, возможные направления работы, портфолио или примеры и удобное время связи.</p>`]
      ]
    },
    "de-de": {
      contributingLead: "Diese Standardrichtlinie gilt für Open-Source-Projekte von MinyangTech.",
      contributing: [
        ["Mögliche Beiträge", `<p>Pull Requests für Bugfixes, Dokumentation, UI/UX-Verbesserungen, Performance und neue Nodes, die zur Projektrichtung passen, sind willkommen.</p>`],
        ["Ablehnungsgründe", `<ul><li>Bösartiger oder obfuskierter Code</li><li>Funktionen ohne Bezug zur Projektrichtung</li><li>Übermäßige Abhängigkeiten</li><li>Code mit möglichen Lizenzkonflikten</li></ul>`],
        ["Beitragen", `<pre><code>npm install\nnpm run dev</code></pre><ol><li>Repository forken.</li><li>Branch erstellen.</li><li>Änderungen committen.</li><li>Pull Request öffnen.</li></ol>`],
        ["Dokumentation", `<p>Beiträge zur Dokumentation bitte im MinyangTech-Website-Repository im Docs-Bereich als Pull Request einreichen.</p>`]
      ],
      eulaLead: "Dieses Dokument beschreibt gemeinsame Nutzungsbedingungen für Software und Spiele von MinyangTech.",
      eula: [
        ["Geltungsbereich", `<p>Sofern keine separate Lizenz angegeben ist, gilt die EULA für MinyangTech-Software, Spiele, Dokumentation und zugehörige Downloads.</p>`],
        ["Nutzung", `<p>Die Software darf im erlaubten Umfang genutzt werden. Geänderte Builds dürfen nicht irreführend oder urheberrechtsverletzend weitergegeben werden.</p>`],
        ["Fanwerke und Inhalte", `<p>Beim Nutzen oder Ändern von Projektergebnissen sind Rechte ursprünglicher Urheber, Dritt-IP-Inhaber und Plattformregeln zu beachten.</p>`],
        ["Haftungsausschluss", `<p>Soweit gesetzlich zulässig, wird die Software wie besehen bereitgestellt. Experimentelle Builds vorsichtig nutzen und wichtige Daten sichern.</p>`],
        ["Kontakt", `<p>support@minyangtech.n-e.kr</p>`]
      ],
      policyLead: "Diese Richtlinie erklärt, wie der Nawo Discord Bot grundlegende Servicedaten verarbeitet.",
      policy: [
        ["Erfasste Daten", `<p>Der Bot kann Discord IDs, Server IDs, Befehlseingaben und temporäre Interaktionsdaten verarbeiten, die für angeforderte Funktionen nötig sind.</p>`],
        ["Zweck", `<p>Daten werden nur für Bot-Funktionen wie Statistiken, Umfragen, Statusprüfungen und Mini-Games verwendet.</p>`],
        ["Aufbewahrung", `<p>Temporäre Daten werden möglichst minimiert. Löschanfragen bitte an den Support richten.</p>`],
        ["Kontakt", `<p>support@minyangtech.n-e.kr</p>`]
      ],
      find: [
        ["Projekt", `<p>Dies ist ein gemeinnütziges Fan-Game-Projekt, inspiriert von Stellive. Die Verteilung ist über das Stellive Naver Fan Cafe geplant. Der Spielstil ist ein 2D-Side-Scroller ähnlich klassischen Plattformern, mit einer erwarteten Spielzeit von 10 bis 15 Minuten.</p>`],
        ["Organisator", `<p><a href="https://minyangtech.n-e.kr/@whoasked">@Whoasked</a></p>`],
        ["Gesucht", `<p>Gesucht wird Unterstützung für 2D-Grafik, Illustration, UI und andere Art-Aufgaben. Da es ein studentisches Fanprojekt ist, ist derzeit keine finanzielle Vergütung möglich.</p>`],
        ["Kontakt und Bewerbung", `<p>Bei Interesse bitte an <a href="mailto:support@minyangtech.n-e.kr?subject=%5BFan%20Game%20Artist%20Application%5D">support@minyangtech.n-e.kr</a> schreiben. Bitte Discord-Nickname, mögliche Arbeitsbereiche, Portfolio oder Beispiele und erreichbare Zeiten angeben.</p>`]
      ]
    }
  }[locale];
}

function article(locale, title, lead, sections) {
  return `<main class="page">
  <section class="hero"><h1>${esc(title)}</h1><p>${esc(lead)}</p></section>
  <article class="card markdown">
    ${sections.map((section) => `<h2>${esc(section[0])}</h2>${section[1]}`).join("\n")}
  </article>
</main>`;
}

function localizedStaticPages(locale) {
  const s = staticText(locale);
  const localUi = uiText(locale);
  const policies = translatedPolicies(locale);
  const docsMain = `<main class="page docs-layout">
  <aside class="docs-sidebar">
    <ul>
      <li><a class="active" href="#overview">${esc(s.docsTitle)}</a></li>
      <li><a href="${p(locale, "/ixo.html")}">${esc(s.inspectorTitle)}</a></li>
      <li><a href="${p(locale, "/docs/ixo/index.html")}">IXO Engine</a></li>
      <li><a href="${p(locale, "/docs/ixo/nodes.html")}">Node Library</a></li>
    </ul>
  </aside>
  <article>
    <section class="hero">
      <h1>${esc(s.docsTitle)}</h1>
      <p>${esc(s.docsSubtitle)}</p>
    </section>
    <section class="card">
      <h2><a href="${p(locale, "/ixo.html")}">${esc(s.inspectorTitle)}</a></h2>
      <p class="muted">${esc(s.inspectorDesc)}</p>
      <a class="button" href="${p(locale, "/ixo.html")}">${esc(localeMeta[locale].common.open)}</a>
    </section>
    <section class="card" style="margin-top:18px;">
      <h2>${esc(s.mainDocs)}</h2>
      <table class="spec-table">
        <tr><th>IXO Engine</th><td><a href="${p(locale, "/docs/ixo/index.html")}">IXO Engine</a>, <a href="${p(locale, "/docs/ixo/nodes.html")}">Node Library</a>, <a href="${p(locale, "/docs/ixo/grammar.html")}">Template Grammar</a></td></tr>
        <tr><th>${esc(s.updatePolicy)}</th><td>${esc(s.updatePolicyValue)}</td></tr>
        <tr><th>${esc(s.contact)}</th><td>support@minyangtech.n-e.kr</td></tr>
      </table>
    </section>
  </article>
</main>`;
  write(path.join(root, locale, "docs/index.html"), pageHtml(locale, { title: s.docsTitle, active: "docs", main: docsMain }));

  const simpleDocs = [
    ["docs/C/index.html", s.cTitle, s.cDesc],
    ["docs/MAC/gs.html", s.macTitle, s.macDesc],
    ["docs/VOV/index.html", s.vovTitle, s.vovDesc]
  ];
  simpleDocs.forEach(([file, title, desc]) => {
    write(path.join(root, locale, file), pageHtml(locale, {
      title,
      active: "docs",
      main: article(locale, title, desc, [
        [localUi.overview, `<p>${esc(desc)}</p>`],
        [localUi.status, `<p class="muted">${esc(staticText(locale).updatePolicyValue)}</p>`]
      ])
    }));
  });

  write(path.join(root, locale, "Contributing.html"), pageHtml(locale, {
    title: s.contributing,
    active: "contributing",
    main: article(locale, s.contributing, policies.contributingLead, policies.contributing)
  }));

  write(path.join(root, locale, "eula.html"), pageHtml(locale, {
    title: s.eula,
    active: "eula",
    main: article(locale, s.eula, policies.eulaLead, policies.eula)
  }));

  write(path.join(root, locale, "policy.html"), pageHtml(locale, {
    title: s.policy,
    active: "docs",
    main: article(locale, s.policy, policies.policyLead, policies.policy)
  }));

  write(path.join(root, locale, "find/stelrunartist.html"), pageHtml(locale, {
    title: s.artist,
    active: "docs",
    main: article(locale, s.artist, s.findLead, policies.find)
  }));
}

function writeProfilePages(locale, portfolioHash) {
  const common = localeMeta[locale].common;
  const s = {
    "en-us": ["Developer and maintainer of MinyangTech projects.", "Portfolio by @whoasked", "No portfolio entries yet."],
    "ja-jp": ["MinyangTech プロジェクトの開発・管理者です。", "@whoasked のポートフォリオ", "まだポートフォリオがありません。"],
    "zh-cn": ["MinyangTech 项目的开发与维护者。", "@whoasked 的作品集", "暂无作品。"],
    "ru-ru": ["Разработчик и сопровождающий проектов MinyangTech.", "Портфолио @whoasked", "Портфолио пока пусто."],
    "de-de": ["Entwickler und Maintainer von MinyangTech-Projekten.", "Portfolio von @whoasked", "Noch keine Portfolio-Einträge."]
  }[locale];
  const scripts = `${markdownScripts()}
  <script>
    async function loadPortfolio() {
      const target = document.getElementById("portfolio-target");
      try {
        const data = await SiteSecurity.secureFetchJson("portfolio.json", "${portfolioHash}");
        const items = data.filter((item) => String(item.author_name || "").toLowerCase().includes("whoasked"));
        target.replaceChildren();
        if (!items.length) {
          SiteSecurity.appendTextMessage(target, ${JSON.stringify(s[2])});
          return;
        }
        items.forEach((item) => {
          const card = document.createElement("article");
          card.className = "card";
          const h = document.createElement("h3");
          h.textContent = item.title;
          const p = document.createElement("p");
          p.className = "muted";
          p.textContent = item.content;
          card.append(h, p);
          target.appendChild(card);
        });
      } catch (error) {
        SiteSecurity.appendTextMessage(target, ${JSON.stringify(common.loadError)});
      }
    }
    loadPortfolio();
  </script>`;
  write(path.join(root, locale, "@whoasked.html"), pageHtml(locale, {
    title: "@whoasked",
    active: "portfolio",
    extraHead: markdownScripts(),
    main: `<main class="page">
  <section class="hero"><h1>@whoasked</h1><p>${esc(s[0])}</p></section>
  <section class="grid">
    <article class="card"><img src="${profileImage}" alt="@whoasked" class="thumb"><h2>@whoasked</h2><p class="muted">${esc(s[0])}</p></article>
    <article class="card"><h2>${esc(s[1])}</h2><div id="portfolio-target" class="grid"></div></article>
  </section>
</main>`,
    scripts
  }));
  const getSystem = {
    "en-us": "Project contributor account connected to earlier MinyangTech development records.",
    "ja-jp": "初期の MinyangTech 開発記録に関連するプロジェクト協力者アカウントです。",
    "zh-cn": "与早期 MinyangTech 开发记录相关的项目协作者账号。",
    "ru-ru": "Аккаунт участника, связанный с ранними записями разработки MinyangTech.",
    "de-de": "Mit früheren MinyangTech-Entwicklungsnotizen verbundenes Mitwirkendenkonto."
  }[locale];
  write(path.join(root, locale, "@getsystemmetrics.html"), pageHtml(locale, {
    title: "@getsystemmetrics",
    active: "portfolio",
    main: `<main class="page"><section class="hero"><h1>@getsystemmetrics</h1><p>${esc(getSystem)}</p></section><article class="card"><p>${esc(getSystem)}</p></article></main>`
  }));
}

function write404(locale) {
  const text = {
    "en-us": ["Page not found", "The page you requested does not exist or has moved.", "Go to Docs"],
    "ja-jp": ["ページが見つかりません", "リクエストされたページは存在しないか、移動されました。", "Docs へ移動"],
    "zh-cn": ["页面未找到", "请求的页面不存在或已移动。", "前往文档"],
    "ru-ru": ["Страница не найдена", "Запрошенная страница не существует или была перемещена.", "К документам"],
    "de-de": ["Seite nicht gefunden", "Die angeforderte Seite existiert nicht oder wurde verschoben.", "Zu den Dokumenten"]
  }[locale];
  write(path.join(root, locale, "404.html"), pageHtml(locale, {
    title: text[0],
    active: "docs",
    main: `<main class="page"><section class="hero"><h1>404</h1><p>${esc(text[1])}</p></section><a class="button" href="${p(locale, "/docs/index.html")}">${esc(text[2])}</a></main>`
  }));
}

function writeIxoInspector(locale) {
  const s = staticText(locale);
  const localUi = uiText(locale);
  const tableHead = {
    "en-us": ["Scope", "Node", "Group", "Created"],
    "ja-jp": ["範囲", "ノード", "分類", "作成時刻"],
    "zh-cn": ["范围", "节点", "分类", "创建时间"],
    "ru-ru": ["Область", "Узел", "Группа", "Создано"],
    "de-de": ["Bereich", "Node", "Gruppe", "Erstellt"]
  }[locale];
  const t = {
    "en-us": ["Drop a .ixo or .exe file here", "Supported: .ixo, .exe, .json / max 250MB / local inspection only", "Select file", "No file inspected yet.", "Network consent", "Released at", "Nodes", "Signal status", "No node signal yet.", "File is too large. Please use a file up to 250MB.", "Reading locally. No upload is performed.", "No IXO safety signal was found.", "Inspection complete."],
    "ja-jp": [".ixo または .exe ファイルをここへドロップ", "対応: .ixo, .exe, .json / 最大 250MB / ローカル検査のみ", "ファイル選択", "まだ検査したファイルはありません。", "ネットワーク同意", "リリース日時", "ノード", "信号状態", "ノード信号はまだありません。", "ファイルが大きすぎます。250MB 以下のファイルを使用してください。", "ローカルで読み込み中です。アップロードは行われません。", "IXO 安全信号が見つかりませんでした。", "検査が完了しました。"],
    "zh-cn": ["将 .ixo 或 .exe 文件拖到这里", "支持: .ixo, .exe, .json / 最大 250MB / 仅本地检查", "选择文件", "尚未检查文件。", "网络同意", "发布日期", "节点", "信号状态", "尚无节点信号。", "文件过大。请使用 250MB 以下的文件。", "正在本地读取，不会上传。", "未找到 IXO 安全信号。", "检查完成。"],
    "ru-ru": ["Перетащите сюда .ixo или .exe", "Поддержка: .ixo, .exe, .json / до 250MB / только локально", "Выбрать файл", "Файл еще не проверялся.", "Согласие на сеть", "Дата релиза", "Узлы", "Статус сигнала", "Сигналов узлов пока нет.", "Файл слишком большой. Используйте файл до 250MB.", "Чтение выполняется локально. Загрузка не выполняется.", "IXO safety signal не найден.", "Проверка завершена."],
    "de-de": ["Eine .ixo- oder .exe-Datei hier ablegen", "Unterstützt: .ixo, .exe, .json / max. 250MB / nur lokale Prüfung", "Datei auswählen", "Noch keine Datei geprüft.", "Netzwerk-Zustimmung", "Veröffentlicht am", "Nodes", "Signalstatus", "Noch kein Node-Signal.", "Datei ist zu groß. Bitte eine Datei bis 250MB verwenden.", "Wird lokal gelesen. Kein Upload.", "Kein IXO Safety Signal gefunden.", "Prüfung abgeschlossen."]
  }[locale];
  const scripts = `
  <script>
    const MAX_FILE_SIZE = 250 * 1024 * 1024;
    const text = ${JSON.stringify(t)};
    const dropZone = document.getElementById("dropZone");
    const fileInput = document.getElementById("fileInput");
    const statusBox = document.getElementById("status");
    const consentValue = document.getElementById("consentValue");
    const releaseValue = document.getElementById("releaseValue");
    const nodeCountValue = document.getElementById("nodeCountValue");
    const signalValue = document.getElementById("signalValue");
    const nodeOutput = document.getElementById("nodeOutput");
    function setStatus(type, message) {
      statusBox.className = "card " + (type || "");
      statusBox.textContent = message;
    }
    function clean(value, fallback = "-") {
      return String(value || fallback).replace(/[<>\\u0000-\\u001f]/g, "").slice(0, 160);
    }
    function findMatchingBrace(text, startIndex) {
      let depth = 0, inString = false, escape = false;
      for (let index = startIndex; index < text.length; index += 1) {
        const char = text[index];
        if (escape) { escape = false; continue; }
        if (char === "\\\\") { escape = true; continue; }
        if (char === "\\"") { inString = !inString; continue; }
        if (inString) continue;
        if (char === "{") depth += 1;
        if (char === "}") {
          depth -= 1;
          if (depth === 0) return index;
        }
      }
      return -1;
    }
    function extractObjectNear(raw, token) {
      const tokenIndex = raw.indexOf(token);
      if (tokenIndex < 0) return null;
      let start = tokenIndex;
      while (start >= 0 && raw[start] !== "{") start -= 1;
      while (start >= 0) {
        const end = findMatchingBrace(raw, start);
        if (end > tokenIndex) {
          try { return JSON.parse(raw.slice(start, end + 1)); } catch {}
        }
        start -= 1;
        while (start >= 0 && raw[start] !== "{") start -= 1;
      }
      return null;
    }
    function normalize(project) {
      const signal = project?._ixoBuildSignal || project || {};
      const consent = signal.networkNodeCreatorConsent || project?.securityConsent?.networkNodes || {};
      const nodeSignals = Array.isArray(signal.nodeSignals) ? signal.nodeSignals : [];
      return {
        consented: Boolean(consent.consented || consent.creatorConsented),
        releasedAt: signal.releasedAt || signal.generatedAt || project?.savedAt || "-",
        version: signal.signalVersion || "-",
        nodes: nodeSignals.map((node) => ({
          scope: clean(node.scope, "workspace"),
          label: clean(node.label, "Unknown Node"),
          type: clean(node.type, "unknown"),
          group: clean(node.group, "unknown"),
          insertedAt: clean(node.insertedAt, "-")
        }))
      };
    }
    function extract(raw) {
      try { return normalize(JSON.parse(raw)); } catch {}
      const direct = extractObjectNear(raw, "\\"_ixoBuildSignal\\"") || extractObjectNear(raw, "\\"nodeSignals\\"");
      return direct ? normalize(direct) : null;
    }
    function render(signal) {
      consentValue.textContent = signal.consented ? "Yes" : "No";
      releaseValue.textContent = signal.releasedAt || "-";
      nodeCountValue.textContent = String(signal.nodes.length);
      signalValue.textContent = signal.version === "-" ? "Project" : "v" + signal.version;
      if (!signal.nodes.length) {
        nodeOutput.textContent = text[8];
        return;
      }
      const table = document.createElement("table");
      table.className = "spec-table";
      table.innerHTML = ${JSON.stringify(`<thead><tr><th>${tableHead[0]}</th><th>${tableHead[1]}</th><th>${tableHead[2]}</th><th>${tableHead[3]}</th></tr></thead>`)};
      const tbody = document.createElement("tbody");
      signal.nodes.forEach((node) => {
        const row = tbody.insertRow();
        [node.scope, node.label + " / " + node.type, node.group, node.insertedAt].forEach((value) => {
          const td = row.insertCell();
          td.textContent = value;
        });
      });
      table.appendChild(tbody);
      nodeOutput.replaceChildren(table);
    }
    async function inspect(file) {
      if (!file) return;
      if (file.size > MAX_FILE_SIZE) {
        setStatus("error", text[9]);
        return;
      }
      setStatus("warn", text[10]);
      const raw = new TextDecoder("utf-8", { fatal: false }).decode(await file.arrayBuffer());
      const signal = extract(raw);
      if (!signal) {
        consentValue.textContent = "-";
        releaseValue.textContent = "-";
        nodeCountValue.textContent = "-";
        signalValue.textContent = "-";
        nodeOutput.textContent = text[11];
        setStatus("warn", text[11]);
        return;
      }
      render(signal);
      setStatus("ok", text[12]);
    }
    fileInput.addEventListener("change", (event) => inspect(event.target.files?.[0]));
    ["dragenter", "dragover"].forEach((name) => dropZone.addEventListener(name, (event) => { event.preventDefault(); dropZone.classList.add("dragover"); }));
    ["dragleave", "drop"].forEach((name) => dropZone.addEventListener(name, (event) => { event.preventDefault(); dropZone.classList.remove("dragover"); }));
    dropZone.addEventListener("drop", (event) => inspect(event.dataTransfer.files?.[0]));
  </script>`;
  write(path.join(root, locale, "ixo.html"), pageHtml(locale, {
    title: s.ixoInspector,
    active: "docs",
    main: `<main class="page">
  <section class="hero"><h1>${esc(s.ixoInspector)}</h1><p>${esc(s.inspectorDesc)}</p></section>
  <section class="grid">
    <div class="card">
      <h2>${esc(t[0])}</h2>
      <div id="dropZone" class="card" style="border-style:dashed;text-align:center;min-height:220px;display:grid;place-items:center;">
        <div><strong>${esc(t[0])}</strong><p class="muted">${esc(t[1])}</p><label class="button">${esc(t[2])}<input id="fileInput" type="file" accept=".ixo,.exe,.json,application/json" style="display:none;"></label></div>
      </div>
      <div id="status" class="card" style="margin-top:16px;">${esc(t[3])}</div>
    </div>
    <aside class="card">
      <h2>${esc(s.inspectorTitle)}</h2>
      <p class="muted">${esc(t[1])}</p>
      <ul>${localUi.safetyBullets.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
    </aside>
  </section>
  <section class="card" style="margin-top:22px;">
    <div class="grid">
      <div><span class="muted">${esc(t[4])}</span><h3 id="consentValue">-</h3></div>
      <div><span class="muted">${esc(t[5])}</span><h3 id="releaseValue">-</h3></div>
      <div><span class="muted">${esc(t[6])}</span><h3 id="nodeCountValue">-</h3></div>
      <div><span class="muted">${esc(t[7])}</span><h3 id="signalValue">-</h3></div>
    </div>
    <div id="nodeOutput" class="card" style="margin-top:16px;">${esc(t[8])}</div>
  </section>
</main>`,
    scripts
  }));
}

function writeDocsPages(locale, hashes) {
  const localUi = uiText(locale);
  const titleMap = {
    "index.html": "IXO Engine",
    "nodes.html": "Node Library",
    "grammar.html": "Template Grammar",
    "privacy.html": "Network Privacy"
  };
  const fileMap = {
    "index.html": ["main.md", hashes.main],
    "nodes.html": ["node-library.md", hashes.nodes],
    "grammar.html": ["Template Grammer.md", hashes.grammar],
    "privacy.html": ["privacy-policy.md", hashes.privacy]
  };
  for (const [htmlFile, [mdFile, mdHash]] of Object.entries(fileMap)) {
    const title = titleMap[htmlFile];
    const scripts = `${markdownScripts()}
  <script>
    async function loadSidebar() {
      const target = document.getElementById("sidebar-target");
      try {
        const data = await SiteSecurity.secureFetchText("../nav.html", "${hashes.nav}");
        SiteSecurity.setSanitizedHtml(target, data);
        target.querySelectorAll("a").forEach((link) => {
          if (location.pathname.endsWith(link.getAttribute("href") || "")) link.classList.add("active");
        });
      } catch (error) {
        SiteSecurity.appendTextMessage(target, ${JSON.stringify(localUi.menuError)});
      }
    }
    async function loadDoc() {
      const target = document.getElementById("doc-target");
      try {
        const markdown = await SiteSecurity.secureFetchText(${JSON.stringify(mdFile)}, "${mdHash}");
        SiteSecurity.setMarkdown(target, markdown);
      } catch (error) {
        SiteSecurity.appendTextMessage(target, ${JSON.stringify(localUi.docError)});
      }
    }
    loadSidebar();
    loadDoc();
  </script>`;
    write(path.join(root, locale, "docs/ixo", htmlFile), pageHtml(locale, {
      title,
      active: "docs",
      extraHead: markdownScripts(),
      main: `<main class="page docs-layout">
  <aside id="sidebar-target" class="docs-sidebar"></aside>
  <article class="card markdown"><div id="doc-target"></div></article>
</main>`,
      scripts
    }));
  }
}

function generateLocale(locale) {
  const appsHash = writeJson(path.join(root, locale, "apps-data.json"), appsData(locale));
  const newsHash = writeJson(path.join(root, locale, "news-data.json"), newsData(locale));
  const issuesHash = writeJson(path.join(root, locale, "issues-data.json"), issuesData(locale));
  const portfolioHash = writeJson(path.join(root, locale, "portfolio.json"), portfolioData(locale));

  const docs = docsMarkdown(locale);
  const navContent = docsNav(locale);
  write(path.join(root, locale, "docs/nav.html"), navContent);
  write(path.join(root, locale, "docs/ixo/main.md"), docs.main);
  write(path.join(root, locale, "docs/ixo/node-library.md"), docs.nodes);
  write(path.join(root, locale, "docs/ixo/Template Grammer.md"), docs.grammar);
  write(path.join(root, locale, "docs/ixo/privacy-policy.md"), docs.privacy);
  const docHashes = {
    nav: sha256(navContent),
    main: sha256(docs.main),
    nodes: sha256(docs.nodes),
    grammar: sha256(docs.grammar),
    privacy: sha256(docs.privacy)
  };

  const meta = localeMeta[locale];
  writeListPage(locale, "app", "apps.html", {
    active: "apps",
    heading: meta.nav.apps,
    subheading: {
      "en-us": "Useful applications and tools provided by MinyangTech.",
      "ja-jp": "MinyangTech が提供する便利なアプリとツールです。",
      "zh-cn": "MinyangTech 提供的实用应用与工具。",
      "ru-ru": "Полезные приложения и инструменты от MinyangTech.",
      "de-de": "Nützliche Anwendungen und Werkzeuge von MinyangTech."
    }[locale],
    dataUrl: "apps-data.json",
    hash: appsHash
  });
  writeListPage(locale, "news", "news/index.html", {
    active: "news",
    heading: meta.nav.news,
    subheading: {
      "en-us": "Latest notices and development updates.",
      "ja-jp": "最新のお知らせと開発アップデートです。",
      "zh-cn": "最新公告与开发更新。",
      "ru-ru": "Последние объявления и обновления разработки.",
      "de-de": "Aktuelle Hinweise und Entwicklungsupdates."
    }[locale],
    dataUrl: "../news-data.json",
    hash: newsHash
  });
  writeListPage(locale, "issues", "issues.html", {
    active: "issues",
    heading: meta.nav.issues,
    subheading: {
      "en-us": "Publicly tracked bugs and issues.",
      "ja-jp": "公開管理されているバグと課題です。",
      "zh-cn": "公开跟踪的错误与问题。",
      "ru-ru": "Публично отслеживаемые ошибки и задачи.",
      "de-de": "Öffentlich nachverfolgte Bugs und Issues."
    }[locale],
    dataUrl: "issues-data.json",
    hash: issuesHash
  });
  writeListPage(locale, "portfolio", "portfolio.html", {
    active: "portfolio",
    heading: meta.nav.portfolio,
    subheading: {
      "en-us": "Selected works and development records.",
      "ja-jp": "制作物と開発記録をまとめています。",
      "zh-cn": "精选作品与开发记录。",
      "ru-ru": "Избранные работы и записи разработки.",
      "de-de": "Ausgewählte Arbeiten und Entwicklungsnotizen."
    }[locale],
    dataUrl: "portfolio.json",
    hash: portfolioHash
  });

  localizedStaticPages(locale);
  writeProfilePages(locale, portfolioHash);
  write404(locale);
  writeIxoInspector(locale);
  writeDocsPages(locale, docHashes);
}

write(path.join(root, "assets/js/translation-menu.js"), translationMenuJs());
localeOrder.forEach(generateLocale);

console.log(`Localized ${localeOrder.length} languages with translated HTML, JSON, Markdown, and integrity hashes.`);
