# interactive-novel-web

Interactive Novel 웹 프론트엔드 레포지터리입니다.

## 설치

### 1. 환경 변수 설정

아래 두 파일을 루트 경로에 추가합니다.

- `.env.development` (개발 환경에서 사용)
- `.env.production` (빌드시 사용)

파일의 내용은 아래와 같습니다. (변동 발생시마다 업데이트)

```
# API Base URL
REACT_APP_API_BASEURL = "https://yourApiBaseUrl.com/"
```

### 2. 의존성 설치

```bash
npm i
```

### 3. 실행

```bash
# http://localhost:3000
npm start
```
