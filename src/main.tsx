import { createRoot } from "react-dom/client";
import React from 'react';
import App from "./app/App";

// index.css를 거치지 않고 직접 불러오기 (에러 방지)
import "./styles/fonts.css";
import "./styles/tailwind.css";
import "./styles/theme.css";
import "./styles/index.css"; // 이건 혹시 다른 코드가 들어있을지 모르니 유지

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);