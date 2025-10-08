# Lightboard NAI Preset Manager

RISU AI용 Lightboard NAI 프리셋 관리 플러그인

## 개발 환경 설정

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 모드 실행
```bash
npm run dev
```
- 파일 변경 시 자동으로 재빌드됩니다
- `dist/lightboard_nai_preset_manager.js` 파일이 생성됩니다

### 3. 프로덕션 빌드
```bash
npm run build
```

## 프로젝트 구조

```
src/
├── index.js                    # 메인 엔트리 포인트
├── constants.js                # 상수 정의
├── core/                       # 핵심 로직
│   ├── risu-api.js             # RisuAPI 래퍼
│   ├── module-manager.js       # 모듈 관리
│   └── preset-manager.js       # 프리셋 관리
├── ui/                         # UI 관련
│   ├── styles.js               # CSS 스타일
│   └── components/             # Custom Elements
│       ├── menu-button.js      # 메뉴 버튼 컴포넌트
│       ├── toolbar.js          # 툴바 컴포넌트
│       ├── list.js             # 프리셋 목록 컴포넌트
│       ├── form-page.js        # 프리셋 폼 페이지
│       ├── tabs.js             # 탭 컴포넌트
│       └── preview-tab.js      # 이미지 미리보기 탭
└── utils/                      # 유틸리티
    ├── script-injector.js      # 스크립트 인젝터
    ├── helpers.js              # 헬퍼 함수
    ├── image-compressor.js     # 이미지 압축 유틸리티
    └── image-storage.js        # IndexedDB 이미지 저장소
```

## 사용법

1. 플러그인 페이지로 이동합니다
2. 플러그인 파일(.js)을 플러그인 섹션으로 드래그합니다
3. 파일이 자동으로 분석되고 설치됩니다
4. 플러그인 목록에서 토글 버튼(▼/▲)을 클릭하여 접기/펼치기가 가능합니다

## 개발 장점

- **모듈화**: 코드가 기능별로 분리되어 유지보수가 쉬움
- **재사용성**: 각 모듈을 독립적으로 테스트하고 재사용 가능
- **확장성**: 새로운 기능 추가가 용이함
- **개발 효율성**: ES6 모듈 문법으로 현대적인 개발 환경
- **번들 최적화**: Webpack을 통한 코드 최적화 및 압축

## CHANGELOG
v0.1 
- 최초 배포