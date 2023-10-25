import express from "express";
import { faqRouter } from "./routes/index.js";
import { PORT } from "./config/index.js";
import { middlewareRouter } from "./middleware/index.mjs";

const app = express();

app.use("/api/v1", middlewareRouter);

// app.use("/api/v1", authRouter);
app.use("/api/v1", faqRouter);

app.get("/testing", (req, res) => res.send("faq server testing"));

app.listen(PORT, () => console.log(`app listening on ===>>> ${PORT}`));

// Code to run before the server exits
process.on("exit", (code) =>
  console.log(`Server is about to exit with code ${code}`)
);
