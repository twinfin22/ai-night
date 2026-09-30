# 튜토리얼 진도 이전표

## 저장 원칙

`ainight.position`에는 화면 순번이 아니라 안정적인 단계 ID를 저장한다. 단계가 바뀌면 해당 ID와 `ainight.last`를 함께 자동 저장한다. 저장소를 읽거나 쓸 수 없으면 수업은 계속 열며, 화면은 다음 경고를 보여야 한다.

> 진도를 저장하지 못해도 수업은 계속할 수 있습니다. 재접속하면 지금 위치가 유지되지 않을 수 있습니다.

완료는 마지막 화면에 도달했을 때가 아니라 학습자가 `결과를 확인하고 수업 완료`를 누를 때만 `ainight.done`에 기록한다. 기존 완료 기록은 어떤 이전에서도 삭제하거나 취소하지 않는다.

| 기존 키 | 보존 원칙 | 현재 스키마 |
|---|---|---|
| `ainight.done` | 기존 일차 완료를 그대로 유지한다. | `done: day[]` |
| `ainight.position` | 안정 ID가 확인되는 위치만 옮긴다. | `position: { day.app: stepId }` |
| `ainight.last` | 마지막 학습 일차를 유지한다. | `last: day` |
| `ainight.app` | `codex`/`claude` 선택을 유지한다. | `app: codex | claude` |
| `ainight.os` | `macos`/`windows` 선택을 유지한다. | `os: macos | windows` |

## 단계 ID 대응표

| 이전 단계 ID | 조건 | 새 단계 ID | 처리 |
|---|---|---|---|
| `d01-folder` | `ainight.os = macos` | `d01-folder-macos` | 자동 이전 |
| `d01-folder` | `ainight.os = windows` | `d01-folder-windows` | 자동 이전 |
| `d01-folder` | OS 미선택 또는 잘못된 값 | 없음 | OS 선택 뒤 다시 실행할 때까지 이전을 보류 |
| 숫자형 Week 1 위치 | 이전 화면 순번만 있고 ID가 없음 | 없음 | 해당 일차의 시작 화면에서 다시 시작 |
| Week 3의 이전 위치 | 신뢰 가능한 ID 대응표 없음 | 없음 | 해당 일차의 시작 화면에서 다시 시작 |

`d01-folder` 이전은 `d01-folder-by-os-2026-09-29` 표식이 없을 때만 실행한다. OS가 미선택인 동안 표식을 쓰지 않으므로, OS 선택 직후 재실행하면 올바른 폴더 단계로 옮긴다. `week3-page-ids-2026-07-16` 표식은 해당 위치만 초기화하며 완료·앱·OS·다른 일차 위치는 건드리지 않는다.

## 검증 표본

1. `done: [1, 6]`, `position: { "1.codex": "d01-folder" }`, `os: "windows"`는 실행 뒤 `d01-folder-windows`와 완료 `[1, 6]`을 유지한다.
2. 같은 위치에서 OS가 없으면 `d01-folder`를 유지하고 이전 표식도 만들지 않는다. OS를 `macos`로 저장한 뒤 재실행하면 `d01-folder-macos`가 된다.
3. 마지막 단계 표시만으로 `done`이 늘지 않으며, 완료 버튼 처리에서만 해당 day가 추가된다.
4. 저장소가 예외를 던지면 위치·완료 저장 함수는 `false`를 반환한다. 화면은 계속 사용 가능해야 하며 위 경고를 표시한다.
