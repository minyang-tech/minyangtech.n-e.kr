(function () {
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
    style.textContent = `
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
    `;
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
