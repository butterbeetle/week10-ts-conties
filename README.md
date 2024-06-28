# ✨ [11주차] React 플러스주차 개인과제

##### 주제: API 를 호출하고 받은 응답값을 화면에 보여주는 과정에서 타입스크립트를 사용

[바로가기](https://week10-ts-country.vercel.app/)

### ⏰ 기한

- 2024.06.24 ~ 2024.06.28

### ⚙️ 기술 스택

<p>
  <img alt="Vite" src ="https://img.shields.io/badge/Vite-646CFF.svg?&style=flat-square&logo=VITE&logoColor=white"/>
  <img alt="TypeScript" src ="https://img.shields.io/badge/TypeScript-3178C6.svg?&style=flat-square&logo=TYPESCRIPT&logoColor=white"/>
  <img alt="Axios" src ="https://img.shields.io/badge/Axios-5A29E4.svg?&style=flat-square&logo=AXIOS&logoColor=white"/>
  <img alt="Tailwind" src ="https://img.shields.io/badge/TailwindCSS-646CFF.svg?&style=flat-square&logo=TAILWINDCSS&logoColor=white"/>
</p>

### 📁 파일 구조

```
📦src
 ┣ 📂api
 ┃ ┗ 📜api.ts
 ┣ 📂components
 ┃ ┣ 📜CountryCard.tsx
 ┃ ┗ 📜CountryList.tsx
 ┣ 📂types
 ┃ ┗ 📜country.ts
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```

### 🎇 필수 구현 사항

- ✅ `vite`, `react`, `typescript` 기반의 프로젝트를 시작한다.
- ✅ 제공된 API 를 호출하는 로직을 작성하고 적절한 타입을 사용합니다.
- ✅ API 의 응답 값을 컴포넌트에서 `useState` 를 이용해 상태관리를 해줍니다.
  적절한 타입이 꼭 명시되어야 합니다.
- ✅ `useState` 에서 상태관리되고 있는 값들을 화면에 보여주고, 사용자와 인터렉션 (선택/해제) 가 가능하도록 합니다.
  이 과정에서 적절한 타입이 명시되어 있는 함수를 사용하도록 합니다.

### 🎆 선택 구현 사항

- ✅ 보여준 데이터를 Sort 할 수 있는 함수들을 작성해보세요.
- ✅ `Supabase` 에 선택되어 있는 나라들을 저장 할 수 있는 로직을 작성해봅시다.
  단, API 에서 받아온 데이터는 필요없는 데이터도 많은 것 같아요.
  우리가 필요한 정보들만 따로 모아서 새로운 Country 타입을 설정하고 그 값을 저장하도록 합시다.

### 💡 과제 후 숙련 가능 사항

- 리액트에서 기본적인 타입스크립트 사용
- API 호출 과정에서 타입스크립트의 사용
