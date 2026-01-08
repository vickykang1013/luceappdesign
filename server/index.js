// index.js
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const app = express();

/* =====================
   CORS 설정
===================== */
app.use(
  cors({
    origin: [
      "http://localhost:5173", // 로컬 Vite
      "http://localhost:3000", // 로컬 React
      "https://luceagency.vercel.app", // 배포된 프론트
    ],
    credentials: true,
  })
);

/* =====================
   JSON body 파싱
===================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =====================
   파일 업로드 설정
===================== */
const upload = multer({
  storage: multer.memoryStorage(),
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
   헬스체크
===================== */
app.get("/", (req, res) => res.send("서버 정상 작동 중"));
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

/* =====================
   지원서 제출 API
===================== */
app.post("/api/apply", upload.single("profileFile"), async (req, res) => {
  console.log("☎️ /api/apply 요청 수신");

  try {
    const { name, phone, email, message } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({ success: false, error: "필수 정보 누락" });
    }

    console.log("📩 데이터:", req.body);
    console.log("📎 첨부 파일:", req.file ? req.file.originalname : "없음");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS?.trim(),
      },
    });

    await transporter.verify();
    console.log("✅ Gmail SMTP 연결 성공");

    await transporter.sendMail({
      from: `"LUCE 모델 에이전시" <${process.env.MAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `[신규 지원] ${name}님`,
      html: `
        <h3>LUCE 신규 모델 지원</h3>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>연락처:</strong> ${phone}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>메시지:</strong><br/>${message || "-"}</p>
      `,
      attachments: req.file
        ? [{ filename: req.file.originalname, content: req.file.buffer }]
        : [],
    });

    console.log("✅ 이메일 발송 완료");
    res.json({ success: true });
  } catch (error) {
    console.error("❌ 메일 전송 실패:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

/* =====================
   서버 실행
===================== */
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 서버 실행: http://localhost:${PORT}`);
});
