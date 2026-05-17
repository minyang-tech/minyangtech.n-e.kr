# IXO Template Grammar

이 문서는 IXO Engine의 템플릿 문법과 조건식 문법을 설명합니다.

## 1. 기본 치환

가장 기본적인 문법은 `{{refKey}}`입니다.

```text
Hello, {{username}}
```

`username`이라는 Ref Key가 `민양`이면 결과는 다음과 같습니다.

```text
Hello, 민양
```

## 2. 어디에서 사용할 수 있나

템플릿은 다음 위치에서 사용할 수 있습니다.

- 텍스트 출력 노드의 `Value`
- 문자 조합 노드
- 수식 계산 노드
- 조건 분기 노드
- HTTPS 요청 URL
- 브라우저 열기 URL
- 함수 호출 인자
- Canvas Builder의 바인딩된 텍스트

## 3. Ref Key

`Ref Key`는 노드의 출력값을 다른 노드가 참조하기 위한 이름입니다.

```text
입력 칸 Ref Key: username
텍스트 출력 Value: 안녕하세요, {{username}}님!
```

## 4. 여러 값 결합

```text
{{firstName}} {{lastName}}
```

```text
총점: {{scoreA}} + {{scoreB}}
```

문자열 안에서 여러 값을 함께 사용할 수 있습니다.

## 5. 조건식

조건 분기 노드는 다음 비교 연산자를 지원합니다.

| 연산자 | 의미 |
|---|---|
| `==` | 같다 |
| `!=` | 다르다 |
| `>` | 크다 |
| `<` | 작다 |
| `>=` | 크거나 같다 |
| `<=` | 작거나 같다 |

예:

```text
{{score}} >= 60
```

## 6. 논리 연산

조건식은 `AND`, `OR`를 지원합니다.

```text
{{score}} >= 60 AND {{role}} == student
```

```text
{{username}} == admin OR {{username}} == root
```

## 7. 수식 계산

수식 계산 노드는 다음 사칙연산을 지원합니다.

```text
{{a}} + {{b}}
{{price}} * {{count}}
{{total}} / 2
```

## 8. 함수 호출 인자

사용자 정의 함수는 각 매개변수에 대해 호출 노드에서 값을 받을 수 있습니다.

예를 들어 함수가 다음 매개변수를 가진다고 가정합니다.

| 매개변수 | 기본값 | 설명 |
|---|---|---|
| `username` | `guest` | 사용자 이름 |
| `score` | `0` | 현재 점수 |

함수 호출 노드에서 다음처럼 값을 넣을 수 있습니다.

```text
username = {{username}}
score = {{currentScore}}
```

값을 비워 두면 함수에 정의한 기본값이 사용됩니다.

## 9. 반환 Ref Key

함수는 내부에서 만든 값을 외부로 반환할 수 있습니다.

```text
반환 Ref Key: result
```

함수 내부 그래프가 `context.result`를 만들면 함수 호출 노드는 그 값을 결과로 사용합니다.

## 10. Canvas Builder 바인딩

Canvas Builder 요소는 `Binding Ref Key`를 통해 런타임 값을 표시할 수 있습니다.

```text
Binding Ref Key: welcomeText
```

연결된 값이 바뀌면 Viewer와 Builder의 표시도 실시간으로 바뀝니다.

## 11. 권장 작성 방식

- Ref Key는 짧고 의미 있게 작성합니다.
- 띄어쓰기보다 camelCase를 권장합니다.
- 조건식은 너무 길게 쓰기보다 함수나 중간 노드로 나눕니다.
- 함수 매개변수에는 기본값과 설명을 함께 적어 두면 재사용성이 좋아집니다.

## 12. 예시

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

## 13. 주의사항

- 현재 템플릿은 `{{refKey}}` 치환을 중심으로 동작합니다.
- 복잡한 문자열 가공이 필요하면 Utility 노드나 Script 노드를 사용합니다.
- 네트워크 URL도 템플릿을 사용할 수 있지만, 최종 URL은 반드시 HTTPS여야 하며 사설망 주소는 차단됩니다.

