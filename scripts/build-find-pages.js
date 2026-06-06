const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const IMG =
  "https://minyangtech.n-e.kr/image/%EB%AF%BC%EC%96%91%ED%85%8C%ED%81%AC%20%EB%B0%94%ED%83%95%ED%99%94%EB%A9%B4.png";
const LOGO =
  "https://raw.githubusercontent.com/minyangtech/minyangtech.github.io/main/image/%EB%AF%BC%EC%96%91%20%ED%85%8C%ED%81%AC.png";
const SITE = "https://minyangtech.n-e.kr";

const locales = {
  ko: { prefix: "", lang: "ko", find: "Find" },
  "ja-jp": { prefix: "/ja-jp", lang: "ja", find: "募集" },
  "en-us": { prefix: "/en-us", lang: "en", find: "Find" },
  "zh-cn": { prefix: "/zh-cn", lang: "zh-CN", find: "招募" },
  "ru-ru": { prefix: "/ru-ru", lang: "ru", find: "Поиск команды" },
  "de-de": { prefix: "/de-de", lang: "de", find: "Mitmachen" },
};

const langLinks = [
  ["ja-jp", "日本語"],
  ["en-us", "English"],
  ["zh-cn", "中文"],
  ["ko", "한국어"],
  ["ru-ru", "Русский"],
  ["de-de", "Deutsch"],
];

const findText = {
  ko: {
    title: "민양테크 Find | 모집 공고",
    heading: "Find",
    sub: "민양테크 프로젝트의 모집 공고와 협업 안내를 확인하세요.",
    search: "모집 제목이나 설명 검색...",
    all: "전체",
    open: "자세히 보기",
    empty: "표시할 모집 공고가 없습니다.",
  },
  "ja-jp": {
    title: "MinyangTech Find | 募集",
    heading: "Find",
    sub: "MinyangTechプロジェクトの募集情報と協業案内を確認できます。",
    search: "募集タイトルや説明を検索...",
    all: "すべて",
    open: "詳しく見る",
    empty: "表示できる募集情報がありません。",
  },
  "en-us": {
    title: "MinyangTech Find | Recruitment",
    heading: "Find",
    sub: "Check recruitment posts and collaboration notices for MinyangTech projects.",
    search: "Search recruitment title or description...",
    all: "All",
    open: "View details",
    empty: "No recruitment posts to show.",
  },
  "zh-cn": {
    title: "MinyangTech Find | 招募",
    heading: "Find",
    sub: "查看 MinyangTech 项目的招募公告与协作信息。",
    search: "搜索招募标题或说明...",
    all: "全部",
    open: "查看详情",
    empty: "没有可显示的招募公告。",
  },
  "ru-ru": {
    title: "MinyangTech Find | Набор",
    heading: "Find",
    sub: "Здесь собраны объявления о наборе и сотрудничестве по проектам MinyangTech.",
    search: "Искать по названию или описанию...",
    all: "Все",
    open: "Подробнее",
    empty: "Нет объявлений для показа.",
  },
  "de-de": {
    title: "MinyangTech Find | Ausschreibungen",
    heading: "Find",
    sub: "Hier findest du Ausschreibungen und Kollaborationshinweise für MinyangTech-Projekte.",
    search: "Titel oder Beschreibung suchen...",
    all: "Alle",
    open: "Details ansehen",
    empty: "Keine Ausschreibungen vorhanden.",
  },
};

const findData = {
  ko: [
    {
      id: "1962-general",
      title: "1962: 모스크바 최후의 겨울 작업자 모집",
      project: "1962: The Last Winter In Moscow",
      status: "모집 중",
      tags: ["사운드", "모델링", "Roblox", "비영리/팀 프로젝트"],
      date: "2026-06-06",
      url: "/find/1962general.html",
      summary:
        "1962: The Last Winter In Moscow의 분위기를 함께 만들 사운드 및 모델링 작업자를 모집합니다.",
    },
    {
      id: "stelrun",
      title: "스텔라이브 팬게임 아티스트 모집",
      project: "스텔라이브 팬게임",
      status: "모집 중지",
      tags: ["아트", "2D", "팬게임", "모집 중지"],
      date: "2026-05-17",
      url: "/find/stelrunartist.html",
      summary:
        "스텔라이브 팬게임 프로젝트의 2D 그래픽, 일러스트, UI 아티스트 모집 공고입니다.",
    },
  ],
  "ja-jp": [
    {
      id: "1962-general",
      title: "1962: The Last Winter In Moscow 制作メンバー募集",
      project: "1962: The Last Winter In Moscow",
      status: "募集中",
      tags: ["サウンド", "モデリング", "Roblox", "非営利/チーム制作"],
      date: "2026-06-06",
      url: "/ja-jp/find/1962general.html",
      summary: "作品の空気感を一緒に作るサウンド・モデリング担当を募集しています。",
    },
    {
      id: "stelrun",
      title: "ステラライブファンゲーム アーティスト募集",
      project: "ステラライブファンゲーム",
      status: "募集停止",
      tags: ["アート", "2D", "ファンゲーム", "募集停止"],
      date: "2026-05-17",
      url: "/ja-jp/find/stelrunartist.html",
      summary: "2Dグラフィック、イラスト、UIアーティスト向けの募集案内です。",
    },
  ],
  "en-us": [
    {
      id: "1962-general",
      title: "1962: The Last Winter In Moscow Contributor Recruitment",
      project: "1962: The Last Winter In Moscow",
      status: "Open",
      tags: ["Sound", "Modeling", "Roblox", "Non-profit/team project"],
      date: "2026-06-06",
      url: "/en-us/find/1962general.html",
      summary:
        "We are looking for sound and modeling contributors to shape the atmosphere of 1962: The Last Winter In Moscow.",
    },
    {
      id: "stelrun",
      title: "StelLive Fan Game Artist Recruitment",
      project: "StelLive Fan Game",
      status: "Closed",
      tags: ["Art", "2D", "Fan game", "Closed"],
      date: "2026-05-17",
      url: "/en-us/find/stelrunartist.html",
      summary: "Recruitment notice for 2D graphics, illustration, and UI artists.",
    },
  ],
  "zh-cn": [
    {
      id: "1962-general",
      title: "1962: The Last Winter In Moscow 制作成员招募",
      project: "1962: The Last Winter In Moscow",
      status: "招募中",
      tags: ["音效", "建模", "Roblox", "非营利/团队项目"],
      date: "2026-06-06",
      url: "/zh-cn/find/1962general.html",
      summary:
        "正在招募音效与建模制作人员，一起完成 1962: The Last Winter In Moscow 的氛围。",
    },
    {
      id: "stelrun",
      title: "StelLive 粉丝游戏美术招募",
      project: "StelLive 粉丝游戏",
      status: "已停止",
      tags: ["美术", "2D", "粉丝游戏", "已停止"],
      date: "2026-05-17",
      url: "/zh-cn/find/stelrunartist.html",
      summary: "面向 2D 图形、插画、UI 美术人员的招募公告。",
    },
  ],
  "ru-ru": [
    {
      id: "1962-general",
      title: "1962: The Last Winter In Moscow — набор участников",
      project: "1962: The Last Winter In Moscow",
      status: "Набор открыт",
      tags: ["Звук", "Моделирование", "Roblox", "Некоммерческий/командный проект"],
      date: "2026-06-06",
      url: "/ru-ru/find/1962general.html",
      summary:
        "Ищем специалистов по звуку и моделированию для атмосферы 1962: The Last Winter In Moscow.",
    },
    {
      id: "stelrun",
      title: "Набор художников для фан-игры StelLive",
      project: "Фан-игра StelLive",
      status: "Набор закрыт",
      tags: ["Арт", "2D", "Фан-игра", "Закрыто"],
      date: "2026-05-17",
      url: "/ru-ru/find/stelrunartist.html",
      summary: "Объявление для 2D-графики, иллюстраций и UI.",
    },
  ],
  "de-de": [
    {
      id: "1962-general",
      title: "1962: The Last Winter In Moscow Mitwirkende gesucht",
      project: "1962: The Last Winter In Moscow",
      status: "Offen",
      tags: ["Sound", "Modeling", "Roblox", "Nicht-kommerzielles Teamprojekt"],
      date: "2026-06-06",
      url: "/de-de/find/1962general.html",
      summary:
        "Gesucht werden Sound- und Modeling-Mitwirkende für die Atmosphäre von 1962: The Last Winter In Moscow.",
    },
    {
      id: "stelrun",
      title: "StelLive Fan-Game Künstler gesucht",
      project: "StelLive Fan-Game",
      status: "Geschlossen",
      tags: ["Art", "2D", "Fan-Game", "Geschlossen"],
      date: "2026-05-17",
      url: "/de-de/find/stelrunartist.html",
      summary: "Ausschreibung für 2D-Grafik, Illustration und UI-Künstler.",
    },
  ],
};

const recruit = {
  ko: {
    title: "1962: The Last Winter In Moscow 작업자 모집",
    badge: "사운드 및 모델링 작업자 모집 중",
    h1: "1962: 모스크바 최후의 겨울 프로젝트를 함께하실 사운드/모델링 작업자를 찾습니다",
    lead: "폐허가 된 모스크바와 R-14 감염체의 긴장감을 함께 만들어갈 팀원을 모집합니다.",
    intro: [
      "안녕하세요, 민양테크입니다.",
      "현재 팀 민양테크는 Roblox 기반 생존/공포 프로젝트 <strong>1962: The Last Winter In Moscow</strong>를 개발하고 있습니다.",
      "문서에 정리된 세계관과 수익 정산 기준을 바탕으로, 사운드와 모델링 분야에서 함께 완성도를 올려주실 작업자를 찾고 있습니다.",
    ],
    sections: [
      [
        "모집 분야",
        [
          "공포/아포칼립스 분위기에 맞는 효과음, 환경음, UI 사운드",
          "Roblox Studio에서 활용 가능한 3D 소품, 배경 오브젝트, 폐허/병원/도시 관련 모델링",
          "간단한 리깅 또는 최적화가 가능한 모델 정리",
          "작업물의 파일명, 사용 범위, 출처를 팀에서 관리하기 쉽게 정리하는 협업",
        ],
      ],
      [
        "프로젝트 개요",
        [
          "제목: 1962: The Last Winter In Moscow",
          "한글명: 1962: 모스크바 최후의 겨울",
          "장르: 공포, 아포칼립스, 좀비 아포칼립스, 포스트 아포칼립스",
          "플랫폼: PC, Mobile, Console 중심의 Roblox 경험",
        ],
      ],
      [
        "참고 문서",
        [
          '<a href="/docs/1962/story.html">세계관과 스토리</a>',
          '<a href="/docs/1962/index.html">프로젝트 개요</a>',
          '<a href="/%EC%A0%95%EC%82%B0.html">수익 정산 원칙</a>',
        ],
      ],
      [
        "정산 및 협업 안내",
        [
          "본 프로젝트는 출시 이후 발생 수익을 기준으로 정산합니다.",
          "정산은 별도 정산 규정에 따라 연 2회 진행되며, 개발팀 분배분은 정산일 기준 공식 개발팀 구성원에게 균등 분배됩니다.",
          "참여 전 역할, 작업 범위, 파일 제공 방식, 크레딧 표기, 정산 대상 여부를 팀과 명확히 확인합니다.",
        ],
      ],
    ],
    ctaTitle: "문의 및 지원",
    ctaP:
      "관심이 있으시면 가능한 작업 분야, 예시 작업물, 연락 가능한 시간, 디스코드 닉네임을 함께 적어 지원해주세요.",
    discord: "협업 안내와 연락을 위해 디스코드 닉네임을 반드시 표기해주세요.",
  },
  "ja-jp": {
    title: "1962: The Last Winter In Moscow 制作メンバー募集",
    badge: "サウンド・モデリング担当募集中",
    h1: "1962: The Last Winter In Moscow のサウンド/モデリング担当を募集します",
    lead: "廃墟となったモスクワとR-14感染体の緊張感を一緒に作るメンバーを探しています。",
    intro: [
      "こんにちは、MinyangTechです。",
      "Team MinyangTechはRobloxベースのサバイバル/ホラープロジェクト <strong>1962: The Last Winter In Moscow</strong> を開発しています。",
      "世界観資料と収益分配ルールを前提に、サウンドとモデリング面で完成度を高めてくれる方を募集します。",
    ],
    sections: [
      [
        "募集分野",
        [
          "ホラー/終末感に合う効果音、環境音、UIサウンド",
          "Roblox Studioで使える3D小物、背景、廃墟/病院/都市系モデル",
          "簡単なリギングや最適化を含むモデル整理",
          "ファイル名、使用範囲、出典をチームで管理しやすく整理する協業",
        ],
      ],
      [
        "プロジェクト概要",
        [
          "タイトル: 1962: The Last Winter In Moscow",
          "韓国語名: 1962: モスクワ最後の冬",
          "ジャンル: ホラー、アポカリプス、ゾンビアポカリプス、ポストアポカリプス",
          "プラットフォーム: PC、Mobile、Console中心のRoblox体験",
        ],
      ],
      [
        "参考文書",
        [
          '<a href="/ja-jp/docs/1962/story.html">世界観とストーリー</a>',
          '<a href="/ja-jp/docs/1962/index.html">概要</a>',
          '<a href="/%EC%A0%95%EC%82%B0.html">収益分配原則</a>',
        ],
      ],
      [
        "精算と協業",
        [
          "リリース後に発生した収益を基準に精算します。",
          "精算は規定に従い年2回行われます。",
          "参加前に役割、作業範囲、提供方法、クレジット、精算対象可否を確認します。",
        ],
      ],
    ],
    ctaTitle: "問い合わせ・応募",
    ctaP: "可能な作業分野、サンプル、連絡可能時間、Discord名を添えてご連絡ください。",
    discord: "協業連絡のため、Discordニックネームを必ず記載してください。",
  },
  "en-us": {
    title: "1962: The Last Winter In Moscow Contributor Recruitment",
    badge: "Sound and modeling contributors wanted",
    h1: "We are looking for sound and modeling contributors for 1962: The Last Winter In Moscow",
    lead: "Join us in shaping the ruined Moscow atmosphere and the tension of the R-14 infection.",
    intro: [
      "Hello, this is MinyangTech.",
      "Team MinyangTech is developing the Roblox survival horror project <strong>1962: The Last Winter In Moscow</strong>.",
      "Based on the documented story and settlement rules, we are looking for contributors who can improve the project through sound and modeling work.",
    ],
    sections: [
      [
        "Open roles",
        [
          "Sound effects, ambience, and UI sounds for a horror/apocalypse tone",
          "3D props, environments, ruins, hospitals, and city objects usable in Roblox Studio",
          "Model cleanup, light rigging, or optimization when possible",
          "Collaborative asset organization with clear file names, usage scope, and source notes",
        ],
      ],
      [
        "Project overview",
        [
          "Title: 1962: The Last Winter In Moscow",
          "Korean title: 1962: Moscow's Last Winter",
          "Genre: horror, apocalypse, zombie apocalypse, post-apocalypse",
          "Platform: Roblox experience for PC, mobile, and console",
        ],
      ],
      [
        "References",
        [
          '<a href="/en-us/docs/1962/story.html">Story and setting</a>',
          '<a href="/en-us/docs/1962/index.html">Project overview</a>',
          '<a href="/%EC%A0%95%EC%82%B0.html">Revenue settlement principles</a>',
        ],
      ],
      [
        "Settlement and collaboration",
        [
          "Settlement applies to revenue generated after release.",
          "Settlement is planned twice a year according to the separate rule page.",
          "Before joining, we confirm role, work scope, file delivery, credit, and settlement eligibility clearly.",
        ],
      ],
    ],
    ctaTitle: "Contact and apply",
    ctaP:
      "Please include your possible work area, sample work, available contact time, and Discord nickname.",
    discord: "Please include your Discord nickname for collaboration communication.",
  },
  "zh-cn": {
    title: "1962: The Last Winter In Moscow 制作成员招募",
    badge: "音效与建模制作人员招募中",
    h1: "招募 1962: The Last Winter In Moscow 的音效/建模制作人员",
    lead: "一起塑造废墟莫斯科与 R-14 感染体带来的紧张氛围。",
    intro: [
      "您好，这里是 MinyangTech。",
      "Team MinyangTech 正在开发 Roblox 生存恐怖项目 <strong>1962: The Last Winter In Moscow</strong>。",
      "基于已整理的世界观文档与收益结算规则，我们正在寻找能在音效和建模方面提升完成度的成员。",
    ],
    sections: [
      [
        "招募领域",
        [
          "适合恐怖/末日氛围的音效、环境音、UI声音",
          "可在 Roblox Studio 使用的3D道具、背景、废墟/医院/城市模型",
          "简单绑定或优化相关的模型整理",
          "便于团队管理的文件名、使用范围、来源整理",
        ],
      ],
      [
        "项目概要",
        [
          "标题: 1962: The Last Winter In Moscow",
          "韩文名: 1962: 莫斯科最后的冬天",
          "类型: 恐怖、末日、僵尸末日、后末日",
          "平台: 面向 PC、移动、主机的 Roblox 体验",
        ],
      ],
      [
        "参考文档",
        [
          '<a href="/zh-cn/docs/1962/story.html">世界观与故事</a>',
          '<a href="/zh-cn/docs/1962/index.html">项目概要</a>',
          '<a href="/%EC%A0%95%EC%82%B0.html">收益结算原则</a>',
        ],
      ],
      [
        "结算与协作",
        [
          "结算以发布后产生的收益为准。",
          "结算按单独规定每年两次进行。",
          "参加前会明确确认职责、工作范围、文件提交、署名和结算资格。",
        ],
      ],
    ],
    ctaTitle: "咨询与申请",
    ctaP: "请附上可负责领域、示例作品、可联系时间和 Discord 昵称。",
    discord: "为了协作联系，请务必填写 Discord 昵称。",
  },
  "ru-ru": {
    title: "1962: The Last Winter In Moscow — набор участников",
    badge: "Нужны звук и моделирование",
    h1: "Ищем специалистов по звуку и моделированию для 1962: The Last Winter In Moscow",
    lead: "Помогите создать атмосферу разрушенной Москвы и напряжение вокруг заражения R-14.",
    intro: [
      "Здравствуйте, это MinyangTech.",
      "Team MinyangTech разрабатывает survival horror проект Roblox <strong>1962: The Last Winter In Moscow</strong>.",
      "На основе документации по миру и правил распределения прибыли мы ищем участников для звука и моделирования.",
    ],
    sections: [
      [
        "Кого ищем",
        [
          "Звуковые эффекты, ambience и UI-звуки для хоррор/апокалипсис атмосферы",
          "3D-пропсы, окружение, руины, больницы и городские модели для Roblox Studio",
          "Очистка моделей, простая оптимизация или риггинг",
          "Аккуратная организация ассетов: имена файлов, область использования, источники",
        ],
      ],
      [
        "О проекте",
        [
          "Название: 1962: The Last Winter In Moscow",
          "Корейское название: 1962: последняя зима Москвы",
          "Жанр: хоррор, апокалипсис, зомби-апокалипсис, постапокалипсис",
          "Платформа: Roblox для PC, Mobile, Console",
        ],
      ],
      [
        "Материалы",
        [
          '<a href="/ru-ru/docs/1962/story.html">История и мир</a>',
          '<a href="/ru-ru/docs/1962/index.html">Обзор</a>',
          '<a href="/%EC%A0%95%EC%82%B0.html">Правила распределения прибыли</a>',
        ],
      ],
      [
        "Расчеты и сотрудничество",
        [
          "Расчет применяется к доходам после релиза.",
          "Расчеты проходят дважды в год по отдельному регламенту.",
          "До участия уточняются роль, объем работ, передача файлов, кредиты и право на расчет.",
        ],
      ],
    ],
    ctaTitle: "Связь и заявка",
    ctaP: "Укажите направление работы, примеры, удобное время связи и ник Discord.",
    discord: "Для сотрудничества обязательно укажите ник Discord.",
  },
  "de-de": {
    title: "1962: The Last Winter In Moscow Mitwirkende gesucht",
    badge: "Sound- und Modeling-Mitwirkende gesucht",
    h1: "Wir suchen Sound- und Modeling-Mitwirkende für 1962: The Last Winter In Moscow",
    lead: "Hilf uns, das zerstörte Moskau und die Spannung der R-14-Infektion greifbar zu machen.",
    intro: [
      "Hallo, hier ist MinyangTech.",
      "Team MinyangTech entwickelt das Roblox-Survival-Horror-Projekt <strong>1962: The Last Winter In Moscow</strong>.",
      "Auf Basis der Story-Dokumente und der Abrechnungsregeln suchen wir Mitwirkende für Sound und Modeling.",
    ],
    sections: [
      [
        "Gesuchte Bereiche",
        [
          "Soundeffekte, Ambience und UI-Sounds für Horror/Apokalypse",
          "3D-Requisiten, Umgebungen, Ruinen, Krankenhäuser und Stadtobjekte für Roblox Studio",
          "Model-Cleanup, leichte Optimierung oder Rigging",
          "Saubere Asset-Organisation mit Dateinamen, Nutzungsbereich und Quellen",
        ],
      ],
      [
        "Projektüberblick",
        [
          "Titel: 1962: The Last Winter In Moscow",
          "Koreanischer Titel: 1962: Moskaus letzter Winter",
          "Genre: Horror, Apokalypse, Zombie-Apokalypse, Postapokalypse",
          "Plattform: Roblox-Erlebnis für PC, Mobile und Console",
        ],
      ],
      [
        "Referenzen",
        [
          '<a href="/de-de/docs/1962/story.html">Story und Setting</a>',
          '<a href="/de-de/docs/1962/index.html">Projektübersicht</a>',
          '<a href="/%EC%A0%95%EC%82%B0.html">Umsatzabrechnungsregeln</a>',
        ],
      ],
      [
        "Abrechnung und Zusammenarbeit",
        [
          "Abrechnung gilt für Einnahmen nach Release.",
          "Die Abrechnung erfolgt zweimal jährlich nach separatem Regelwerk.",
          "Vor Teilnahme werden Rolle, Umfang, Dateiabgabe, Credits und Abrechnungsberechtigung geklärt.",
        ],
      ],
    ],
    ctaTitle: "Kontakt und Bewerbung",
    ctaP: "Bitte nenne Arbeitsbereich, Beispiele, Kontaktzeit und Discord-Nickname.",
    discord: "Für die Zusammenarbeit bitte unbedingt den Discord-Nickname angeben.",
  },
};

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function navItems(locale, active) {
  const p = locales[locale].prefix;
  const href = (path) => (p ? p + path : path);
  const items = [
    [href("/docs/index.html"), locale === "ko" ? "Docs" : findNavLabel(locale, "docs"), "docs"],
    [href("/news/index.html"), locale === "ko" ? "News" : findNavLabel(locale, "news"), "news"],
    [href("/apps.html"), locale === "ko" ? "Apps" : findNavLabel(locale, "apps"), "apps"],
    [href("/Find.html"), locales[locale].find, "find"],
    [href("/portfolio.html"), locale === "ko" ? "Portfolio" : findNavLabel(locale, "portfolio"), "portfolio"],
    [href("/issues.html"), locale === "ko" ? "Issues" : findNavLabel(locale, "issues"), "issues"],
    [href("/Contributing.html"), "Contributing", "contributing"],
    [href("/eula.html"), "EULA", "eula"],
  ];
  return items
    .map(([h, t, k]) => {
      const cls = k === active ? ' class="active"' : "";
      return `<li><a href="${h}"${cls}>${esc(t)}</a></li>`;
    })
    .join("\n                    ");
}

function findNavLabel(locale, key) {
  const map = {
    "ja-jp": { docs: "ドキュメント", news: "ニュース", apps: "アプリ", portfolio: "ポートフォリオ", issues: "課題" },
    "en-us": { docs: "Docs", news: "News", apps: "Apps", portfolio: "Portfolio", issues: "Issues" },
    "zh-cn": { docs: "文档", news: "新闻", apps: "应用", portfolio: "作品集", issues: "问题" },
    "ru-ru": {
      docs: "Документы",
      news: "Новости",
      apps: "Приложения",
      portfolio: "Портфолио",
      issues: "Задачи",
    },
    "de-de": { docs: "Dokumente", news: "News", apps: "Apps", portfolio: "Portfolio", issues: "Issues" },
  };
  return map[locale]?.[key] || key;
}

function langMenu(locale, basePath) {
  return langLinks
    .map(([code, label]) => {
      const href = code === "ko" ? basePath : `/${code}${basePath}`;
      const cls = code === locale ? ' class="active"' : "";
      return `<a${cls} href="${href}">${label}</a>`;
    })
    .join("\n                    ");
}

function metaBlock(title, desc, url) {
  const t = esc(title);
  const d = esc(desc);
  return `<title>${t}</title>
    <meta name="description" content="${d}">
    <meta property="og:title" content="${t}">
    <meta property="og:description" content="${d}">
    <meta property="og:image" content="${IMG}">
    <meta property="og:url" content="${SITE}${url}">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${t}">
    <meta name="twitter:description" content="${d}">
    <meta name="twitter:image" content="${IMG}">`;
}

const baseStyle = `
        :root { --accent: #007bff; --txt: #333; --bg: #fff; --brd: #eee; --card-bg: #fff; --muted: #667085; --soft: rgba(0,123,255,0.08); }
        body.dark-mode { --txt: #f5f5f5; --bg: #121212; --brd: #333; --card-bg: #1e1e1e; --muted: #a5adba; --soft: rgba(0,123,255,0.16); }
        * { box-sizing: border-box; }
        body { font-family: 'Pretendard', system-ui, sans-serif; background: radial-gradient(circle at 10% 0%, var(--soft), transparent 32rem), var(--bg); color: var(--txt); margin: 0; line-height: 1.7; transition: 0.25s; }
        header { width: 100%; min-height: 80px; display: flex; justify-content: space-between; align-items: center; padding: 0 5%; border-bottom: 1px solid var(--brd); background: color-mix(in srgb, var(--bg) 92%, transparent); backdrop-filter: blur(14px); position: sticky; top: 0; z-index: 1000; box-sizing: border-box; }
        .header-left { display: flex; align-items: center; gap: 28px; min-width: 0; }
        .logo-link img { height: 40px !important; width: auto !important; display: block; }
        .nav-links { display: flex; list-style: none; gap: 22px; margin: 0; padding: 0; align-items: center; }
        .nav-links a { text-decoration: none; color: var(--txt); font-weight: 700; opacity: 0.72; transition: 0.2s; white-space: nowrap; }
        .nav-links a:hover, .nav-links a.active { opacity: 1; color: var(--accent); }
        .nav-links a.active { border-bottom: 2px solid var(--accent); }
        .controls { display: flex; align-items: center; gap: 14px; }
        .language-menu { position: relative; }
        .language-menu-button { min-height: 34px; padding: 0 12px; border: 1px solid var(--brd); border-radius: 999px; background: var(--card-bg); color: var(--txt); font-weight: 800; cursor: pointer; }
        .language-menu-list { position: absolute; top: calc(100% + 8px); right: 0; display: none; min-width: 180px; padding: 8px; border: 1px solid var(--brd); border-radius: 16px; background: var(--card-bg); box-shadow: 0 18px 45px rgba(0,0,0,0.18); }
        .language-menu:hover .language-menu-list, .language-menu:focus-within .language-menu-list { display: grid; gap: 4px; }
        .language-menu-list a { padding: 8px 10px; border-radius: 10px; color: var(--txt); text-decoration: none; font-weight: 800; white-space: nowrap; }
        .language-menu-list a:hover, .language-menu-list a.active { background: color-mix(in srgb, var(--accent) 12%, transparent); color: var(--accent); }
        .switch { width: 44px; height: 22px; position: relative; display: inline-block; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; inset: 0; background: #ccc; border-radius: 20px; transition: 0.3s; }
        .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 3px; bottom: 3px; background: #fff; border-radius: 50%; transition: 0.3s; }
        input:checked + .slider { background: var(--accent); }
        input:checked + .slider:before { transform: translateX(22px); }
        main { max-width: 1120px; min-height: calc(100vh - 160px); margin: 0 auto; padding: 70px 20px; }
        footer { width: 100%; padding: 56px 20px 42px; border-top: 1px solid var(--brd); text-align: center; background: var(--bg); }
        .footer-sns { display: flex; justify-content: center; gap: 30px; margin-bottom: 20px; align-items: center; }
        .x-logo-img { height: 24px !important; width: auto !important; filter: invert(1); transition: 0.3s; }
        body.dark-mode .x-logo-img { filter: invert(0); }
        .fa-youtube { font-size: 32px !important; color: #ff0000 !important; }
        .footer-email a { color: var(--txt); opacity: 0.65; text-decoration: none; }
        .footer-copyright { opacity: 0.45; font-size: 0.86rem; margin-top: 12px; }
        @media (max-width: 900px) { header { align-items: flex-start; padding: 12px 4%; gap: 10px; } .header-left { gap: 12px; flex: 1 1 auto; } header nav { min-width: 0; flex: 1 1 auto; } .nav-links { overflow-x: auto; gap: 12px; padding-bottom: 2px; } .nav-links li { flex: 0 0 auto; } .nav-links a { font-size: 14px; } main { padding: 44px 18px; } }
`;

const footer = `
    <footer>
        <h3 style="margin-bottom:20px;">Connect with Us</h3>
        <div class="footer-sns">
            <a href="https://x.com/minyangtech" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/minyangtech/minyangtech.github.io/main/image/logo-white.png" class="x-logo-img" alt="X"></a>
            <a href="https://www.youtube.com/@minyangtech" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-youtube"></i></a>
        </div>
        <div class="footer-email"><a href="mailto:support@minyangtech.n-e.kr">support@minyangtech.n-e.kr</a></div>
        <div class="footer-copyright"><p>Copyright 2026. MinyangTech. All rights reserved.</p></div>
    </footer>
    <script src="/assets/js/translation-menu.js"></script>
    <script>
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('change', () => {
                const isDark = document.body.classList.toggle('dark-mode');
                localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
            });
            window.addEventListener('DOMContentLoaded', () => {
                if (localStorage.getItem('darkMode') === 'enabled') {
                    document.body.classList.add('dark-mode');
                    darkModeToggle.checked = true;
                }
            });
        }
    </script>
</body>
</html>`;

function pageShell(locale, active, title, desc, urlPath, extraStyle, bodyHtml, withLang = true) {
  const l = locales[locale];
  const translateBtn =
    locale === "ko"
      ? "번역"
      : locale === "ja-jp"
        ? "翻訳"
        : locale === "zh-cn"
          ? "翻译"
          : locale === "ru-ru"
            ? "Перевести"
            : locale === "de-de"
              ? "Übersetzen"
              : "Translate";
  const langBlock = withLang
    ? `<div class="language-menu">
                <button class="language-menu-button" type="button">${translateBtn}</button>
                <div class="language-menu-list">
                    ${langMenu(locale, urlPath)}
                </div>
            </div>`
    : "";
  return `<!DOCTYPE html>
<html lang="${l.lang}">
<head>
    <link rel="icon" href="https://github.com/minyangtech/minyangtech.github.io/blob/main/image/%EB%AF%BC%EC%96%91%20%ED%85%8C%ED%81%AC.png?raw=true" type="image/x-icon">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${metaBlock(title, desc, (l.prefix || "") + urlPath)}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha384-iw3OoTErCYJJB9mCa8LNS2hbsQ7M3C0EpIsO/H5+EGAkPGc6rk+V8i04oW/K5xq0" crossorigin="anonymous">
    <link rel="stylesheet" href="/common.css">
    <link rel="stylesheet" href="/assets/css/header-unified.css">
    <style>${baseStyle}${extraStyle}</style>
</head>
<body>
    <header>
        <div class="header-left">
            <a href="https://minyangtech.n-e.kr" class="logo-link">
                <img src="${LOGO}" alt="Logo">
            </a>
            <nav>
                <ul class="nav-links">
                    ${navItems(locale, active)}
                </ul>
            </nav>
        </div>
        <div class="controls">
            ${langBlock}
            <label class="switch">
                <input type="checkbox" id="dark-mode-toggle">
                <span class="slider"></span>
            </label>
        </div>
    </header>
    ${bodyHtml}
    ${footer}`;
}

function buildFindIndex(locale) {
  const t = findText[locale];
  const p = locales[locale].prefix;
  const jsonUrl = p ? `${p}/Find.json` : "/Find.json";
  const findStyle = `
        .page-header { text-align: center; margin-bottom: 34px; }
        .page-header h1 { font-size: clamp(2.4rem, 5vw, 4.2rem); margin: 0 0 10px; letter-spacing: -0.06em; }
        .page-header p { margin: 0; color: var(--muted); font-weight: 700; }
        .find-tools { display: flex; gap: 14px; margin: 28px 0 30px; flex-wrap: wrap; }
        .find-tools input, .find-tools select { border: 1px solid var(--brd); background: var(--card-bg); color: var(--txt); border-radius: 16px; padding: 13px 15px; font-weight: 700; outline: none; }
        .find-tools input { flex: 1 1 320px; }
        .find-tools select { min-width: 160px; }
        .find-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
        .find-card { display: flex; flex-direction: column; gap: 14px; padding: 24px; border: 1px solid var(--brd); border-radius: 24px; background: var(--card-bg); text-decoration: none; color: var(--txt); transition: 0.22s; box-shadow: 0 12px 34px rgba(0,0,0,0.05); }
        .find-card:hover { transform: translateY(-5px); border-color: var(--accent); box-shadow: 0 18px 44px rgba(0,0,0,0.1); }
        .find-card h2 { margin: 0; font-size: 1.25rem; line-height: 1.35; }
        .find-card p { margin: 0; color: var(--muted); }
        .find-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 0.86rem; }
        .badge { display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px; border-radius: 999px; font-weight: 900; background: color-mix(in srgb, var(--accent) 12%, transparent); color: var(--accent); }
        .badge.closed { background: rgba(148,163,184,0.16); color: #94a3b8; }
        .tag-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .tag-list span { padding: 4px 9px; border-radius: 999px; border: 1px solid var(--brd); color: var(--muted); font-weight: 700; font-size: 0.82rem; }
        .open-link { margin-top: auto; color: var(--accent); font-weight: 900; }
    `;
  const script = `
    <script>
        const texts = ${JSON.stringify({ all: t.all, empty: t.empty, open: t.open })};
        const dataUrl = "${jsonUrl}";
        const feed = document.getElementById('find-feed');
        const search = document.getElementById('find-search');
        const statusFilter = document.getElementById('find-status');
        let posts = [];
        const normalize = (value) => String(value || '').toLowerCase();
        const isClosed = (status) => {
            const s = normalize(status);
            return s.includes('중지') || s.includes('closed') || s.includes('закрыт') || s.includes('geschlossen') || s.includes('停止') || s.includes('已停止');
        };
        function makeCard(item) {
            const card = document.createElement('a');
            card.className = 'find-card';
            card.href = item.url;
            const meta = document.createElement('div');
            meta.className = 'find-meta';
            const badge = document.createElement('span');
            badge.className = 'badge' + (isClosed(item.status) ? ' closed' : '');
            badge.textContent = item.status;
            const date = document.createElement('span');
            date.textContent = item.date || '';
            meta.append(badge, date);
            const title = document.createElement('h2');
            title.textContent = item.title;
            const project = document.createElement('p');
            project.textContent = item.project;
            const summary = document.createElement('p');
            summary.textContent = item.summary;
            const tags = document.createElement('div');
            tags.className = 'tag-list';
            (item.tags || []).forEach((tag) => {
                const span = document.createElement('span');
                span.textContent = tag;
                tags.appendChild(span);
            });
            const open = document.createElement('span');
            open.className = 'open-link';
            open.textContent = texts.open + ' →';
            card.append(meta, title, project, summary, tags, open);
            return card;
        }
        function render() {
            const q = normalize(search.value);
            const selected = statusFilter.value;
            const filtered = posts.filter((item) => {
                const bag = normalize([item.title, item.project, item.summary, ...(item.tags || []), item.status].join(' '));
                return (!q || bag.includes(q)) && (!selected || item.status === selected);
            });
            feed.innerHTML = '';
            if (!filtered.length) {
                const p = document.createElement('p');
                p.textContent = texts.empty;
                feed.appendChild(p);
                return;
            }
            filtered.forEach((item) => feed.appendChild(makeCard(item)));
        }
        fetch(dataUrl).then((r) => r.json()).then((items) => {
            posts = Array.isArray(items) ? items : [];
            const statuses = [...new Set(posts.map((item) => item.status).filter(Boolean))];
            statuses.forEach((status) => {
                const option = document.createElement('option');
                option.value = status;
                option.textContent = status;
                statusFilter.appendChild(option);
            });
            render();
        }).catch(() => { feed.textContent = texts.empty; });
        search.addEventListener('input', render);
        statusFilter.addEventListener('change', render);
    </script>`;
  const body = `
    <main>
        <section class="page-header">
            <h1>${esc(t.heading)}</h1>
            <p>${esc(t.sub)}</p>
        </section>
        <section class="find-tools" aria-label="Find filters">
            <input id="find-search" type="search" placeholder="${esc(t.search)}">
            <select id="find-status"><option value="">${esc(t.all)}</option></select>
        </section>
        <section id="find-feed" class="find-grid"></section>
    </main>
    ${script}`;
  return pageShell(locale, "find", t.title, t.sub, "/Find.html", findStyle, body);
}

function buildRecruit(locale) {
  const c = recruit[locale];
  const recruitStyle = `
        .notice-header { text-align: center; margin-bottom: 34px; }
        .notice-badge { display: inline-flex; gap: 8px; align-items: center; padding: 8px 14px; border: 1px solid rgba(0,123,255,0.25); border-radius: 999px; background: var(--soft); color: var(--accent); font-weight: 900; margin-bottom: 18px; }
        .notice-header h1 { font-size: clamp(2rem, 4vw, 3.15rem); line-height: 1.18; letter-spacing: -0.055em; margin: 0 0 14px; word-break: keep-all; }
        .notice-header p { margin: 0; color: var(--muted); font-weight: 700; word-break: keep-all; }
        .policy-card { background: var(--card-bg); border: 1px solid var(--brd); padding: 42px; border-radius: 28px; box-shadow: 0 18px 45px rgba(0,0,0,0.07); }
        .intro-box { padding: 22px 24px; border: 1px solid rgba(0,123,255,0.24); border-radius: 22px; background: linear-gradient(135deg, var(--soft), rgba(124,92,255,0.12)); margin-bottom: 30px; }
        .policy-section { margin-bottom: 30px; }
        .policy-section h2 { font-size: 1.25rem; color: var(--accent); margin: 0 0 14px; }
        .policy-section ul { margin: 0; padding-left: 22px; }
        .policy-section li { margin-bottom: 8px; }
        .policy-section a { color: var(--accent); font-weight: 800; text-decoration: none; }
        .cta-box { border: 1px solid rgba(0,123,255,0.28); border-radius: 22px; padding: 24px; background: var(--soft); text-align: center; }
        .cta-box a { display: inline-flex; margin-top: 12px; padding: 12px 18px; border-radius: 999px; background: var(--accent); color: #fff; text-decoration: none; font-weight: 900; }
        .required-note { margin-top: 14px; padding: 12px 14px; border-radius: 16px; border: 1px solid rgba(0,123,255,0.28); font-weight: 800; }
        @media (max-width: 700px) { .policy-card { padding: 26px; } }
    `;
  const sections = c.sections
    .map(
      ([heading, items]) =>
        `<section class="policy-section"><h2>${esc(heading)}</h2><ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul></section>`
    )
    .join("");
  const body = `
    <main>
        <section class="notice-header">
            <div class="notice-badge"><i class="fa-solid fa-users"></i> ${esc(c.badge)}</div>
            <h1>${esc(c.h1)}</h1>
            <p>${esc(c.lead)}</p>
        </section>
        <div class="policy-card">
            <div class="intro-box">${c.intro.map((p) => `<p>${p}</p>`).join("")}</div>
            ${sections}
            <div class="cta-box">
                <h2><i class="fa-solid fa-envelope"></i> ${esc(c.ctaTitle)}</h2>
                <p>${esc(c.ctaP)}</p>
                <p class="required-note">${esc(c.discord)}</p>
                <a href="mailto:support@minyangtech.n-e.kr?subject=%5B1962%20%EC%9E%91%EC%97%85%EC%9E%90%20%EC%A7%80%EC%9B%90%5D"><i class="fa-solid fa-paper-plane"></i> support@minyangtech.n-e.kr</a>
            </div>
        </div>
    </main>`;
  return pageShell(locale, "find", c.title, c.lead, "/find/1962general.html", recruitStyle, body);
}

function buildSettlement() {
  const title = "1962 수익 정산표 | 팀 민양테크";
  const desc = "1962: 모스크바 최후의 겨울 프로젝트의 분쟁 방지 수익 정산표입니다.";
  const style = `
        .settlement-card { max-width: 980px; margin: 0 auto; background: var(--card-bg); border: 1px solid var(--brd); border-radius: 28px; padding: 42px; box-shadow: 0 18px 45px rgba(0,0,0,0.07); }
        .settlement-card h1 { font-size: 2.4rem; line-height: 1.2; margin: 0 0 8px; letter-spacing: -0.04em; }
        .settlement-card .meta { color: var(--muted); font-weight: 800; margin-bottom: 28px; }
        .settlement-card h2 { color: var(--accent); margin: 34px 0 12px; font-size: 1.24rem; }
        .settlement-card p { margin: 0 0 10px; word-break: keep-all; }
        .settlement-card ul, .settlement-card ol { padding-left: 24px; }
        .settlement-card li { margin-bottom: 8px; }
        .notice { padding: 16px 18px; border: 1px solid rgba(0,123,255,0.25); border-radius: 18px; background: var(--soft); margin: 26px 0; font-weight: 800; }
        @media (max-width: 900px) { .settlement-card { padding: 26px; } }
    `;
  const body = `
    <main>
        <article class="settlement-card">
            <h1>분쟁 방지 수익 정산표</h1>
            <p class="meta">1962: 모스크바 최후의 겨울<br>제정일: 2026.06.04.<br>제공자: 팀 민양테크</p>
            <section><h2>제1조 (정산 주기)</h2><p>수익의 정산은 연 2회 실시한다.</p><ul><li>매년 1월 1일</li><li>매년 6월 1일</li></ul><p>정산일이 변경될 경우 개발팀에 사전 공지한다.</p></section>
            <section><h2>제2조 (수익 분배)</h2><p>정산 대상 수익은 Roblox 수수료, 환불 및 기타 공제 항목을 제외한 실제 수령 가능한 금액을 기준으로 한다.</p><p>수익은 다음과 같이 분배한다.</p><ul><li>그룹 자본금 적립: 20%</li><li>개발팀 분배: 80%</li></ul><p>개발팀 분배분은 정산일 기준 개발팀 구성원에게 균등하게 분배한다.</p></section>
            <section><h2>제3조 (개발팀 구성원)</h2><p>개발팀 구성원은 팀 민양테크가 공식적으로 인정한 인원으로 한다.</p><p>정산 대상자는 정산일 기준 개발팀 명단에 포함된 구성원으로 한다.</p></section>
            <section><h2>제4조 (중도 탈퇴 및 제명)</h2><p>개발팀 구성원이 자발적으로 탈퇴하거나 제명된 경우, 탈퇴일 또는 제명일 이후 발생한 수익에 대한 분배 권리를 갖지 않는다.</p><p>다만 별도의 서면 합의가 존재하는 경우 해당 합의를 우선 적용한다.</p></section>
            <section><h2>제5조 (인원 변동)</h2><p>개발팀 인원 수가 변경될 경우 정산일 기준 인원 수에 따라 균등 분배한다.</p><p>예를 들어 정산일 기준 개발팀 인원이 4명인 경우, 개발팀 분배분(80%)을 4명이 균등하게 나눈다.</p></section>
            <section><h2>제6조 (정산 제외 항목)</h2><p>다음 항목은 정산 대상에서 제외한다.</p><ul><li>Roblox 플랫폼 수수료</li><li>환불된 금액</li><li>보류(Pending) 상태의 Robux</li><li>Roblox 정책 또는 시스템에 의해 지급이 제한된 금액</li><li>기타 실제 지급이 불가능한 금액</li></ul></section>
            <section><h2>제7조 (정산 지연)</h2><p>Roblox 정책 변경, 시스템 장애, 지급 제한 등의 사유로 정산이 불가능한 경우 정산을 연기할 수 있다.</p><p>정산이 연기될 경우 사유를 개발팀에 공지한다.</p></section>
            <section><h2>제8조 (정산 내역 공개)</h2><p>정산 시 다음 정보를 개발팀에게 공개한다.</p><ul><li>총 정산 대상 수익</li><li>그룹 자본금 적립액</li><li>개발팀 분배 총액</li><li>개인별 분배 금액</li></ul></section>
            <section><h2>제9조 (규정 변경)</h2><p>본 규정은 팀 민양테크가 개정할 수 있다.</p><p>규정 변경 시 개발팀에게 사전에 공지하며, 변경된 규정은 공지 이후 발생하는 수익부터 적용한다.</p></section>
            <div class="notice">본 규정은 2026년 6월 4일부터 시행한다.<br>팀 민양테크</div>
            <section><h2>제3조에 의거한 개발팀 명단</h2><ol><li>@Whoasked</li><li>&lt;@1272522978403422259&gt;</li><li>GetSystemMetrics</li></ol><p><strong>합계:</strong> 총 3인</p><p>* 나중에 Google Docs로 정리합니다.</p><p>** 수익정산은 출시 이후 발생수익으로 정산합니다.</p></section>
        </article>
    </main>`;
  return pageShell("ko", "", title, desc, "/%EC%A0%95%EC%82%B0.html", style, body, false);
}

// --- generate pages ---
for (const locale of Object.keys(locales)) {
  const baseDir = locale === "ko" ? root : path.join(root, locale);
  write(path.join(baseDir, "Find.json"), JSON.stringify(findData[locale], null, 2) + "\n");
  // find.html redirect first; Find.html last (Windows FS is case-insensitive)
  write(
    path.join(baseDir, "find.html"),
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta http-equiv="refresh" content="0; url=./Find.html"><title>Find</title></head><body><a href="./Find.html">Find</a></body></html>\n'
  );
  write(path.join(baseDir, "Find.html"), buildFindIndex(locale));
  write(path.join(baseDir, "find", "1962general.html"), buildRecruit(locale));
}

write(path.join(root, "정산.html"), buildSettlement());

// --- nav injection ---
function detectLocale(relPath) {
  const first = relPath.split(path.sep)[0];
  return Object.keys(locales).includes(first) && first !== "ko" ? first : "ko";
}

function ensureFindNav(text, locale) {
  if (/href=["'][^"']*\/Find\.html/i.test(text)) return text;
  const p = locales[locale].prefix;
  const findHref = p ? `${p}/Find.html` : "/Find.html";
  const findLabel = locales[locale].find;
  const item = `\n                    <li><a href="${findHref}">${findLabel}</a></li>`;
  const afterApps = /(<li><a[^>]*href=["'][^"']*apps[^"']*["'][^>]*>.*?<\/a><\/li>)/i;
  const m = text.match(afterApps);
  if (m) return text.slice(0, m.index + m[0].length) + item + text.slice(m.index + m[0].length);
  const beforePortfolio = /(<li><a[^>]*href=["'][^"']*portfolio[^"']*["'][^>]*>)/i;
  const m2 = text.match(beforePortfolio);
  if (m2) return text.slice(0, m2.index) + `<li><a href="${findHref}">${findLabel}</a></li>\n                    ` + text.slice(m2.index);
  return text;
}

function walkHtml(dir, cb) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "g" || entry.name === ".git" || entry.name === "node_modules") continue;
      walkHtml(full, cb);
    } else if (entry.name.endsWith(".html") && entry.name.toLowerCase() !== "find.html") {
      cb(full);
    }
  }
}

let navUpdated = 0;
walkHtml(root, (filePath) => {
  const rel = path.relative(root, filePath);
  const locale = detectLocale(rel);
  const text = fs.readFileSync(filePath, "utf8");
  if (!text.includes("nav-links")) return;
  const updated = ensureFindNav(text, locale);
  if (updated !== text) {
    fs.writeFileSync(filePath, updated, "utf8");
    navUpdated++;
  }
});

// --- embed meta for docs/find ---
function pageTitle(text) {
  const m = text.match(/<title>(.*?)<\/title>/is);
  return m ? m[1].replace(/\s+/g, " ").trim() : "민양테크";
}

function pageDesc(filePath, text, locale) {
  const m = text.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/is);
  if (m) return m[1].trim();
  const rel = filePath.replace(/\\/g, "/");
  if (rel.includes("/docs/") || rel.startsWith("docs/")) {
    return locale === "ko"
      ? "민양테크 공식 문서와 프로젝트 정보를 확인하세요."
      : "MinyangTech official documentation and project information.";
  }
  if (rel.includes("/find/") || /find\.html$/i.test(rel)) {
    return findText[locale]?.sub || findText.ko.sub;
  }
  return locale === "ko" ? "민양테크 공식 웹사이트입니다." : "MinyangTech official website.";
}

function ensureMeta(text, kind, key, content) {
  const attr = kind === "property" ? "property" : "name";
  const pattern = new RegExp(`<meta\\s+${attr}=["']${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']\\s+content=["'][^"']*["']\\s*/?>`, "i");
  const tag = `<meta ${attr}="${key}" content="${content.replace(/"/g, "&quot;")}">`;
  if (pattern.test(text)) return text.replace(pattern, tag);
  const m = text.match(/<\/title>/i);
  if (m) return text.slice(0, m.index + m[0].length) + "\n    " + tag + text.slice(m.index + m[0].length);
  return text;
}

const metaTargets = new Set();
for (const locale of Object.keys(locales)) {
  const base = locale === "ko" ? root : path.join(root, locale);
  const docsDir = path.join(base, "docs");
  const findDir = path.join(base, "find");
  if (fs.existsSync(docsDir)) {
    walkHtml(docsDir, (p) => metaTargets.add(p));
  }
  if (fs.existsSync(findDir)) {
    walkHtml(findDir, (p) => metaTargets.add(p));
  }
  const findPage = path.join(base, "Find.html");
  if (fs.existsSync(findPage)) metaTargets.add(findPage);
}

let metaUpdated = 0;
for (const filePath of metaTargets) {
  const rel = path.relative(root, filePath).replace(/\\/g, "/");
  const locale = detectLocale(rel);
  let text = fs.readFileSync(filePath, "utf8");
  const title = pageTitle(text);
  const desc = pageDesc(filePath, text, locale);
  const urlPath = "/" + rel;
  const fullUrl = SITE + urlPath;
  const before = text;
  for (const [kind, key, content] of [
    ["name", "description", desc],
    ["property", "og:title", title],
    ["property", "og:description", desc],
    ["property", "og:image", IMG],
    ["property", "og:url", fullUrl],
    ["property", "og:type", "website"],
    ["name", "twitter:card", "summary_large_image"],
    ["name", "twitter:title", title],
    ["name", "twitter:description", desc],
    ["name", "twitter:image", IMG],
  ]) {
    text = ensureMeta(text, kind, key, content);
  }
  if (text !== before) {
    fs.writeFileSync(filePath, text, "utf8");
    metaUpdated++;
  }
}

// --- translation-menu.js ---
const tmPath = path.join(root, "assets", "js", "translation-menu.js");
let tm = fs.readFileSync(tmPath, "utf8");
const findLabels = {
  ko: "Find",
  "ja-jp": "募集",
  "en-us": "Find",
  "zh-cn": "招募",
  "ru-ru": "Поиск команды",
  "de-de": "Mitmachen",
};
for (const [locale, label] of Object.entries(findLabels)) {
  const key = locale === "ko" ? "ko:" : `"${locale}":`;
  if (!tm.includes(`find: "${label}"`) && tm.includes(key)) {
    tm = tm.replace(
      new RegExp(`(${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\{[^}]*)(contributing:)`),
      `$1find: "${label}", $2`
    );
  }
}
if (!tm.includes('href.includes("/find")') && !tm.includes('href.includes("/Find")')) {
  tm = tm.replace(
    'if (href.includes("/apps")) link.textContent = labels.apps || link.textContent;',
    'if (href.includes("/apps")) link.textContent = labels.apps || link.textContent;\n      if (href.includes("/find") || href.includes("/Find")) link.textContent = labels.find || link.textContent;'
  );
}
fs.writeFileSync(tmPath, tm, "utf8");

console.log(`Find pages created for ${Object.keys(locales).length} locales`);
console.log(`Nav updated in ${navUpdated} files`);
console.log(`Embed meta updated in ${metaUpdated} files`);
