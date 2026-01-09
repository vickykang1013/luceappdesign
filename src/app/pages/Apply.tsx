import React, { useState } from "react";
import { postApply } from "../../api/api";
import { motion } from "motion/react";

export default function Apply() {
  const [file, setFile] = useState<File | null>(null);
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
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (file) data.append("profileFile", file);

    const res = await postApply(data);
    if (res?.success) {
      alert("✅ 지원이 성공적으로 접수되었습니다.");
      setFormData({ name: "", email: "", phone: "", age: "", height: "", sns: "", message: "" });
      setFile(null);
    } else {
      alert("❌ 지원 실패: " + (res?.error || "서버 오류"));
    }
  };

  // 공통 입력창 스타일 (세련된 하단 라인 스타일)
  const inputStyle = "w-full py-3 bg-transparent border-b border-gray-200 focus:border-[#D4AF37] outline-none transition-all duration-300 text-lg placeholder:text-gray-300";

  return (
    <section className="min-h-screen pt-32 pb-24 px-6 bg-[#fafafa] flex flex-col items-center">
      <motion.div 
        className="w-full max-w-3xl bg-white p-10 md:p-16 shadow-sm border border-gray-100"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* 헤더 섹션 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extralight tracking-[0.2em] mb-4" style={{ color: "#D4AF37" }}>APPLY</h2>
          <p className="text-gray-400 text-sm tracking-widest uppercase">Become a Luce Model</p>
        </div>

        {/* 안내 문구 (필수 기재 사항) */}
        <div className="mb-12 p-6 bg-[#fffdf6] border-l-2 border-[#D4AF37] text-sm text-gray-600 leading-relaxed">
          <p className="font-semibold text-[#D4AF37] mb-2">※ 프로필 파일(PDF/PPT) 필수 포함 사항</p>
          <ul className="list-disc list-inside space-y-1 ml-1">
            <li>기본 정보 (성함, 생년월일, 신장)</li>
            <li>연락처 및 실시간 사용 중인 SNS 계정</li>
            <li><strong>사진 3장 이상 필수</strong> (전신, 상반신, 클로즈업 포함)</li>
            <li>경력 사항이 있을 경우 상세 기재</li>
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
            <input type="text" name="sns" placeholder="SNS (Instagram 등)" className={inputStyle} value={formData.sns} onChange={handleChange} />
          </div>

          <div className="md:col-span-2 mt-4">
            <textarea name="message" placeholder="EXPERIENCE & MESSAGE (경력 사항 및 메시지)" className={`${inputStyle} h-32 resize-none`} value={formData.message} onChange={handleChange} />
          </div>
          
          <div className="md:col-span-2 mt-6 p-8 border-2 border-dashed border-gray-100 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
            <p className="text-gray-400 mb-2">{file ? `선택됨: ${file.name}` : "UPLOAD PROFILE (PDF, PPT)"}</p>
            <p className="text-[10px] text-gray-300 uppercase tracking-tighter">Maximum file size: 20MB</p>
            <input type="file" onChange={handleFileChange} accept=".pdf,.ppt,.pptx" className="absolute inset-0 opacity-0 cursor-pointer" required />
          </div>

          <div className="md:col-span-2 mt-12 flex justify-center">
            <button 
              type="submit"
              className="px-20 py-4 bg-black text-white text-sm tracking-[0.3em] hover:bg-[#D4AF37] transition-all duration-500 transform hover:-translate-y-1"
            >
              SUBMIT APPLICATION
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}