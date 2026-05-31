const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = path.resolve(__dirname, "..");
const locales = ["ko", "ja-jp", "en-us", "zh-cn", "ru-ru", "de-de"];

const localeMeta = {
  ko: { lang: "ko", prefix: "", titleSuffix: "민양테크 Docs", translate: "번역" },
  "ja-jp": { lang: "ja", prefix: "/ja-jp", titleSuffix: "MinyangTech Docs", translate: "翻訳" },
  "en-us": { lang: "en", prefix: "/en-us", titleSuffix: "MinyangTech Docs", translate: "Translate" },
  "zh-cn": { lang: "zh-CN", prefix: "/zh-cn", titleSuffix: "MinyangTech Docs", translate: "翻译" },
  "ru-ru": { lang: "ru", prefix: "/ru-ru", titleSuffix: "MinyangTech Docs", translate: "Перевод" },
  "de-de": { lang: "de", prefix: "/de-de", titleSuffix: "MinyangTech Docs", translate: "Übersetzen" }
};

const text = {
  ko: {
    docsNav: ["Docs", "News", "Apps", "Portfolio", "Issues", "Contributing", "EULA"],
    home: "Index (Home)",
    game1962Home: "Home",
    game1962Story: "Story",
    cameraInfo: "Info",
    intro: "Introduction",
    nodeLibrary: "Node Library",
    grammar: "Template Grammar",
    privacy: "Privacy Policy",
    docsTitle: "민양테크 Docs",
    docsSubtitle: "민양테크 공식 문서 허브",
    inspectorTitle: "IXO 파일 검사하기",
    inspectorBody: "IXO Engine 프로젝트(.ixo) 또는 산출물(.exe)에 포함된 안전 신호를 로컬에서 확인할 수 있습니다.",
    inspectorOpen: "검사 페이지 열기",
    docsIntroTitle: "소개",
    docsIntro: "민양테크 제품과 프로젝트의 공식 문서를 모아둔 페이지입니다.",
    mainDocs: "주요 문서",
    mainDocsValue: "1962: The Last Winter In Moscow, IXO Engine, Camera",
    updatePolicy: "업데이트 방식",
    updatePolicyBody: "각 프로젝트 소스와 릴리스 기준으로 순차 반영",
    contact: "문의",
    connect: "Connect with Us",
    copyright: "Copyright 2026. MinyangTech. All rights reserved.",
    overview: "개요",
    title: "제목",
    genre: "장르",
    platform: "플랫폼",
    story: "스토리",
    setting: "설정",
    storyLink: '자세한 내용은 1962: The Last Winter In Moscow 문서의 <a href="/docs/1962/story.html">Story</a>를 참고해주세요.',
    settingLink: '자세한 내용은 1962: The Last Winter In Moscow 문서의 <a href="/docs/1962/story.html#setting">Story 3번 문단</a>을 확인해주세요.',
    titleValue: "1962: The Last Winter In Moscow (한글명 : 1962: 모스크바 최후의 겨울)",
    genreValue: "공포, 아포칼립스, 좀비 아포칼립스, 포스트 아포칼립스",
    platformValue: "PC, Mobile, Console. (컴퓨터, 모바일, 콘솔)",
    timeline: "연표",
    characters: "등장인물",
    protagonistName: "세르게이 안드로포프",
    protagonistDesc: "주인공. 소련 러시아 SFSR 출생, 1934년 모스크바 국립대학교를 졸업하여 소련의 과학자로 활동했으며 쿠바 미사일 기지에 차출됐던 인원 중 한 명입니다.",
    settingParas: [
      'R-14 감염체(이하 "감염자")는 1962년 10월 22일 탄생한 인공 바이러스입니다.',
      "해당 바이러스는 감염자에게 물리거나 감염자에 의해 사망했을 때 전파됩니다.",
      "다행히 물렸을 때 특수 약물을 사용하면 감염 진행을 멈출 수 있습니다. 그러나 해당 약물은 1회용입니다.",
      '주인공은 모스크바 시내에서 벗어나 살아남은 생존자들에게서 "안전구역"이 있다는 말을 듣고, 안전구역으로 알려진 시베리아로 향합니다.'
    ],
    quote: "소련은 1963년 1월 5일 붕괴했습니다.<br>군도 그 누구도 당신을 구할 수는 없습니다.",
    timelineItems: [
      "1962년 10월 20일, 쿠바, 소련이 쿠바에 미사일 기지를 설치하고 기지에서 인체실험을 진행한다.",
      "1962년 10월 22일, 쿠바의 미사일 기지가 미국 정보당국에 의해 발각된다.",
      "1962년 10월 23일, 쿠바 미사일 기지에서 진행되던 인체실험이 유출되다.",
      "1962년 10월 24일, 쿠바에 있던 소련군의 다수가 감염되다.",
      "1962년 10월 25일, 남은 잔존 병력이 급하게 소련 본토로 복귀하다.",
      "1962년 10월 26일, 미군이 쿠바의 기지를 파괴하다.",
      "1962년 10월 27일, 소련 본토로 복귀한 잔존 병력에서 인체실험으로 인한 알 수 없는 바이러스의 감염이 확인되다.",
      "1962년 10월 27일 오후 8시, 잔존 병력 모두가 감염되다.",
      '1962년 10월 28일, 주인공인 과학자 "세르게이 안드로포프"가 감염자들을 확인하고 바이러스를 R-14라 명명하다.',
      "1962년 10월 29일, 감염자들이 집단으로 폭동을 일으켜 레닌그라드주 수용소를 탈출하고 감염이 확산되다. 이때 주인공은 폭동의 여파로 정신을 잃어 모스크바주 병원으로 이동된다.",
      "1962년 10월 30일, 소련 당국이 레닌그라드주를 봉쇄하다.",
      "1962년 11월 4일, 감염자들이 봉쇄를 뚫고 근처 지역으로 확산되다.",
      "1962년 11월 25일, 스탈린그라드주가 함락되다.",
      "1962년 12월 2일, 블라디미르주가 함락되다.",
      "1962년 12월 7일, 제2차 모스크바 공방전(감염자 vs 소련군)이 시작되다.",
      "1962년 12월 26일, 소련군이 모두 후퇴하다.",
      "1962년 12월 26일 오후 5시, 모스크바가 함락되다.",
      "1962년 12월 26일 오후 8시, 크렘린궁 크렘린 연대가 크렘린궁을 포기하고 서기장과 함께 후퇴하다.",
      "1963년 1월 1일, 러시아 시베리아 쪽 일부 지역을 제외한 전 영토가 함락되다. 소련군 발표 감염자 수: 1억 3200만 명.",
      "1963년 1월 5일, 행정부와 군이 붕괴하다.",
      "1963년 1월 8일, 주인공이 폐허가 된 모스크바 보트킨 병원 병실에서 일어나다."
    ]
  },
  "ja-jp": {
    docsNav: ["Docs", "News", "Apps", "Portfolio", "Issues", "Contributing", "EULA"],
    home: "Index (Home)",
    game1962Home: "Home",
    game1962Story: "Story",
    cameraInfo: "Info",
    intro: "Introduction",
    nodeLibrary: "Node Library",
    grammar: "Template Grammar",
    privacy: "Privacy Policy",
    docsTitle: "MinyangTech Docs",
    docsSubtitle: "MinyangTech 公式ドキュメントハブ",
    inspectorTitle: "IXOファイルを検査",
    inspectorBody: "IXO Engineプロジェクト(.ixo)またはエクスポートされたアプリ(.exe)に含まれる安全信号をローカルで確認できます。",
    inspectorOpen: "検査ページを開く",
    docsIntroTitle: "紹介",
    docsIntro: "MinyangTechの製品とプロジェクトの公式ドキュメントをまとめたページです。",
    mainDocs: "主要ドキュメント",
    mainDocsValue: "1962: The Last Winter In Moscow, IXO Engine, Camera",
    updatePolicy: "更新方式",
    updatePolicyBody: "各プロジェクトのソースとリリース状況に基づいて順次反映します。",
    contact: "問い合わせ",
    connect: "Connect with Us",
    copyright: "Copyright 2026. MinyangTech. All rights reserved.",
    overview: "概要",
    title: "タイトル",
    genre: "ジャンル",
    platform: "プラットフォーム",
    story: "ストーリー",
    setting: "設定",
    storyLink: '詳しくは1962: The Last Winter In Moscow文書の<a href="/ja-jp/docs/1962/story.html">Story</a>を参照してください。',
    settingLink: '詳しくは1962: The Last Winter In Moscow文書の<a href="/ja-jp/docs/1962/story.html#setting">Storyの設定セクション</a>を確認してください。',
    titleValue: "1962: The Last Winter In Moscow（韓国語名: 1962: モスクワ最後の冬）",
    genreValue: "ホラー、アポカリプス、ゾンビアポカリプス、ポストアポカリプス",
    platformValue: "PC、Mobile、Console（コンピューター、モバイル、コンソール）",
    timeline: "年表",
    characters: "登場人物",
    protagonistName: "セルゲイ・アンドロポフ",
    protagonistDesc: "主人公。ソ連ロシアSFSR出身。1934年にモスクワ国立大学を卒業し、ソ連の科学者として活動した人物で、キューバのミサイル基地へ派遣された人員の一人です。",
    settingParas: [
      'R-14感染体（以下「感染者」）は、1962年10月22日に生まれた人工ウイルスです。',
      "このウイルスは、感染者に噛まれる、または感染者によって死亡した場合に感染します。",
      "幸い、噛まれた直後に特殊薬物を使用すれば感染の進行を止められます。ただし、その薬物は1回限りです。",
      "主人公はモスクワ市内を脱出し、生存者たちから「安全区域」が存在するという話を聞き、安全区域とされるシベリアへ向かいます。"
    ],
    quote: "ソ連は1963年1月5日に崩壊しました。<br>軍も、誰も、あなたを救うことはできません。",
    timelineItems: [
      "1962年10月20日、キューバ。ソ連はキューバにミサイル基地を設置し、基地内で人体実験を進める。",
      "1962年10月22日、キューバのミサイル基地が米国情報当局に発見される。",
      "1962年10月23日、キューバのミサイル基地で行われていた人体実験が漏えいする。",
      "1962年10月24日、キューバにいたソ連軍の多数が感染する。",
      "1962年10月25日、残存部隊が急いでソ連本土へ帰還する。",
      "1962年10月26日、米軍がキューバの基地を破壊する。",
      "1962年10月27日、ソ連本土へ帰還した残存部隊から、人体実験による未知のウイルス感染が確認される。",
      "1962年10月27日午後8時、残存部隊全員が感染する。",
      "1962年10月28日、主人公である科学者セルゲイ・アンドロポフが感染者を確認し、ウイルスをR-14と命名する。",
      "1962年10月29日、感染者が集団暴動を起こしてレニングラード州収容所を脱出し、感染が拡大する。このとき主人公は暴動の余波で意識を失い、モスクワ州の病院へ搬送される。",
      "1962年10月30日、ソ連当局がレニングラード州を封鎖する。",
      "1962年11月4日、感染者が封鎖を突破し近隣地域へ拡散する。",
      "1962年11月25日、スターリングラード州が陥落する。",
      "1962年12月2日、ウラジーミル州が陥落する。",
      "1962年12月7日、第2次モスクワ攻防戦（感染者対ソ連軍）が始まる。",
      "1962年12月26日、ソ連軍が全面撤退する。",
      "1962年12月26日午後5時、モスクワが陥落する。",
      "1962年12月26日午後8時、クレムリン宮殿のクレムリン連隊が宮殿を放棄し、書記長と共に後退する。",
      "1963年1月1日、シベリア側の一部地域を除くロシア全土が陥落する。ソ連軍発表の感染者数は1億3200万人。",
      "1963年1月5日、行政府と軍が崩壊する。",
      "1963年1月8日、主人公が廃墟となったモスクワのボトキン病院の病室で目を覚ます。"
    ]
  },
  "en-us": {
    docsNav: ["Docs", "News", "Apps", "Portfolio", "Issues", "Contributing", "EULA"],
    home: "Index (Home)",
    game1962Home: "Home",
    game1962Story: "Story",
    cameraInfo: "Info",
    intro: "Introduction",
    nodeLibrary: "Node Library",
    grammar: "Template Grammar",
    privacy: "Privacy Policy",
    docsTitle: "MinyangTech Docs",
    docsSubtitle: "Official documentation hub for MinyangTech",
    inspectorTitle: "Inspect IXO files",
    inspectorBody: "Check safety signals included in IXO Engine projects(.ixo) or exported apps(.exe) locally.",
    inspectorOpen: "Open inspector",
    docsIntroTitle: "Introduction",
    docsIntro: "This page gathers official documents for MinyangTech products and projects.",
    mainDocs: "Main docs",
    mainDocsValue: "1962: The Last Winter In Moscow, IXO Engine, Camera",
    updatePolicy: "Update policy",
    updatePolicyBody: "Updated gradually based on each project source and release state.",
    contact: "Contact",
    connect: "Connect with Us",
    copyright: "Copyright 2026. MinyangTech. All rights reserved.",
    overview: "Overview",
    title: "Title",
    genre: "Genre",
    platform: "Platform",
    story: "Story",
    setting: "Setting",
    storyLink: 'For details, see the <a href="/en-us/docs/1962/story.html">Story</a> page for 1962: The Last Winter In Moscow.',
    settingLink: 'For details, see the <a href="/en-us/docs/1962/story.html#setting">Setting section</a> on the Story page.',
    titleValue: "1962: The Last Winter In Moscow (Korean title: 1962: Moscow's Last Winter)",
    genreValue: "Horror, apocalypse, zombie apocalypse, post-apocalypse",
    platformValue: "PC, Mobile, Console",
    timeline: "Timeline",
    characters: "Characters",
    protagonistName: "Sergei Andropov",
    protagonistDesc: "The protagonist. Born in the Russian SFSR of the Soviet Union, he graduated from Moscow State University in 1934 and became a Soviet scientist. He was one of the personnel assigned to the Cuban missile base.",
    settingParas: [
      'The R-14 infected organism, hereafter "the infected", is an artificial virus created on October 22, 1962.',
      "The virus spreads when a person is bitten by an infected individual or killed by one.",
      "Fortunately, if a special drug is used after a bite, the infection can be halted. However, the drug is single-use.",
      'The protagonist escapes Moscow, hears from survivors that a "safe zone" exists, and heads toward Siberia, the place believed to be safe.'
    ],
    quote: "The Soviet Union collapsed on January 5, 1963.<br>Neither the army nor anyone else can save you.",
    timelineItems: [
      "October 20, 1962, Cuba: the Soviet Union installs a missile base in Cuba and conducts human experiments there.",
      "October 22, 1962: the missile base in Cuba is discovered by U.S. intelligence.",
      "October 23, 1962: the human experiments conducted at the Cuban missile base are leaked.",
      "October 24, 1962: many Soviet troops stationed in Cuba become infected.",
      "October 25, 1962: the remaining forces urgently return to the Soviet mainland.",
      "October 26, 1962: U.S. forces destroy the Cuban base.",
      "October 27, 1962: an unknown virus infection caused by the human experiments is confirmed among the surviving troops who returned to the Soviet mainland.",
      "October 27, 1962, 8:00 PM: all remaining troops become infected.",
      "October 28, 1962: the protagonist, scientist Sergei Andropov, examines the infected and names the virus R-14.",
      "October 29, 1962: the infected riot as a group, break out of a camp in Leningrad Oblast, and spread the infection. The protagonist loses consciousness in the chaos and is transferred to a hospital in Moscow Oblast.",
      "October 30, 1962: Soviet authorities seal off Leningrad Oblast.",
      "November 4, 1962: the infected break through the blockade and spread into nearby regions.",
      "November 25, 1962: Stalingrad Oblast falls.",
      "December 2, 1962: Vladimir Oblast falls.",
      "December 7, 1962: the Second Battle of Moscow begins, with infected forces against the Soviet Army.",
      "December 26, 1962: all Soviet forces retreat.",
      "December 26, 1962, 5:00 PM: Moscow falls.",
      "December 26, 1962, 8:00 PM: the Kremlin Regiment abandons the Kremlin and retreats with the General Secretary.",
      "January 1, 1963: all Russian territory except parts of Siberia falls. Soviet military announcement: 132 million infected.",
      "January 5, 1963: the administration and the military collapse.",
      "January 8, 1963: the protagonist wakes in a ruined hospital room at Botkin Hospital in Moscow."
    ]
  },
  "zh-cn": {
    docsNav: ["Docs", "News", "Apps", "Portfolio", "Issues", "Contributing", "EULA"],
    home: "Index (Home)",
    game1962Home: "Home",
    game1962Story: "Story",
    cameraInfo: "Info",
    intro: "Introduction",
    nodeLibrary: "Node Library",
    grammar: "Template Grammar",
    privacy: "Privacy Policy",
    docsTitle: "MinyangTech Docs",
    docsSubtitle: "MinyangTech 官方文档中心",
    inspectorTitle: "检查 IXO 文件",
    inspectorBody: "可在本地检查 IXO Engine 项目(.ixo)或导出应用(.exe)中包含的安全信号。",
    inspectorOpen: "打开检查页面",
    docsIntroTitle: "介绍",
    docsIntro: "这里汇集了 MinyangTech 产品和项目的官方文档。",
    mainDocs: "主要文档",
    mainDocsValue: "1962: The Last Winter In Moscow, IXO Engine, Camera",
    updatePolicy: "更新方式",
    updatePolicyBody: "根据各项目源码和发布状态逐步更新。",
    contact: "联系",
    connect: "Connect with Us",
    copyright: "Copyright 2026. MinyangTech. All rights reserved.",
    overview: "概览",
    title: "标题",
    genre: "类型",
    platform: "平台",
    story: "故事",
    setting: "设定",
    storyLink: '详情请参考1962: The Last Winter In Moscow文档的<a href="/zh-cn/docs/1962/story.html">Story</a>页面。',
    settingLink: '详情请查看Story页面中的<a href="/zh-cn/docs/1962/story.html#setting">设定章节</a>。',
    titleValue: "1962: The Last Winter In Moscow（韩文名：1962: 莫斯科最后的冬天）",
    genreValue: "恐怖、末日、丧尸末日、后末日",
    platformValue: "PC、Mobile、Console（电脑、移动设备、主机）",
    timeline: "年表",
    characters: "登场人物",
    protagonistName: "谢尔盖·安德罗波夫",
    protagonistDesc: "主人公。出生于苏联俄罗斯苏维埃联邦社会主义共和国，1934年毕业于莫斯科国立大学，成为苏联科学家，是被派往古巴导弹基地的人员之一。",
    settingParas: [
      "R-14感染体（以下简称“感染者”）是1962年10月22日诞生的人工病毒。",
      "该病毒会在被感染者咬伤，或被感染者杀死时传播。",
      "幸运的是，被咬后若使用特殊药物，可以停止感染进程。但这种药物只能使用一次。",
      "主人公逃离莫斯科市区，并从幸存者口中听说存在“安全区”，于是前往被称为安全区的西伯利亚。"
    ],
    quote: "苏联已于1963年1月5日崩溃。<br>军队和任何人都无法拯救你。",
    timelineItems: [
      "1962年10月20日，古巴。苏联在古巴建立导弹基地，并在基地内进行人体实验。",
      "1962年10月22日，古巴导弹基地被美国情报机构发现。",
      "1962年10月23日，古巴导弹基地中进行的人体实验泄露。",
      "1962年10月24日，驻古巴的苏军多数感染。",
      "1962年10月25日，剩余残部紧急返回苏联本土。",
      "1962年10月26日，美军摧毁古巴基地。",
      "1962年10月27日，返回苏联本土的残部中确认出现由人体实验引发的未知病毒感染。",
      "1962年10月27日晚上8点，残余兵力全部感染。",
      "1962年10月28日，主人公、科学家谢尔盖·安德罗波夫确认感染者，并将病毒命名为R-14。",
      "1962年10月29日，感染者集体暴动，逃出列宁格勒州收容所并扩散感染。主人公在暴动余波中失去意识，被转移至莫斯科州医院。",
      "1962年10月30日，苏联当局封锁列宁格勒州。",
      "1962年11月4日，感染者突破封锁，向附近地区扩散。",
      "1962年11月25日，斯大林格勒州沦陷。",
      "1962年12月2日，弗拉基米尔州沦陷。",
      "1962年12月7日，第二次莫斯科攻防战（感染者对苏军）开始。",
      "1962年12月26日，苏军全线撤退。",
      "1962年12月26日下午5点，莫斯科沦陷。",
      "1962年12月26日晚上8点，克里姆林宫克里姆林团放弃克里姆林宫，并随总书记撤退。",
      "1963年1月1日，除俄罗斯西伯利亚部分地区外，全境沦陷。苏军公布感染者人数：1亿3200万人。",
      "1963年1月5日，行政机构与军队崩溃。",
      "1963年1月8日，主人公在废墟化的莫斯科博特金医院病房中醒来。"
    ]
  },
  "ru-ru": {
    docsNav: ["Docs", "News", "Apps", "Portfolio", "Issues", "Contributing", "EULA"],
    home: "Index (Home)",
    game1962Home: "Home",
    game1962Story: "Story",
    cameraInfo: "Info",
    intro: "Introduction",
    nodeLibrary: "Node Library",
    grammar: "Template Grammar",
    privacy: "Privacy Policy",
    docsTitle: "MinyangTech Docs",
    docsSubtitle: "Официальный центр документации MinyangTech",
    inspectorTitle: "Проверить IXO-файлы",
    inspectorBody: "Локально проверьте сигналы безопасности в проектах IXO Engine(.ixo) или экспортированных приложениях(.exe).",
    inspectorOpen: "Открыть проверку",
    docsIntroTitle: "Введение",
    docsIntro: "Эта страница собирает официальные документы продуктов и проектов MinyangTech.",
    mainDocs: "Основные документы",
    mainDocsValue: "1962: The Last Winter In Moscow, IXO Engine, Camera",
    updatePolicy: "Порядок обновления",
    updatePolicyBody: "Обновляется постепенно на основе исходников и релизов каждого проекта.",
    contact: "Контакты",
    connect: "Connect with Us",
    copyright: "Copyright 2026. MinyangTech. All rights reserved.",
    overview: "Обзор",
    title: "Название",
    genre: "Жанр",
    platform: "Платформа",
    story: "Сюжет",
    setting: "Сеттинг",
    storyLink: 'Подробности см. на странице <a href="/ru-ru/docs/1962/story.html">Story</a> документа 1962: The Last Winter In Moscow.',
    settingLink: 'Подробности см. в <a href="/ru-ru/docs/1962/story.html#setting">разделе сеттинга</a> на странице Story.',
    titleValue: "1962: The Last Winter In Moscow (корейское название: 1962: Последняя зима Москвы)",
    genreValue: "Хоррор, апокалипсис, зомби-апокалипсис, постапокалипсис",
    platformValue: "PC, Mobile, Console",
    timeline: "Хронология",
    characters: "Персонажи",
    protagonistName: "Сергей Андропов",
    protagonistDesc: "Главный герой. Родился в Российской СФСР, окончил Московский государственный университет в 1934 году и стал советским ученым. Он был одним из специалистов, направленных на кубинскую ракетную базу.",
    settingParas: [
      "Инфицированный организм R-14, далее «инфицированные», является искусственным вирусом, созданным 22 октября 1962 года.",
      "Вирус передается при укусе инфицированного или при смерти от его нападения.",
      "К счастью, после укуса специальный препарат может остановить развитие инфекции. Однако препарат одноразовый.",
      "Главный герой покидает Москву, слышит от выживших о существовании «безопасной зоны» и направляется в Сибирь, которую считают таким местом."
    ],
    quote: "Советский Союз распался 5 января 1963 года.<br>Ни армия, ни кто-либо другой не смогут вас спасти.",
    timelineItems: [
      "20 октября 1962 года, Куба: СССР устанавливает на Кубе ракетную базу и проводит на ней эксперименты над людьми.",
      "22 октября 1962 года: кубинская ракетная база обнаружена разведкой США.",
      "23 октября 1962 года: информация об экспериментах на кубинской базе выходит наружу.",
      "24 октября 1962 года: большая часть советских войск на Кубе заражается.",
      "25 октября 1962 года: оставшиеся силы срочно возвращаются на территорию СССР.",
      "26 октября 1962 года: войска США уничтожают базу на Кубе.",
      "27 октября 1962 года: среди вернувшихся в СССР остаточных сил подтверждается заражение неизвестным вирусом, связанным с экспериментами над людьми.",
      "27 октября 1962 года, 20:00: заражаются все оставшиеся подразделения.",
      "28 октября 1962 года: главный герой, ученый Сергей Андропов, осматривает инфицированных и называет вирус R-14.",
      "29 октября 1962 года: инфицированные поднимают массовый бунт, вырываются из лагеря в Ленинградской области и распространяют заражение. В хаосе главный герой теряет сознание и попадает в больницу Московской области.",
      "30 октября 1962 года: советские власти блокируют Ленинградскую область.",
      "4 ноября 1962 года: инфицированные прорывают блокаду и распространяются в соседние регионы.",
      "25 ноября 1962 года: Сталинградская область пала.",
      "2 декабря 1962 года: Владимирская область пала.",
      "7 декабря 1962 года: начинается Вторая битва за Москву, инфицированные против Советской армии.",
      "26 декабря 1962 года: советские войска полностью отступают.",
      "26 декабря 1962 года, 17:00: Москва пала.",
      "26 декабря 1962 года, 20:00: Кремлевский полк покидает Кремль и отступает вместе с Генеральным секретарем.",
      "1 января 1963 года: вся территория России, кроме части Сибири, пала. По заявлению советских военных, число инфицированных достигло 132 миллионов.",
      "5 января 1963 года: администрация и армия распадаются.",
      "8 января 1963 года: главный герой просыпается в разрушенной палате Боткинской больницы в Москве."
    ]
  },
  "de-de": {
    docsNav: ["Docs", "News", "Apps", "Portfolio", "Issues", "Contributing", "EULA"],
    home: "Index (Home)",
    game1962Home: "Home",
    game1962Story: "Story",
    cameraInfo: "Info",
    intro: "Introduction",
    nodeLibrary: "Node Library",
    grammar: "Template Grammar",
    privacy: "Privacy Policy",
    docsTitle: "MinyangTech Docs",
    docsSubtitle: "Offizieller Dokumentationshub von MinyangTech",
    inspectorTitle: "IXO-Dateien prüfen",
    inspectorBody: "Prüfen Sie lokal die Sicherheitssignale in IXO-Engine-Projekten(.ixo) oder exportierten Apps(.exe).",
    inspectorOpen: "Prüfseite öffnen",
    docsIntroTitle: "Einführung",
    docsIntro: "Diese Seite bündelt offizielle Dokumente zu Produkten und Projekten von MinyangTech.",
    mainDocs: "Wichtige Dokumente",
    mainDocsValue: "1962: The Last Winter In Moscow, IXO Engine, Camera",
    updatePolicy: "Update-Prinzip",
    updatePolicyBody: "Wird schrittweise anhand von Projektquellen und Releases aktualisiert.",
    contact: "Kontakt",
    connect: "Connect with Us",
    copyright: "Copyright 2026. MinyangTech. All rights reserved.",
    overview: "Überblick",
    title: "Titel",
    genre: "Genre",
    platform: "Plattform",
    story: "Story",
    setting: "Setting",
    storyLink: 'Weitere Details finden Sie auf der <a href="/de-de/docs/1962/story.html">Story</a>-Seite zu 1962: The Last Winter In Moscow.',
    settingLink: 'Weitere Details finden Sie im <a href="/de-de/docs/1962/story.html#setting">Setting-Abschnitt</a> der Story-Seite.',
    titleValue: "1962: The Last Winter In Moscow (koreanischer Titel: 1962: Moskaus letzter Winter)",
    genreValue: "Horror, Apokalypse, Zombie-Apokalypse, Postapokalypse",
    platformValue: "PC, Mobile, Console",
    timeline: "Chronologie",
    characters: "Charaktere",
    protagonistName: "Sergei Andropow",
    protagonistDesc: "Der Protagonist. Geboren in der Russischen SFSR der Sowjetunion, absolvierte er 1934 die Staatliche Universität Moskau und wurde sowjetischer Wissenschaftler. Er gehörte zu den Personen, die der kubanischen Raketenbasis zugeteilt wurden.",
    settingParas: [
      "Der R-14-Infizierte, im Folgenden „Infizierte“, ist ein künstlicher Virus, der am 22. Oktober 1962 entstand.",
      "Das Virus wird übertragen, wenn man von einem Infizierten gebissen oder durch einen Infizierten getötet wird.",
      "Glücklicherweise kann ein Spezialmedikament nach einem Biss den Fortschritt der Infektion stoppen. Dieses Medikament ist jedoch nur einmal verwendbar.",
      "Der Protagonist entkommt aus der Innenstadt Moskaus, hört von Überlebenden von einer „Sicherheitszone“ und macht sich auf den Weg nach Sibirien, das als diese Zone gilt."
    ],
    quote: "Die Sowjetunion ist am 5. Januar 1963 zusammengebrochen.<br>Weder die Armee noch irgendjemand sonst kann Sie retten.",
    timelineItems: [
      "20. Oktober 1962, Kuba: Die Sowjetunion errichtet auf Kuba eine Raketenbasis und führt dort Menschenexperimente durch.",
      "22. Oktober 1962: Die Raketenbasis auf Kuba wird von US-Geheimdiensten entdeckt.",
      "23. Oktober 1962: Die auf der kubanischen Raketenbasis laufenden Menschenexperimente werden bekannt.",
      "24. Oktober 1962: Viele der auf Kuba stationierten sowjetischen Soldaten werden infiziert.",
      "25. Oktober 1962: Die verbleibenden Resttruppen kehren eilig auf das sowjetische Festland zurück.",
      "26. Oktober 1962: US-Truppen zerstören die Basis auf Kuba.",
      "27. Oktober 1962: Bei den in die Sowjetunion zurückgekehrten Resttruppen wird eine unbekannte Virusinfektion bestätigt, die aus den Menschenexperimenten stammt.",
      "27. Oktober 1962, 20:00 Uhr: Alle verbliebenen Truppen sind infiziert.",
      "28. Oktober 1962: Der Protagonist, der Wissenschaftler Sergei Andropow, untersucht die Infizierten und nennt das Virus R-14.",
      "29. Oktober 1962: Die Infizierten lösen einen Massenaufstand aus, brechen aus einem Lager in der Oblast Leningrad aus und verbreiten die Infektion. Der Protagonist verliert in den Folgen des Aufstands das Bewusstsein und wird in ein Krankenhaus der Oblast Moskau gebracht.",
      "30. Oktober 1962: Die sowjetischen Behörden riegeln die Oblast Leningrad ab.",
      "4. November 1962: Die Infizierten durchbrechen die Abriegelung und breiten sich in nahe Regionen aus.",
      "25. November 1962: Die Oblast Stalingrad fällt.",
      "2. Dezember 1962: Die Oblast Wladimir fällt.",
      "7. Dezember 1962: Die Zweite Schlacht um Moskau beginnt, Infizierte gegen die Sowjetarmee.",
      "26. Dezember 1962: Alle sowjetischen Truppen ziehen sich zurück.",
      "26. Dezember 1962, 17:00 Uhr: Moskau fällt.",
      "26. Dezember 1962, 20:00 Uhr: Das Kreml-Regiment gibt den Kreml auf und zieht sich mit dem Generalsekretär zurück.",
      "1. Januar 1963: Mit Ausnahme einiger Gebiete in Sibirien fällt ganz Russland. Laut sowjetischer Militärmeldung gibt es 132 Millionen Infizierte.",
      "5. Januar 1963: Regierung und Militär brechen zusammen.",
      "8. Januar 1963: Der Protagonist erwacht in einem zerstörten Krankenzimmer des Botkin-Krankenhauses in Moskau."
    ]
  }
};

function normalize(content) {
  return String(content).replace(/\r\n/g, "\n").replace(/[ \t]+$/gm, "").replace(/\n{3,}$/g, "\n");
}

function write(file, content) {
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, normalize(content), "utf8");
}

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function sha256(content) {
  return crypto.createHash("sha256").update(normalize(content), "utf8").digest("hex");
}

function hashFile(file) {
  return sha256(read(file));
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[ch]));
}

function localePath(locale, file) {
  return locale === "ko" ? file : `${locale}/${file}`;
}

function href(locale, pathName) {
  return `${localeMeta[locale].prefix}${pathName}`;
}

function languageMenu(currentLocale, currentPath) {
  const options = [
    ["ja-jp", "日本語"],
    ["en-us", "English"],
    ["zh-cn", "中文"],
    ["ko", "한국어"],
    ["ru-ru", "Русский"],
    ["de-de", "Deutsch"]
  ];
  return `<div class="language-menu">
                <button class="language-menu-button" type="button">${esc(localeMeta[currentLocale].translate)}</button>
                <div class="language-menu-list">
${options.map(([locale, label]) => {
  const localized = locale === "ko" ? currentPath : `/${locale}${currentPath}`;
  return `                    <a${locale === currentLocale ? ' class="active"' : ""} href="${localized}">${label}</a>`;
}).join("\n")}
                </div>
            </div>`;
}

function topNav(locale, currentPath) {
  const t = text[locale];
  const meta = localeMeta[locale];
  const links = [
    [href(locale, "/docs/index.html"), t.docsNav[0], true],
    [href(locale, "/news/index.html"), t.docsNav[1]],
    [href(locale, "/apps.html"), t.docsNav[2]],
    [href(locale, "/portfolio.html"), t.docsNav[3]],
    [href(locale, "/issues.html"), t.docsNav[4]],
    [href(locale, "/Contributing.html"), t.docsNav[5]],
    [href(locale, "/eula.html"), t.docsNav[6]]
  ];
  return `<header>
        <div class="header-left">
            <a href="https://minyangtech.n-e.kr" class="logo-link">
                <img src="https://raw.githubusercontent.com/minyangtech/minyangtech.github.io/main/image/%EB%AF%BC%EC%96%91%20%ED%85%8C%ED%81%AC.png" alt="Logo">
            </a>
            <nav>
                <ul class="nav-links">
${links.map(([url, label, active]) => `                    <li><a href="${url}"${active ? ' class="active"' : ""}>${esc(label)}</a></li>`).join("\n")}
                </ul>
            </nav>
        </div>
        <div class="controls">
            ${languageMenu(locale, currentPath)}
            <label class="switch">
                <input type="checkbox" id="dark-mode-toggle">
                <span class="slider"></span>
            </label>
        </div>
    </header>`;
}

function navHtml(locale) {
  const t = text[locale];
  return `<div class="sidebar-group">
    <h4>[Main]</h4>
    <ul>
        <li><a href="${href(locale, "/docs/index.html")}">${esc(t.home)}</a></li>
    </ul>
</div>
<div class="sidebar-group">
    <h4>[1962: The Last Winter In Moscow]</h4>
    <ul>
        <li><a href="${href(locale, "/docs/1962/index.html")}">${esc(t.game1962Home)}</a></li>
        <li><a href="${href(locale, "/docs/1962/story.html")}">${esc(t.game1962Story)}</a></li>
    </ul>
</div>
<div class="sidebar-group">
    <h4>[Camera]</h4>
    <ul>
        <li><a href="${href(locale, "/docs/C/index.html")}">${esc(t.cameraInfo)}</a></li>
    </ul>
</div>
<div class="sidebar-group">
    <h4>[IXO Engine]</h4>
    <ul>
        <li><a href="${href(locale, "/docs/ixo/index.html")}">${esc(t.intro)}</a></li>
        <li><a href="${href(locale, "/docs/ixo/nodes.html")}">${esc(t.nodeLibrary)}</a></li>
        <li><a href="${href(locale, "/docs/ixo/grammar.html")}">${esc(t.grammar)}</a></li>
        <li><a href="${href(locale, "/docs/ixo/privacy.html")}">${esc(t.privacy)}</a></li>
    </ul>
</div>
`;
}

function activeNav(locale, activeHref) {
  return navHtml(locale).replace(`href="${activeHref}"`, `href="${activeHref}" class="active"`);
}

function baseCss() {
  return `        :root { --accent: #007bff; --txt: #333; --bg: #fff; --brd: #eee; --card-bg: #fff; }
        body.dark-mode { --txt: #f5f5f5; --bg: #121212; --brd: #333; --card-bg: #1e1e1e; }
        body { font-family: 'Pretendard', sans-serif; background-color: var(--bg); color: var(--txt); transition: background-color 0.3s, color 0.3s; margin: 0; }
        header { width: 100%; min-height: 80px; display: flex; justify-content: space-between; align-items: center; padding: 0 5%; border-bottom: 1px solid var(--brd); background-color: var(--bg); position: sticky; top: 0; left: 0; z-index: 1000; box-sizing: border-box; }
        .header-left { display: flex; align-items: center; gap: 40px; }
        .logo-link img { height: 40px !important; width: auto !important; display: block; }
        .nav-links { display: flex; list-style: none; gap: 25px; margin: 0; padding: 0; }
        .nav-links a { text-decoration: none; color: var(--txt); font-weight: 600; opacity: 0.7; transition: 0.2s; }
        .nav-links a:hover { opacity: 1; color: var(--accent); }
        .nav-links a.active { opacity: 1; color: var(--accent); border-bottom: 2px solid var(--accent); }
        .controls { display: flex; align-items: center; gap: 18px; }
        .language-menu { position: relative; }
        .language-menu-button { min-height: 34px; padding: 0 13px; border: 1px solid var(--brd); border-radius: 999px; background: var(--card-bg); color: var(--txt); font-weight: 700; cursor: pointer; }
        .language-menu-list { position: absolute; top: calc(100% + 8px); right: 0; display: none; min-width: 150px; padding: 8px; border: 1px solid var(--brd); border-radius: 14px; background: var(--card-bg); box-shadow: 0 16px 30px rgba(0,0,0,0.16); }
        .language-menu:hover .language-menu-list { display: grid; gap: 4px; }
        .language-menu-list a { padding: 8px 10px; border-radius: 10px; color: var(--txt); text-decoration: none; opacity: 0.72; font-weight: 700; }
        .language-menu-list a:hover, .language-menu-list a.active { color: var(--accent); opacity: 1; background: color-mix(in srgb, var(--accent) 10%, transparent); }
        .docs-container { display: flex; max-width: 1400px; margin: 0 auto; min-height: calc(100vh - 160px); }
        .docs-sidebar { width: 280px; padding: 40px 20px; border-right: 1px solid var(--brd); position: sticky; top: 80px; height: fit-content; }
        .docs-sidebar .sidebar-group { margin-bottom: 16px; }
        .docs-sidebar h4 { margin: 0 0 4px; font-size: 1rem; font-weight: 800; color: var(--txt); }
        .docs-sidebar ul { list-style: none; padding: 0; margin: 0; }
        .docs-sidebar li { margin-bottom: 8px; }
        .docs-sidebar a { text-decoration: none; color: var(--txt); opacity: 0.68; transition: 0.3s; font-size: 0.95rem; display: block; }
        .docs-sidebar a:hover, .docs-sidebar a.active { opacity: 1; font-weight: bold; color: var(--accent); }
        .docs-content { flex: 1; padding: 40px 60px; line-height: 1.8; }
        .docs-content h1 { font-size: 2.5rem; margin: 0 0 10px 0; font-weight: 800; }
        .docs-content .subtitle { font-size: 1.2rem; opacity: 0.6; margin-bottom: 30px; letter-spacing: 1px; }
        .docs-body h2 { font-size: 1.8rem; margin-top: 40px; border-bottom: 2px solid var(--brd); padding-bottom: 10px; }
        .info-list { list-style: none; padding: 0; margin: 20px 0; }
        .info-list li { margin-bottom: 12px; display: flex; align-items: center; gap: 12px; }
        .info-list li strong { min-width: 150px; color: var(--accent); font-weight: 700; }
        .ixo-inspector-hero { margin-bottom: 34px; padding: 26px; border: 1px solid var(--brd); border-radius: 24px; background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 13%, transparent), var(--card-bg)); box-shadow: 0 14px 36px rgba(0,0,0,0.07); }
        .ixo-inspector-hero h2 { margin: 0 0 8px; font-size: 1.8rem; }
        .ixo-inspector-hero p { margin: 0 0 18px; opacity: 0.74; }
        .ixo-inspector-hero a { display: inline-flex; min-height: 42px; align-items: center; padding: 0 16px; border-radius: 999px; color: #fff; background: var(--accent); text-decoration: none; font-weight: 800; }
        .timeline-list { padding-left: 22px; }
        .timeline-list li { margin-bottom: 10px; }
        .quote-box { margin: 24px 0; padding: 20px 24px; border-left: 4px solid var(--accent); border-radius: 16px; background: color-mix(in srgb, var(--accent) 10%, transparent); font-weight: 800; }
        .status-badge { display: inline-block; background: rgba(0, 123, 255, 0.1); color: var(--accent); padding: 5px 15px; border-radius: 20px; font-size: 0.9rem; font-weight: 600; margin-top: 20px; }
        footer { padding: 60px 20px 40px; text-align: center; border-top: 1px solid var(--brd); background-color: var(--bg); }
        .footer-sns { display: flex; justify-content: center; gap: 30px; margin-bottom: 20px; align-items: center; }
        .x-logo-img { height: 24px !important; width: auto !important; filter: invert(1); transition: 0.3s; }
        body.dark-mode .x-logo-img { filter: invert(0); }
        .fa-youtube { font-size: 32px !important; color: #FF0000 !important; }
        .footer-email { margin-bottom: 15px; }
        .footer-email a { text-decoration: none; color: var(--txt); opacity: 0.6; font-weight: 500; }
        .footer-copyright { font-size: 0.85rem; opacity: 0.4; }
        .switch { width: 44px; height: 22px; position: relative; display: inline-block; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; inset: 0; background: #ccc; border-radius: 20px; transition: 0.3s; }
        .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 3px; bottom: 3px; background: #fff; border-radius: 50%; transition: 0.3s; }
        input:checked + .slider { background: var(--accent); }
        input:checked + .slider:before { transform: translateX(22px); }
        @media (max-width: 900px) { .docs-container { flex-direction: column; } .docs-sidebar { width: 100%; border-right: none; border-bottom: 1px solid var(--brd); position: relative; top: 0; } .docs-content { padding: 40px 20px; } .nav-links { flex-wrap: wrap; gap: 12px; } header { align-items: flex-start; padding-top: 16px; padding-bottom: 16px; } }`;
}

function darkScript() {
  return `    <script>
        const darkModeToggle = document.getElementById('dark-mode-toggle');
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
    </script>
    <script src="/assets/js/translation-menu.js" defer></script>`;
}

function footer(locale) {
  const t = text[locale];
  return `<footer>
        <h3 style="margin-bottom:20px;">${esc(t.connect)}</h3>
        <div class="footer-sns">
            <a href="https://x.com/minyangtech" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/minyangtech/minyangtech.github.io/main/image/logo-white.png" class="x-logo-img" alt="X"></a>
            <a href="https://www.youtube.com/@minyangtech" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-youtube"></i></a>
        </div>
        <div class="footer-email"><a href="mailto:support@minyangtech.n-e.kr">support@minyangtech.n-e.kr</a></div>
        <div class="footer-copyright"><p>${esc(t.copyright)}</p></div>
    </footer>`;
}

function page(locale, title, subtitle, activeHref, bodyHtml, currentPath) {
  const meta = localeMeta[locale];
  return `<!DOCTYPE html>
<html lang="${meta.lang}" dir="ltr">
<head>
    <link rel="icon" href="https://github.com/minyangtech/minyangtech.github.io/blob/main/image/%EB%AF%BC%EC%96%91%20%ED%85%8C%ED%81%AC.png?raw=true" type="image/x-icon">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(title)} | ${esc(meta.titleSuffix)}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha384-iw3OoTErCYJJB9mCa8LNS2hbsQ7M3C0EpIsO/H5+EGAkPGc6rk+V8i04oW/K5xq0" crossorigin="anonymous">
    <link rel="stylesheet" href="/common.css">
    <link rel="stylesheet" href="/assets/css/header-unified.css">
    <style>
${baseCss()}
    </style>
</head>
<body>
    ${topNav(locale, currentPath)}
    <main class="docs-container">
        <aside class="docs-sidebar">
${activeNav(locale, activeHref)}
        </aside>
        <article class="docs-content">
            <h1>${esc(title)}</h1>
            <p class="subtitle">${esc(subtitle)}</p>
            <hr style="border:0; border-top:1px solid var(--brd); margin: 30px 0;">
            <div class="docs-body">
${bodyHtml}
            </div>
        </article>
    </main>
    ${footer(locale)}
${darkScript()}
</body>
</html>
`;
}

function docsIndex(locale) {
  const t = text[locale];
  const body = `                <section class="ixo-inspector-hero">
                    <h2>${esc(t.inspectorTitle)}</h2>
                    <p>${esc(t.inspectorBody)}</p>
                    <a href="${href(locale, "/ixo.html")}">${esc(t.inspectorOpen)}</a>
                </section>
                <section>
                    <h2>${esc(t.docsIntroTitle)}</h2>
                    <p>${esc(t.docsIntro)}</p>
                    <ul class="info-list">
                        <li><strong>${esc(t.mainDocs)}</strong><span>${esc(t.mainDocsValue)}</span></li>
                        <li><strong>${esc(t.updatePolicy)}</strong><span>${esc(t.updatePolicyBody)}</span></li>
                        <li><strong>${esc(t.contact)}</strong><span>support@minyangtech.n-e.kr</span></li>
                    </ul>
                </section>`;
  return page(locale, t.docsTitle, t.docsSubtitle, href(locale, "/docs/index.html"), body, "/docs/index.html");
}

function home1962(locale) {
  const t = text[locale];
  const body = `                <section>
                    <h2>${esc(t.overview)}</h2>
                    <ul class="info-list">
                        <li><strong>${esc(t.title)}</strong><span>${esc(t.titleValue)}</span></li>
                        <li><strong>${esc(t.genre)}</strong><span>${esc(t.genreValue)}</span></li>
                        <li><strong>${esc(t.platform)}</strong><span>${esc(t.platformValue)}</span></li>
                    </ul>
                </section>
                <section>
                    <h2>${esc(t.story)}</h2>
                    <p>${t.storyLink}</p>
                </section>
                <section>
                    <h2>${esc(t.setting)}</h2>
                    <p>${t.settingLink}</p>
                </section>`;
  return page(locale, "1962: The Last Winter In Moscow", t.overview, href(locale, "/docs/1962/index.html"), body, "/docs/1962/index.html");
}

function story1962(locale) {
  const t = text[locale];
  const body = `                <section>
                    <h2>${esc(t.timeline)}</h2>
                    <ol class="timeline-list">
${t.timelineItems.map((item) => `                        <li>${esc(item)}</li>`).join("\n")}
                    </ol>
                </section>
                <section>
                    <h2>${esc(t.characters)}</h2>
                    <ul class="info-list">
                        <li><strong>${esc(t.protagonistName)}</strong><span>${esc(t.protagonistDesc)}</span></li>
                    </ul>
                </section>
                <section id="setting">
                    <h2>${esc(t.setting)}</h2>
${t.settingParas.map((item) => `                    <p>${esc(item)}</p>`).join("\n")}
                    <div class="quote-box">${t.quote}</div>
                </section>`;
  return page(locale, "1962: The Last Winter In Moscow", t.story, href(locale, "/docs/1962/story.html"), body, "/docs/1962/story.html");
}

function updateDocsFetchHashes(locale) {
  const docsDir = path.join(root, localePath(locale, "docs"));
  if (!fs.existsSync(docsDir)) return;
  const navHash = hashFile(localePath(locale, "docs/nav.html"));
  const stack = [docsDir];
  const htmlFiles = [];
  while (stack.length > 0) {
    const dir = stack.pop();
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (entry.isFile() && entry.name.endsWith(".html")) htmlFiles.push(full);
    }
  }
  for (const full of htmlFiles) {
    let html = fs.readFileSync(full, "utf8");
    html = html.replace(
      /let data;\s*try\s*\{\s*data = await SiteSecurity\.secureFetchText\('nav\.html', '([a-f0-9]{64})'\);\s*\}\s*catch\s*\{\s*data = await SiteSecurity\.secureFetchText\('\.\.\/nav\.html', '\1'\);\s*\}/g,
      "const data = await SiteSecurity.secureFetchText('../nav.html', '$1');"
    );
    html = html
      .replace(/SiteSecurity\.secureFetchText\('nav\.html', '[a-f0-9]{64}'\)/g, `SiteSecurity.secureFetchText('nav.html', '${navHash}')`)
      .replace(/SiteSecurity\.secureFetchText\('\.\.\/nav\.html', '[a-f0-9]{64}'\)/g, `SiteSecurity.secureFetchText('../nav.html', '${navHash}')`)
      .replace(/SiteSecurity\.secureFetchText\("nav\.html", "[a-f0-9]{64}"\)/g, `SiteSecurity.secureFetchText("nav.html", "${navHash}")`)
      .replace(/SiteSecurity\.secureFetchText\("\.\.\/nav\.html", "[a-f0-9]{64}"\)/g, `SiteSecurity.secureFetchText("../nav.html", "${navHash}")`);
    fs.writeFileSync(full, normalize(html), "utf8");
  }
}

function removeLegacyDocs(locale) {
  for (const legacy of ["docs/MAC", "docs/VOV"]) {
    const full = path.join(root, localePath(locale, legacy));
    const relative = path.relative(root, full);
    if (fs.existsSync(full) && !relative.startsWith("..") && !path.isAbsolute(relative)) {
      removeDirectoryContents(full);
      fs.rmdirSync(full);
    }
  }
}

function removeDirectoryContents(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      removeDirectoryContents(full);
      fs.rmdirSync(full);
    } else {
      fs.unlinkSync(full);
    }
  }
}

for (const locale of locales) {
  write(localePath(locale, "docs/nav.html"), navHtml(locale));
  write(localePath(locale, "docs/index.html"), docsIndex(locale));
  write(localePath(locale, "docs/1962/index.html"), home1962(locale));
  write(localePath(locale, "docs/1962/story.html"), story1962(locale));
  updateDocsFetchHashes(locale);
  removeLegacyDocs(locale);
}

console.log("Updated docs navigation and 1962 pages for all supported languages.");
