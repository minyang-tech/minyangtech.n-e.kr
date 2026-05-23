# IXO Engine

IXO Engine은 엔트리 스타일의 노드 기반 코딩과 Canvas Builder를 결합한 데스크톱 앱 제작 엔진입니다. 사용자는 노드를 연결해 로직을 만들고, UI Viewer와 Canvas Builder에서 실제 앱 화면을 구성한 뒤 Windows와 Linux용 산출물로 내보낼 수 있습니다.

현재 문서는 V1.1.2 핫픽스 기준입니다.

## 핵심 철학

- 로직은 노드 그래프로 표현합니다.
- 화면은 Canvas Builder에서 시각적으로 설계합니다.
- UI 요소와 노드는 자동 연결되어 값, Ref Key, Scene 상태가 함께 동기화됩니다.
- exported runtime은 에디터와 동일한 프로젝트 데이터를 사용해 결과 차이를 줄입니다.
- 프로젝트 데이터는 로컬 우선으로 보관되며, 데이터 손상에 대비해 Safe Mode와 백업 복구를 제공합니다.

## 주요 작업 영역

| 영역 | 설명 |
|---|---|
| Node Workspace | 노드를 배치하고 연결해 실행 흐름을 만듭니다. |
| UI Viewer | 완성 중인 UI를 사용자 시점으로 확인합니다. |
| Canvas Builder | 텍스트, 이미지, 입력, 버튼, 컨테이너, Vector 요소를 직접 배치하고 수정합니다. |
| Inspector | 선택한 노드 또는 UI 요소의 세부 속성을 편집합니다. |
| Functions | 사용자 정의 함수를 만들고 함수 내부 그래프를 구성합니다. |
| Scene Manager | 여러 화면을 Scene 단위로 만들고 전환합니다. |
| Asset Manager | 이미지, 사운드, `.ixo` 프로젝트 파일, 테마 파일을 관리합니다. |
| Error Log Console | 실행 결과, 분기 결과, 외부 액션 로그를 확인합니다. |

## V1.1.2 핫픽스

- Scene 전환 시 이전 Scene의 노드가 워크스페이스와 런타임에 남아 보이던 문제를 수정했습니다.
- 새 Scene은 UI와 노드가 모두 빈 상태로 시작합니다.
- Asset Manager의 이미지 드래그 앤 드롭 안정성을 개선했습니다.
- Vector Draw Pad에서 여러 선을 누적해서 그릴 수 있게 했습니다.
- 설정 화면을 세분화하고 초기화 범위를 전체, 저장사항, 설정, 앱 완전 초기화로 나누었습니다.
- Docs의 Node Library 무결성 해시를 최신 문서 기준으로 갱신했습니다.

## Canvas Builder

Canvas Builder는 앱 화면 설계를 담당합니다.

- Text를 추가하면 `텍스트 출력` 노드가 자동 생성됩니다.
- Image를 추가하면 `이미지 출력` 노드가 자동 생성됩니다.
- Input을 추가하면 `입력 칸` 노드와 연결됩니다.
- Button, Container, Custom Button, Vector도 대응되는 Visual 노드로 자동 편성됩니다.
- UI를 수정하면 연결된 노드의 값 또는 Ref Key도 함께 갱신됩니다.
- UI를 선택하고 `P` 키를 누르면 연결된 노드 위치로 이동합니다.
- UI는 현재 선택한 Scene에 추가됩니다.

## Scene Manager

Scene은 여러 화면을 가진 앱을 만들기 위한 기본 단위입니다.

- 왼쪽 사이드바의 Scene 버튼으로 화면을 전환합니다.
- `+ Scene` 버튼으로 새 화면을 만듭니다.
- 새 Scene은 UI와 노드가 모두 비어 있는 상태로 시작합니다.
- 노드를 추가하면 현재 Scene에만 표시되고 실행됩니다.
- UI를 추가하면 현재 Scene에만 표시됩니다.
- Scene을 정리하면 해당 Scene의 UI와 노드를 `main`으로 이동합니다.

## Asset Manager

Asset Manager는 제작에 필요한 파일을 프로젝트 안에서 관리합니다.

| 파일 종류 | 동작 |
|---|---|
| 이미지 파일 (`.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.svg`) | Canvas Builder로 끌어 놓으면 이미지 UI와 연결 노드가 생성됩니다. |
| `.ixo` 파일 | Node Workspace 또는 Canvas Builder로 끌어 놓으면 포함된 노드와 UI가 현재 프로젝트에 붙여넣어집니다. |
| 오디오 파일 | 사운드 노드와 배경음 흐름에서 사용할 수 있습니다. |
| 테마 JSON / `.ixo-theme` | 설정에서 업로드해 IXO Engine 편집기 UI 테마로 사용할 수 있습니다. |

## Vector Drawer

Vector 요소와 Custom Button은 Inspector의 Vector Draw Pad에서 직접 그리듯 편집할 수 있습니다.

- 마우스로 그린 선은 SVG path로 변환됩니다.
- 여러 번 그린 선이 하나의 Vector path에 누적됩니다.
- Box, Triangle, Star 프리셋을 추가할 수 있습니다.
- 마지막 stroke 취소와 전체 Clear를 지원합니다.
- 필요한 경우 Advanced SVG path에서 직접 수정할 수 있습니다.

## Settings

설정 화면은 다음 영역으로 나뉩니다.

| 영역 | 설명 |
|---|---|
| 화면 및 테마 | 언어, 테마, 사용자 테마 업로드, 기본 미리보기 장치를 설정합니다. |
| 프로젝트 템플릿 | 기본 예제 프로젝트를 불러옵니다. |
| HTTPS 노드 | 네트워크 계열 노드 사용 권한을 켜거나 끕니다. |
| 내보내기 기본값 | export 창 제목, 크기, 배경색, 리사이즈 여부, 시작 화면을 설정합니다. |
| 업데이트 | GitHub Release 기준 최신 버전을 확인합니다. |
| 개인정보 처리방침 | 네트워크 기능과 업데이트 확인 시 처리될 수 있는 정보를 확인합니다. |
| 초기화 및 복구 | 전체 초기화, 저장사항 초기화, 설정 초기화, 앱 완전 초기화를 실행합니다. |

## Theme Presets와 사용자 테마

테마는 편집기 UI의 가시 영역에 적용됩니다. export 산출물의 앱 UI는 Canvas Builder와 export 설정을 기준으로 유지됩니다.

- 기본 프리셋: Mint Console, Glass Panel, Pixel Retro, Clean SaaS, Game HUD, Dark Red, Ocean Blue
- 사용자 지정 테마: 설정에서 JSON 또는 `.ixo-theme` 파일 업로드
- 적용 범위: 사이드바, 워크스페이스, Inspector, 버튼, 입력창, 로그 패널 등 편집기 전체

## Safe Mode와 데이터 복구

클라이언트 데이터가 손상될 가능성에 대비해 Safe Mode가 준비되어 있습니다.

- 자동 저장 데이터 검증
- 최근 백업 저장본 복원
- 마이그레이션 코드 기반 구버전 프로젝트 보정
- 복구 실패 시 안전한 기본 프로젝트로 초기화
- 수동 백업 복원 및 수동 초기화 버튼 제공
- 앱은 단일 인스턴스 실행 정책을 사용해 중복 실행에 따른 데이터 충돌 가능성을 줄입니다.

## 보안

네트워크 계열 노드는 보수적으로 동작합니다.

- 앱 최초 실행 시 네트워크 계열 노드 사용 동의를 요청합니다.
- 설정에서 이후 on/off를 변경할 수 있습니다.
- HTTPS만 허용합니다.
- URL 파싱 실패, localhost, 사설망 주소를 차단합니다.
- 첫 외부 요청은 사용자 승인을 요구합니다.
- 요청에는 타임아웃과 중복 실행 방지가 적용됩니다.
- 로그에는 민감한 URL 정보가 마스킹됩니다.
- 브라우저 열기 노드도 같은 보안 정책을 따릅니다.

## 내보내기

### Desktop Pipeline

| 대상 | 설명 |
|---|---|
| `.exe` | Windows 즉시 실행형 산출물 |
| Linux bundle | Linux 실행 파일과 필요한 리소스 |

### Mobile Pipeline

모바일은 데스크톱 산출물과 별도 파이프라인으로 처리합니다.

| 대상 | 설명 |
|---|---|
| `.apk` pipeline | Android 패키지 워크스페이스 생성 |
| `.ipa` pipeline | iOS 패키지 워크스페이스 생성 |

모바일 export는 `web/`, `project.json`, `mobile-export.json`, `package.json`, `capacitor.config.json`, 플랫폼별 아이콘 세트를 포함한 모바일 워크스페이스를 생성합니다.

## 지원 플랫폼

| 플랫폼 | 상태 |
|---|---|
| Windows | 지원 |
| Linux | 지원 |
| macOS | 앱 사용 미지원 |
