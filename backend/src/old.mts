import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
// import fs from "fs";
import { authRouter } from "./routes/auth/index.js";
import { tokenVerification } from "./middleware/tokenVerification.js";
import { PORT } from "./config/index.js";

const app = express();
const __dirname = path.resolve();

//middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://localhost:3003", "*"],
    credentials: true,
  })
);
// not secure routes
app.use("/api/v1", authRouter); //this includes login signup

// middleware token verification
app.use("/api/v1", tokenVerification);

// Database connection
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:: "));
// db.once("open", () => console.log("db connected!!"));

// secure routes
// app.use('/api/v1', productApis)
// app.use('/api/v1', tweetApi)
// app.post('/api/v1/change-password', psw)
// app.get('/api/v1/users', s)

app.get("/testing", (req, res) => res.send(`Hello World! ${req.ip}`));

app.use("/", express.static(path.join(__dirname, "./public/index.html")));

app.listen(PORT, () => console.log(`app listening on ===>>> ${PORT}`));
