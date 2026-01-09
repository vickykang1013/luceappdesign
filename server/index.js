import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const app = express();

/* =====================
   CORS 설정 (강화 버전)
===================== */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://luceagency.vercel.app",
      "https://luceagency-git-main-vickykangs-projects.vercel.app", // 에러에 떴던 특정 주소 추가
      /\.vercel\.app$/ // 모든 Vercel 배포 주소를 허용하는 정규식
    ],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

/* =====================
   JSON 및 Form 데이터 파싱
===================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =====================
   파일 업로드 설정 (Multer)
===================== */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 최대 10MB 제한 추가
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("PDF 또는 PPT/PPTX 파일만 업로드 가능합니다."), false);
    }
  },
});

/* =====================
   헬스체크 및 확인용 엔드포인트
===================== */
// 브라우저에서 https://luceagencyapp.onrender.com 접속 시 확인용
app.get("/", (req, res) => res.send("<h1>LUCE API Server is Running!</h1>"));
app.get("/api/health", (req, res) => res.json({ status: "ok", message: "API is healthy" }));

/* =====================
   지원서 제출 API (/api/apply)
===================== */
app.post("/api/apply", upload.single("profileFile"), async (req, res) => {
  console.log("☎️ /api/apply 요청 수신됨");

  try {
    const { name, phone, email, message } = req.body;

    if (!name || !phone || !email) {
      console.log("⚠️ 필수 데이터 부족");
      return res.status(400).json({ success: false, error: "필수 정보가 누락되었습니다." });
    }

    // 이메일 설정
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS?.trim(),
      },
    });

    // 메일 내용 구성
    const mailOptions = {
      from: `"LUCE 모델 에이전시" <${process.env.MAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `[신규 지원] ${name}님`,
      html: `
        <h3>LUCE 신규 모델 지원서</h3>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>연락처:</strong> ${phone}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>메시지:</strong><br/>${message || "-"}</p>
      `,
      attachments: req.file
        ? [{ filename: req.file.originalname, content: req.file.buffer }]
        : [],
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ 이메일 발송 완료");
    
    return res.status(200).json({ success: true, message: "지원이 완료되었습니다!" });

  } catch (error) {
    console.error("❌ 서버 내부 에러:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

/* =====================
   서버 실행
===================== */
const PORT = process.env.PORT || 5001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행 중입니다.`);
});