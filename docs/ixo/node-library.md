# IXO Engine Node Library

이 문서는 현재 IXO Engine 코드 기준으로 제공되는 노드의 목적을 정리합니다. 현재 공개된 모든 노드는 런타임에 적용된 상태입니다.

## 상태 표기

| 상태 | 의미 |
|---|---|
| Stable | 현재 공개된 모든 노드가 런타임에 적용되어 동작합니다. |

## 공통 필드

| 필드 | 설명 |
|---|---|
| Label | 노드에 표시되는 이름입니다. |
| Value | 노드가 계산하거나 전달하는 기본 값입니다. |
| Ref Key | 다른 노드가 `{{refKey}}`로 참조하는 이름입니다. |
| Group Label | 여러 노드를 시각적으로 묶을 때 쓰는 보조 라벨입니다. |

## Core

| 노드 | 역할 | 상태 |
|---|---|---|
| 시작점 | 플로우의 시작 위치입니다. | Stable |
| 조건 분기 | 조건식 결과를 바탕으로 흐름을 나눕니다. | Stable |
| 값 비교 | 비교식을 전달합니다. | Stable |
| 데이터 합치기 | 여러 값을 하나의 문자열로 결합합니다. | Stable |
| 스크립트 | 기본적으로 제한 실행 모드에서 안전한 단일 `return` 식을 실행하고, 필요할 때만 별도 승인 후 전체 JavaScript 모드로 전환합니다. | Stable |

### 스크립트 보안 정책

- `return context.username || "guest"`처럼 안전한 단일 반환식은 제한 실행 모드에서 바로 처리합니다.
- 함수 호출, 임의 전역 접근, 여러 문장처럼 제한 범위를 벗어나는 코드는 전체 JavaScript 승인 전까지 차단됩니다.
- 전체 JavaScript 모드는 프로젝트 세션별 사용자 승인을 받은 경우에만 실행됩니다.

## Control

| 노드 | 역할 | 상태 |
|---|---|---|
| 반복 실행 | 반복 흐름을 표현합니다. | Stable |
| 지연 대기 | 다음 흐름 전 대기 시간을 표현합니다. | Stable |
| 갈림길 | 값에 따라 다른 출력 경로를 고릅니다. | Stable |
| 메시지 보내기 | 이름 있는 신호를 전송합니다. | Stable |
| 메시지 받기 | 특정 신호를 받을 때 시작합니다. | Stable |
| 화면 시작 | 장면이 시작될 때 실행할 흐름을 뜻합니다. | Stable |
| 횟수 반복 | 지정 횟수만큼 반복합니다. | Stable |
| 계속 반복 | 중단 전까지 계속 반복합니다. | Stable |
| 반복 끝내기 | 현재 반복을 종료합니다. | Stable |
| 이번 반복 넘기기 | 현재 반복을 건너뜁니다. | Stable |
| 조건까지 대기 | 조건이 참이 될 때까지 기다립니다. | Stable |
| 흐름 멈춤 | 현재 흐름을 멈춥니다. | Stable |
| 처음부터 다시 | 플로우를 처음부터 다시 실행합니다. | Stable |
| 복제본 생성 | 복제 인스턴스를 만듭니다. | Stable |
| 복제본 삭제 | 복제 인스턴스를 제거합니다. | Stable |

## Visual

| 노드 | 역할 | 상태 |
|---|---|---|
| 텍스트 출력 | 문자열을 화면 출력 피드에 표시합니다. | Stable |
| 이미지 출력 | 이미지 URL을 화면에 렌더링합니다. | Stable |
| 입력 칸 | 사용자의 텍스트 입력을 받습니다. | Stable |
| 누름 동작 | 버튼 클릭 동작을 표현합니다. | Stable |
| 레이아웃 박스 | UI 요소를 묶는 컨테이너를 표현합니다. | Stable |
| UI 텍스트 | Canvas Builder 텍스트 레이어와 연결됩니다. | Stable |
| UI 이미지 | Canvas Builder 이미지 레이어와 연결됩니다. | Stable |
| UI 버튼 | Canvas Builder 버튼 레이어와 연결됩니다. | Stable |
| UI 컨테이너 | Canvas Builder 컨테이너와 연결됩니다. | Stable |
| 앞으로 이동 | 현재 방향으로 이동합니다. | Stable |
| 가장자리 튕김 | 화면 끝에서 반사 이동합니다. | Stable |
| X 변경 / Y 변경 | 좌표를 상대적으로 바꿉니다. | Stable |
| X 지정 / Y 지정 | 좌표를 절대값으로 정합니다. | Stable |
| 좌표 이동 | 특정 좌표로 이동합니다. | Stable |
| 부드럽게 이동 | 시간에 걸쳐 목표 좌표로 이동합니다. | Stable |
| 각도 회전 | 상대 각도로 회전합니다. | Stable |
| 방향 지정 | 절대 방향을 지정합니다. | Stable |
| 대상 바라보기 | 포인터 또는 대상을 바라봅니다. | Stable |
| 보이기 / 숨기기 | 시각 요소 표시 상태를 바꿉니다. | Stable |
| 말풍선 / 말풍선 지우기 | 텍스트 말풍선을 표시하거나 제거합니다. | Stable |
| 모양 바꾸기 | 외형 또는 코스튬을 바꿉니다. | Stable |
| 효과 조절 | 시각 효과를 바꿉니다. | Stable |
| 크기 변경 | 대상 크기를 조절합니다. | Stable |
| 레이어 이동 | 앞뒤 순서를 바꿉니다. | Stable |
| 좌우 뒤집기 | 수평 반전합니다. | Stable |
| 선 그리기 시작 / 중지 | 펜 드로잉을 제어합니다. | Stable |
| 선 색상 / 굵기 | 선 속성을 지정합니다. | Stable |
| 채우기 시작 / 중지 | 도형 채우기를 제어합니다. | Stable |
| 그림 지우기 | 드로잉 결과를 지웁니다. | Stable |

### Canvas Builder 연동

- Canvas Builder에서 Text, Image, Button, Custom Button, Vector, Input, Container를 추가하면 대응되는 Visual 노드가 자동 생성됩니다.
- Inspector에서 UI 값을 수정하면 연결된 노드의 `Value` 또는 `Ref Key`도 함께 갱신됩니다.
- 연결된 UI를 삭제하면 의미 없는 연결 노드도 함께 정리됩니다.
- 이미지 asset을 Asset Manager에서 Canvas Builder로 끌어 놓으면 `이미지 출력` 노드와 이미지 UI가 함께 생성됩니다.
- `.ixo` asset을 Node Workspace 또는 Canvas Builder로 끌어 놓으면 파일 안의 노드와 UI가 현재 프로젝트에 붙여넣어집니다.

## Scene / Page

| 기능 | 역할 | 상태 |
|---|---|---|
| Scene Manager | 사이드바 버튼으로 현재 Scene을 전환하고 새 Scene을 만듭니다. | Stable |
| UI Scene 속성 | 각 UI 요소가 표시될 Scene을 지정합니다. | Stable |
| Node Scene 속성 | 각 노드가 실행되고 표시될 Scene을 지정합니다. | Stable |
| Go Scene Action | 버튼 액션으로 다른 Scene으로 이동합니다. | Stable |
| 화면 시작 노드 | 특정 Scene이 활성화되었는지 조건 흐름으로 사용할 수 있습니다. | Stable |

Scene은 `main`을 기본값으로 사용합니다. 새 UI와 새 노드는 현재 활성 Scene에 추가되며, 다른 Scene으로 전환하면 이전 Scene의 UI와 노드는 워크스페이스와 런타임에서 분리됩니다. Scene을 정리하면 해당 UI와 노드는 기본적으로 `main`으로 이동합니다.

## Asset Manager

| Asset | 역할 | 상태 |
|---|---|---|
| Image Asset | `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.svg`를 이미지 UI로 드래그 배치합니다. | Stable |
| IXO Asset | `.ixo` 프로젝트 파일의 노드와 UI를 현재 작업 공간에 붙여넣습니다. | Stable |
| Audio Asset | 사운드 노드와 배경음 흐름에 사용할 파일을 보관합니다. | Stable |
| Clean Unused | UI와 액션에서 참조하지 않는 asset을 정리합니다. | Stable |

## Vector Drawer

| 기능 | 역할 | 상태 |
|---|---|---|
| Vector Draw Pad | Custom Button과 Vector UI를 마우스로 직접 그려 SVG path로 변환합니다. | Stable |
| Multi Stroke Drawing | 여러 번 그린 선을 하나의 Vector path에 누적합니다. | Stable |
| Preset Shapes | Box, Triangle, Star 같은 기본 도형을 즉시 적용합니다. | Stable |
| Advanced SVG Path | 필요한 경우 직접 SVG path를 편집할 수 있습니다. | Stable |

Vector는 기본적으로 단일 닫힌 path는 채우기(fill), 열린 path 또는 여러 stroke는 선(stroke)으로 렌더링합니다.

## Theme Presets

| 기능 | 역할 | 상태 |
|---|---|---|
| Preset Theme | Mint Console, Glass Panel, Pixel Retro, Clean SaaS, Game HUD 등 기본 테마를 적용합니다. | Stable |
| Custom Theme Upload | JSON 또는 `.ixo-theme` 파일을 업로드해 편집기 UI에 적용합니다. | Stable |
| Editor-wide Theme | 테마가 사이드바, 워크스페이스, Inspector, 버튼, 입력창, 로그 패널에 함께 반영됩니다. | Stable |

테마는 편집기 UI의 가시 영역에 적용됩니다. export 산출물의 앱 UI는 Canvas Builder와 export 설정을 기준으로 유지됩니다.

## Data

| 노드 | 역할 | 상태 |
|---|---|---|
| 전역 값 | 여러 흐름이 공유하는 값을 표현합니다. | Stable |
| 로컬 저장 | 로컬 저장소 키를 표현합니다. | Stable |
| 고정 값 | 바뀌지 않는 상수를 제공합니다. | Stable |

## Network

| 노드 | 역할 | 상태 |
|---|---|---|
| HTTPS 요청 | HTTPS URL로 요청을 보냅니다. | Stable |
| 브라우저 열기 | 외부 브라우저에서 HTTPS URL을 엽니다. | Stable |

### 네트워크 보안 정책

- HTTPS만 허용합니다.
- URL 파싱 실패는 차단합니다.
- localhost, 사설망, loopback 주소는 차단합니다.
- 첫 외부 동작에는 사용자 승인이 필요합니다.
- 요청 타임아웃과 중복 실행 방지가 적용됩니다.
- 로그에는 URL 민감 정보가 마스킹됩니다.

## System

| 노드 | 역할 | 상태 |
|---|---|---|
| 시스템 정보 | 현재 실행 환경 정보를 반환합니다. | Stable |
| 오디오 재생 | 지정한 오디오 파일을 재생합니다. | Stable |
| 파일 감시 | 별도 사용자 승인 후 파일 또는 폴더 변경을 감시합니다. | Stable |
| 소리 재생 | 업로드한 사운드를 재생합니다. | Stable |
| 소리 끝까지 재생 | 사운드 종료까지 기다리는 흐름을 표현합니다. | Stable |
| 소리 모두 정지 | 모든 사운드를 멈춥니다. | Stable |
| 음량 변경 / 지정 | 음량을 조절합니다. | Stable |
| 빠르기 변경 / 지정 | 재생 속도를 조절합니다. | Stable |
| 배경음 재생 | 배경음을 재생합니다. | Stable |

## Logic

| 노드 | 역할 | 상태 |
|---|---|---|
| 수식 계산 | 사칙연산을 계산합니다. | Stable |
| 마우스 눌림? | 포인터 입력 상태를 나타냅니다. | Stable |
| 오브젝트 눌림? | 특정 오브젝트 클릭 여부를 나타냅니다. | Stable |
| 키 눌림? | 키 입력 상태를 나타냅니다. | Stable |
| 포인터 닿음? | 포인터가 대상 위에 있는지 나타냅니다. | Stable |
| 숫자 확인 | 값이 숫자인지 검사합니다. | Stable |
| 그리고 / 또는 / 아니다 | 논리값을 결합하거나 반전합니다. | Stable |
| 터치 가능? | 터치 입력 지원 여부를 나타냅니다. | Stable |

## Utility

| 노드 | 역할 | 상태 |
|---|---|---|
| 문자 조합 | 문자열을 합칩니다. | Stable |
| 무작위 값 | `0`부터 지정 최대값 전까지 무작위 정수를 만듭니다. | Stable |
| 범위 무작위 | 범위 안의 무작위 정수를 만듭니다. | Stable |
| 초시계 | 앱 실행 후 경과 시간을 반환합니다. | Stable |
| 날짜 값 | 현재 날짜 일부를 반환합니다. | Stable |
| 문자 길이 | 문자열 길이를 계산합니다. | Stable |
| 문자 위치 | 특정 위치의 문자를 다룹니다. | Stable |
| 문자 바꾸기 | 텍스트 치환을 수행합니다. | Stable |
| 대소문자 변환 | 문자열 대소문자를 바꿉니다. | Stable |
| RGB를 HEX로 | RGB를 HEX 색상 코드로 바꿉니다. | Stable |
| HEX 채널 | HEX 색상에서 채널 값을 다룹니다. | Stable |

## Functions

| 노드 | 역할 | 상태 |
|---|---|---|
| 함수 호출 | 사용자가 만든 함수 그래프를 실행합니다. | Stable |

### 함수 메타데이터

함수는 다음 정보를 가집니다.

| 필드 | 설명 |
|---|---|
| 이름 | 함수 라이브러리와 호출 노드에 표시됩니다. |
| 설명 | 함수의 목적을 문서화합니다. |
| 매개변수 이름 | 함수 호출 시 전달할 값의 키입니다. |
| 매개변수 기본값 | 호출 노드에서 값이 비어 있을 때 사용됩니다. |
| 매개변수 설명 | 호출 노드 Inspector에서 도움말로 표시됩니다. |
| 반환 Ref Key | 함수 그래프가 끝난 뒤 외부로 돌려줄 컨텍스트 키입니다. |

## 예시 흐름

### 환영 문구

`시작점 -> 입력 칸 -> 문자 조합 -> 텍스트 출력`

### 점수 계산기

`시작점 -> 입력 칸 A -> 입력 칸 B -> 수식 계산 -> 텍스트 출력`

### 사용자 정의 함수

`시작점 -> 함수 호출(calculateScore) -> 텍스트 출력`


