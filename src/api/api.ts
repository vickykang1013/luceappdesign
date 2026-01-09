// src/api/api.ts

// 환경 변수 쓰지 말고, 그냥 주소를 통째로 적어버리세요.
const API_URL = "https://luceagencyapp.onrender.com"; 

export async function postApply(data: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    // 이제 `${API_URL}`은 무조건 Render 주소가 됩니다.
    const res = await fetch(`${API_URL}/api/apply`, {
      method: "POST",
      body: data,
    });
    if (!res.ok) throw new Error("Failed to post application");
    return await res.json();
  } catch (error: any) {
    console.error("postApply error:", error);
    return { success: false, error: error.message };
  }
}