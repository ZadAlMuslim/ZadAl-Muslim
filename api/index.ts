import express from "express";
import { registerRoutes } from "../routes";
import { serveStatic, log } from "../vite";
import { createServer, proxy } from "vercel-express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// تسجيل جميع المسارات
registerRoutes(app);

// خدمة الملفات الثابتة
serveStatic(app);

// تحويل Express إلى API متوافقة مع Vercel
export default createServer(app);
