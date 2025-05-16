const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const statsRoutes = require("./routes/statsRoutes");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://todo-case-study-node-react.vercel.app",
  "https://todo-case-study-node-react-faga.vercel.app",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy: Bu origin izinli değil"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    maxAge: 86400,
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimiter({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX) || 100,
  message: "Çok fazla istek yaptınız. Lütfen daha sonra tekrar deneyin.",
});

app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/stats/todos", statsRoutes);

app.use(errorHandler);

module.exports = app;
