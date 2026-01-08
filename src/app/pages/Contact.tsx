import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function Contact() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Link
            to="/"
            className="inline-block mb-8 text-gray-600 hover:text-[#D4AF37] transition-colors"
          >
            ← Back to Home
          </Link>
          <h1
            className="text-5xl mb-6 tracking-wider"
            style={{
              background: "linear-gradient(135deg, #D4AF37 0%, #F4E5A1 50%, #D4AF37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            CONTACT
          </h1>
        </motion.div>

        {/* 연락처 정보 */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* 회사 정보 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/50 backdrop-blur-sm rounded-lg p-8 shadow-sm"
          >
            <h2
              className="text-2xl mb-6"
              style={{
                background: "linear-gradient(135deg, #D4AF37 0%, #F4E5A1 50%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              회사 정보
            </h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <p className="text-sm text-gray-500 mb-1">회사명</p>
                <p>LUCE Model Agency</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">대표자</p>
                <p>서영희</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">사업자등록번호</p>
                <p>861-73-00715</p>
              </div>
            </div>
          </motion.div>

          {/* 연락처 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/50 backdrop-blur-sm rounded-lg p-8 shadow-sm"
          >
            <h2
              className="text-2xl mb-6"
              style={{
                background: "linear-gradient(135deg, #D4AF37 0%, #F4E5A1 50%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              연락처
            </h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <p className="text-sm text-gray-500 mb-1">대표 전화</p>
                <a
                  href="tel:02-1234-5678"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  010-8932-0275
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">에이전시 이메일</p>
                <a
                  href="mailto:contact@luce-model.com"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  luceagency0925@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* SNS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 bg-white/50 backdrop-blur-sm rounded-lg p-8 shadow-sm"
        >
          <h2
            className="text-2xl mb-6"
            style={{
              background: "linear-gradient(135deg, #D4AF37 0%, #F4E5A1 50%, #D4AF37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            SNS
          </h2>
          <div className="flex gap-6">
            <a
              href="https://instagram.com/luce.0925"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-[#D4AF37] transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F4E5A1] flex items-center justify-center text-white">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <span>@luce.0925</span>
            </a>
          </div>
        </motion.div>

        
      </div>
    </div>
  );
}
