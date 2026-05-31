// 다국어 페이지는 한국어 원본 UI를 기준으로 복구/동기화한다.
// 이전 생성기는 페이지 구조까지 바꿔 UI 회귀를 만들 수 있어 안전한 복구 스크립트로만 위임한다.
require("./restore-locale-ui");
require("./update-1962-docs");
