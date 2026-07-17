(function () {
  "use strict";

  const localeOrder = ["ko", "ja-jp", "en-us", "zh-cn", "ru-ru", "de-de"];
  const localeMeta = {
    ko: { label: "한국어", button: "번역", htmlLang: "ko" },
    "ja-jp": { label: "日本語", button: "翻訳", htmlLang: "ja" },
    "en-us": { label: "English", button: "Translate", htmlLang: "en" },
    "zh-cn": { label: "中文", button: "翻译", htmlLang: "zh-CN" },
    "ru-ru": { label: "Русский", button: "Перевод", htmlLang: "ru" },
    "de-de": { label: "Deutsch", button: "Übersetzen", htmlLang: "de" }
  };

  const navLabels = {
    ko: { docs: "Docs", news: "News", apps: "Apps", find: "Find", portfolio: "Portfolio", issues: "Issues", contributing: "Contributing", eula: "EULA", policy: "Policy" },
    "ja-jp": { docs: "ドキュメント", news: "ニュース", apps: "アプリ", find: "探す", portfolio: "ポートフォリオ", issues: "課題", contributing: "投稿", eula: "EULA", policy: "ポリシー" },
    "en-us": { docs: "Docs", news: "News", apps: "Apps", find: "Find", portfolio: "Portfolio", issues: "Issues", contributing: "Contributing", eula: "EULA", policy: "Policy" },
    "zh-cn": { docs: "文档", news: "新闻", apps: "应用", find: "查找", portfolio: "作品集", issues: "问题", contributing: "贡献", eula: "EULA", policy: "政策" },
    "ru-ru": { docs: "Документы", news: "Новости", apps: "Приложения", find: "Поиск", portfolio: "Портфолио", issues: "Задачи", contributing: "Вклад", eula: "EULA", policy: "Политика" },
    "de-de": { docs: "Dokumentation", news: "Neuigkeiten", apps: "Apps", find: "Suche", portfolio: "Portfolio", issues: "Probleme", contributing: "Mitwirken", eula: "EULA", policy: "Richtlinie" }
  };

  const prefixedLocales = localeOrder.filter((locale) => locale !== "ko");

  function getRouteInfo() {
    const rawPath = window.location.pathname || "/";
    const parts = rawPath.split("/").filter(Boolean);
    const activeLocale = prefixedLocales.includes(parts[0]) ? parts[0] : "ko";
    const baseParts = activeLocale === "ko" ? parts : parts.slice(1);
    let basePath = "/" + baseParts.join("/");

    if (basePath === "/") {
      basePath = "/index.html";
    } else if (rawPath.endsWith("/")) {
      basePath = basePath.replace(/\/$/, "") + "/index.html";
    } else if (!/\.[a-z0-9]+$/i.test(basePath)) {
      basePath += "/index.html";
    }

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
      header {
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        gap: 16px !important;
      }
      header .controls {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: flex-end !important;
        gap: 14px !important;
        margin-left: auto !important;
        flex-shrink: 0 !important;
      }
      header .language-menu {
        position: relative !important;
        display: inline-flex !important;
        order: 0 !important;
        z-index: 1200 !important;
      }
      header .switch {
        order: 1 !important;
        flex: 0 0 auto !important;
      }
      header .language-menu-button {
        min-height: 36px !important;
        padding: 0 14px !important;
        border: 1px solid var(--brd, rgba(0,0,0,0.14)) !important;
        border-radius: 999px !important;
        background: var(--card-bg, var(--bg, #fff)) !important;
        color: var(--txt, #222) !important;
        font: inherit !important;
        font-size: 0.92rem !important;
        font-weight: 800 !important;
        line-height: 1 !important;
        cursor: pointer !important;
        white-space: nowrap !important;
      }
      header .language-menu-list {
        position: absolute !important;
        top: calc(100% + 10px) !important;
        right: 0 !important;
        left: auto !important;
        min-width: 190px !important;
        display: none !important;
        padding: 8px !important;
        border: 1px solid var(--brd, rgba(0,0,0,0.14)) !important;
        border-radius: 16px !important;
        background: var(--card-bg, var(--bg, #fff)) !important;
        box-shadow: 0 18px 45px rgba(0,0,0,0.2) !important;
      }
      header .language-menu:hover .language-menu-list,
      header .language-menu:focus-within .language-menu-list {
        display: grid !important;
        gap: 4px !important;
      }
      header .language-menu-list a {
        display: block !important;
        padding: 9px 11px !important;
        border-radius: 10px !important;
        color: var(--txt, #222) !important;
        text-decoration: none !important;
        font-weight: 800 !important;
        line-height: 1.2 !important;
        white-space: nowrap !important;
        opacity: 0.78 !important;
      }
      header .language-menu-list a:hover,
      header .language-menu-list a.active {
        background: color-mix(in srgb, var(--accent, #007bff) 14%, transparent) !important;
        color: var(--accent, #007bff) !important;
        opacity: 1 !important;
      }
      @media (max-width: 850px) {
        header {
          align-items: flex-start !important;
        }
        header .controls {
          gap: 10px !important;
        }
        header .language-menu-button {
          min-height: 32px !important;
          padding: 0 11px !important;
          font-size: 0.84rem !important;
        }
        header .language-menu-list {
          min-width: 170px !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function ensureControls(header) {
    let controls = header.querySelector(":scope > .controls") || header.querySelector(".controls");
    if (!controls) {
      controls = document.createElement("div");
      controls.className = "controls";
    }
    if (controls.parentElement !== header) header.appendChild(controls);
    return controls;
  }

  function normalizeExistingControls(header) {
    header.querySelectorAll(".language-menu").forEach((menu) => menu.remove());
    return ensureControls(header);
  }

  function localizeCommonNavigation(activeLocale) {
    const labels = navLabels[activeLocale] || navLabels.ko;
    document.querySelectorAll(".nav-links a, header nav a").forEach((link) => {
      const href = (link.getAttribute("href") || "").toLowerCase();
      if (href.includes("/docs")) link.textContent = labels.docs;
      else if (href.includes("/news")) link.textContent = labels.news;
      else if (href.includes("/apps")) link.textContent = labels.apps;
      else if (href.includes("/find")) link.textContent = labels.find;
      else if (href.includes("/portfolio")) link.textContent = labels.portfolio;
      else if (href.includes("/issues")) link.textContent = labels.issues;
      else if (href.includes("/contributing")) link.textContent = labels.contributing;
      else if (href.includes("/eula")) link.textContent = labels.eula;
      else if (href.includes("/policy")) link.textContent = labels.policy;
    });
  }

  function mountMenu() {
    const { activeLocale, basePath } = getRouteInfo();
    if (isExcludedPath(basePath)) return;

    document.documentElement.lang = localeMeta[activeLocale]?.htmlLang || "ko";
    localizeCommonNavigation(activeLocale);

    const header = document.querySelector("header");
    if (!header) return;

    ensureStyle();
    const controls = normalizeExistingControls(header);

    const menu = document.createElement("div");
    menu.className = "language-menu";
    menu.dataset.generated = "true";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "language-menu-button";
    button.textContent = localeMeta[activeLocale]?.button || localeMeta.ko.button;
    button.setAttribute("aria-haspopup", "true");
    button.setAttribute("aria-expanded", "false");

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

    const switchNode = controls.querySelector(".switch");
    if (switchNode) controls.insertBefore(menu, switchNode);
    else controls.prepend(menu);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountMenu);
  } else {
    mountMenu();
  }
})();
