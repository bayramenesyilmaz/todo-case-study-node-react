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

app.use(
  cors({
    origin:
      "https://todo-case-study-node-react-bjjljeqys-bayramenesyilmazs-projects.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
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
