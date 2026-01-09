import React, { useState } from "react";
import { postApply } from "../../api/api"; // 경로 확인

export default function Apply() {
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("message", formData.message);
    if (file) data.append("profileFile", file);

    const res = await postApply(data);

    if (res?.success) {
      alert("✅ 지원 완료!");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setFile(null);
    } else {
      alert("❌ 지원 실패: " + (res?.error || "서버 오류"));
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        name="name"
        placeholder="이름"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="이메일"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="전화번호"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <textarea
        name="message"
        placeholder="메시지"
        value={formData.message}
        onChange={handleChange}
      />
      <input type="file" onChange={handleFileChange} accept=".pdf,.ppt,.pptx" />
      <button type="submit">제출</button>
    </form>
  );
}
