
     ╭────────────────────────────────────────────────────────────────────────╮
     │ Risu Typewrite 프로젝트 통합 계획                                      │
     │                                                                        │
     │ 📋 작업 개요                                                           │
     │                                                                        │
     │ example 폴더의 타자 연습 게임 시안을 현재 RISU AI 플러그인 구조로 통합 │
     │                                                                        │
     │ 🎯 주요 작업 단계                                                      │
     │                                                                        │
     │ 1. 코어 로직 통합                                                      │
     │                                                                        │
     │ - src/core/typing-engine.js 생성                                       │
     │   - example/js/script.js의 타이핑 로직 이식                            │
     │   - 한글 조합(compositionstart/end) 처리                               │
     │   - WPM/CPM/mistakes 계산 로직                                         │
     │   - 클래스 기반으로 리팩토링                                           │
     │ - src/data/paragraphs.js 생성                                          │
     │   - example/js/paragraphs.js의 문장 데이터 이동                        │
     │   - 향후 IndexedDB 통합을 위한 구조 준비                               │
     │                                                                        │
     │ 2. UI 컴포넌트 구현                                                    │
     │                                                                        │
     │ - src/ui/components/typing-game.js - 타이핑 게임 메인 화면             │
     │   - typing-text 영역 (span 기반 문자 표시)                             │
     │   - input-field (숨겨진 입력)                                          │
     │   - result-details (WPM/CPM/Mistakes)                                  │
     │   - Try Again 버튼                                                     │
     │ - src/ui/components/typing-stats.js - 통계 표시 컴포넌트               │
     │                                                                        │
     │ 3. 스타일 통합                                                         │
     │                                                                        │
     │ - src/ui/styles.js 확장                                                │
     │   - example/style.css의 타이핑 게임 스타일 추가                        │
     │   - 기존 .rt-* 스타일과 통합                                           │
     │   - 모바일 반응형 유지                                                 │
     │                                                                        │
     │ 4. 라우팅 및 네비게이션                                                │
     │                                                                        │
     │ - src/index.js 수정                                                    │
     │   - renderTypingGame() 메서드 추가                                     │
     │   - 해시 라우팅 확장 (#/, #/game, #/stats)                             │
     │   - WinBox 크기 조정 (타이핑 게임에 맞게)                              │
     │                                                                        │
     │ 5. 메뉴 통합                                                           │
     │                                                                        │
     │ - src/ui/components/menu-button.js 업데이트                            │
     │   - 기존 버튼에서 타이핑 게임 실행                                     │
     │   - 아이콘 및 텍스트 확인                                              │
     │                                                                        │
     │ 📁 생성될 파일 구조                                                    │
     │                                                                        │
     │ src/                                                                   │
     │ ├── core/                                                              │
     │ │   ├── typing-engine.js (NEW)                                         │
     │ │   └── risu-api.js                                                    │
     │ ├── data/                                                              │
     │ │   └── paragraphs.js (NEW)                                            │
     │ ├── ui/                                                                │
     │ │   ├── components/                                                    │
     │ │   │   ├── typing-game.js (NEW)                                       │
     │ │   │   ├── typing-stats.js (NEW)                                      │
     │ │   │   └── menu-button.js (UPDATE)                                    │
     │ │   └── styles.js (UPDATE)                                             │
     │ └── index.js (UPDATE)                                                  │
     │                                                                        │
     │ ✅ 예상 결과                                                          │
     │                                                                        │
     │ - 메뉴 버튼 클릭 → WinBox 모달 열림                                    │
     │ - 타이핑 게임 화면 표시                                                │
     │ - 한글 입력 지원, WPM/CPM 실시간 계산                                  │
     │ - 완료 시 통계 표시 및 재시작                                          │
     ╰────────────────────────────────────────────────────────────────────────╯