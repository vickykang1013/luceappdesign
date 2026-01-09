import React, { useState } from "react";
import { postApply } from "../../api/api";
import { motion } from "motion/react";

export default function Apply() {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 중 상태 관리
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    height: "",
    sns: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 버튼 중복 클릭 방지
    if (isSubmitting) return;
    setIsSubmitting(true);

    const data = new FormData();
    // 폼 데이터 담기
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    
    // 파일 담기
    if (file) {
      data.append("profileFile", file);
    } else {
      alert("프로필 파일(PDF/PPT)을 업로드해주세요.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await postApply(data);
      if (res?.success) {
        alert("✅ 지원서와 프로필이 성공적으로 접수되었습니다. (자동화 메일 발송 완료)");
        // 폼 초기화
        setFormData({ name: "", email: "", phone: "", age: "", height: "", sns: "", message: "" });
        setFile(null);
      } else {
        alert("❌ 지원 실패: " + (res?.error || "서버 오류가 발생했습니다."));
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("❌ 네트워크 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = "w-full py-3 bg-transparent border-b border-gray-200 focus:border-[#D4AF37] outline-none transition-all duration-300 text-lg placeholder:text-gray-300";

  return (
    <section className="min-h-screen pt-32 pb-24 px-6 bg-[#fafafa] flex flex-col items-center">
      <motion.div 
        className="w-full max-w-3xl bg-white p-10 md:p-16 shadow-sm border border-gray-100"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extralight tracking-[0.2em] mb-4" style={{ color: "#D4AF37" }}>APPLY</h2>
          <p className="text-gray-400 text-sm tracking-widest uppercase">Become a Luce Model</p>
        </div>

        {/* 안내 문구 */}
        <div className="mb-12 p-6 bg-[#fffdf6] border-l-2 border-[#D4AF37] text-sm text-gray-600 leading-relaxed">
          <p className="font-semibold text-[#D4AF37] mb-2">※ 프로필 필수 포함 사항 (메일 자동 전송 항목)</p>
          <ul className="list-disc list-inside space-y-1 ml-1">
            <li>기본 정보 (성함, 나이, 신장 필수)</li>
            <li>실시간 사용 중인 SNS(인스타그램 등) 계정</li>
            <li><strong>사진 3장 이상 포함된 PDF/PPT 파일</strong></li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          <div className="space-y-8">
            <input type="text" name="name" placeholder="NAME" className={inputStyle} value={formData.name} onChange={handleChange} required />
            <input type="text" name="age" placeholder="AGE" className={inputStyle} value={formData.age} onChange={handleChange} required />
            <input type="email" name="email" placeholder="EMAIL" className={inputStyle} value={formData.email} onChange={handleChange} required />
          </div>

          <div className="space-y-8">
            <input type="tel" name="phone" placeholder="PHONE" className={inputStyle} value={formData.phone} onChange={handleChange} required />
            <input type="text" name="height" placeholder="HEIGHT (cm)" className={inputStyle} value={formData.height} onChange={handleChange} required />
            <input type="text" name="sns" placeholder="SNS (Instagram URL)" className={inputStyle} value={formData.sns} onChange={handleChange} required />
          </div>

          <div className="md:col-span-2 mt-4">
            <textarea name="message" placeholder="EXPERIENCE & MESSAGE (경력 및 자기소개)" className={`${inputStyle} h-32 resize-none`} value={formData.message} onChange={handleChange} />
          </div>
          
          <div className="md:col-span-2 mt-6 p-8 border-2 border-dashed border-gray-100 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors relative cursor-pointer">
            <p className="text-[#D4AF37] mb-2 font-medium">
              {file ? `📎 ${file.name}` : "CLICK TO UPLOAD PROFILE (PDF/PPT)"}
            </p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">사진 3장 이상 포함 필수</p>
            <input 
              type="file" 
              onChange={handleFileChange} 
              accept=".pdf,.ppt,.pptx" 
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          <div className="md:col-span-2 mt-12 flex justify-center">
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`px-20 py-4 bg-black text-white text-sm tracking-[0.3em] transition-all duration-500 transform ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#D4AF37] hover:-translate-y-1'}`}
            >
              {isSubmitting ? "SENDING..." : "SUBMIT APPLICATION"}
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}