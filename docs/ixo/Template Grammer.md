# IXO Template Grammar

이 문서는 IXO Engine V1.1.3 기준의 템플릿 문법, 조건식, 변수 참조 방식을 설명합니다.

## 1. 기본 치환

가장 기본적인 문법은 `{{refKey}}`입니다.

```text
Hello, {{username}}
```

`username`이라는 Ref Key 또는 변수가 `민양`이면 결과는 다음과 같습니다.

```text
Hello, 민양
```

## 2. 사용할 수 있는 위치

템플릿은 다음 위치에서 사용할 수 있습니다.

- 텍스트 출력 노드의 `Value`
- 문자 조합 노드
- 수식 계산 노드
- 조건 분기 노드
- HTTPS 요청 URL
- 브라우저 열기 URL
- 함수 호출 인자
- Canvas Builder의 바인딩 텍스트
- Action System의 Set Variable, Go Scene, Toggle UI, Request HTTPS 값

## 3. Ref Key

`Ref Key`는 노드 출력값을 다른 노드가 참조하기 위한 이름입니다.

```text
입력 칸 Ref Key: username
텍스트 출력 Value: 안녕하세요, {{username}}님
```

## 4. 전역변수와 지역변수

V1.1.3부터 전역변수와 지역변수를 만들 수 있습니다.

| 변수 종류 | 범위 |
|---|---|
| 전역변수 | 모든 Scene에서 참조할 수 있습니다. |
| 지역변수 | 현재 Scene에서만 참조할 수 있습니다. |

```text
{{appTitle}}
{{score}}
{{currentUser}}
```

같은 이름이 존재할 경우, 현재 Scene의 지역변수가 우선 적용되고 그 다음 전역변수가 적용됩니다.

## 5. 여러 값 결합

```text
{{firstName}} {{lastName}}
```

```text
총점: {{scoreA}} + {{scoreB}}
```

문자열 안에서 여러 값을 함께 사용할 수 있습니다.

## 6. 조건식

조건 분기 노드는 다음 비교 연산자를 지원합니다.

| 연산자 | 의미 |
|---|---|
| `==` | 같다 |
| `!=` | 다르다 |
| `>` | 크다 |
| `<` | 작다 |
| `>=` | 크거나 같다 |
| `<=` | 작거나 같다 |

예시:

```text
{{score}} >= 60
```

## 7. 논리 연산

조건식은 `AND`, `OR`를 지원합니다.

```text
{{score}} >= 60 AND {{role}} == student
```

```text
{{username}} == admin OR {{username}} == root
```

## 8. 수식 계산

수식 계산 노드는 기본 사칙연산을 지원합니다.

```text
{{a}} + {{b}}
{{price}} * {{count}}
{{total}} / 2
```

## 9. 함수 호출 인자

사용자 정의 함수는 매개변수 기본값과 설명을 가질 수 있습니다. 함수 호출 노드에서 다음처럼 값을 전달할 수 있습니다.

```text
username = {{username}}
score = {{currentScore}}
```

값을 비워 두면 함수 정의에 있는 기본값이 사용됩니다.

## 10. 반환 Ref Key

함수 내부 그래프가 만든 값을 호출한 쪽으로 반환하려면 반환 Ref Key를 지정합니다.

```text
반환 Ref Key: result
```

함수 내부에서 `context.result`가 만들어지면 함수 호출 노드의 결과로 사용할 수 있습니다.

## 11. Canvas Builder 바인딩

Canvas Builder 요소는 Binding Ref Key를 통해 노드 또는 변수 값을 표시할 수 있습니다.

```text
Binding Ref Key: welcomeText
```

연결된 값이 바뀌면 UI Viewer와 exported runtime의 표시도 함께 바뀝니다.

## 12. Action System 값

Set Variable 액션은 다음 형식을 권장합니다.

```text
score = {{score}} + 1
```

Go Scene 액션은 Scene 이름을 값으로 사용합니다.

```text
resultScene
```

Request HTTPS와 Open URL은 최종 결과가 반드시 HTTPS URL이어야 합니다.

```text
https://api.example.com/users/{{userId}}
```

## 13. 보안상 주의사항

- 네트워크 URL은 템플릿 치환 후에도 HTTPS여야 합니다.
- localhost, loopback, 사설망 주소는 차단됩니다.
- 민감한 토큰, 비밀번호, 개인정보를 신뢰할 수 없는 서버로 보내지 마십시오.
- 스크립트 노드에서 전체 JavaScript 모드를 사용할 경우 프로젝트 신뢰 경고를 확인해야 합니다.
- 파일 감시 노드는 문자열 경로 입력보다 경로 선택 다이얼로그 사용을 권장합니다.

## 14. 작성 권장 방식

- Ref Key와 변수명은 짧고 의미 있게 작성합니다.
- 공백보다 camelCase를 권장합니다.
- 조건식이 길어지면 중간 계산 노드 또는 함수를 사용합니다.
- 함수 매개변수에는 기본값과 설명을 함께 작성하면 유지보수성이 좋아집니다.

## 15. 예시

### 환영 문구

```text
Hello, {{username}}!
```

### 점수 합계

```text
{{scoreA}} + {{scoreB}}
```

### 합격 조건

```text
{{score}} >= 60 AND {{submitted}} == true
```

### 함수 호출

```text
calculateGreeting(username = {{username}})
```

### 변수 변경 액션

```text
currentSceneTitle = {{appTitle}}
```
