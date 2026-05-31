const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = path.resolve(__dirname, "..");
const locales = ["ja-jp", "en-us", "zh-cn", "ru-ru", "de-de"];

const i18n = {
  "ja-jp": {
    lang: "ja",
    translate: "翻訳",
    nav: ["ドキュメント", "ニュース", "アプリ", "ポートフォリオ", "課題", "Contributing", "EULA"],
    footer: "お問い合わせ",
    copyright: "Copyright 2026. MinyangTech. All rights reserved.",
    docsTitle: "MinyangTech ドキュメント",
    docsSubtitle: "MinyangTech 公式ドキュメントハブ",
    docsIntroTitle: "紹介",
    docsIntro: "MinyangTech の製品とプロジェクトの公式ドキュメントをまとめたページです。",
    docsInspectorTitle: "IXO ファイルを検査",
    docsInspectorBody: "IXO Engine プロジェクト(.ixo)または書き出したアプリ(.exe)に含まれる安全信号をローカルで確認できます。",
    docsInspectorOpen: "検査ページを開く",
    mainDocs: "主要ドキュメント",
    updatePolicy: "更新方式",
    updatePolicyBody: "各プロジェクトのソースとリリースを基準に順次反映します。",
    contact: "問い合わせ",
    navDoc: ["Index (Home)", "Game System", "Info", "Info", "Introduction", "Node Library", "Template Grammar", "Privacy Policy"],
    introTitle: "IXO Engine",
    introSubtitle: "Visual Node-Based App Builder",
    nodeTitle: "Node Library",
    nodeSubtitle: "IXO ノードのクイックガイド",
    nodeSection: "ノード詳細ドキュメント",
    nodeSectionBody: "現在のランタイム基準で、ノードの動作・状態・例を整理したリファレンスです。",
    grammarTitle: "Template Grammar",
    grammarSubtitle: "IXO テンプレート文法",
    privacyTitle: "Network Privacy",
    privacySubtitle: "ネットワーク系ノードの安全・個人情報案内",
    menuError: "メニューを読み込めませんでした。",
    docError: "ドキュメントを読み込めませんでした。",
    contributingTitle: "MinyangTech 標準コントリビューション方針",
    contributingLead: "MinyangTech のオープンソースプロジェクトは、誰でも Pull Request で参加できます。ただし、保守性・安全性・ライセンス・プロジェクト方向性を損なう変更は拒否される場合があります。",
    eulaTitle: "MinyangTech 標準エンドユーザーライセンス契約",
    eulaLead: "この規約は、本ウェブサイトおよび提供されるソフトウェア、コンテンツ、ダウンロード資料の利用に適用されます。"
  },
  "en-us": {
    lang: "en",
    translate: "Translate",
    nav: ["Docs", "News", "Apps", "Portfolio", "Issues", "Contributing", "EULA"],
    footer: "Connect with Us",
    copyright: "Copyright 2026. MinyangTech. All rights reserved.",
    docsTitle: "MinyangTech Docs",
    docsSubtitle: "Official documentation hub for MinyangTech",
    docsIntroTitle: "Introduction",
    docsIntro: "This page gathers official documents for MinyangTech products and projects.",
    docsInspectorTitle: "Inspect IXO files",
    docsInspectorBody: "Check safety signals included in IXO Engine projects(.ixo) or exported apps(.exe) locally.",
    docsInspectorOpen: "Open inspector",
    mainDocs: "Main docs",
    updatePolicy: "Update policy",
    updatePolicyBody: "Updated gradually based on each project source and release state.",
    contact: "Contact",
    navDoc: ["Index (Home)", "Game System", "Info", "Info", "Introduction", "Node Library", "Template Grammar", "Privacy Policy"],
    introTitle: "IXO Engine",
    introSubtitle: "Visual Node-Based App Builder",
    nodeTitle: "Node Library",
    nodeSubtitle: "Quick Guide for IXO Nodes",
    nodeSection: "Node Reference",
    nodeSectionBody: "A runtime-based reference for node behavior, status, and examples.",
    grammarTitle: "Template Grammar",
    grammarSubtitle: "IXO template syntax",
    privacyTitle: "Network Privacy",
    privacySubtitle: "Safety and privacy guide for network-family nodes",
    menuError: "Unable to load the menu.",
    docError: "Unable to load the document.",
    contributingTitle: "MinyangTech Standard Contribution Policy",
    contributingLead: "MinyangTech open-source projects accept contributions through Pull Requests. Changes that harm maintainability, security, licensing, or project direction may be rejected.",
    eulaTitle: "MinyangTech Standard End User License Agreement",
    eulaLead: "This agreement applies to this website and all provided software, content, and downloadable materials."
  },
  "zh-cn": {
    lang: "zh-CN",
    translate: "翻译",
    nav: ["文档", "新闻", "应用", "作品集", "问题", "Contributing", "EULA"],
    footer: "联系我们",
    copyright: "Copyright 2026. MinyangTech. All rights reserved.",
    docsTitle: "MinyangTech 文档",
    docsSubtitle: "MinyangTech 官方文档中心",
    docsIntroTitle: "介绍",
    docsIntro: "本页汇总 MinyangTech 产品与项目的官方文档。",
    docsInspectorTitle: "检查 IXO 文件",
    docsInspectorBody: "可在本地检查 IXO Engine 项目(.ixo)或导出应用(.exe)中的安全信号。",
    docsInspectorOpen: "打开检查页",
    mainDocs: "主要文档",
    updatePolicy: "更新方式",
    updatePolicyBody: "根据各项目源码与发布状态逐步反映。",
    contact: "联系",
    navDoc: ["Index (Home)", "Game System", "Info", "Info", "Introduction", "Node Library", "Template Grammar", "Privacy Policy"],
    introTitle: "IXO Engine",
    introSubtitle: "Visual Node-Based App Builder",
    nodeTitle: "Node Library",
    nodeSubtitle: "IXO 节点快速指南",
    nodeSection: "节点详细文档",
    nodeSectionBody: "以当前运行时为基准整理节点行为、状态和示例的参考文档。",
    grammarTitle: "Template Grammar",
    grammarSubtitle: "IXO 模板语法",
    privacyTitle: "Network Privacy",
    privacySubtitle: "网络类节点安全与隐私说明",
    menuError: "无法加载菜单。",
    docError: "无法加载文档。",
    contributingTitle: "MinyangTech 标准贡献方针",
    contributingLead: "MinyangTech 的开源项目欢迎通过 Pull Request 参与。破坏可维护性、安全、许可证或项目方向的修改可能被拒绝。",
    eulaTitle: "MinyangTech 标准最终用户许可协议",
    eulaLead: "本协议适用于本网站以及提供的所有软件、内容和下载资料。"
  },
  "ru-ru": {
    lang: "ru",
    translate: "Перевести",
    nav: ["Документы", "Новости", "Приложения", "Портфолио", "Задачи", "Contributing", "EULA"],
    footer: "Связаться с нами",
    copyright: "Copyright 2026. MinyangTech. All rights reserved.",
    docsTitle: "Документы MinyangTech",
    docsSubtitle: "Официальный центр документации MinyangTech",
    docsIntroTitle: "Введение",
    docsIntro: "Эта страница объединяет официальные документы продуктов и проектов MinyangTech.",
    docsInspectorTitle: "Проверить IXO-файл",
    docsInspectorBody: "Локально проверьте safety signals в проектах IXO Engine(.ixo) или экспортированных приложениях(.exe).",
    docsInspectorOpen: "Открыть проверку",
    mainDocs: "Основные документы",
    updatePolicy: "Политика обновлений",
    updatePolicyBody: "Обновляется постепенно на основе исходников и релизов каждого проекта.",
    contact: "Контакт",
    navDoc: ["Index (Home)", "Game System", "Info", "Info", "Introduction", "Node Library", "Template Grammar", "Privacy Policy"],
    introTitle: "IXO Engine",
    introSubtitle: "Visual Node-Based App Builder",
    nodeTitle: "Node Library",
    nodeSubtitle: "Краткий справочник узлов IXO",
    nodeSection: "Подробная документация узлов",
    nodeSectionBody: "Справочник по поведению, статусу и примерам узлов на основе текущего runtime.",
    grammarTitle: "Template Grammar",
    grammarSubtitle: "Синтаксис шаблонов IXO",
    privacyTitle: "Network Privacy",
    privacySubtitle: "Безопасность и приватность сетевых узлов",
    menuError: "Не удалось загрузить меню.",
    docError: "Не удалось загрузить документ.",
    contributingTitle: "Стандартная политика участия MinyangTech",
    contributingLead: "Open-source проекты MinyangTech принимают вклад через Pull Request. Изменения, вредящие поддержке, безопасности, лицензированию или направлению проекта, могут быть отклонены.",
    eulaTitle: "Стандартное лицензионное соглашение MinyangTech",
    eulaLead: "Это соглашение применяется к сайту, программам, контенту и загружаемым материалам."
  },
  "de-de": {
    lang: "de",
    translate: "Übersetzen",
    nav: ["Dokumente", "News", "Apps", "Portfolio", "Issues", "Contributing", "EULA"],
    footer: "Kontakt",
    copyright: "Copyright 2026. MinyangTech. All rights reserved.",
    docsTitle: "MinyangTech Dokumente",
    docsSubtitle: "Offizieller Dokumentationshub von MinyangTech",
    docsIntroTitle: "Einführung",
    docsIntro: "Diese Seite bündelt offizielle Dokumente zu MinyangTech-Produkten und Projekten.",
    docsInspectorTitle: "IXO-Dateien prüfen",
    docsInspectorBody: "Safety Signals in IXO-Engine-Projekten(.ixo) oder exportierten Apps(.exe) lokal prüfen.",
    docsInspectorOpen: "Prüfseite öffnen",
    mainDocs: "Wichtige Dokumente",
    updatePolicy: "Update-Prinzip",
    updatePolicyBody: "Wird schrittweise anhand von Projektquellen und Releases aktualisiert.",
    contact: "Kontakt",
    navDoc: ["Index (Home)", "Game System", "Info", "Info", "Introduction", "Node Library", "Template Grammar", "Privacy Policy"],
    introTitle: "IXO Engine",
    introSubtitle: "Visual Node-Based App Builder",
    nodeTitle: "Node Library",
    nodeSubtitle: "Kurzleitfaden für IXO Nodes",
    nodeSection: "Node-Referenz",
    nodeSectionBody: "Eine runtimebasierte Referenz für Node-Verhalten, Status und Beispiele.",
    grammarTitle: "Template Grammar",
    grammarSubtitle: "IXO Template-Syntax",
    privacyTitle: "Network Privacy",
    privacySubtitle: "Sicherheits- und Datenschutzleitfaden für Netzwerk-Nodes",
    menuError: "Menü konnte nicht geladen werden.",
    docError: "Dokument konnte nicht geladen werden.",
    contributingTitle: "MinyangTech Standard-Beitragsrichtlinie",
    contributingLead: "MinyangTech-Open-Source-Projekte akzeptieren Beiträge per Pull Request. Änderungen, die Wartbarkeit, Sicherheit, Lizenzlage oder Projektrichtung schädigen, können abgelehnt werden.",
    eulaTitle: "MinyangTech Standard-Endbenutzer-Lizenzvertrag",
    eulaLead: "Diese Vereinbarung gilt für diese Website sowie bereitgestellte Software, Inhalte und Downloadmaterialien."
  }
};

const docFiles = {
  "docs/ixo/index.html": { titleKey: "introTitle", subtitleKey: "introSubtitle", target: "main-reference-target", md: "main.md", hashName: "main" },
  "docs/ixo/nodes.html": { titleKey: "nodeTitle", subtitleKey: "nodeSubtitle", target: "node-reference-target", md: "node-library.md", hashName: "nodes" },
  "docs/ixo/grammar.html": { titleKey: "grammarTitle", subtitleKey: "grammarSubtitle", target: "grammar-reference-target", md: "Template Grammer.md", hashName: "grammar" },
  "docs/ixo/privacy.html": { titleKey: "privacyTitle", subtitleKey: "privacySubtitle", target: "privacy-reference-target", md: "privacy-policy.md", hashName: "privacy" }
};

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function write(file, content) {
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, normalizeGeneratedContent(content), "utf8");
}

function normalizeGeneratedContent(content) {
  return String(content)
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}$/g, "\n");
}

function hashText(text) {
  return crypto.createHash("sha256").update(text.replace(/\r\n/g, "\n"), "utf8").digest("hex");
}

function hashFile(file) {
  return hashText(read(file));
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[ch]));
}

function navBlock(locale, active) {
  const t = i18n[locale];
  const items = [
    ["docs", `/${locale}/docs/index.html`],
    ["news", `/${locale}/news/index.html`],
    ["apps", `/${locale}/apps.html`],
    ["portfolio", `/${locale}/portfolio.html`],
    ["issues", `/${locale}/issues.html`],
    ["contributing", `/${locale}/Contributing.html`],
    ["eula", `/${locale}/eula.html`]
  ];
  return `<ul class="nav-links">
${items.map(([key, href], index) => `                    <li><a href="${href}"${active === key ? ' class="active"' : ""}>${esc(t.nav[index])}</a></li>`).join("\n")}
                </ul>`;
}

function normalizeChrome(html, locale, active, title) {
  const t = i18n[locale];
  let out = html
    .replace(/<html\s+lang="[^"]+"(?:\s+dir="[^"]+")?>/i, `<html lang="${t.lang}" dir="ltr">`)
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)} | MinyangTech</title>`)
    .replace(/<ul class="nav-links">[\s\S]*?<\/ul>/i, navBlock(locale, active))
    .replace(/(href|src)="(?:\.\.\/)?common\.css"/g, '$1="/common.css"')
    .replace(/(href|src)="(?:\.\.\/)?assets\//g, '$1="/assets/')
    .replace(/<h3 style="margin-bottom:20px;">[\s\S]*?<\/h3>/g, `<h3 style="margin-bottom:20px;">${esc(t.footer)}</h3>`)
    .replace(/<p>민양테크가 제작한 모든 제품의 저작권은 민양테크에 있습니다\.<\/p>/g, `<p>${esc(t.copyright)}</p>`)
    .replace(/<p>Copyright 2026\. MinyangTech\. All rights reserved\.<\/p>/g, `<p>${esc(t.copyright)}</p>`);
  out = out.replace(/<div class="language-menu">[\s\S]*?<\/div>\s*<\/div>\s*<label class="switch">/i, `<label class="switch">`);
  if (!out.includes("/assets/js/translation-menu.js")) {
    out = out.replace(/<\/body>/i, `    <script src="/assets/js/translation-menu.js" defer></script>\n</body>`);
  }
  return out;
}

function localeNavHtml(locale) {
  const t = i18n[locale].navDoc;
  return `<div class="sidebar-group">
    <h4>[Main]</h4>
    <ul>
        <li><a href="/${locale}/docs/index.html">${esc(t[0])}</a></li>
    </ul>
</div>
<div class="sidebar-group">
    <h4>[1962: The Last Winter In Moscow]</h4>
    <ul>
        <li><a href="/${locale}/docs/1962/index.html">Home</a></li>
        <li><a href="/${locale}/docs/1962/story.html">Story</a></li>
    </ul>
</div>
<div class="sidebar-group">
    <h4>[Camera]</h4>
    <ul>
        <li><a href="/${locale}/docs/C/index.html">${esc(t[3])}</a></li>
    </ul>
</div>
<div class="sidebar-group">
    <h4>[IXO Engine]</h4>
    <ul>
        <li><a href="/${locale}/docs/ixo/index.html">${esc(t[4])}</a></li>
        <li><a href="/${locale}/docs/ixo/nodes.html">${esc(t[5])}</a></li>
        <li><a href="/${locale}/docs/ixo/grammar.html">${esc(t[6])}</a></li>
        <li><a href="/${locale}/docs/ixo/privacy.html">${esc(t[7])}</a></li>
    </ul>
</div>
`;
}

function activeSidebarHtml(html, href) {
  return html.replace(`href="${href}"`, `href="${href}" class="active"`);
}

function replaceMain(html, main) {
  return html.replace(/<main[\s\S]*?<\/main>/i, main);
}

function makeDocsIndex(locale) {
  const t = i18n[locale];
  let html = normalizeChrome(read("docs/index.html"), locale, "docs", t.docsTitle);
  const main = `<main class="docs-container">
        <aside class="docs-sidebar">
${activeSidebarHtml(localeNavHtml(locale), `/${locale}/docs/index.html`)}
        </aside>

        <article class="docs-content">
            <section class="ixo-inspector-hero">
                <h2>${esc(t.docsInspectorTitle)}</h2>
                <p>${esc(t.docsInspectorBody)}</p>
                <a href="/${locale}/ixo.html">${esc(t.docsInspectorOpen)}</a>
            </section>
            <h1>${esc(t.docsTitle)}</h1>
            <p class="subtitle">${esc(t.docsSubtitle)}</p>
            <hr style="border:0; border-top:1px solid var(--brd); margin: 30px 0;">
            <div class="docs-body" id="overview">
                <section>
                    <h2>${esc(t.docsIntroTitle)}</h2>
                    <p>${esc(t.docsIntro)}</p>
                    <ul class="info-list">
                        <li><strong>${esc(t.mainDocs)}</strong><span>IXO Engine, VOV, MAC, Camera</span></li>
                        <li><strong>${esc(t.updatePolicy)}</strong><span>${esc(t.updatePolicyBody)}</span></li>
                        <li><strong>${esc(t.contact)}</strong><span>support@minyangtech.n-e.kr</span></li>
                    </ul>
                </section>
            </div>
        </article>
    </main>`;
  write(`${locale}/docs/index.html`, replaceMain(html, main));
}

function makeDocsIxo(locale, navHash, mdHashes) {
  const t = i18n[locale];
  for (const [file, config] of Object.entries(docFiles)) {
    let html = normalizeChrome(read(file), locale, "docs", t[config.titleKey]);
    html = html
      .replace(/<h1>[\s\S]*?<\/h1>/i, `<h1>${esc(t[config.titleKey])}</h1>`)
      .replace(/<p class="subtitle">[\s\S]*?<\/p>/i, `<p class="subtitle">${esc(t[config.subtitleKey])}</p>`)
      .replace(/SiteSecurity\.secureFetchText\('nav\.html', '[a-f0-9]+'\)/g, `SiteSecurity.secureFetchText('nav.html', '${navHash}')`)
      .replace(/SiteSecurity\.secureFetchText\('\.\.\/nav\.html', '[a-f0-9]+'\)/g, `SiteSecurity.secureFetchText('../nav.html', '${navHash}')`)
      .replace(/SiteSecurity\.secureFetchText\("nav\.html", "[a-f0-9]+"\)/g, `SiteSecurity.secureFetchText("nav.html", "${navHash}")`)
      .replace(/SiteSecurity\.secureFetchText\("\.\.\/nav\.html", "[a-f0-9]+"\)/g, `SiteSecurity.secureFetchText("../nav.html", "${navHash}")`)
      .replace(/SiteSecurity\.secureFetchText\('[^']+\.md', '[a-f0-9]+'\)/g, `SiteSecurity.secureFetchText('${config.md}', '${mdHashes[config.hashName]}')`)
      .replace(/SiteSecurity\.appendTextMessage\(target, '[^']*'\);/g, `SiteSecurity.appendTextMessage(target, '${t.docError.replace(/'/g, "\\'")}');`);
    if (file.endsWith("nodes.html")) {
      html = html
        .replace(/<h2>[\s\S]*?<\/h2>\s*<p>[\s\S]*?<\/p>\s*<div class="reference-content" id="node-reference-target"><\/div>/i,
          `<h2>${esc(t.nodeSection)}</h2>\n                    <p>${esc(t.nodeSectionBody)}</p>\n                    <div class="reference-content" id="node-reference-target"></div>`);
    }
    write(`${locale}/${file}`, html);
  }
}

function makePolicyLike(locale) {
  const t = i18n[locale];
  let contributing = normalizeChrome(read("Contributing.html"), locale, "contributing", t.contributingTitle);
  contributing = replaceMain(contributing, `<main>
        <section class="policy-header">
            <h1>${esc(t.contributingTitle)}</h1>
            <p>${esc(t.contributingLead)}</p>
        </section>
        <div class="policy-card">
            <div class="notice-box"><p><strong>${esc(t.docsIntroTitle)}:</strong> ${esc(t.contributingLead)}</p></div>
            <div class="policy-section"><h3>1. ${esc(t.mainDocs)}</h3><p>Pull Request, issue, documentation, bug fix, UI/UX improvement, performance work, and node additions are welcome when they follow the project direction.</p></div>
            <div class="policy-section"><h3>2. Reject conditions</h3><ul><li>Malicious or obfuscated code</li><li>Unrelated features</li><li>Excessive dependencies</li><li>License conflicts</li></ul></div>
            <div class="policy-section"><h3>3. Workflow</h3><pre><code>npm install
npm run dev</code></pre><ol><li>Fork the repository.</li><li>Create a branch.</li><li>Commit changes.</li><li>Open a Pull Request.</li></ol></div>
            <div class="policy-section"><h3>4. ${esc(t.contact)}</h3><p>support@minyangtech.n-e.kr</p></div>
        </div>
    </main>`);
  write(`${locale}/Contributing.html`, contributing);

  let eula = normalizeChrome(read("eula.html"), locale, "eula", t.eulaTitle);
  eula = replaceMain(eula, `<main>
        <section class="eula-header">
            <h1>${esc(t.eulaTitle)}</h1>
            <p>${esc(t.eulaLead)}</p>
        </section>
        <div class="policy-card">
            <div class="policy-section"><p>${esc(t.eulaLead)}</p></div>
            <div class="policy-section"><h3>1. Scope</h3><p>The terms apply to MinyangTech software, games, content, documentation, and downloads unless a separate license exists.</p></div>
            <div class="policy-section"><h3>2. Rights</h3><p>Copyright and related rights belong to MinyangTech or the listed right holder.</p></div>
            <div class="policy-section"><h3>3. Restrictions</h3><p>Do not redistribute misleading modified builds, add malicious code, or violate third-party rights.</p></div>
            <div class="policy-section"><h3>4. Disclaimer</h3><p>Experimental software is provided as-is. Keep backups before using preview builds.</p></div>
            <div class="policy-section"><h3>5. ${esc(t.contact)}</h3><p>support@minyangtech.n-e.kr</p></div>
        </div>
    </main>`);
  write(`${locale}/eula.html`, eula);
}

function makeSimpleDocs(locale) {
  const t = i18n[locale];
  const pages = [
    ["docs/C/index.html", "Camera", "Info"]
  ];
  for (const [file, title, subtitle] of pages) {
    let html = normalizeChrome(read(file), locale, "docs", title);
    html = html.replace(/<h1>[\s\S]*?<\/h1>/i, `<h1>${esc(title)}</h1>`);
    html = html.replace(/<p class="subtitle">[\s\S]*?<\/p>/i, `<p class="subtitle">${esc(subtitle)}</p>`);
    html = html.replace(/SiteSecurity\.secureFetchText\('nav\.html', '[a-f0-9]+'\)/g, `SiteSecurity.secureFetchText('nav.html', '${hashFile(`${locale}/docs/nav.html`)}')`);
    html = html.replace(/SiteSecurity\.secureFetchText\('\.\.\/nav\.html', '[a-f0-9]+'\)/g, `SiteSecurity.secureFetchText('../nav.html', '${hashFile(`${locale}/docs/nav.html`)}')`);
    write(`${locale}/${file}`, html);
  }
}

function copyRemainingWithChrome(locale) {
  const files = [
    ["apps.html", "apps", i18n[locale].nav[2]],
    ["news/index.html", "news", i18n[locale].nav[1]],
    ["issues.html", "issues", i18n[locale].nav[4]],
    ["portfolio.html", "portfolio", i18n[locale].nav[3]],
    ["policy.html", "docs", "Policy"],
    ["find/stelrunartist.html", "docs", "Artist Recruitment"],
    ["ixo.html", "docs", i18n[locale].docsInspectorTitle],
    ["@whoasked.html", "portfolio", "@whoasked"],
    ["@getsystemmetrics.html", "portfolio", "@getsystemmetrics"],
    ["404.html", "docs", "404"]
  ];
  for (const [file, active, title] of files) {
    if (!fs.existsSync(path.join(root, file))) continue;
    let html = normalizeChrome(read(file), locale, active, title);
    html = html.replace(/SiteSecurity\.secureFetchJson\('apps-data\.json', '[a-f0-9]+'\)/g, `SiteSecurity.secureFetchJson('apps-data.json', '${hashFile(`${locale}/apps-data.json`)}')`);
    html = html.replace(/SiteSecurity\.secureFetchJson\('\.\.\/news-data\.json', '[a-f0-9]+'\)/g, `SiteSecurity.secureFetchJson('../news-data.json', '${hashFile(`${locale}/news-data.json`)}')`);
    html = html.replace(/SiteSecurity\.secureFetchJson\('issues-data\.json', '[a-f0-9]+'\)/g, `SiteSecurity.secureFetchJson('issues-data.json', '${hashFile(`${locale}/issues-data.json`)}')`);
    html = html.replace(/SiteSecurity\.secureFetchJson\('portfolio\.json', '[a-f0-9]+'\)/g, `SiteSecurity.secureFetchJson('portfolio.json', '${hashFile(`${locale}/portfolio.json`)}')`);
    html = html.replace(/const portfolioHash = '[a-f0-9]+';/g, `const portfolioHash = '${hashFile(`${locale}/portfolio.json`)}';`);
    html = localizeCopiedStaticText(html, locale, file);
    write(`${locale}/${file}`, html);
  }
}

function fixNavFetchPaths(locale) {
  const files = [
    "docs/C/index.html",
    "docs/ixo/grammar.html",
    "docs/ixo/index.html",
    "docs/ixo/nodes.html",
    "docs/ixo/privacy.html"
  ];
  const nestedFetchPattern = /let data;\s*try\s*\{\s*data = await SiteSecurity\.secureFetchText\('nav\.html', '([a-f0-9]{64})'\);\s*\}\s*catch\s*\{\s*data = await SiteSecurity\.secureFetchText\('\.\.\/nav\.html', '\1'\);\s*\}/g;
  for (const file of files) {
    const fullPath = path.join(root, locale, file);
    if (!fs.existsSync(fullPath)) continue;
    const html = fs.readFileSync(fullPath, "utf8").replace(
      nestedFetchPattern,
      "const data = await SiteSecurity.secureFetchText('../nav.html', '$1');"
    );
    fs.writeFileSync(fullPath, normalizeGeneratedContent(html), "utf8");
  }
}

const copiedPageText = {
  "ja-jp": {
    appsTitle: "アプリ",
    appsDesc: "MinyangTech が提供する便利なアプリケーション一覧です。",
    appsSearch: "アプリ名または説明を検索...",
    newsTitle: "ニュース",
    newsDesc: "MinyangTech の最新アップデートを確認できます。",
    newsSearch: "ニュースのタイトルまたは内容を検索...",
    issuesTitle: "バグ / 課題",
    issuesDesc: "プロジェクトで発生したバグや課題のレポートを掲載します。",
    textSearch: "タイトルまたは内容を検索...",
    portfolioTitle: "ポートフォリオ",
    portfolioDesc: "MinyangTech の制作物と記録を確認できます。",
    newest: "新しい順",
    oldest: "古い順",
    back: "一覧に戻る",
    loadError: "データを読み込めません。",
    noResults: "検索結果がありません。",
    platform: "プラットフォーム",
    minSpec: "最小要件",
    recSpec: "推奨要件",
    openSource: "オープンソース",
    public: "公開",
    private: "非公開",
    source: "ソースコード",
    download: "ダウンロード",
    shareNews: "MinyangTech の最新ニュースです。"
  },
  "en-us": {
    appsTitle: "Apps",
    appsDesc: "Useful applications and tools provided by MinyangTech.",
    appsSearch: "Search apps by name or description...",
    newsTitle: "News",
    newsDesc: "Check the latest MinyangTech updates.",
    newsSearch: "Search news title or content...",
    issuesTitle: "Bugs / Issues",
    issuesDesc: "Bug reports and issue records from MinyangTech projects.",
    textSearch: "Search title or content...",
    portfolioTitle: "Portfolio",
    portfolioDesc: "View MinyangTech works and records.",
    newest: "Newest",
    oldest: "Oldest",
    back: "Back to list",
    loadError: "Unable to load data.",
    noResults: "No search results.",
    platform: "Platform",
    minSpec: "Minimum specs",
    recSpec: "Recommended specs",
    openSource: "Open source",
    public: "Public",
    private: "Private",
    source: "Source code",
    download: "Download",
    shareNews: "Latest news from MinyangTech."
  },
  "zh-cn": {
    appsTitle: "应用",
    appsDesc: "查看 MinyangTech 提供的实用应用列表。",
    appsSearch: "搜索应用名称或说明...",
    newsTitle: "新闻",
    newsDesc: "查看 MinyangTech 的最新更新。",
    newsSearch: "搜索新闻标题或内容...",
    issuesTitle: "Bug / 问题",
    issuesDesc: "发布项目中发生的 Bug 和问题报告。",
    textSearch: "搜索标题或内容...",
    portfolioTitle: "作品集",
    portfolioDesc: "查看 MinyangTech 的作品与记录。",
    newest: "最新",
    oldest: "最早",
    back: "返回列表",
    loadError: "无法加载数据。",
    noResults: "没有搜索结果。",
    platform: "平台",
    minSpec: "最低配置",
    recSpec: "推荐配置",
    openSource: "开源",
    public: "公开",
    private: "不公开",
    source: "源代码",
    download: "下载",
    shareNews: "MinyangTech 的最新消息。"
  },
  "ru-ru": {
    appsTitle: "Приложения",
    appsDesc: "Список полезных приложений от MinyangTech.",
    appsSearch: "Поиск по названию или описанию...",
    newsTitle: "Новости",
    newsDesc: "Последние обновления MinyangTech.",
    newsSearch: "Поиск по заголовку или содержанию...",
    issuesTitle: "Ошибки / задачи",
    issuesDesc: "Отчеты об ошибках и проблемах проектов.",
    textSearch: "Поиск по заголовку или содержанию...",
    portfolioTitle: "Портфолио",
    portfolioDesc: "Работы и записи MinyangTech.",
    newest: "Сначала новые",
    oldest: "Сначала старые",
    back: "Назад к списку",
    loadError: "Не удалось загрузить данные.",
    noResults: "Ничего не найдено.",
    platform: "Платформа",
    minSpec: "Минимальные требования",
    recSpec: "Рекомендуемые требования",
    openSource: "Открытый код",
    public: "Открыто",
    private: "Закрыто",
    source: "Исходный код",
    download: "Скачать",
    shareNews: "Последние новости MinyangTech."
  },
  "de-de": {
    appsTitle: "Apps",
    appsDesc: "Nützliche Anwendungen von MinyangTech.",
    appsSearch: "Nach App-Name oder Beschreibung suchen...",
    newsTitle: "News",
    newsDesc: "Aktuelle Updates von MinyangTech ansehen.",
    newsSearch: "Nach News-Titel oder Inhalt suchen...",
    issuesTitle: "Bugs / Issues",
    issuesDesc: "Berichte zu Fehlern und Problemen in Projekten.",
    textSearch: "Nach Titel oder Inhalt suchen...",
    portfolioTitle: "Portfolio",
    portfolioDesc: "Arbeiten und Aufzeichnungen von MinyangTech ansehen.",
    newest: "Neueste",
    oldest: "Älteste",
    back: "Zurück zur Liste",
    loadError: "Daten konnten nicht geladen werden.",
    noResults: "Keine Suchergebnisse.",
    platform: "Plattform",
    minSpec: "Mindestanforderungen",
    recSpec: "Empfohlene Anforderungen",
    openSource: "Open Source",
    public: "Öffentlich",
    private: "Privat",
    source: "Quellcode",
    download: "Download",
    shareNews: "Aktuelle Neuigkeiten von MinyangTech."
  }
};

function jsSingle(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

function localizeCopiedStaticText(html, locale, file) {
  const t = copiedPageText[locale];
  if (!t) return html;
  const replacements = [
    ["최신순", t.newest],
    ["오래된순", t.oldest],
    ["목록으로 돌아가기", t.back],
    ["데이터를 불러올 수 없습니다.", t.loadError],
    ["검색 결과가 없습니다.", t.noResults],
    ["결과가 없습니다.", t.noResults],
    ["등록된 포트폴리오가 없습니다.", t.noResults],
    ["'플랫폼'", `'${jsSingle(t.platform)}'`],
    ["'최소 사양'", `'${jsSingle(t.minSpec)}'`],
    ["'권장 사양'", `'${jsSingle(t.recSpec)}'`],
    ["'오픈소스'", `'${jsSingle(t.openSource)}'`],
    ["'공개'", `'${jsSingle(t.public)}'`],
    ["'비공개'", `'${jsSingle(t.private)}'`],
    ["'소스코드'", `'${jsSingle(t.source)}'`],
    ["'다운로드'", `'${jsSingle(t.download)}'`],
    ["민양테크가 제작한 모든 제품의 저작권은 민양테크에 있습니다.", i18n[locale].copyright],
    ["navigator.share({ title: document.title, text: \"민양테크의 최신 소식!\", url: url });", `navigator.share({ title: document.title, text: "${t.shareNews}", url: url });`],
    ["placeholderCover = 'image/", "placeholderCover = '/image/"]
  ];

  if (file === "apps.html") {
    replacements.push(
      ["<h1>Apps</h1>", `<h1>${t.appsTitle}</h1>`],
      ["민양테크가 제공하는 편리한 애플리케이션 리스트입니다.", t.appsDesc],
      ["앱 이름이나 설명 검색...", t.appsSearch],
      ['content="민양테크 Apps"', `content="MinyangTech ${t.appsTitle}"`],
      ['content="민양테크에서 개발한 앱들을 만나보세요."', `content="${t.appsDesc}"`]
    );
  }
  if (file === "news/index.html") {
    replacements.push(
      ["<h1>새로운 소식</h1>", `<h1>${t.newsTitle}</h1>`],
      ["민양테크의 최신 업데이트를 확인하세요.", t.newsDesc],
      ["뉴스 제목이나 내용 검색...", t.newsSearch],
      ['content="민양테크의 최신 소식을 확인하세요."', `content="${t.newsDesc}"`]
    );
  }
  if (file === "issues.html") {
    replacements.push(
      ["<h1>버그ㅣ이슈</h1>", `<h1>${t.issuesTitle}</h1>`],
      ["프로젝트에서 발생한 버그 등의 리포트를 올립니다.", t.issuesDesc],
      ["제목이나 내용 검색...", t.textSearch]
    );
  }
  if (file === "portfolio.html") {
    replacements.push(
      ["<h1>포트폴리오</h1>", `<h1>${t.portfolioTitle}</h1>`],
      ["민양테크의 작업물과 기록을 확인하세요.", t.portfolioDesc],
      ["제목이나 내용 검색...", t.textSearch]
    );
  }

  let out = html;
  for (const [from, to] of replacements) {
    out = out.split(from).join(to);
  }
  return out;
}

function addRootScriptCompatFields(locale) {
  for (const file of ["news-data.json", "issues-data.json", "portfolio.json"]) {
    const fullPath = path.join(root, locale, file);
    if (!fs.existsSync(fullPath)) continue;
    const items = JSON.parse(fs.readFileSync(fullPath, "utf8"));
    const normalized = items.map((item) => ({
      ...item,
      title_ko: item.title_ko || item.title || "",
      content_ko: item.content_ko || item.content || ""
    }));
    fs.writeFileSync(fullPath, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");
  }
}

for (const locale of locales) {
  write(`${locale}/docs/nav.html`, localeNavHtml(locale));
  const navHash = hashFile(`${locale}/docs/nav.html`);
  const mdHashes = {
    main: hashFile(`${locale}/docs/ixo/main.md`),
    nodes: hashFile(`${locale}/docs/ixo/node-library.md`),
    grammar: hashFile(`${locale}/docs/ixo/Template Grammer.md`),
    privacy: hashFile(`${locale}/docs/ixo/privacy-policy.md`)
  };
  makeDocsIndex(locale);
  makeDocsIxo(locale, navHash, mdHashes);
  makeSimpleDocs(locale);
  makePolicyLike(locale);
  addRootScriptCompatFields(locale);
  copyRemainingWithChrome(locale);
  fixNavFetchPaths(locale);
}

console.log("Restored localized pages to the Korean UI structure and kept only localized text/data changes.");
