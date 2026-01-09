import { createRoot } from "react-dom/client";
import React from 'react';
import App from "./app/App";

// 1. 테일윈드 설정이 담긴 파일을 가장 먼저 불러와야 합니다
import "./styles/tailwind.css";

// 2. 그 다음 테마와 폰트
import "./styles/theme.css";
import "./styles/fonts.css";

// 3. 마지막으로 앱 실행
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);