# 🚀 Release 가이드

## 📋 Release 프로세스

### 1. 버전 업데이트 (필요시)

```bash
# 버전 업데이트
npm run version:hddm 0.5        # Handdam Edit Plugin v0.5
npm run version:cbs 0.2         # CBS IntelliSense v0.2
npm run version:lightboard 0.2  # Lightboard NAI Preset Manager v0.2
```

### 2. 플러그인별 Release 생성

```bash
# 개별 플러그인 Release 생성
npm run release:hddm        # Handdam Edit Plugin
npm run release:cbs         # CBS IntelliSense  
npm run release:lightboard  # Lightboard NAI Preset Manager

# 모든 플러그인 Release 생성
npm run release:all
```

### 3. Git Tag 생성 및 푸시

```bash
# 개별 플러그인 Tag 생성 (versions.json에서 자동으로 버전 읽어옴)
npm run tag:hddm        # hddm-edit-v{version}
npm run tag:cbs         # cbs-intellisense-v{version}
npm run tag:lightboard  # lightboard-v{version}
```

**태그가 이미 존재하는 경우**:
```bash
# 기존 태그 삭제 후 재생성
npm run delete-tag:hddm        # 기존 태그 삭제
npm run tag:hddm              # 새 태그 생성

# 또는 버전 업데이트 후 재생성
npm run version:hddm 0.5       # 버전 업데이트
npm run tag:hddm              # 새 버전으로 태그 생성
```

**PowerShell/Windows 사용자**: 위 명령어들이 PowerShell에서 제대로 작동합니다.

### 3. GitHub Actions 자동 Release

Tag가 푸시되면 자동으로 GitHub Release가 생성됩니다:

- **Tag 형식**: `{plugin-name}-v{version}`
- **Release 파일**: `{plugin-name}-v{version}.zip`
- **자동 생성**: GitHub Actions 워크플로우

## 🏷️ Tag 명명 규칙

| 플러그인 | Tag 형식 | 예시 |
|---------|---------|------|
| Handdam Edit Plugin | `hddm-edit-v{version}` | `hddm-edit-v0.4` |
| CBS IntelliSense | `cbs-intellisense-v{version}` | `cbs-intellisense-v0.1` |
| Lightboard NAI Preset Manager | `lightboard-v{version}` | `lightboard-v0.1` |

## 📦 Release 파일 구조

### ZIP 파일 (JS 파일들)
```
{plugin-name}-v{version}.zip
├── {plugin}.js          # 메인 플러그인 파일 (dist/)
└── {plugin}.js          # 소스 JS 파일 (개발용)
```

### JS 파일 (메인 플러그인만)
```
{plugin-name}-v{version}.js
└── {plugin}.js          # 메인 플러그인 파일 (dist/)
```

## 📥 사용자 선택 옵션
- **ZIP 파일**: 메인 + 소스 JS 파일 (권장)
- **JS 파일**: 메인 플러그인 파일만 간단하게 설치

## 🔄 버전 관리

### versions.json 파일 관리

모든 플러그인의 버전은 `versions.json` 파일에서 중앙 관리됩니다:

```json
{
  "hddm_edit": {
    "name": "Handdam Edit Plugin",
    "version": "0.4",
    "files": ["dist/hddm_edit_plugin.js", "hddm_edit_plugin.js"]
  }
}
```

### 버전 업데이트 방법

1. **versions.json에서 버전 수정**:
   ```bash
   npm run version:hddm 0.5
   ```

2. **플러그인 코드에서 버전 수정** (선택사항):
   ```javascript
   //@version 0.5  // 버전 업데이트
   ```

3. **자동으로 Git tag 생성**:
   ```bash
   npm run tag:hddm  # versions.json에서 버전 자동 읽어옴
   ```

## 🚨 주의사항

- **Tag는 한 번 생성되면 수정 불가**: 신중하게 버전을 결정하세요
- **Release 전 테스트**: 로컬에서 플러그인 동작을 확인하세요
- **문서 업데이트**: README.md의 버전 정보를 최신으로 유지하세요

## 📋 체크리스트

- [ ] 플러그인 코드 버전 업데이트
- [ ] scripts/release.js 버전 업데이트  
- [ ] package.json 스크립트 업데이트
- [ ] 로컬 테스트 완료
- [ ] Release 패키지 생성 (`npm run release:{plugin}`)
- [ ] Git tag 생성 및 푸시 (`npm run tag:{plugin}`)
- [ ] GitHub Release 확인
- [ ] 사용자에게 알림
