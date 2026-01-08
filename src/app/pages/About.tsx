import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function About() {
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
            ABOUT LUCE
          </h1>
        </motion.div>

        {/* 에이전시 소개 */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 space-y-6"
        >
          <h2 className="text-2xl text-gray-800 mb-4">에이전시 소개</h2>
          <p className="text-gray-600 leading-relaxed">
            LUCE는 홈쇼핑과 광고를 중심으로 전문 캐스팅을 진행하는 모델 에이전시입니다.
            브랜드의 메시지를 가장 효과적으로 전달할 수 있는 모델을 발굴하고,
            프로젝트의 목적에 맞는 최적의 매칭을 제공합니다.
          </p>
          <p className="text-gray-600 leading-relaxed">
            패션, 뷰티, 리빙, 식품 등 다양한 광고 및 홈쇼핑 방송 경험을 바탕으로
            클라이언트의 브랜드 가치를 극대화하고,
            모델이 신뢰받는 커리어를 쌓을 수 있도록 함께합니다.
          </p>
        </motion.section>

        {/* 대표 소개 */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl text-gray-800 mb-6">대표 소개</h2>
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-8 shadow-sm">
            <div className="mb-6">
              <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-[#D4AF37] to-[#F4E5A1] mb-4">
              <div
                    className="w-full h-full rounded-full bg-center bg-cover"
                    style={{
                      backgroundImage: "url('/profile_image.jpg')"
                    }}
                  />
                </div>
              <h3 className="text-xl text-gray-800 mb-2">서영희</h3>
              <p className="text-gray-500">LUCE 모델 에이전시 대표</p>
            </div>
            <div className="space-y-3 text-gray-600">
              <p>• 20년 이상 광고 및 홈쇼핑 분야에서 활동 중인 현역 전문 모델</p>
              <p>• 닌텐도, 현대카드, 한국전력공사 등 대기업 및 공공기관 광고 다수 출연</p>
              <p>• 공익광고, 기업 홍보 영상, 홈쇼핑 방송 및 라이브커머스 쇼호스트 경험 보유</p>
              <p>• 현역 모델로서 촬영 현장을 정확히 이해하고, 모델의 강점과 브랜드 니즈를 동시에 고려한 캐스팅 진행</p>
            </div>
          </div>
        </motion.section>

        {/* 주요 서비스 */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl text-gray-800 mb-6">주요 서비스</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ServiceCard
              title="광고 모델 캐스팅"
              description="TV CF, 온라인 광고, 인쇄 광고 등 다양한 광고 프로젝트에서
              브랜드와 콘셉트에 맞는 모델을 섭외합니다.
              촬영 목적과 현장 상황을 고려한 실전 중심 캐스팅을 진행합니다."
            />
            <ServiceCard
              title="홈쇼핑 방송 모델 캐스팅"
              description="주요 홈쇼핑 채널의 방송 모델 캐스팅을 전문으로 하며,
              방송 특성에 맞는 모델 매칭과 사전 조율을 제공합니다."
            />
            <ServiceCard
              title="광고·영상 모델 섭외"
              description="기업 홍보 영상, 공익광고, 브랜드 콘텐츠 등
              다양한 영상 촬영에 적합한 모델을 섭외합니다.
              프로젝트 목적에 맞는 모델 캐스팅을 지향합니다."

            />
            <ServiceCard
              title="모델 매니지먼트 & 커뮤니케이션 지원"
              description="캐스팅 이후에도 모델과의 지속적인 소통을 통해
              촬영이 원활하게 진행될 수 있도록 지원합니다.
              프로젝트에 따라 필요 시 현장 커뮤니케이션을 돕습니다."
            />
          </div>
        </motion.section>
      </div>
    </div>
  );
}

function ServiceCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-100"
    >
      <h3
        className="text-xl mb-3"
        style={{
          background: "linear-gradient(135deg, #D4AF37 0%, #F4E5A1 50%, #D4AF37 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}
