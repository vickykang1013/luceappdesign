// src/api/api.ts
const API_URL = process.env.REACT_APP_API_URL as string || "http://localhost:5001";


export async function postApply(data: FormData): Promise<{ success: boolean; error?: string }> {
  try {
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
