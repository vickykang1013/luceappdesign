// src/api/api.js
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

// GET 예시: 사용자 정보 가져오기
export async function getUsers() {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) throw new Error("Failed to fetch users");
    return await response.json();
  } catch (error) {
    console.error("getUsers error:", error);
    return null;
  }
}

// POST 예시: 사용자 추가
export async function postUser(userData) {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Failed to post user");
    return await response.json();
  } catch (error) {
    console.error("postUser error:", error);
    return null;
  }
}

// 필요하면 PUT, DELETE 등 다른 API도 여기 추가 가능
