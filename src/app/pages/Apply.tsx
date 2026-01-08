// Apply.tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Apply() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("PPT/PDF 파일 첨부 필수!");

    setIsSubmitting(true);
    setIsSuccess(false);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("phone", formData.phone);
    data.append("email", formData.email);
    data.append("message", formData.message);
    data.append("profileFile", file);

    try {
      const response = await fetch("http://localhost:5001/api/apply", {
        method: "POST",
        body: data,
      });
      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: "", phone: "", email: "", message: "" });
        setFile(null);

        const fileInput = document.querySelector(
          'input[type="file"]'
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      } else {
        alert("❌ 제출 실패: " + (result.error || "알 수 없는 오류"));
      }
    } catch (error) {
      console.error(error);
      alert("❌ 서버 연결 실패. 서버 실행 확인 필요!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-6 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <Link
            to="/"
            className="text-gray-500 hover:text-[#D4AF37] transition-colors"
          >
            ← Back to Home
          </Link>

          <h1
            className="text-5xl mt-6 mb-4 font-bold"
            style={{
              background:
                "linear-gradient(135deg, #D4AF37 0%, #F4E5A1 50%, #D4AF37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            프로필 제출하기
          </h1>

          <div className="bg-[#fdfaf2] border-l-4 border-[#D4AF37] p-6 rounded-r-lg shadow-sm">
            <h3 className="text-[#B8860B] font-bold mb-2">
              📌 PPT/PDF 프로필 필수 기재 사항
            </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 성함, 나이, 신장(cm) 필수</li>
              <li>• 모델 경력 사항 (없을 시 ‘신입’ 기재)</li>
              <li>
                • <strong>사진 최소 3장 이상 (전신/클로즈업/측면)</strong>
              </li>
              <li>• 연락 가능한 휴대폰 번호</li>
            </ul>
          </div>
        </motion.div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                성함 *
              </label>
              <input
                type="text"
                required
                className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#D4AF37] outline-none"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                연락처 *
              </label>
              <input
                type="tel"
                required
                placeholder="010-0000-0000"
                className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#D4AF37] outline-none"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이메일 *
            </label>
            <input
              type="email"
              required
              className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#D4AF37] outline-none"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              프로필 PPT/PDF 첨부 *
            </label>
            <input
              type="file"
              accept=".pdf"
              required
              onChange={handleFileChange}
              className="w-full p-3 border-2 border-dashed border-gray-200 rounded-lg text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#fdfaf2] file:text-[#B8860B] hover:file:bg-[#f5ebd0]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              추가 메시지
            </label>
            <textarea
              rows={4}
              placeholder="경력 사항 요약이나 하고 싶은 말을 적어주세요."
              className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#D4AF37] outline-none resize-none"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
          </div>

          {/* 제출 완료 메시지 */}
          {isSuccess && (
            <p className="text-green-600 font-semibold text-center">
              ✅ 프로필 제출이 완료되었습니다.
            </p>
          )}

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.01 } : {}}
            whileTap={!isSubmitting ? { scale: 0.99 } : {}}
            className={`w-full py-4 rounded-lg text-white font-bold text-lg shadow-md transition-all ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : ""
            }`}
            style={{
              background: !isSubmitting
                ? "linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)"
                : "#999",
            }}
          >
            {isSubmitting ? "제출 중..." : "프로필 제출하기"}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
