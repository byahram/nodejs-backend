# 📝 Todo App 백엔드 (Node.js)

이 프로젝트는 **Node.js**, **Express**, **MongoDB**를 사용하여 만든 간단한 To-Do 리스트 백엔드입니다.

- [To-Do 리스트 프론트엔드 Github](https://github.com/byahram/react-todo-app)

<br>

## 📂 폴더 구조

```bash
📦 Todo-App
├── 📁 controller         # 컨트롤러 (비즈니스 로직 처리)
├── 📁 model              # 데이터 모델 (Mongoose 스키마)
├── 📁 router             # 라우터 (API 엔드포인트 정의)
├── app.ts                # Express 서버 설정 및 실행 파일
├── package.json          # 프로젝트 정보 및 의존성 관리
└── tsconfig.json         # TypeScript 설정 파일
```

<br>

## 📦 기술 스택

- **Node.js** - 서버 환경
- **Express** - 웹 프레임워크
- **MongoDB (Mongoose)** - 데이터베이스
- **TypeScript** - 정적 타입 지원
- **JWT (Json Web Token)** - 사용자 인증
- **Bcrypt.js** - 비밀번호 해싱
- **CORS** - 보안 설정

<br>

## 🚀 설치 및 실행 방법

### 1️⃣ 저장소 클론

```sh
git clone https://github.com/byahram/nodejs-backend.git
cd nodejs-backend
```

### 2️⃣ 패키지 설치

```sh
npm install
```

### 3️⃣ 환경 변수 설정

```sh
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
```

### 4️⃣ 개발 모드 실행

```sh
npm run dev
```

### 5️⃣ 빌드 및 배포 실행

```sh
npm run build
npm start
```

<br>

## 📌 주요 기능

- 회원가입 & 로그인 (JWT 인증)
- 할 일(To-Do) CRUD API 제공
- MongoDB + Mongoose를 이용한 데이터 관리
- 보안 강화를 위한 비밀번호 암호화

<br>

## 📜 API Endpoint

### 사용자 (User) 인증 관련

| Method   | Endpoint          | Description               |
| -------- | ----------------- | ------------------------- |
| **POST** | `/users/register` | 회원가입                  |
| **POST** | `/users/login`    | 로그인                    |
| **GET**  | `/users/getUser`  | 로그인된 사용자 정보 조회 |

### 할 일 (Task) 관리

| Method     | Endpoint            | Description     |
| ---------- | ------------------- | --------------- |
| **GET**    | `/tasks/getAll`     | 할 일 목록 조회 |
| **POST**   | `/tasks/add`        | 할 일 추가      |
| **PUT**    | `/tasks/update/:id` | 할 일 수정      |
| **DELETE** | `/tasks/delete/:id` | 할 일 삭제      |

<br>
